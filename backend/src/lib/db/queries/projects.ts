import { db } from "../db";
import { projects, milestones, files } from "../schema";
import { and, eq, isNull } from "drizzle-orm";

/**
 * Fetches all projects for a specific organization.
 * Filters out soft-deleted projects if soft-delete is applicable (not currently on projects, but good practice).
 */
export async function getProjectsByOrg(organizationId: string) {
  return db
    .select()
    .from(projects)
    .where(eq(projects.organizationId, organizationId));
}

/**
 * Fetches a single project by ID and organization ID, enforcing isolation.
 */
export async function getProjectById(projectId: string, organizationId: string) {
  const [project] = await db
    .select()
    .from(projects)
    .where(
      and(
        eq(projects.id, projectId),
        eq(projects.organizationId, organizationId)
      )
    )
    .limit(1);
  return project || null;
}

/**
 * Fetches all milestones for a project, enforcing organization scoping.
 */
export async function getMilestones(projectId: string, organizationId: string) {
  return db
    .select()
    .from(milestones)
    .where(
      and(
        eq(milestones.projectId, projectId),
        eq(milestones.organizationId, organizationId)
      )
    )
    .orderBy(milestones.sortOrder);
}

/**
 * Fetches all active (non-deleted) files for a project, enforcing organization scoping.
 */
export async function getProjectFiles(projectId: string, organizationId: string) {
  return db
    .select()
    .from(files)
    .where(
      and(
        eq(files.projectId, projectId),
        eq(files.organizationId, organizationId),
        isNull(files.deletedAt)
      )
    );
}
