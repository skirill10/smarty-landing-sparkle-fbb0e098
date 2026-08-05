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
- `/api/globals/rates-page`, `/api/globals/crm-page`, `/api/globals/llm-info-page`
- `/api/integrations`, `/api/countries`, `/api/rates`, `/api/faqs`

International rates use their own switch, so they can move to Payload
independently of the rest of the copy:

```bash
# main app .env
VITE_CMS_URL=https://cms.smarty.tel          # copy overlays (header, footer, pages)
VITE_CONTENT_SOURCE=payload                  # "local" (default) or "payload"
VITE_PAYLOAD_API_URL=https://cms.smarty.tel  # rates repository endpoint
```

Countries are keyed by `slug` (e.g. `germany`) and every rate references that
slug in `countryId`, which is exactly how the bundled mock data is keyed — so
flipping `VITE_CONTENT_SOURCE` needs no data migration, and any unreachable
endpoint silently falls back to the bundled dataset.

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
| Global | `site-settings` | Brand, header menus, footer columns, coverage regions, socials, announcement bar, Hey AI section |
| Collection | `countries` | Rate destinations (slug, ISO codes, dial code, region, SEO) |
| Collection | `rates` | Landline / mobile / SMS prices per country slug |
| Collection | `faqs` | Rates FAQs, global or per country slug |
| Global | `rates-page` | /rates hero, disclaimer, FAQ heading and CTA |
| Global | `crm-page` | /crm hero and feature card copy |
| Global | `llm-info-page` | /llm-info hero, fact sheet and Q&A |
