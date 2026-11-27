import { Link as RouterLink } from "@tanstack/react-router";
import type { ComponentProps } from "react";
import { useLocale } from "@/i18n/LocaleProvider";
import { localeToPrefix } from "@/i18n/config";
import { publicDestination } from "@/lib/public-access";

type RouterLinkProps = ComponentProps<typeof RouterLink>;

export type LinkProps = Omit<RouterLinkProps, "to" | "params"> & {
  /** Locale-agnostic path such as "/pricing"; the active language prefix is added. */
  to: string;
  params?: Record<string, unknown>;
};

/**
 * Drop-in replacement for TanStack's <Link> that keeps the visitor inside the
 * current language. Every page route lives under the optional "{-$locale}"
 * segment, so English stays on "/pricing" and Spanish becomes "/es/pricing".
 */
export function Link({ to, params, ...rest }: LinkProps) {
  const { locale } = useLocale();
  const destination = publicDestination(to);
  if (destination !== to || /^(?:https?:|mailto:|tel:|#)/i.test(to) || to === "/early-access/") {
    return <a href={destination} {...(rest as object)} />;
  }
  const path = to === "/" ? "" : to;

  return (
    <RouterLink
      // Route ids all start with the optional locale segment.
      to={`/{-$locale}${path}` as never}
      params={{ ...(params ?? {}), locale: localeToPrefix(locale) } as never}
      {...(rest as object)}
    />
  );
}

/**
 * Prefix a plain path with the active language, for places that need a raw
 * href string (mega-menu anchors, buttons) instead of a <Link>.
 */
export function useLocalePath() {
  const { locale } = useLocale();
  const prefix = localeToPrefix(locale);
  return (path: string) => {
    const destination = publicDestination(path);
    if (
      destination !== path ||
      /^(?:https?:|mailto:|tel:|#)/i.test(path) ||
      path === "/early-access/"
    )
      return destination;
    if (!prefix) return path;
    return path === "/" ? `/${prefix}` : `/${prefix}${path}`;
  };
}
