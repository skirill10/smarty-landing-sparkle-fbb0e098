import type { CurrencyCode } from "../types";
import { isCurrencyCode } from "./format";

const STORAGE_KEY = "smartytel:rates-currency";

/** Country (ISO-3166 alpha-2) → currency we quote in, limited to supported codes. */
const COUNTRY_CURRENCY: Record<string, CurrencyCode> = {
  US: "USD",
  PR: "USD",
  EC: "USD",
  SV: "USD",
  PA: "USD",
  GB: "GBP",
  IM: "GBP",
  JE: "GBP",
  GG: "GBP",
  CA: "CAD",
  AU: "AUD",
  NZ: "AUD",
  CH: "CHF",
  LI: "CHF",
  PL: "PLN",
  SE: "SEK",
  NO: "NOK",
  DK: "DKK",
  GL: "DKK",
  FO: "DKK",
  CZ: "CZK",
  RO: "RON",
  MD: "RON",
  AE: "AED",
  SA: "AED",
  QA: "AED",
  KW: "AED",
  BH: "AED",
  OM: "AED",
  IN: "INR",
  LK: "INR",
  NP: "INR",
  // Euro area and the rest of Europe default to EUR
  AT: "EUR",
  BE: "EUR",
  CY: "EUR",
  DE: "EUR",
  EE: "EUR",
  ES: "EUR",
  FI: "EUR",
  FR: "EUR",
  GR: "EUR",
  HR: "EUR",
  IE: "EUR",
  IT: "EUR",
  LT: "EUR",
  LU: "EUR",
  LV: "EUR",
  MT: "EUR",
  NL: "EUR",
  PT: "EUR",
  SI: "EUR",
  SK: "EUR",
};

/** Coarse timezone → country fallback for browsers with a generic locale. */
const TIMEZONE_COUNTRY: Record<string, string> = {
  "America/New_York": "US",
  "America/Chicago": "US",
  "America/Denver": "US",
  "America/Los_Angeles": "US",
  "America/Phoenix": "US",
  "America/Anchorage": "US",
  "America/Toronto": "CA",
  "America/Vancouver": "CA",
  "America/Edmonton": "CA",
  "America/Winnipeg": "CA",
  "America/Halifax": "CA",
  "Europe/London": "GB",
  "Europe/Dublin": "IE",
  "Europe/Zurich": "CH",
  "Europe/Warsaw": "PL",
  "Europe/Stockholm": "SE",
  "Europe/Oslo": "NO",
  "Europe/Copenhagen": "DK",
  "Europe/Prague": "CZ",
  "Europe/Bucharest": "RO",
  "Europe/Berlin": "DE",
  "Europe/Paris": "FR",
  "Europe/Madrid": "ES",
  "Europe/Rome": "IT",
  "Europe/Amsterdam": "NL",
  "Europe/Brussels": "BE",
  "Europe/Vienna": "AT",
  "Europe/Lisbon": "PT",
  "Europe/Helsinki": "FI",
  "Australia/Sydney": "AU",
  "Australia/Melbourne": "AU",
  "Australia/Perth": "AU",
  "Pacific/Auckland": "NZ",
  "Asia/Dubai": "AE",
  "Asia/Riyadh": "SA",
  "Asia/Qatar": "QA",
  "Asia/Kolkata": "IN",
  "Asia/Calcutta": "IN",
  "Asia/Colombo": "LK",
};

function regionFromLocale(locale: string): string | null {
  // "en-GB" / "de-DE" / "en-Latn-US"
  const parts = locale.split("-");
  const region = parts.find((part) => /^[A-Z]{2}$/.test(part));
  return region ?? null;
}

/** Best-effort country code for the visitor, from locale then timezone. */
export function detectCountryCode(): string | null {
  if (typeof navigator === "undefined") return null;

  const locales = [
    ...(navigator.languages ?? []),
    navigator.language,
    Intl.DateTimeFormat().resolvedOptions().locale,
  ].filter(Boolean) as string[];

  for (const locale of locales) {
    const region = regionFromLocale(locale);
    if (region && COUNTRY_CURRENCY[region]) return region;
  }

  try {
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const fromZone = zone ? TIMEZONE_COUNTRY[zone] : undefined;
    if (fromZone) return fromZone;
  } catch {
    // Intl unavailable — fall through to null.
  }

  return null;
}

/**
 * Currency to quote by default: an explicit past choice wins, otherwise the
 * visitor's location, otherwise EUR. Never throws and is safe to call during
 * hydration effects only (reads navigator/localStorage).
 */
export function detectCurrency(): {
  currency: CurrencyCode;
  source: "saved" | "location" | "default";
} {
  const saved = readSavedCurrency();
  if (saved) return { currency: saved, source: "saved" };

  const country = detectCountryCode();
  const fromCountry = country ? COUNTRY_CURRENCY[country] : undefined;
  if (fromCountry) return { currency: fromCountry, source: "location" };

  return { currency: "EUR", source: "default" };
}

export function readSavedCurrency(): CurrencyCode | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value && isCurrencyCode(value) ? value : null;
  } catch {
    return null;
  }
}

export function saveCurrency(currency: CurrencyCode): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, currency);
  } catch {
    // Storage blocked — detection simply runs again next visit.
  }
}
