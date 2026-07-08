-- Supabase RLS policies for the Onyx app.
-- Assumes `users.id` matches `auth.uid()` and that application access is
-- primarily scoped through organization membership / project assignment.

-- ============================================================================
-- Core identity / profile tables
-- ============================================================================
alter table public.users enable row level security;
drop policy if exists "users_select_own" on public.users;
create policy "users_select_own"
on public.users
for select
using (id = auth.uid());

drop policy if exists "users_update_own" on public.users;
create policy "users_update_own"
on public.users
for update
using (id = auth.uid())
with check (id = auth.uid());

-- ============================================================================
-- Organization access
-- ============================================================================
alter table public.organization_members enable row level security;
drop policy if exists "org_members_select_self_org" on public.organization_members;
create policy "org_members_select_self_org"
on public.organization_members
for select
using (
  user_id = auth.uid()
  or exists (
    select 1
    from public.organization_members om
    where om.organization_id = organization_members.organization_id
      and om.user_id = auth.uid()
      and om.status = 'active'
  )
);

alter table public.projects enable row level security;
drop policy if exists "projects_select_org_members" on public.projects;
create policy "projects_select_org_members"
on public.projects
for select
using (
  exists (
    select 1
    from public.organization_members om
    where om.organization_id = projects.organization_id
      and om.user_id = auth.uid()
      and om.status = 'active'
  )
);

alter table public.milestones enable row level security;
drop policy if exists "milestones_select_org_members" on public.milestones;
create policy "milestones_select_org_members"
on public.milestones
for select
using (
  exists (
    select 1
    from public.organization_members om
    where om.organization_id = milestones.organization_id
      and om.user_id = auth.uid()
      and om.status = 'active'
  )
);

alter table public.invoices enable row level security;
drop policy if exists "invoices_select_org_members" on public.invoices;
create policy "invoices_select_org_members"
on public.invoices
for select
using (
  exists (
    select 1
    from public.organization_members om
    where om.organization_id = invoices.organization_id
      and om.user_id = auth.uid()
      and om.status = 'active'
  )
);

alter table public.files enable row level security;
drop policy if exists "files_select_org_members" on public.files;
create policy "files_select_org_members"
on public.files
for select
using (
  exists (
    select 1
    from public.organization_members om
    where om.organization_id = files.organization_id
      and om.user_id = auth.uid()
      and om.status = 'active'
  )
);

alter table public.message_threads enable row level security;
drop policy if exists "threads_select_project_members" on public.message_threads;
create policy "threads_select_project_members"
on public.message_threads
for select
using (
  exists (
    select 1
    from public.organization_members om
    join public.projects p on p.organization_id = om.organization_id
    where p.id = message_threads.project_id
      and om.user_id = auth.uid()
      and om.status = 'active'
  )
);

alter table public.messages enable row level security;
drop policy if exists "messages_select_thread_participants" on public.messages;
create policy "messages_select_thread_participants"
on public.messages
for select
using (
  exists (
    select 1
    from public.thread_participants tp
    where tp.thread_id = messages.thread_id
      and tp.user_id = auth.uid()
  )
);

alter table public.message_attachments enable row level security;
drop policy if exists "attachments_select_thread_participants" on public.message_attachments;
create policy "attachments_select_thread_participants"
on public.message_attachments
for select
using (
  exists (
    select 1
    from public.messages m
    join public.thread_participants tp on tp.thread_id = m.thread_id
    where m.id = message_attachments.message_id
      and tp.user_id = auth.uid()
  )
);

alter table public.thread_participants enable row level security;
drop policy if exists "thread_participants_select_self" on public.thread_participants;
create policy "thread_participants_select_self"
on public.thread_participants
for select
using (user_id = auth.uid());

alter table public.notifications enable row level security;
drop policy if exists "notifications_select_self" on public.notifications;
create policy "notifications_select_self"
on public.notifications
for select
using (user_id = auth.uid());

alter table public.notification_preferences enable row level security;
drop policy if exists "notification_preferences_select_self" on public.notification_preferences;
create policy "notification_preferences_select_self"
on public.notification_preferences
for select
using (user_id = auth.uid());

alter table public.invites enable row level security;
drop policy if exists "invites_select_org_members" on public.invites;
create policy "invites_select_org_members"
on public.invites
for select
using (
  exists (
    select 1
    from public.organization_members om
    where om.organization_id = invites.organization_id
      and om.user_id = auth.uid()
      and om.status = 'active'
  )
);

alter table public.audit_logs enable row level security;
drop policy if exists "audit_logs_select_org_members" on public.audit_logs;
create policy "audit_logs_select_org_members"
on public.audit_logs
for select
using (
  exists (
    select 1
    from public.organization_members om
    where om.organization_id = audit_logs.organization_id
      and om.user_id = auth.uid()
      and om.status = 'active'
  )
);

-- ============================================================================
-- Storage bucket: uploads
-- ============================================================================
insert into storage.buckets (id, name, public)
values ('uploads', 'uploads', false)
on conflict (id) do update set public = excluded.public;

create policy "uploads_select_own"
on storage.objects
for select
using (
  bucket_id = 'uploads'
  and split_part(name, '/', 1) = auth.uid()::text
);

create policy "uploads_insert_own"
on storage.objects
for insert
with check (
  bucket_id = 'uploads'
  and split_part(name, '/', 1) = auth.uid()::text
);

create policy "uploads_update_own"
on storage.objects
for update
using (
  bucket_id = 'uploads'
  and split_part(name, '/', 1) = auth.uid()::text
)
with check (
  bucket_id = 'uploads'
  and split_part(name, '/', 1) = auth.uid()::text
);

create policy "uploads_delete_own"
on storage.objects
for delete
using (
  bucket_id = 'uploads'
  and split_part(name, '/', 1) = auth.uid()::text
);
