import type { MarketingContent } from "@/components/MarketingPage";
import { pages as fallbackPages } from "@/content/pages";

/**
 * Content layer for the Payload CMS.
 *
 * Everything degrades gracefully: if VITE_CMS_URL is unset or the CMS is
 * unreachable, the hardcoded copy in src/content/pages.ts is used, so the site
 * always builds and always renders.
 */
const CMS_URL = import.meta.env['VITE_CMS_URL'] as string | undefined;

type PayloadDoc = {
  slug: string;
  eyebrow: string;
  headline: string;
  sub: string;
  bullets: { title: string; body: string }[];
  proof?: { value: string }[] | null;
  metaTitle: string;
  metaDescription: string;
};

function toMarketingContent(doc: PayloadDoc): MarketingContent {
  return {
    eyebrow: doc.eyebrow,
    headline: doc.headline,
    sub: doc.sub,
    bullets: doc.bullets?.map(({ title, body }) => ({ title, body })) ?? [],
    proof: doc.proof?.map((item) => item.value) ?? [],
    metaTitle: doc.metaTitle,
    metaDescription: doc.metaDescription,
  } as MarketingContent;
}

async function cmsFetch<T>(path: string): Promise<T | null> {
  if (!CMS_URL) return null;
  try {
    const response = await fetch(`${CMS_URL.replace(/\/$/, "")}/api${path}`, {
      headers: { Accept: "application/json" },
    });
    if (!response.ok) {
      console.warn(`CMS request failed [${response.status}] for ${path}`);
      return null;
    }
    return (await response.json()) as T;
  } catch (error) {
    console.warn(`CMS request errored for ${path}`, error);
    return null;
  }
}

/** Fetch one marketing page, falling back to the bundled copy. */
export async function fetchMarketingPage(slug: string): Promise<MarketingContent | null> {
  const result = await cmsFetch<{ docs: PayloadDoc[] }>(
    `/marketing-pages?where[slug][equals]=${encodeURIComponent(slug)}&limit=1&depth=1`,
  );
  const doc = result?.docs?.[0];
  return doc ? toMarketingContent(doc) : (fallbackPages[slug] ?? null);
}

export type CmsIntegration = { name: string; iconSlug?: string | null };

/** Fetch the integrations grid; returns null so callers keep their own list. */
export async function fetchIntegrations(): Promise<CmsIntegration[] | null> {
  const result = await cmsFetch<{ docs: CmsIntegration[] }>(
    `/integrations?limit=100&sort=order&depth=1`,
  );
  return result?.docs?.length ? result.docs : null;
}

/** Fetch a Payload global (home, pricing, site-settings). */
export async function fetchGlobal<T>(slug: "home" | "pricing" | "site-settings"): Promise<T | null> {
  return cmsFetch<T>(`/globals/${slug}?depth=2`);
}

export const cmsEnabled = Boolean(CMS_URL);
