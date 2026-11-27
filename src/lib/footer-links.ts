import { publicDestination } from "./public-access";

type FooterLink = { label: string; to?: string };
type CmsFooterLink = { label?: string; to?: string };

function destinationKey(to: string): string {
  const url = new URL(publicDestination(to), "https://smarty.tel");
  return `${url.origin}${url.pathname.replace(/\/$/, "")}${url.search}${url.hash}`;
}

/** Merge complete link records by destination, never by their position. */
export function mergeFooterLinks(
  fallback: FooterLink[],
  cms?: CmsFooterLink[] | null,
): FooterLink[] {
  const valid = (cms ?? []).filter((link): link is { label: string; to: string } =>
    Boolean(link.label?.trim() && link.to?.trim() && /^(\/[^/]|https?:\/\/)/.test(link.to)),
  );
  const seen = new Set<string>();
  return [
    ...fallback.map((link) => {
      const match =
        link.to && valid.find((doc) => destinationKey(doc.to) === destinationKey(link.to!));
      return match ? { label: match.label.trim(), to: match.to.trim() } : link;
    }),
    ...valid,
  ].filter((link) => {
    const key = link.to ? destinationKey(link.to) : link.label;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/** These exact advertised profiles returned a confirmed not-found page. */
export function isAvailableSocialDestination(href: string): boolean {
  try {
    const url = new URL(href);
    const host = url.hostname.replace(/^www\./, "");
    const path = url.pathname.replace(/\/$/, "").toLowerCase();
    return !(
      (host === "x.com" && path === "/smartytel") ||
      (host === "youtube.com" && path === "/@smartytel")
    );
  } catch {
    return false;
  }
}
