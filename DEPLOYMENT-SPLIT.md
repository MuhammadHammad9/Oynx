# Deployment Split

The repo now contains two deployable folders:

- `frontend/` for Vercel
- `backend/` for Render

Design intent:
- Frontend = public marketing site and shared UI
- Backend = auth, Supabase, database, storage, jobs, and other server-side logic

Notes:
- The original root project is still intact.
- Nothing was deleted.
- The backend copy keeps the full app structure so it can be deployed independently without breaking server-side imports.

Vercel setup:
- Create the website project from `frontend/`
- Do not use the repo root as the Vercel root for the website
- Leave `backend/` for a separate backend deployment only
- If you see `404: NOT_FOUND` on the Vercel domain, double-check that the project root is `frontend/` and that you are using the current production deployment URL

If you want the next step, I can also convert the frontend app to call the backend over HTTP instead of relying on server actions, which is the cleaner long-term production setup.
