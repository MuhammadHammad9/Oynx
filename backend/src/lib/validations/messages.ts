import { z } from "zod";

/**
 * Validation schema for sending a message.
 * Used on both client (React Hook Form) and server (Server Action input guard).
 */
export const SendMessageSchema = z.object({
  projectId: z.string().uuid("Invalid project ID"),
  body: z
    .string()
    .min(1, "Message cannot be empty")
    .max(4000, "Message is too long (max 4000 characters)"),
  attachmentFileIds: z.array(z.string().uuid()).max(10).optional().default([]),
});

export type SendMessageInput = z.infer<typeof SendMessageSchema>;

/**
 * Schema for marking a thread as read.
 */
export const MarkThreadReadSchema = z.object({
  threadId: z.string().uuid("Invalid thread ID"),
  lastMessageId: z.string().uuid("Invalid message ID"),
});

export type MarkThreadReadInput = z.infer<typeof MarkThreadReadSchema>;
