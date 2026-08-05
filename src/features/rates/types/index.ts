/**
 * Domain types for the International Rates section.
 *
 * These mirror the intended Payload CMS collections/globals one-to-one so the
 * frontend can switch from local mock data to the CMS REST API without any
 * component changes.
 */

export type Region =
  | "europe"
  | "north-america"
  | "south-america"
  | "asia"
  | "africa"
  | "oceania";

export type CurrencyCode = "EUR" | "USD" | "GBP";

export type DestinationType = "landline" | "mobile" | "sms";

export type SEOFields = {
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  openGraphImage?: string;
};

export type Country = {
  id: string;
  name: string;
  slug: string;
  iso2: string;
  iso3?: string;
  dialCode: string;
  flagUrl?: string;
  region: Region;
  currencyCode?: CurrencyCode;
  /** e.g. "enter +49 followed by the local number without the leading zero" */
  callingInstructions?: string;
  /** Optional national trunk prefix that must be dropped when dialling. */
  trunkPrefix?: string;
  shortDescription?: string;
  seo?: SEOFields;
  featured?: boolean;
  active: boolean;
};

export type Rate = {
  id: string;
  countryId: string;
  destinationType: DestinationType;
  destinationLabel?: string;
  prefix?: string;
  price: number;
  currency: CurrencyCode;
  unit: "minute" | "message";
  billingIntervalSeconds?: number;
  connectionFee?: number;
  minimumCharge?: number;
  active: boolean;
  validFrom?: string;
  validUntil?: string;
};

export type FAQItem = {
  id: string;
  question: string;
  answer: string;
  countryId?: string;
  order?: number;
};

export type RatesPageContent = {
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  searchPlaceholder: string;
  disclaimerTitle?: string;
  disclaimerBody: string;
  faqTitle: string;
  ctaTitle: string;
  ctaDescription: string;
  primaryCtaLabel: string;
  primaryCtaUrl: string;
  secondaryCtaLabel?: string;
  secondaryCtaUrl?: string;
  seo?: SEOFields;
};

/** One row of the directory table: a country plus its headline rates. */
export type CountryRateRow = {
  country: Country;
  landline?: Rate;
  mobile?: Rate;
  sms?: Rate;
};

export type RatesSort = "name-asc" | "name-desc" | "price-asc" | "price-desc";

export type RatesQueryParams = {
  search?: string;
  region?: Region | "all";
  service?: DestinationType | "all";
  sort?: RatesSort;
  page?: number;
  limit?: number;
};

export type CountryQueryParams = {
  region?: Region | "all";
  featured?: boolean;
  limit?: number;
};

export type PaginatedRates = {
  docs: CountryRateRow[];
  totalDocs: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
};

export const REGION_LABELS: Record<Region, string> = {
  europe: "Europe",
  "north-america": "North America",
  "south-america": "South America",
  asia: "Asia",
  africa: "Africa",
  oceania: "Oceania",
};

export const REGIONS = Object.keys(REGION_LABELS) as Region[];

export const SERVICE_LABELS: Record<DestinationType, string> = {
  landline: "Landline",
  mobile: "Mobile",
  sms: "SMS",
};
