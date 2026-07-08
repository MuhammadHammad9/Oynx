import { pgTable, uuid, varchar, text, boolean, timestamp, pgEnum, unique, index, integer, numeric, bigint, char } from "drizzle-orm/pg-core";

// ==========================================
// 1. ENUM DEFINITIONS
// ==========================================
export const userTypeEnum = pgEnum("user_type", ["client", "internal"]);
export const internalRoleEnum = pgEnum("internal_role", ["account_lead", "delivery_member", "finance_admin", "super_admin"]);
export const orgStatusEnum = pgEnum("org_status", ["active", "suspended"]);
export const ssoProviderEnum = pgEnum("sso_provider", ["none", "google", "microsoft"]);
export const projectStatusEnum = pgEnum("project_status", ["on_track", "at_risk", "delayed", "completed", "archived"]);
export const milestoneStatusEnum = pgEnum("milestone_status", ["pending", "in_progress", "completed", "approved", "rejected"]);
export const fileContextEnum = pgEnum("file_context", ["deliverable", "message_attachment", "avatar", "invoice_pdf"]);
export const invoiceStatusEnum = pgEnum("invoice_status", ["draft", "sent", "due", "paid", "overdue", "void"]);
export const orgMemberRoleEnum = pgEnum("org_member_role", ["owner", "member", "viewer"]);
export const orgMemberStatusEnum = pgEnum("org_member_status", ["pending", "active", "removed"]);
export const assignmentTypeEnum = pgEnum("assignment_type", ["client_member", "client_viewer", "account_lead", "delivery_member"]);
export const notificationTypeEnum = pgEnum("notification_type", [
  "milestone_completed",
  "milestone_approved",
  "milestone_rejected",
  "new_message",
  "new_file",
  "invoice_issued",
  "invoice_paid",
  "invite_accepted",
  "security_alert"
]);
export const digestFrequencyEnum = pgEnum("digest_frequency", ["instant", "daily", "off"]);

// ==========================================
// 2. CORE IDENTITY TABLES
// ==========================================
export const users = pgTable("users", {
  id: uuid("id").primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  name: varchar("name", { length: 160 }).notNull(),
  avatarUrl: text("avatar_url"),
  userType: userTypeEnum("user_type").notNull(),
  internalRole: internalRoleEnum("internal_role"),
  phone: varchar("phone", { length: 20 }),
  emailVerifiedAt: timestamp("email_verified_at", { withTimezone: true }),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date())
}, (table) => [
  index("users_email_idx").on(table.email),
  index("users_user_type_idx").on(table.userType)
]);

export const organizations = pgTable("organizations", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 160 }).notNull(),
  slug: varchar("slug", { length: 160 }).notNull().unique(),
  logoUrl: text("logo_url"),
  status: orgStatusEnum("status").notNull().default("active"),
  ssoProvider: ssoProviderEnum("sso_provider").notNull().default("none"),
  ssoDomain: varchar("sso_domain", { length: 255 }),
  mfaEnforced: boolean("mfa_enforced").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date())
}, (table) => [
  index("organizations_slug_idx").on(table.slug),
  index("organizations_sso_domain_idx").on(table.ssoDomain)
]);

