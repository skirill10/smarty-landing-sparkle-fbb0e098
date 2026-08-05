import type { CurrencyCode, Rate } from "../types";

/**
 * Mock FX table. Base currency of the dataset is EUR; when Payload supplies
 * rates per currency this helper becomes a pass-through.
 */
const FX: Record<CurrencyCode, number> = {
  EUR: 1,
  USD: 1.09,
  GBP: 0.85,
  CHF: 0.94,
  CAD: 1.48,
  AUD: 1.66,
  PLN: 4.31,
  SEK: 11.4,
  NOK: 11.6,
  DKK: 7.46,
  CZK: 25.1,
  RON: 4.97,
  AED: 4.0,
  INR: 91.5,
};

type CurrencyMeta = { code: CurrencyCode; symbol: string; label: string };

/** Display order groups the most-used currencies first. */
export const CURRENCY_LIST: CurrencyMeta[] = [
  { code: "EUR", symbol: "€", label: "Euro" },
  { code: "USD", symbol: "$", label: "US dollar" },
  { code: "GBP", symbol: "£", label: "British pound" },
  { code: "CHF", symbol: "CHF ", label: "Swiss franc" },
  { code: "CAD", symbol: "C$", label: "Canadian dollar" },
  { code: "AUD", symbol: "A$", label: "Australian dollar" },
  { code: "PLN", symbol: "zł ", label: "Polish złoty" },
  { code: "SEK", symbol: "kr ", label: "Swedish krona" },
  { code: "NOK", symbol: "kr ", label: "Norwegian krone" },
  { code: "DKK", symbol: "kr ", label: "Danish krone" },
  { code: "CZK", symbol: "Kč ", label: "Czech koruna" },
  { code: "RON", symbol: "lei ", label: "Romanian leu" },
  { code: "AED", symbol: "AED ", label: "UAE dirham" },
  { code: "INR", symbol: "₹", label: "Indian rupee" },
];

export const CURRENCIES: CurrencyCode[] = CURRENCY_LIST.map((item) => item.code);

export const CURRENCY_SYMBOLS = CURRENCY_LIST.reduce(
  (acc, item) => ({ ...acc, [item.code]: item.symbol }),
  {} as Record<CurrencyCode, string>,
);

export const CURRENCY_LABELS = CURRENCY_LIST.reduce(
  (acc, item) => ({ ...acc, [item.code]: item.label }),
  {} as Record<CurrencyCode, string>,
);

export function isCurrencyCode(value: string): value is CurrencyCode {
  return (CURRENCIES as string[]).includes(value);
}

export function convert(price: number, from: CurrencyCode, to: CurrencyCode): number {
  if (from === to) return price;
  return (price / FX[from]) * FX[to];
}

/**
 * Fixed decimal places per magnitude so a column of prices stays visually
 * aligned: sub-unit values always show 3 decimals, larger ones show 2.
 */
export function formatPrice(price: number, currency: CurrencyCode): string {
  const decimals = price > 0 && price < 0.001 ? 4 : price < 1 ? 3 : 2;
  return `${CURRENCY_SYMBOLS[currency]}${price.toFixed(decimals)}`;
}

export function formatRate(rate: Rate | undefined, currency: CurrencyCode): string {
  if (!rate) return "—";
  const value = convert(rate.price, rate.currency, currency);
  return `${formatPrice(value, currency)} /${rate.unit === "minute" ? "min" : "msg"}`;
}

export function startingPrice(rates: Rate[]): number | null {
  const callRates = rates.filter((rate) => rate.unit === "minute");
  if (!callRates.length) return null;
  return Math.min(...callRates.map((rate) => rate.price));
}

export function formatInterval(seconds?: number): string {
  if (!seconds) return "Per minute";
  if (seconds === 60) return "60-second increments";
  return `${seconds}-second increments`;
}

export function flagEmoji(iso2: string): string {
  return iso2
    .toUpperCase()
    .replace(/[^A-Z]/g, "")
    .split("")
    .map((char) => String.fromCodePoint(127397 + char.charCodeAt(0)))
    .join("");
}
