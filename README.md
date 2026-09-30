# Rahmani portfolio (Next.js + Netlify)

Research / engineering / teaching portfolio with a built-in admin board.

## Deploy on Netlify
1. Push this folder to a GitHub repo.
2. Netlify: **Add new site > Import from Git**. Build command `npm run build` (already in `netlify.toml`). No publish directory needed; Netlify detects Next.js.
3. **Site configuration > Environment variables**, add:
   - `ADMIN_PASSWORD` — a long passphrase (required for /admin)
   - `NEXT_PUBLIC_SITE_URL` — `https://aekrahmani.netlify.app` (optional, used for canonical/sitemap)
4. Redeploy. Open `/admin`, sign in, edit, press **Save**.

## Photo and resume
- Easiest: open `/admin`, tab **Photo & resume**, choose a file. The photo is resized in your browser; the resume must be a PDF up to 4.5 MB. Uploads go live immediately.
- Fallback without the admin: put `public/photo.jpg` and the CV PDF in `public/` (the CV file name is set in `data/content.json` under `cv.file`). An uploaded file always takes priority over these.
- Uploading does not work on `npm run dev` (no Netlify storage locally).

## How editing works
- `data/content.json` is the built-in content (papers, courses, stats, experience, CV, contact).
- `/admin` saves edits to Netlify Blobs (automatic on Netlify, no setup). The public page reads them on every request, so changes show immediately.
- **Export JSON** downloads the current content. To make edits permanent in the repo, replace `data/content.json` with it and commit.
- **Reset to built-in** deletes the saved edits and falls back to `data/content.json`.
- Saving does not work on `npm run dev` (no Blobs locally). Everything else does, and Export JSON always works.

## Local run
```
npm install
ADMIN_PASSWORD=yourpass npm run dev
```
