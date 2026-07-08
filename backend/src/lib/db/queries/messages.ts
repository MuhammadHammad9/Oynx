import { db } from "../db";
import {
  messageThreads,
  messages,
  messageAttachments,
  threadParticipants,
  files,
  users,
  projects,
} from "../schema";
import { and, eq, isNull, desc, lt } from "drizzle-orm";

/**
 * Gets or creates the single message thread for a project.
 * Enforces organization ownership via projects join.
 */
export async function getOrCreateProjectThread(
  projectId: string,
  organizationId: string
) {
  // First verify the project belongs to the organization
  const [project] = await db
    .select({ id: projects.id })
    .from(projects)
    .where(
      and(
        eq(projects.id, projectId),
        eq(projects.organizationId, organizationId)
      )
    )
    .limit(1);

  if (!project) return null;

  // Check if thread exists
  const [existingThread] = await db
    .select()
    .from(messageThreads)
    .where(eq(messageThreads.projectId, projectId))
    .limit(1);

  if (existingThread) return existingThread;

  // Create the thread if it doesn't exist yet
  const [newThread] = await db
    .insert(messageThreads)
    .values({ projectId })
    .returning();

  return newThread;
}

/**
 * Fetches paginated messages for a thread, using cursor pagination.
 * Returns messages in chronological order (oldest first for display).
 * @param limit - Number of messages per page (default 30)
 * @param beforeId - Cursor: fetch messages older than this message ID
 */
export async function getThreadMessages(
  threadId: string,
  limit = 30,
  beforeCreatedAt?: Date
) {
  const conditions = [
    eq(messages.threadId, threadId),
    isNull(messages.deletedAt),
  ];

  if (beforeCreatedAt) {
    conditions.push(lt(messages.createdAt, beforeCreatedAt));
  }

  const rows = await db
    .select({
      id: messages.id,
      threadId: messages.threadId,
      senderId: messages.senderId,
      body: messages.body,
      editedAt: messages.editedAt,
      createdAt: messages.createdAt,
      senderName: users.name,
      senderAvatarUrl: users.avatarUrl,
    })
    .from(messages)
    .leftJoin(users, eq(messages.senderId, users.id))
    .where(and(...conditions))
    .orderBy(desc(messages.createdAt))
    .limit(limit);

  // Return in ascending order for display
  return rows.reverse();
}

/**
 * Fetches all file attachments for a given message.
 */
export async function getMessageAttachments(messageId: string) {
  return db
    .select({
      id: messageAttachments.id,
      fileId: messageAttachments.fileId,
      fileName: files.fileName,
      mimeType: files.mimeType,
      sizeBytes: files.sizeBytes,
      storageKey: files.storageKey,
    })
    .from(messageAttachments)
    .innerJoin(files, eq(messageAttachments.fileId, files.id))
    .where(eq(messageAttachments.messageId, messageId));
}

/**
 * Gets thread participant record for a user.
 */
export async function getThreadParticipant(
  threadId: string,
  userId: string
) {
  const [participant] = await db
    .select()
    .from(threadParticipants)
    .where(
      and(
        eq(threadParticipants.threadId, threadId),
        eq(threadParticipants.userId, userId)
      )
    )
    .limit(1);
  return participant || null;
}

/**
 * Upserts a thread participant (adds if not present).
 */
export async function upsertThreadParticipant(
  threadId: string,
  userId: string
) {
  const existing = await getThreadParticipant(threadId, userId);
  if (existing) return existing;

  const [participant] = await db
    .insert(threadParticipants)
    .values({ threadId, userId })
    .returning();

  return participant;
}

/**
 * Marks the last-read message for a participant, updating their read cursor.
 */
export async function markThreadRead(
  threadId: string,
  userId: string,
  lastMessageId: string
) {
  await db
    .update(threadParticipants)
    .set({ lastReadMessageId: lastMessageId })
    .where(
      and(
        eq(threadParticipants.threadId, threadId),
        eq(threadParticipants.userId, userId)
      )
    );
}
