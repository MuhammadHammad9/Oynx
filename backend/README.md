# Backend Deployment

This folder is the deploy target for Render.

What is included:
- Server actions
- Supabase auth/storage helpers
- Database layer and queries
- Inngest routes and functions
- RBAC, rate limiting, validation, and PDF generation logic
- The full app source so the backend can be deployed as a standalone Next.js service

Run locally:

```bash
npm install
npm run dev
```

Important env vars:
- `DATABASE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`
- `RESEND_API_KEY`
- `NEXT_PUBLIC_APP_URL`

This copy keeps the server-heavy parts together so the backend can own auth, storage, jobs, and database writes.
