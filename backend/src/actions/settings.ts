"use server";

import { db } from "@/lib/db/db";
import { auditLogs, users } from "@/lib/db/schema";
import { UpdateProfileSchema } from "@/lib/validations/settings";
import { eq } from "drizzle-orm";
import { getAuthedAppUser, getSupabaseServerClient } from "@/lib/supabase/server";

type ActionResponse<T = null> =
  | { data: T; error: null }
  | { data: null; error: { code: string; message: string } };

export async function updateProfile(
  rawInput: unknown
): Promise<ActionResponse<{ success: boolean }>> {
  const parsed = UpdateProfileSchema.safeParse(rawInput);
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

  try {
    const supabase = await getSupabaseServerClient();
    await supabase.auth.updateUser({
      data: {
        full_name: parsed.data.name,
        avatar_url: parsed.data.avatarUrl || null,
        phone: parsed.data.phone || null,
      },
    });

    await db.transaction(async (tx) => {
      await tx
        .update(users)
        .set({
          name: parsed.data.name,
          phone: parsed.data.phone,
          avatarUrl: parsed.data.avatarUrl,
        })
        .where(eq(users.id, user.id));

      await tx.insert(auditLogs).values({
        organizationId: null,
        actorId: user.id,
        action: "user.update_profile",
        targetType: "user",
        targetId: user.id,
        metadata: JSON.stringify({
          updatedFields: Object.keys(parsed.data),
        }),
      });
    });

    return { data: { success: true }, error: null };
  } catch (err) {
    console.error("[updateProfile] error:", err);
    return { data: null, error: { code: "DB_ERROR", message: "Failed to update profile details" } };
  }
}

function unsupported<T = null>(message: string): ActionResponse<T> {
  return { data: null, error: { code: "UNSUPPORTED", message } } as ActionResponse<T>;
}

export async function enrollMfa(
  _rawInput?: unknown
): Promise<ActionResponse<{ qrCode: string; secret: string }>> {
  void _rawInput;
  return unsupported("Supabase Auth handles email/password authentication in this app. MFA flows have been removed from the legacy settings panel.");
}

export async function confirmMfaEnroll(_rawInput?: unknown): Promise<ActionResponse<{ success: boolean }>> {
  void _rawInput;
  return unsupported("Supabase Auth MFA setup is not wired into this portal yet.");
}

export async function disableMfa(_rawInput?: unknown): Promise<ActionResponse<{ success: boolean }>> {
  void _rawInput;
  return unsupported("Supabase Auth MFA setup is not wired into this portal yet.");
}

export async function listActiveSessions(): Promise<ActionResponse<any[]>> {
  return unsupported("Supabase session listing is not exposed in this portal yet.");
}

export async function revokeSession(_rawInput?: unknown): Promise<ActionResponse<{ success: boolean }>> {
  void _rawInput;
  return unsupported("Supabase session revocation is not exposed in this portal yet.");
}
