import {
  mockCountries,
  mockFaqs,
  mockRates,
  mockRatesPageContent,
} from "../../../src/features/rates/data/mockRates";

/**
 * The rates seed reuses the same dataset the frontend ships as its local
 * fallback, so `local` and `payload` content sources start out identical.
 * Replace the prices in the admin UI once real carrier rates are available.
 */
export const countries = mockCountries.map((country) => ({
  name: country.name,
  slug: country.slug,
  iso2: country.iso2,
  iso3: country.iso3 ?? "",
  dialCode: country.dialCode,
  region: country.region,
  trunkPrefix: country.trunkPrefix ?? "",
  callingInstructions: country.callingInstructions ?? "",
  shortDescription: country.shortDescription ?? "",
  seo: {
    metaTitle: country.seo?.metaTitle ?? "",
    metaDescription: country.seo?.metaDescription ?? "",
  },
  featured: Boolean(country.featured),
  active: country.active !== false,
}));

export const rates = mockRates.map((rate) => ({
  countryId: rate.countryId,
  destinationType: rate.destinationType,
  destinationLabel: rate.destinationLabel ?? "",
  prefix: rate.prefix ?? "",
  price: rate.price,
  currency: rate.currency,
  unit: rate.unit,
  billingIntervalSeconds: rate.billingIntervalSeconds ?? 60,
  ...(rate.connectionFee !== undefined ? { connectionFee: rate.connectionFee } : {}),
  ...(rate.minimumCharge !== undefined ? { minimumCharge: rate.minimumCharge } : {}),
  active: rate.active !== false,
  /** Stable key used to upsert instead of duplicating on re-seed. */
  key: rate.id,
}));

export const faqs = mockFaqs.map((faq, index) => ({
  question: faq.question,
  answer: faq.answer,
  countryId: faq.countryId ?? "",
  order: faq.order ?? index,
}));

export const ratesPage = {
  heroEyebrow: mockRatesPageContent.heroEyebrow,
  heroTitle: mockRatesPageContent.heroTitle,
  heroDescription: mockRatesPageContent.heroDescription,
  searchPlaceholder: mockRatesPageContent.searchPlaceholder,
  disclaimerTitle: mockRatesPageContent.disclaimerTitle ?? "",
  disclaimerBody: mockRatesPageContent.disclaimerBody,
  faqTitle: mockRatesPageContent.faqTitle,
  ctaTitle: mockRatesPageContent.ctaTitle,
  ctaDescription: mockRatesPageContent.ctaDescription,
  primaryCtaLabel: mockRatesPageContent.primaryCtaLabel,
  primaryCtaUrl: mockRatesPageContent.primaryCtaUrl,
  secondaryCtaLabel: mockRatesPageContent.secondaryCtaLabel ?? "",
  secondaryCtaUrl: mockRatesPageContent.secondaryCtaUrl ?? "",
  seo: {
    metaTitle: mockRatesPageContent.seo?.metaTitle ?? "",
    metaDescription: mockRatesPageContent.seo?.metaDescription ?? "",
  },
};
