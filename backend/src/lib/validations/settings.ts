import { z } from "zod";

export const UpdateProfileSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  phone: z.string().max(20, "Phone number is too long").optional().nullable(),
  avatarUrl: z.string().url("Invalid avatar URL").max(2048).optional().nullable(),
});

export type UpdateProfileInput = z.infer<typeof UpdateProfileSchema>;

export const MfaEnrollSchema = z.object({});

export const MfaVerifySchema = z.object({
  code: z.string().min(6, "Code must be at least 6 digits").max(6, "Code must be 6 digits"),
});

export const MfaReauthSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type MfaVerifyInput = z.infer<typeof MfaVerifySchema>;
export type MfaReauthInput = z.infer<typeof MfaReauthSchema>;

export const RevokeSessionSchema = z.object({
  sessionId: z.string().min(1, "Session ID is required"),
});

export type RevokeSessionInput = z.infer<typeof RevokeSessionSchema>;
