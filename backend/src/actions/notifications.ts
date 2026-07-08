"use server";

import { markAllNotificationsRead as dbMarkAll, markNotificationRead as dbMarkOne } from "@/lib/db/queries/notifications";
import { getSupabaseUser } from "@/lib/supabase/server";

type ActionResponse<T = null> =
  | { data: T; error: null }
  | { data: null; error: { code: string; message: string } };

/**
 * Marks all in-app notifications as read for the authenticated user.
 */
export async function markAllNotificationsRead(): Promise<ActionResponse> {
  const user = await getSupabaseUser();
  if (!user) {
    return { data: null, error: { code: "UNAUTHENTICATED", message: "Not authenticated" } };
  }

  await dbMarkAll(user.id);
  return { data: null, error: null };
}

/**
 * Marks a single notification as read. Ownership enforced in query layer.
 */
export async function markNotificationRead(
  notificationId: string
): Promise<ActionResponse> {
  const user = await getSupabaseUser();
  if (!user) {
    return { data: null, error: { code: "UNAUTHENTICATED", message: "Not authenticated" } };
  }

  await dbMarkOne(notificationId, user.id);
  return { data: null, error: null };
}
