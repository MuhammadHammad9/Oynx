import { db } from "../db/db";
import { organizationMembers, projectAssignments } from "../db/schema";
import { and, eq } from "drizzle-orm";

export type Role = "owner" | "member" | "viewer" | "account_lead" | "delivery_member" | "finance_admin" | "super_admin";

export type Action =
  | "view_timeline"
  | "approve_milestone"
  | "send_message"
  | "view_billing"
  | "manage_team"
  | "manage_settings";

export interface UserContext {
  id: string;
  userType: "client" | "internal";
  internalRole?: "account_lead" | "delivery_member" | "finance_admin" | "super_admin" | null;
}

export interface ResourceContext {
  organizationId: string;
  projectId?: string;
}

/**
 * Enforces Role-Based Access Control (RBAC) rules.
 * Begins with: can(user, action, resource) before queries/mutations/side effects.
 */
export async function can(
  user: UserContext,
  action: Action,
  resource: ResourceContext
): Promise<boolean> {
  // 1. Internal Super Admin bypasses all checks
  if (user.userType === "internal" && user.internalRole === "super_admin") {
    return true;
  }

  // 2. Resolve role contexts
  if (user.userType === "internal") {
    const role = user.internalRole;
    if (!role) return false;

    // Finance Admin check
    if (role === "finance_admin") {
      if (action === "view_billing") return true;
      // Scoped only to financial operations
      return false;
    }

    // Account Lead & Delivery Member checks
    if (role === "account_lead" || role === "delivery_member") {
      if (!resource.projectId) {
        // If checking at organization-level
        return false;
      }
      // Check project assignment
      const [assignment] = await db
        .select()
        .from(projectAssignments)
        .where(
          and(
            eq(projectAssignments.projectId, resource.projectId),
            eq(projectAssignments.userId, user.id)
          )
        )
        .limit(1);

      if (!assignment) return false;

      // Account Leads can perform all project delivery actions
      if (role === "account_lead") {
        return ["view_timeline", "approve_milestone", "send_message"].includes(action);
      }

      // Delivery Members can read and write except approval
      if (role === "delivery_member") {
        return ["view_timeline", "send_message"].includes(action);
      }
    }

    return false;
  }

  // 3. Client user checks
  if (user.userType === "client") {
    // Get member's role in the organization
    const [member] = await db
      .select()
      .from(organizationMembers)
      .where(
        and(
          eq(organizationMembers.organizationId, resource.organizationId),
          eq(organizationMembers.userId, user.id),
          eq(organizationMembers.status, "active")
        )
      )
      .limit(1);

    if (!member) return false;

    // Owner checks
    if (member.role === "owner") {
      // Owners have full access to organization scope
      return true;
    }

    // Project-specific check for Members and Viewers
    if (resource.projectId) {
      const [assignment] = await db
        .select()
        .from(projectAssignments)
        .where(
          and(
            eq(projectAssignments.projectId, resource.projectId),
            eq(projectAssignments.userId, user.id)
          )
        )
        .limit(1);

      if (!assignment) return false;
    }

    // Member actions
    if (member.role === "member") {
      return ["view_timeline", "approve_milestone", "send_message", "view_billing"].includes(action);
    }

    // Viewer actions
    if (member.role === "viewer") {
      return ["view_timeline"].includes(action);
    }
  }

  return false;
}
