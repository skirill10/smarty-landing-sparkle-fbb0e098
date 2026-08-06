import { localRatesRepository } from "./localRatesRepository";
import { DEFAULT_PAGE_SIZE, type RatesRepository } from "./ratesRepository";
import type {
  Country,
  CountryQueryParams,
  CountryRateRow,
  FAQItem,
  PaginatedRates,
  Rate,
  RatesPageContent,
  RatesQueryParams,
} from "../types";

/**
 * Payload CMS REST implementation.
 *
 * Expected endpoints:
 *   GET /api/countries
 *   GET /api/rates
 *   GET /api/faqs
 *   GET /api/globals/rates-page
 *
 * Payload is not required for the preview: every method falls back to the
 * local mock repository when the API is unset or unreachable, so switching
 * `VITE_CONTENT_SOURCE=payload` can never break the site.
 */
const API_URL = (import.meta.env["VITE_PAYLOAD_API_URL"] as string | undefined)?.replace(/\/$/, "");

type PayloadList<T> = {
  docs: T[];
  totalDocs: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
};

type QueryValue = string | number | boolean | undefined;

function buildQuery(params: Record<string, QueryValue>): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") search.set(key, String(value));
  }
  const query = search.toString();
  return query ? `?${query}` : "";
}

async function payloadFetch<T>(path: string): Promise<T | null> {
  if (!API_URL) return null;
  try {
    const response = await fetch(`${API_URL}/api${path}`, {
      headers: { Accept: "application/json" },
    });
    if (!response.ok) {
      console.warn(`Payload rates request failed [${response.status}] for ${path}`);
      return null;
    }
    return (await response.json()) as T;
  } catch (error) {
    console.warn(`Payload rates request errored for ${path}`, error);
    return null;
  }
}

/** Payload uses numeric ids; the app keys countries by slug, as the local source does. */
function normalizeCountry(doc: Country): Country {
  return { ...doc, id: doc.slug ?? doc.id };
}

function toRow(country: Country, rates: Rate[]): CountryRateRow {
  const own = rates.filter((rate) => rate.countryId === country.id && rate.active !== false);
  return {
    country,
    landline: own.find((rate) => rate.destinationType === "landline"),
    mobile: own.find((rate) => rate.destinationType === "mobile"),
    sms: own.find((rate) => rate.destinationType === "sms"),
  };
}

export const payloadRatesRepository: RatesRepository = {
  async getRates(params: RatesQueryParams = {}): Promise<PaginatedRates> {
    const {
      search = "",
      region = "all",
      sort = "name-asc",
      page = 1,
      limit = DEFAULT_PAGE_SIZE,
    } = params;

    const countryQuery = buildQuery({
      "where[active][equals]": true,
      ...(region !== "all" ? { "where[region][equals]": region } : {}),
      ...(search
        ? { "where[or][0][name][like]": search, "where[or][1][dialCode][like]": search }
        : {}),
      sort: sort === "name-desc" ? "-name" : "name",
      limit: limit * page,
      page: 1,
      depth: 0,
    });

    const countries = await payloadFetch<PayloadList<Country>>(`/countries${countryQuery}`);
    if (!countries) return localRatesRepository.getRates(params);

    const rates = await payloadFetch<PayloadList<Rate>>(
      `/rates${buildQuery({ "where[active][equals]": true, limit: 1000, depth: 0 })}`,
    );
    const rateDocs = rates?.docs ?? [];

    return {
      docs: countries.docs.map((country) => toRow(normalizeCountry(country), rateDocs)),
      totalDocs: countries.totalDocs,
      page,
      limit,
      totalPages: Math.max(1, Math.ceil(countries.totalDocs / limit)),
      hasNextPage: countries.totalDocs > page * limit,
    };
  },

  async getCountries(params: CountryQueryParams = {}): Promise<Country[]> {
    const { region = "all", featured, limit = 100 } = params;
    const result = await payloadFetch<PayloadList<Country>>(
      `/countries${buildQuery({
        "where[active][equals]": true,
        ...(region !== "all" ? { "where[region][equals]": region } : {}),
        ...(featured !== undefined ? { "where[featured][equals]": featured } : {}),
        sort: "name",
        limit,
        depth: 0,
      })}`,
    );
    return result?.docs
      ? result.docs.map(normalizeCountry)
      : localRatesRepository.getCountries(params);
  },

  async getCountryBySlug(slug: string): Promise<Country | null> {
    const result = await payloadFetch<PayloadList<Country>>(
      `/countries${buildQuery({ "where[slug][equals]": slug, limit: 1, depth: 1 })}`,
    );
    if (!result) return localRatesRepository.getCountryBySlug(slug);
    const doc = result.docs[0];
    return doc ? normalizeCountry(doc) : null;
  },

  async getRatesByCountry(countryId: string): Promise<Rate[]> {
    const result = await payloadFetch<PayloadList<Rate>>(
      `/rates${buildQuery({
        "where[countryId][equals]": countryId,
        "where[active][equals]": true,
        sort: "price",
        limit: 200,
        depth: 0,
      })}`,
    );
    return result?.docs ?? localRatesRepository.getRatesByCountry(countryId);
  },

  async getFAQs(countryId?: string): Promise<FAQItem[]> {
    const result = await payloadFetch<PayloadList<FAQItem>>(
      `/faqs${buildQuery({ sort: "order", limit: 100, depth: 0 })}`,
    );
    if (!result) return localRatesRepository.getFAQs(countryId);
    return result.docs.filter((faq) =>
      countryId ? !faq.countryId || faq.countryId === countryId : !faq.countryId,
    );
  },

  async getRatesPageContent(): Promise<RatesPageContent> {
    const result = await payloadFetch<RatesPageContent>(
      `/globals/rates-page${buildQuery({ depth: 1 })}`,
    );
    return result ?? localRatesRepository.getRatesPageContent();
  },
};
