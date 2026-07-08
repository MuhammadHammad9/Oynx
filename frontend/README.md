# Frontend Deployment

This folder is the deploy target for Vercel.

What is included:
- Public marketing pages
- Shared UI components used by the marketing site
- Static assets in `public/`

What is intentionally left out:
- Database layer
- Supabase server helpers
- Server actions
- Background jobs and backend-only logic

Run locally:

```bash
npm install
npm run dev
```

Required env vars for the marketing site should be kept minimal. Start from `.env.example` and only add values the frontend actually uses.
