import {
  mockCountries,
  mockFaqs,
  mockRates,
  mockRatesPageContent,
} from "../data/mockRates";
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
import { DEFAULT_PAGE_SIZE, type RatesRepository } from "./ratesRepository";

/** Builds the directory rows once; the mock dataset is static. */
function buildRows(): CountryRateRow[] {
  return mockCountries
    .filter((country) => country.active)
    .map((country) => {
      const rates = mockRates.filter(
        (rate) => rate.countryId === country.id && rate.active && !rate.destinationLabel?.includes("—"),
      );
      return {
        country,
        landline: rates.find((rate) => rate.destinationType === "landline"),
        mobile: rates.find((rate) => rate.destinationType === "mobile"),
        sms: rates.find((rate) => rate.destinationType === "sms"),
      } satisfies CountryRateRow;
    });
}

const rows = buildRows();

function rowPrice(row: CountryRateRow, service: RatesQueryParams["service"]): number {
  if (service === "landline") return row.landline?.price ?? Number.POSITIVE_INFINITY;
  if (service === "mobile") return row.mobile?.price ?? Number.POSITIVE_INFINITY;
  if (service === "sms") return row.sms?.price ?? Number.POSITIVE_INFINITY;
  return Math.min(
    row.landline?.price ?? Number.POSITIVE_INFINITY,
    row.mobile?.price ?? Number.POSITIVE_INFINITY,
  );
}

function matchesSearch(row: CountryRateRow, search: string): boolean {
  const term = search.trim().toLowerCase().replace(/^\+/, "");
  if (!term) return true;
  const country = row.country;
  return (
    country.name.toLowerCase().includes(term) ||
    country.slug.includes(term) ||
    country.iso2.toLowerCase() === term ||
    country.iso3?.toLowerCase() === term ||
    country.dialCode.replace("+", "").startsWith(term)
  );
}

/** Local, offline-first implementation backed by typed mock data. */
export const localRatesRepository: RatesRepository = {
  async getRates(params: RatesQueryParams = {}): Promise<PaginatedRates> {
    const {
      search = "",
      region = "all",
      service = "all",
      sort = "name-asc",
      page = 1,
      limit = DEFAULT_PAGE_SIZE,
    } = params;

    let filtered = rows.filter((row) => matchesSearch(row, search));
    if (region !== "all") filtered = filtered.filter((row) => row.country.region === region);
    if (service !== "all")
      filtered = filtered.filter((row) =>
        service === "landline" ? row.landline : service === "mobile" ? row.mobile : row.sms,
      );

    filtered = [...filtered].sort((a, b) => {
      switch (sort) {
        case "name-desc":
          return b.country.name.localeCompare(a.country.name);
        case "price-asc":
          return rowPrice(a, service) - rowPrice(b, service);
        case "price-desc":
          return rowPrice(b, service) - rowPrice(a, service);
        default:
          return a.country.name.localeCompare(b.country.name);
      }
    });

    const totalDocs = filtered.length;
    const totalPages = Math.max(1, Math.ceil(totalDocs / limit));
    const safePage = Math.min(Math.max(1, page), totalPages);

    return {
      docs: filtered.slice(0, safePage * limit),
      totalDocs,
      page: safePage,
      limit,
      totalPages,
      hasNextPage: safePage < totalPages,
    };
  },

  async getCountries(params: CountryQueryParams = {}): Promise<Country[]> {
    const { region = "all", featured, limit } = params;
    let list = mockCountries.filter((country) => country.active);
    if (region !== "all") list = list.filter((country) => country.region === region);
    if (featured !== undefined) list = list.filter((country) => Boolean(country.featured) === featured);
    list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    return limit ? list.slice(0, limit) : list;
  },

  async getCountryBySlug(slug: string): Promise<Country | null> {
    return mockCountries.find((country) => country.slug === slug && country.active) ?? null;
  },

  async getRatesByCountry(countryId: string): Promise<Rate[]> {
    return mockRates.filter((rate) => rate.countryId === countryId && rate.active);
  },

  async getFAQs(countryId?: string): Promise<FAQItem[]> {
    return mockFaqs
      .filter((faq) => (countryId ? !faq.countryId || faq.countryId === countryId : !faq.countryId))
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  },

  async getRatesPageContent(): Promise<RatesPageContent> {
    return mockRatesPageContent;
  },
};