export const organizationMembers = pgTable("organization_members", {
  id: uuid("id").primaryKey().defaultRandom(),
  organizationId: uuid("organization_id").references(() => organizations.id, { onDelete: "cascade" }).notNull(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  role: orgMemberRoleEnum("role").notNull(),
  invitedBy: uuid("invited_by").references(() => users.id, { onDelete: "set null" }),
  status: orgMemberStatusEnum("status").notNull().default("pending"),
  joinedAt: timestamp("joined_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date())
}, (table) => [
  unique("org_member_unique").on(table.organizationId, table.userId),
  index("org_member_role_idx").on(table.organizationId, table.role)
]);

export const projectAssignments = pgTable("project_assignments", {
  id: uuid("id").primaryKey().defaultRandom(),
  projectId: uuid("project_id").references(() => projects.id, { onDelete: "cascade" }).notNull(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  assignmentType: assignmentTypeEnum("assignment_type").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow()
}, (table) => [
  unique("project_assignment_unique").on(table.projectId, table.userId),
  index("project_assignment_user_idx").on(table.userId)
]);

// ==========================================
// 3. PROJECT & DELIVERY TABLES
// ==========================================
export const projects = pgTable("projects", {
  id: uuid("id").primaryKey().defaultRandom(),
  organizationId: uuid("organization_id").references(() => organizations.id, { onDelete: "cascade" }).notNull(),
  name: varchar("name", { length: 200 }).notNull(),
  description: text("description"),
  status: projectStatusEnum("status").notNull().default("on_track"),
  accountLeadId: uuid("account_lead_id").references(() => users.id, { onDelete: "set null" }),
  startDate: timestamp("start_date", { withTimezone: true }),
  targetEndDate: timestamp("target_end_date", { withTimezone: true }),
  actualEndDate: timestamp("actual_end_date", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date())
}, (table) => [
  index("projects_organization_idx").on(table.organizationId),
  index("projects_account_lead_idx").on(table.accountLeadId)
]);

export const milestones = pgTable("milestones", {
  id: uuid("id").primaryKey().defaultRandom(),
  projectId: uuid("project_id").references(() => projects.id, { onDelete: "cascade" }).notNull(),
  organizationId: uuid("organization_id").references(() => organizations.id, { onDelete: "cascade" }).notNull(),
  title: varchar("title", { length: 200 }).notNull(),
  description: text("description"),
  status: milestoneStatusEnum("status").notNull().default("pending"),
  dueDate: timestamp("due_date", { withTimezone: true }),
  completedAt: timestamp("completed_at", { withTimezone: true }),
  completedBy: uuid("completed_by").references(() => users.id, { onDelete: "set null" }),
  approvedAt: timestamp("approved_at", { withTimezone: true }),
  approvedBy: uuid("approved_by").references(() => users.id, { onDelete: "set null" }),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date())
}, (table) => [
  index("milestones_project_sort_idx").on(table.projectId, table.sortOrder)
]);

export const files = pgTable("files", {
  id: uuid("id").primaryKey().defaultRandom(),
  organizationId: uuid("organization_id").references(() => organizations.id, { onDelete: "cascade" }).notNull(),
  projectId: uuid("project_id").references(() => projects.id, { onDelete: "cascade" }),
  milestoneId: uuid("milestone_id").references(() => milestones.id, { onDelete: "set null" }),
  context: fileContextEnum("context").notNull(),
  uploadedBy: uuid("uploaded_by").references(() => users.id, { onDelete: "set null" }),
  fileName: varchar("file_name", { length: 255 }).notNull(),
  storageKey: text("storage_key").notNull(),
  mimeType: varchar("mime_type", { length: 127 }).notNull(),
  sizeBytes: bigint("size_bytes", { mode: "bigint" }).notNull(),
  version: integer("version").notNull().default(1),
  parentFileId: uuid("parent_file_id").references((): any => files.id, { onDelete: "set null" }),
  deletedAt: timestamp("deleted_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow()
}, (table) => [
  index("files_project_context_idx").on(table.projectId, table.context),
  index("files_parent_file_idx").on(table.parentFileId)
]);

// ==========================================
// 4. BILLING TABLES
// ==========================================
export const invoices = pgTable("invoices", {
  id: uuid("id").primaryKey().defaultRandom(),
  organizationId: uuid("organization_id").references(() => organizations.id, { onDelete: "restrict" }).notNull(),
  invoiceNumber: varchar("invoice_number", { length: 40 }).notNull().unique(),
  status: invoiceStatusEnum("status").notNull().default("draft"),
  currency: char("currency", { length: 3 }).notNull().default("USD"),
  amountTotal: integer("amount_total").notNull(),
  issueDate: timestamp("issue_date", { withTimezone: true }).notNull(),
  dueDate: timestamp("due_date", { withTimezone: true }).notNull(),
  paidAt: timestamp("paid_at", { withTimezone: true }),
  pdfFileId: uuid("pdf_file_id").references(() => files.id, { onDelete: "set null" }),
  createdBy: uuid("created_by").references(() => users.id, { onDelete: "set null" }),
  deletedAt: timestamp("deleted_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date())
}, (table) => [
  index("invoices_org_status_idx").on(table.organizationId, table.status)
]);

export const invoiceLineItems = pgTable("invoice_line_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  invoiceId: uuid("invoice_id").references(() => invoices.id, { onDelete: "cascade" }).notNull(),
  projectId: uuid("project_id").references(() => projects.id, { onDelete: "set null" }),
  description: varchar("description", { length: 255 }).notNull(),
  quantity: numeric("quantity", { precision: 10, scale: 2 }).notNull().default("1.00"),
  unitAmount: integer("unit_amount").notNull(),
  amount: integer("amount").notNull()
});

// ==========================================
// 5. MESSAGING TABLES
// ==========================================
export const messageThreads = pgTable("message_threads", {
  id: uuid("id").primaryKey().defaultRandom(),
  projectId: uuid("project_id").references(() => projects.id, { onDelete: "cascade" }).notNull().unique(),
  lastMessageAt: timestamp("last_message_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow()
});

export const messages = pgTable("messages", {
  id: uuid("id").primaryKey().defaultRandom(),
  threadId: uuid("thread_id").references(() => messageThreads.id, { onDelete: "cascade" }).notNull(),
  senderId: uuid("sender_id").references(() => users.id, { onDelete: "set null" }),
  body: text("body").notNull(),
  editedAt: timestamp("edited_at", { withTimezone: true }),
  deletedAt: timestamp("deleted_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow()
}, (table) => [
  index("messages_thread_created_idx").on(table.threadId, table.createdAt)
]);

export const messageAttachments = pgTable("message_attachments", {
  id: uuid("id").primaryKey().defaultRandom(),
  messageId: uuid("message_id").references(() => messages.id, { onDelete: "cascade" }).notNull(),
  fileId: uuid("file_id").references(() => files.id, { onDelete: "cascade" }).notNull()
});

export const threadParticipants = pgTable("thread_participants", {
  id: uuid("id").primaryKey().defaultRandom(),
  threadId: uuid("thread_id").references(() => messageThreads.id, { onDelete: "cascade" }).notNull(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  lastReadMessageId: uuid("last_read_message_id").references(() => messages.id, { onDelete: "set null" }),
  muted: boolean("muted").notNull().default(false)
}, (table) => [
  unique("thread_participant_unique").on(table.threadId, table.userId)
]);

// ==========================================
// 6. NOTIFICATION TABLES
// ==========================================
export const notifications = pgTable("notifications", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  type: notificationTypeEnum("type").notNull(),
  payload: text("payload").notNull().default("{}"), // polymorph payload stored as JSON text
  readAt: timestamp("read_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow()
}, (table) => [
  index("notifications_user_read_idx").on(table.userId, table.readAt)
]);

export const notificationPreferences = pgTable("notification_preferences", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  notificationType: notificationTypeEnum("notification_type").notNull(),
  emailEnabled: boolean("email_enabled").notNull().default(true),
  inAppEnabled: boolean("in_app_enabled").notNull().default(true),
  digestFrequency: digestFrequencyEnum("digest_frequency").notNull().default("daily")
}, (table) => [
  unique("notification_pref_unique").on(table.userId, table.notificationType)
]);

// ==========================================
// 7. INVITATION TABLES
// ==========================================
export const invites = pgTable("invites", {
  id: uuid("id").primaryKey().defaultRandom(),
  organizationId: uuid("organization_id").references(() => organizations.id, { onDelete: "cascade" }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  role: orgMemberRoleEnum("role").notNull(),
  projectIds: uuid("project_ids").array(),
  invitedBy: uuid("invited_by").references(() => users.id, { onDelete: "set null" }),
  tokenHash: varchar("token_hash", { length: 255 }).notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  acceptedAt: timestamp("accepted_at", { withTimezone: true }),
  revokedAt: timestamp("revoked_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow()
}, (table) => [
  index("invites_email_idx").on(table.email),
  index("invites_token_hash_idx").on(table.tokenHash)
]);

// ==========================================
// 8. SECURITY & AUDIT TABLES
// ==========================================
export const auditLogs = pgTable("audit_logs", {
  id: uuid("id").primaryKey().defaultRandom(),
  organizationId: uuid("organization_id").references(() => organizations.id, { onDelete: "set null" }),
  actorId: uuid("actor_id").references(() => users.id, { onDelete: "set null" }),
  action: varchar("action", { length: 100 }).notNull(),
  targetType: varchar("target_type", { length: 50 }),
  targetId: uuid("target_id"),
  metadata: text("metadata").notNull().default("{}"), // metadata stored as stringified JSON
  ipAddress: varchar("ip_address", { length: 45 }), // supports IPv4 & IPv6 sizes
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow()
}, (table) => [
  index("audit_logs_org_created_idx").on(table.organizationId, table.createdAt),
  index("audit_logs_actor_created_idx").on(table.actorId, table.createdAt)
]);
