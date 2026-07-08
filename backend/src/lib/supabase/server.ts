"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { SupabaseClient, User } from "@supabase/supabase-js";
import { getRequiredEnv } from "../env";
import { db } from "../db/db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";

async function createClient(): Promise<SupabaseClient> {
  const cookieStore = await cookies();

  return createServerClient(
    getRequiredEnv("NEXT_PUBLIC_SUPABASE_URL"),
    getRequiredEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Server Actions can read cookies, but some call sites cannot write.
          }
        },
      },
    }
  );
}

export function getSupabaseServerClient() {
  return createClient();
}

export async function getSupabaseUser(): Promise<User | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return null;
  return data.user;
}

export async function getAuthedAppUser() {
  const user = await getSupabaseUser();
  if (!user) return null;

  const email = user.email ?? "";
  const displayName =
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    email.split("@")[0] ||
    "User";
  const avatarUrl = user.user_metadata?.avatar_url ?? null;
  const emailVerifiedAt = user.email_confirmed_at ? new Date(user.email_confirmed_at) : null;

  const [existing] = await db
    .select()
    .from(users)
    .where(eq(users.id, user.id))
    .limit(1);

  if (!existing) {
    await db.insert(users).values({
      id: user.id,
      email,
      name: displayName,
      avatarUrl,
      userType: "client",
      internalRole: null,
      emailVerifiedAt,
      isActive: true,
    });
  } else {
    await db
      .update(users)
      .set({
        email,
        name: displayName,
        avatarUrl,
        emailVerifiedAt,
      })
      .where(eq(users.id, user.id));
  }

  return user;
}
