import type { CurrencyCode, Rate } from "../types";

/**
 * Mock FX table. Base currency of the dataset is EUR; when Payload supplies
 * rates per currency this helper becomes a pass-through.
 */
const FX: Record<CurrencyCode, number> = { EUR: 1, USD: 1.09, GBP: 0.85 };

export const CURRENCIES: CurrencyCode[] = ["EUR", "USD", "GBP"];

export const CURRENCY_SYMBOLS: Record<CurrencyCode, string> = { EUR: "€", USD: "$", GBP: "£" };

export function convert(price: number, from: CurrencyCode, to: CurrencyCode): number {
  if (from === to) return price;
  return (price / FX[from]) * FX[to];
}

/** "€0.03" — 2 decimals, or 3 when the price is very small. */
export function formatPrice(price: number, currency: CurrencyCode): string {
  const decimals = price > 0 && price < 0.01 ? 4 : price < 0.1 ? 3 : 2;
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
