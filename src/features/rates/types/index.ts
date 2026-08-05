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

export type CurrencyCode =
  | "EUR"
  | "USD"
  | "GBP"
  | "CHF"
  | "CAD"
  | "AUD"
  | "PLN"
  | "SEK"
  | "NOK"
  | "DKK"
  | "CZK"
  | "RON"
  | "AED"
  | "INR";

export type DestinationType = "landline" | "mobile" | "sms";

export type SEOFields = {
  metaTitle?: string | undefined;
  metaDescription?: string | undefined;
  canonicalUrl?: string | undefined;
  noIndex?: boolean | undefined;
  openGraphImage?: string | undefined;
};

export type Country = {
  id: string;
  name: string;
  slug: string;
  iso2: string;
  iso3?: string | undefined;
  dialCode: string;
  flagUrl?: string | undefined;
  region: Region;
  currencyCode?: CurrencyCode | undefined;
  /** e.g. "enter +49 followed by the local number without the leading zero" */
  callingInstructions?: string | undefined;
  /** Optional national trunk prefix that must be dropped when dialling. */
  trunkPrefix?: string | undefined;
  shortDescription?: string | undefined;
  seo?: SEOFields | undefined;
  featured?: boolean | undefined;
  active: boolean;
};

export type Rate = {
  id: string;
  countryId: string;
  destinationType: DestinationType;
  destinationLabel?: string | undefined;
  prefix?: string | undefined;
  price: number;
  currency: CurrencyCode;
  unit: "minute" | "message";
  billingIntervalSeconds?: number | undefined;
  connectionFee?: number | undefined;
  minimumCharge?: number | undefined;
  active: boolean;
  validFrom?: string | undefined;
  validUntil?: string | undefined;
};

export type FAQItem = {
  id: string;
  question: string;
  answer: string;
  countryId?: string | undefined;
  order?: number | undefined;
};

export type RatesPageContent = {
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  searchPlaceholder: string;
  disclaimerTitle?: string | undefined;
  disclaimerBody: string;
  faqTitle: string;
  ctaTitle: string;
  ctaDescription: string;
  primaryCtaLabel: string;
  primaryCtaUrl: string;
  secondaryCtaLabel?: string | undefined;
  secondaryCtaUrl?: string | undefined;
  seo?: SEOFields | undefined;
};

/** One row of the directory table: a country plus its headline rates. */
export type CountryRateRow = {
  country: Country;
  landline?: Rate | undefined;
  mobile?: Rate | undefined;
  sms?: Rate | undefined;
};

export type RatesSort = "name-asc" | "name-desc" | "price-asc" | "price-desc";

export type RatesQueryParams = {
  search?: string | undefined;
  region?: Region | "all" | undefined;
  service?: DestinationType | "all" | undefined;
  sort?: RatesSort | undefined;
  page?: number | undefined;
  limit?: number | undefined;
};

export type CountryQueryParams = {
  region?: Region | "all" | undefined;
  featured?: boolean | undefined;
  limit?: number | undefined;
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
