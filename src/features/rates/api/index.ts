import { localRatesRepository } from "./localRatesRepository";
import { payloadRatesRepository } from "./payloadRatesRepository";
import { sheetRatesRepository } from "./sheetRatesRepository";
import type { RatesRepository } from "./ratesRepository";

/**
 * Single switch between content sources.
 *
 *   VITE_RATES_SOURCE=sheet    (default — Google Sheet CSV export, falls back to local)
 *   VITE_RATES_SOURCE=local    (bundled dataset only)
 *   VITE_RATES_SOURCE=payload  + VITE_PAYLOAD_API_URL=https://cms.smartytel.com
 *
 * VITE_CONTENT_SOURCE is still honoured for backwards compatibility.
 */
const source =
  (import.meta.env['VITE_RATES_SOURCE'] as string | undefined) ??
  (import.meta.env['VITE_CONTENT_SOURCE'] as string | undefined) ??
  "sheet";

export const ratesRepository: RatesRepository =
  source === "payload"
    ? payloadRatesRepository
    : source === "local"
      ? localRatesRepository
      : sheetRatesRepository;

export const contentSource = source;
export type { RatesRepository };
