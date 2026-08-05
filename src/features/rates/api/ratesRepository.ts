import type {
  Country,
  CountryQueryParams,
  FAQItem,
  PaginatedRates,
  Rate,
  RatesPageContent,
  RatesQueryParams,
} from "../types";

/**
 * Single contract every content source implements. Page components depend on
 * this interface only — never on where the data physically comes from.
 */
export interface RatesRepository {
  getRates(params?: RatesQueryParams): Promise<PaginatedRates>;
  getCountries(params?: CountryQueryParams): Promise<Country[]>;
  getCountryBySlug(slug: string): Promise<Country | null>;
  getRatesByCountry(countryId: string): Promise<Rate[]>;
  getFAQs(countryId?: string): Promise<FAQItem[]>;
  getRatesPageContent(): Promise<RatesPageContent>;
}

export const DEFAULT_PAGE_SIZE = 12;
