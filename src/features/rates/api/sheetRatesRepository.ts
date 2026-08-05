import { mockFaqs, mockRatesPageContent } from "../data/mockRates";
import { createDatasetRepository, type RatesDataset } from "./datasetRepository";
import { localRatesDataset } from "./localRatesRepository";
import { parseRatesSheet } from "./parseRatesSheet";
import type { RatesRepository } from "./ratesRepository";
import type { CurrencyCode } from "../types";

const SHEET_ID =
  (import.meta.env["VITE_RATES_SHEET_ID"] as string | undefined) ??
  "1UorvSmjKhx1b2RFWH73Of-ncETBJ-HHF4XLddsxg9FU";
const SHEET_GID = (import.meta.env["VITE_RATES_SHEET_GID"] as string | undefined) ?? "0";
const DEFAULT_CURRENCY =
  ((import.meta.env["VITE_RATES_SHEET_CURRENCY"] as string | undefined) as CurrencyCode | undefined) ??
  "EUR";
const SITE_URL = (import.meta.env["VITE_SITE_URL"] as string | undefined) ?? "";

function endpoint(): string {
  const path = `/api/public/rates-sheet?sheetId=${encodeURIComponent(SHEET_ID)}&gid=${encodeURIComponent(SHEET_GID)}`;
  if (typeof window !== "undefined") return path;
  return SITE_URL ? `${SITE_URL.replace(/\/$/, "")}${path}` : path;
}

async function loadSheetDataset(): Promise<RatesDataset> {
  try {
    const response = await fetch(endpoint(), { headers: { Accept: "text/csv" } });
    if (!response.ok) throw new Error(`Rates sheet request failed (${response.status})`);
    const csv = await response.text();
    const { countries, rates } = parseRatesSheet(csv, { defaultCurrency: DEFAULT_CURRENCY });
    if (!countries.length || !rates.length) throw new Error("Rates sheet produced no rows");
    return {
      countries,
      rates,
      faqs: mockFaqs,
      pageContent: mockRatesPageContent,
    };
  } catch (error) {
    // Never break the page: fall back to the bundled rate card.
    console.warn("[rates] Falling back to bundled data:", error);
    return localRatesDataset;
  }
}

/**
 * Reads the rate card from a published Google Sheet (CSV export) through the
 * `/api/public/rates-sheet` proxy, with the bundled dataset as a safety net.
 */
export const sheetRatesRepository: RatesRepository = createDatasetRepository(loadSheetDataset);
