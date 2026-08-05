# Smartytel CMS (Payload 3)

Self-hosted Payload instance that owns every piece of copy on smarty.tel:
marketing pages, the home page, pricing, integrations, and header/footer nav.

## Local run

```bash
cd cms
cp .env.example .env      # fill in DATABASE_URI + PAYLOAD_SECRET
npm install
npm run dev               # admin at http://localhost:3000/admin
npm run seed              # loads the current site copy into the CMS
```

The first visit to `/admin` asks you to create the initial editor account.

## VPS deploy (Node 20+, Postgres 14+)

```bash
createdb smartytel_cms
cd /var/www/cms && npm ci && npm run build
NODE_ENV=production npm start       # run under pm2 / systemd behind nginx
```

Point a subdomain (e.g. `cms.smarty.tel`) at port 3000 and terminate TLS in
nginx. Keep `ALLOWED_ORIGINS` in sync with the public site origins.

## How the frontend consumes it

`src/lib/cms.ts` in the main app reads the REST API at `VITE_CMS_URL`:

- `/api/marketing-pages?where[slug][equals]=...` — one page per URL
- `/api/globals/home`, `/api/globals/pricing`, `/api/globals/site-settings`
- `/api/integrations`

If `VITE_CMS_URL` is unset or the CMS is down, the app falls back to the copy
committed in `src/content/pages.ts` — the static build never breaks.

## Rebuild on publish

Set `GITHUB_REPO` and `GITHUB_TOKEN` (Contents: read/write) and every save
dispatches a `cms-publish` event, which the `Build static site` workflow can
listen for via `on: repository_dispatch`.

## Content model

| Type | Slug | Purpose |
| --- | --- | --- |
| Collection | `marketing-pages` | 35 marketing URLs (eyebrow, headline, bullets, proof, SEO) |
| Collection | `integrations` | Logo grid entries (simple-icons slug or uploaded logo) |
| Collection | `media` | Image uploads with alt text |
| Collection | `users` | CMS editors |
| Global | `home` | Hero, features, showcase, stories, built-for, CTA |
| Global | `pricing` | Plans, add-ons, comparison table, FAQ |
| Global | `site-settings` | Brand, header menus, footer columns, coverage regions |
