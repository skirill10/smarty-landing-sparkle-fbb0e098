# Make Smartytel content editable in Payload CMS

Yes — this is possible. The site becomes a Payload-backed frontend: all copy, logos, pricing and page content live in a self-hosted Payload admin, get baked into the static export at build time, and refresh client-side after load so edits appear without waiting for a rebuild.

## How it will work

```text
Payload CMS (self-hosted, Postgres)   -->  REST/GraphQL read API
        |                                        |
   admin edits copy                     build time: baked into static HTML (SEO)
        |                                        |
   "Publish" webhook  -->  GitHub Action rebuild + runtime refetch on page load
```

## Part 1 — Payload instance (self-hosted)

A separate Payload 3 app (Next.js-based, Node + Postgres) in a `cms/` folder of this repo, deployed on your own host (Hostinger VPS with Node + Postgres, or any VPS/Payload Cloud). Included:

- `docker-compose.yml` (Payload + Postgres) and a `.env.example` for `DATABASE_URI`, `PAYLOAD_SECRET`, `CORS`/`CSRF` origins.
- Step-by-step deploy notes in `cms/README.md`: install, run migrations, create the first admin user, point `cms.smarty.tel` at it, enable HTTPS.
- Read access is public for published documents; drafts require auth.

## Part 2 — Content model (everything editable)

Globals (single documents):
- **Site settings** — logo, brand name, nav mega-menus, footer columns, social links, coverage regions.
- **Home page** — hero, feature cards (title/body/icon/image), showcase bento, stories slider entries, "Built for" industry tiles with images, integrations section, CTA band.
- **Pricing** — plans (name, price monthly/annual, badge, features), add-on modules, comparison table rows, FAQ items.

Collections (many documents):
- **Marketing pages** — slug, eyebrow, headline, sub, bullets, meta title/description. Replaces `src/content/pages.ts` (existing content seeded in, so nothing is lost).
- **Integrations** — name, brand icon slug or uploaded logo, category, order. Drives the "Plays nicely with the tools you already run on" grid.
- **Media** — uploads for all imagery, so images can be swapped without code.

## Part 3 — Frontend wiring

- `src/lib/cms.ts` — typed fetch layer against the Payload REST API with a `PAYLOAD_URL` env var, generated TypeScript types, and a fallback to the current hardcoded content if the CMS is unreachable (the build never breaks).
- Build time: route `loader`s pull content so it is prerendered into the static HTML — full SEO parity with today.
- Runtime refresh: the same content is refetched on mount via TanStack Query; if the CMS has newer copy the page updates in place.
- Sections refactored to render from CMS data instead of literals: `IntegrationsSection`, `BuiltForSection`, `CtaBand`, `SiteHeader`, `SiteFooter`, `MarketingPage`, home and pricing routes.
- Marketing routes keep one file per URL (required for static export) but read their content from the CMS by slug, with a build-time check that flags a slug present in the CMS but missing a route file.

## Part 4 — Publishing loop

- Payload `afterChange` hook calls a GitHub `repository_dispatch`, so hitting Publish triggers the existing "Build static site" workflow and the deploy branch updates automatically.
- Requires a GitHub token stored in the Payload environment (you create it; I'll document the exact scopes).

## Suggested order

1. Payload app + content model + seed from existing content.
2. Frontend fetch layer with fallback; migrate marketing pages first (biggest win, lowest risk).
3. Migrate home, pricing, header/footer sections.
4. Publish webhook + rebuild automation, then smoke test.

## What I need from you

- Where the CMS will be hosted (VPS with root/SSH, or Payload Cloud) so the deploy notes match.
- Confirmation that Postgres is available on that host (otherwise I'll target MongoDB).

## Trade-offs

- Runtime refresh means each page makes one API call to the CMS after load; if the CMS is down the baked-in build content still renders.
- The static export can only prerender routes that exist as files, so adding a brand-new page in the CMS still needs a one-line route file (I'll document the pattern).
