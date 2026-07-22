import { inngest } from "@/lib/inngest/client";
import {
  createNotification,
  getNotificationPreferences,
} from "@/lib/db/queries/notifications";
import { db } from "@/lib/db/db";
import { threadParticipants, users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { Resend } from "resend";
import { getPublicAppUrl, getRequiredEnv } from "@/lib/env";

let resendClient: Resend | null = null;
function getResend() {
  if (!resendClient) {
    resendClient = new Resend(getRequiredEnv("RESEND_API_KEY"));
  }
  return resendClient;
}

/**
 * Escapes a string for safe interpolation into an HTML document.
 * Prevents HTML injection / phishing via user-supplied content in
 * outbound notification emails.
 */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

interface MessageSentPayload {
  threadId: string;
  senderId: string;
  senderName: string;
  messageId: string;
  messageBody: string;
  projectId: string;
  projectName: string;
  organizationId: string;
}

/**
 * Inngest function: Handles "messaging/message.sent" event.
 * Creates in-app notifications for all thread participants (except sender)
 * and sends email digests for instant-preference users.
 *
 * Inngest v3 signature: createFunction({ id, name, trigger }, handler)
 */
export const onMessageSent = inngest.createFunction(
  {
    id: "on-message-sent",
    name: "Handle New Message Notifications",
    triggers: [{ event: "messaging/message.sent" }],
  },
  async ({ event, step }: { event: { data: MessageSentPayload }; step: any }) => {
    const {
      threadId,
      senderId,
      senderName,
      messageId,
      messageBody,
      projectId,
      projectName,
    } = event.data;

    // Step 1: Get all thread participants except the sender
    const participants = await step.run(
      "get-participants",
      async () =>
        db
          .select({
            userId: threadParticipants.userId,
            muted: threadParticipants.muted,
            email: users.email,
            name: users.name,
          })
          .from(threadParticipants)
          .leftJoin(users, eq(threadParticipants.userId, users.id))
          .where(eq(threadParticipants.threadId, threadId))
    );

    const recipients = (participants as Array<{
      userId: string;
      muted: boolean;
      email: string | null;
      name: string | null;
    }>).filter((p) => p.userId !== senderId && !p.muted);

    // Step 2: Create in-app notifications
    await step.run("create-in-app-notifications", async () => {
      for (const recipient of recipients) {
        await createNotification({
          userId: recipient.userId,
          type: "new_message",
          payload: {
            threadId,
            messageId,
            senderId,
            senderName,
            projectId,
            projectName,
            preview: messageBody.slice(0, 120),
          },
        });
      }
    });

    // Step 3: Send instant email digests to users who opted in
    await step.run("send-email-digests", async () => {
      for (const recipient of recipients) {
        const prefs = await getNotificationPreferences(recipient.userId);
        const msgPref = prefs.find(
          (p) => p.notificationType === "new_message"
        );

        const shouldEmail =
          msgPref?.emailEnabled !== false &&
          msgPref?.digestFrequency === "instant";

        if (shouldEmail && recipient.email) {
          // Escape all user-generated content before embedding in HTML to
          // prevent injection / phishing via crafted names or message text.
          const safeSenderName = escapeHtml(senderName);
          const safeProjectName = escapeHtml(projectName);
          const rawPreview = messageBody.slice(0, 300) + (messageBody.length > 300 ? "..." : "");
          const safePreview = escapeHtml(rawPreview);
          // Safe URL parts — projectId is a UUID from the DB and the app URL is env-controlled.
          const appUrl = getPublicAppUrl();
          const logoUrl = appUrl ? `${appUrl}/logo.png` : "/logo.png";
          const threadUrl = appUrl ? `${appUrl}/portal/projects/${projectId}?tab=messages` : `/portal/projects/${projectId}?tab=messages`;

          await getResend().emails.send({
            from: "Onyx Portal <notifications@onyx.app>",
            to: recipient.email,
            subject: `New message in ${safeProjectName}`,
            html: `
              <div style="font-family: sans-serif; max-width: 580px; margin: 0 auto; padding: 24px;">
                <div style="margin-bottom: 16px;">
                  <img src="${logoUrl}" alt="Onyx" style="height: 28px;" />
                </div>
                <h2 style="color: #0BBDF4; font-size: 18px; margin: 0 0 12px;">
                  New message from ${safeSenderName}
                </h2>
                <p style="color: #555; line-height: 1.6; font-size: 14px; border-left: 3px solid #0BBDF4; padding-left: 12px; margin: 0 0 20px;">
                  ${safePreview}
                </p>
                <a href="${threadUrl}"
                   style="display: inline-block; background: #0BBDF4; color: #000; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 14px;">
                  View Conversation &#x2192;
                </a>
                <p style="color: #999; font-size: 11px; margin-top: 28px; border-top: 1px solid #eee; padding-top: 16px;">
                  You&#x27;re receiving this as a participant in the <strong>${safeProjectName}</strong> project.
                  Manage your notification preferences in the portal settings.
                </p>
              </div>
            `,
          });
        }
      }
    });

    return { notifiedCount: recipients.length };
  }
);
