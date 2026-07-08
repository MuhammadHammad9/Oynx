"use server";

import { can } from "@/lib/auth/rbac";
import { db } from "@/lib/db/db";
import {
  messages,
  messageAttachments,
  messageThreads,
  users,
  auditLogs,
  projects,
} from "@/lib/db/schema";
import {
  getOrCreateProjectThread,
  getThreadParticipant,
  upsertThreadParticipant,
  markThreadRead,
} from "@/lib/db/queries/messages";
import { inngest } from "@/lib/inngest/client";
import { SendMessageSchema, MarkThreadReadSchema } from "@/lib/validations/messages";
import { apiRateLimiter, checkActionRateLimit } from "@/lib/rate-limit";
import { getAuthedAppUser } from "@/lib/supabase/server";
import { eq } from "drizzle-orm";

/**
 * Standard response envelope per rule §7.
 */
type ActionResponse<T = null> =
  | { data: T; error: null }
  | { data: null; error: { code: string; message: string } };

/**
 * Sends a message to the project's thread.
 * Flow: Validate → Authenticate → Derive org → RBAC → DB transaction (msg + attachments + audit) → Inngest event
 */
export async function sendMessage(
  rawInput: unknown
): Promise<ActionResponse<{ messageId: string }>> {
  // 1. Validate input
  const parsed = SendMessageSchema.safeParse(rawInput);
  if (!parsed.success) {
    return {
      data: null,
      error: { code: "VALIDATION_ERROR", message: parsed.error.errors[0].message },
    };
  }
  const input = parsed.data;

  // 2. Authenticate
  const user = await getAuthedAppUser();
  if (!user) {
    return { data: null, error: { code: "UNAUTHENTICATED", message: "Not authenticated" } };
  }

  // 2a. Rate limit — prevent spamming by authenticated users
  const rateCheck = await checkActionRateLimit(apiRateLimiter, user.id);
  if (rateCheck.limited) {
    return {
      data: null,
      error: {
        code: "TOO_MANY_REQUESTS",
        message: `You are sending messages too quickly. Please wait ${rateCheck.secondsLeft} seconds.`,
      },
    };
  }

  // 3. Get full user row for RBAC context
  const [userRow] = await db
    .select({ userType: users.userType, internalRole: users.internalRole })
    .from(users)
    .where(eq(users.id, user.id))
    .limit(1);

  if (!userRow) {
    return { data: null, error: { code: "USER_NOT_FOUND", message: "User not found" } };
  }

  // 4. Derive organizationId from the project (server-side, not from client input)
  const [projectRow] = await db
    .select({ organizationId: projects.organizationId, name: projects.name })
    .from(projects)
    .where(eq(projects.id, input.projectId))
    .limit(1);

  if (!projectRow) {
    return { data: null, error: { code: "NOT_FOUND", message: "Project not found" } };
  }
  const { organizationId } = projectRow;

  // 5. RBAC check — must happen before any mutation
  const allowed = await can(
    { id: user.id, userType: userRow.userType, internalRole: userRow.internalRole },
    "send_message",
    { organizationId, projectId: input.projectId }
  );
  if (!allowed) {
    return {
      data: null,
      error: { code: "FORBIDDEN", message: "You don't have permission to send messages in this project" },
    };
  }

  // 6. Get or create thread for this project
  const thread = await getOrCreateProjectThread(input.projectId, organizationId);
  if (!thread) {
    return { data: null, error: { code: "NOT_FOUND", message: "Could not find or create message thread" } };
  }

  // 7. Insert message + attachments + audit log in one transaction
  let newMessageId: string;
  try {
    newMessageId = await db.transaction(async (tx) => {
      // Insert message
      const [msg] = await tx
        .insert(messages)
        .values({
          threadId: thread.id,
          senderId: user.id,
          body: input.body,
        })
        .returning({ id: messages.id });

      // Link attachments if provided
      if (input.attachmentFileIds.length > 0) {
        await tx.insert(messageAttachments).values(
          input.attachmentFileIds.map((fileId) => ({
            messageId: msg.id,
            fileId,
          }))
        );
      }

      // Update thread's last-message timestamp
      await tx
        .update(messageThreads)
        .set({ lastMessageAt: new Date() })
        .where(eq(messageThreads.id, thread.id));

      // Audit log (same transaction — security-sensitive action per rule §9)
      await tx.insert(auditLogs).values({
        organizationId,
        actorId: user.id,
        action: "message.sent",
        targetType: "message_thread",
        targetId: thread.id,
        metadata: JSON.stringify({
          messageId: msg.id,
          projectId: input.projectId,
          hasAttachments: input.attachmentFileIds.length > 0,
        }),
      });

      return msg.id;
    });
  } catch (err) {
    console.error("[sendMessage] DB transaction error:", err);
    return { data: null, error: { code: "INTERNAL_ERROR", message: "Failed to send message" } };
  }

  // 8. Ensure sender is registered as a thread participant
  await upsertThreadParticipant(thread.id, user.id);

  // 9. Dispatch async Inngest event for notifications (non-blocking)
  try {
    await inngest.send({
      name: "messaging/message.sent",
      data: {
        threadId: thread.id,
        senderId: user.id,
        senderName: user.user_metadata?.full_name || user.email || "Unknown",
        messageId: newMessageId,
        messageBody: input.body,
        projectId: input.projectId,
        projectName: projectRow.name,
        organizationId,
      },
    });
  } catch (err) {
    // Non-fatal: message was saved; notification failure is non-blocking
    console.error("[sendMessage] Inngest dispatch error:", err);
  }

  return { data: { messageId: newMessageId }, error: null };
}

/**
 * Marks the last-read message in a thread for the authenticated user.
 */
export async function markMessagesRead(
  rawInput: unknown
): Promise<ActionResponse> {
  const parsed = MarkThreadReadSchema.safeParse(rawInput);
  if (!parsed.success) {
    return {
      data: null,
      error: { code: "VALIDATION_ERROR", message: parsed.error.errors[0].message },
    };
  }

  const user = await getAuthedAppUser();
  if (!user) {
    return { data: null, error: { code: "UNAUTHENTICATED", message: "Not authenticated" } };
  }

  // Ownership check — the caller must be a participant of this thread.
  // Without this, any authenticated user who knows a thread UUID can update
  // another user's read cursor.
  const participant = await getThreadParticipant(parsed.data.threadId, user.id);
  if (!participant) {
    return {
      data: null,
      error: { code: "FORBIDDEN", message: "You are not a participant in this thread" },
    };
  }

  await markThreadRead(parsed.data.threadId, user.id, parsed.data.lastMessageId);
  return { data: null, error: null };
}
