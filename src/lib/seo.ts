export const SITE_URL = "https://smarty.tel";

/**
 * Build a self-referencing canonical URL for a route.
 * English lives at the root; other locales are prefixed (e.g. /es/pricing).
 */
export function canonicalUrl(path: string, locale?: string): string {
  const clean = path === "/" ? "" : path.replace(/\/+$/, "");
  const prefix = locale && locale !== "en" ? `/${locale}` : "";
  return `${SITE_URL}${prefix}${clean}` || `${SITE_URL}/`;
}
