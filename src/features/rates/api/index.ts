import { localRatesRepository } from "./localRatesRepository";
import { payloadRatesRepository } from "./payloadRatesRepository";
import type { RatesRepository } from "./ratesRepository";

/**
 * Single switch between content sources.
 *
 *   VITE_CONTENT_SOURCE=local   (default)
 *   VITE_CONTENT_SOURCE=payload + VITE_PAYLOAD_API_URL=https://cms.smartytel.com
 */
const source = (import.meta.env['VITE_CONTENT_SOURCE'] as string | undefined) ?? "local";

export const ratesRepository: RatesRepository =
  source === "payload" ? payloadRatesRepository : localRatesRepository;

export const contentSource = source;
export type { RatesRepository };
