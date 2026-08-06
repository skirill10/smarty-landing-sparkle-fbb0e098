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

/** Everything a rates source has to provide, regardless of where it comes from. */
export type RatesDataset = {
  countries: Country[];
  rates: Rate[];
  faqs: FAQItem[];
  pageContent: RatesPageContent;
};

function buildRows(dataset: RatesDataset): CountryRateRow[] {
  return dataset.countries
    .filter((country) => country.active)
    .map((country) => {
      const rates = dataset.rates.filter(
        (rate) =>
          rate.countryId === country.id && rate.active && !rate.destinationLabel?.includes("—"),
      );
      return {
        country,
        landline: rates.find((rate) => rate.destinationType === "landline"),
        mobile: rates.find((rate) => rate.destinationType === "mobile"),
        sms: rates.find((rate) => rate.destinationType === "sms"),
      } satisfies CountryRateRow;
    });
}

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

/**
 * Wraps any dataset (mock, Google Sheet, CMS) in the shared query/sort/paging
 * logic so every source behaves identically for the UI.
 */
export function createDatasetRepository(load: () => Promise<RatesDataset>): RatesRepository {
  const cache = { rows: null as CountryRateRow[] | null, dataset: null as RatesDataset | null };

  async function ensure(): Promise<{ dataset: RatesDataset; rows: CountryRateRow[] }> {
    if (!cache.dataset || !cache.rows) {
      const dataset = await load();
      cache.dataset = dataset;
      cache.rows = buildRows(dataset);
    }
    return { dataset: cache.dataset, rows: cache.rows };
  }

  return {
    async getRates(params: RatesQueryParams = {}): Promise<PaginatedRates> {
      const { rows } = await ensure();
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
      const { dataset } = await ensure();
      const { region = "all", featured, limit } = params;
      let list = dataset.countries.filter((country) => country.active);
      if (region !== "all") list = list.filter((country) => country.region === region);
      if (featured !== undefined)
        list = list.filter((country) => Boolean(country.featured) === featured);
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
      return limit ? list.slice(0, limit) : list;
    },

    async getCountryBySlug(slug: string): Promise<Country | null> {
      const { dataset } = await ensure();
      return dataset.countries.find((country) => country.slug === slug && country.active) ?? null;
    },

    async getRatesByCountry(countryId: string): Promise<Rate[]> {
      const { dataset } = await ensure();
      return dataset.rates.filter((rate) => rate.countryId === countryId && rate.active);
    },

    async getFAQs(countryId?: string): Promise<FAQItem[]> {
      const { dataset } = await ensure();
      return dataset.faqs
        .filter((faq) =>
          countryId ? !faq.countryId || faq.countryId === countryId : !faq.countryId,
        )
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    },

    async getRatesPageContent(): Promise<RatesPageContent> {
      const { dataset } = await ensure();
      return dataset.pageContent;
    },
  };
}
