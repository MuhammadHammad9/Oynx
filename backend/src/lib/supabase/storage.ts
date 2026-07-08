"use server";

import { createClient } from "@supabase/supabase-js";
import { getRequiredEnv } from "../env";

const supabase = createClient(
  getRequiredEnv("NEXT_PUBLIC_SUPABASE_URL"),
  getRequiredEnv("SUPABASE_SERVICE_ROLE_KEY"),
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  }
);

const STORAGE_BUCKET = "uploads";

export async function uploadToStorage(
  key: string,
  body: Buffer | Uint8Array,
  contentType: string
) {
  const { error } = await supabase.storage.from(STORAGE_BUCKET).upload(key, body, {
    contentType,
    upsert: true,
  });
  if (error) throw error;
}

export async function getSignedDownloadUrl(key: string, expiresIn = 3600) {
  const { data, error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .createSignedUrl(key, expiresIn);

  if (error) throw error;
  return data.signedUrl;
}
