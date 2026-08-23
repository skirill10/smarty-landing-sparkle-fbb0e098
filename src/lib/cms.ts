import { queryOptions } from "@tanstack/react-query";
import type { MarketingContent } from "@/components/MarketingPage";
import { pages as fallbackPages } from "@/content/pages";

/**
 * Content layer for the Payload CMS.
 *
 * Everything degrades gracefully: if VITE_CMS_URL is unset or the CMS is
 * unreachable, the hardcoded copy in src/content/pages.ts is used, so the site
 * always builds and always renders.
 */
const CMS_URL = import.meta.env["VITE_CMS_URL"] as string | undefined;

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
export type CmsGlobalSlug =
  | "home"
  | "pricing"
  | "site-settings"
  | "rates-page"
  | "crm-page"
  | "contact-page"
  | "llm-info-page";

export async function fetchGlobal<T>(slug: CmsGlobalSlug): Promise<T | null> {
  return cmsFetch<T>(`/globals/${slug}?depth=2`);
}

/** Fetch one document of a collection by its `slug` field. */
export async function fetchCollectionDoc<T>(
  collection: "legal-documents" | "marketing-pages" | "articles",
  slug: string,
): Promise<T | null> {
  const result = await cmsFetch<{ docs: T[] }>(
    `/${collection}?where[slug][equals]=${encodeURIComponent(slug)}&limit=1&depth=2`,
  );
  return result?.docs?.[0] ?? null;
}

export type CmsArticle = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  author?: string;
  publishedDate?: string;
  coverImage?: { url?: string; alt?: string } | null;
  body?: unknown;
  metaTitle?: string;
  metaDescription?: string;
};

/** Fetch published articles for the /blog list, newest first. */
export async function fetchArticles(): Promise<CmsArticle[] | null> {
  const result = await cmsFetch<{ docs: CmsArticle[] }>(
    `/articles?where[status][equals]=published&sort=-publishedDate&limit=50&depth=1`,
  );
  return result?.docs ?? null;
}

/** Fetch one published article by slug. */
export async function fetchArticle(slug: string): Promise<CmsArticle | null> {
  const result = await cmsFetch<{ docs: CmsArticle[] }>(
    `/articles?where[slug][equals]=${encodeURIComponent(slug)}&where[status][equals]=published&limit=1&depth=1`,
  );
  return result?.docs?.[0] ?? null;
}

/** Query definitions for articles, shared by loaders and components. */
export const articlesQueries = {
  list: () =>
    queryOptions({
      queryKey: ["cms-articles", "list"],
      queryFn: fetchArticles,
      enabled: cmsEnabled,
      staleTime: 60_000,
    }),
  detail: (slug: string) =>
    queryOptions({
      queryKey: ["cms-articles", "detail", slug],
      queryFn: () => fetchArticle(slug),
      enabled: cmsEnabled,
      staleTime: 60_000,
    }),
};

export type CmsFormType = "contact" | "demo";

/** Fetch a @payloadcms/plugin-form-builder form by its semantic `formType`. */
export async function fetchForm<T>(formType: CmsFormType): Promise<T | null> {
  const result = await cmsFetch<{ docs: T[] }>(
    `/forms?where[formType][equals]=${encodeURIComponent(formType)}&limit=1&depth=0`,
  );
  return result?.docs?.[0] ?? null;
}

/** Submit a form-builder submission. Returns true on success. */
export async function submitForm(
  formId: string,
  submissionData: { field: string; value: unknown }[],
): Promise<boolean> {
  if (!CMS_URL) return false;
  try {
    const response = await fetch(`${CMS_URL.replace(/\/$/, "")}/api/form-submissions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ form: formId, submissionData }),
    });
    return response.ok;
  } catch (error) {
    console.warn("Form submission errored", error);
    return false;
  }
}

export const cmsEnabled = Boolean(CMS_URL);
