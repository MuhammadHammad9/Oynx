import { db } from "../db";
import { auditLogs } from "../schema";

interface AuditLogInput {
  organizationId?: string | null;
  actorId?: string | null;
  action: string;
  targetType?: string | null;
  targetId?: string | null;
  metadata?: Record<string, any>;
  ipAddress?: string | null;
  userAgent?: string | null;
}

/**
 * Appends a new audit record to the security log.
 * Enforced inside transactions for mutations.
 */
export async function logAuditEvent(input: AuditLogInput, tx = db) {
  try {
    const [inserted] = await tx
      .insert(auditLogs)
      .values({
        organizationId: input.organizationId || null,
        actorId: input.actorId || null,
        action: input.action,
        targetType: input.targetType || null,
        targetId: input.targetId || null,
        metadata: JSON.stringify(input.metadata || {}),
        ipAddress: input.ipAddress || null,
        userAgent: input.userAgent || null,
      })
      .returning();
    return inserted;
  } catch (error) {
    console.error("Failed to write audit log:", error);
    throw new Error("Audit log persistence failed, reverting transaction.");
  }
}
