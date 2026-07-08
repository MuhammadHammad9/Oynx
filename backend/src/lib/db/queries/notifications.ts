import { db } from "../db";
import { notifications, notificationPreferences } from "../schema";
import { and, eq, isNull, desc } from "drizzle-orm";

/**
 * Fetches unread in-app notifications for a user.
 */
export async function getUnreadNotifications(userId: string, limit = 20) {
  return db
    .select()
    .from(notifications)
    .where(
      and(
        eq(notifications.userId, userId),
        isNull(notifications.readAt)
      )
    )
    .orderBy(desc(notifications.createdAt))
    .limit(limit);
}

/**
 * Fetches all notifications for a user (paginated).
 */
export async function getNotifications(userId: string, limit = 30) {
  return db
    .select()
    .from(notifications)
    .where(eq(notifications.userId, userId))
    .orderBy(desc(notifications.createdAt))
    .limit(limit);
}

/**
 * Marks a specific notification as read.
 * Enforces ownership: userId must match the notification's userId.
 */
export async function markNotificationRead(
  notificationId: string,
  userId: string
) {
  await db
    .update(notifications)
    .set({ readAt: new Date() })
    .where(
      and(
        eq(notifications.id, notificationId),
        eq(notifications.userId, userId)
      )
    );
}

/**
 * Marks all notifications as read for a user.
 */
export async function markAllNotificationsRead(userId: string) {
  await db
    .update(notifications)
    .set({ readAt: new Date() })
    .where(
      and(
        eq(notifications.userId, userId),
        isNull(notifications.readAt)
      )
    );
}

/**
 * Gets notification preferences for a user.
 */
export async function getNotificationPreferences(userId: string) {
  return db
    .select()
    .from(notificationPreferences)
    .where(eq(notificationPreferences.userId, userId));
}

/**
 * Creates a notification record.
 * Only called from server-side actions or Inngest jobs.
 */
export async function createNotification(input: {
  userId: string;
  type: typeof notifications.$inferInsert["type"];
  payload: Record<string, unknown>;
}) {
  const [notification] = await db
    .insert(notifications)
    .values({
      userId: input.userId,
      type: input.type,
      payload: JSON.stringify(input.payload),
    })
    .returning();
  return notification;
}
