import type { Country, FAQItem, Rate, RatesPageContent, Region } from "../types";

/**
 * SAMPLE DATA — NOT PRODUCTION PRICING.
 *
 * Every price below is illustrative mock data used until the Payload CMS
 * `countries`, `rates`, `faqs` collections and the `rates-page` global are
 * connected. Base currency for the mock set is EUR.
 */

type Seed = {
  name: string;
  slug: string;
  iso2: string;
  iso3: string;
  dialCode: string;
  region: Region;
  landline: number;
  mobile: number;
  sms: number;
  /** Billing increment in seconds. */
  interval: number;
  connectionFee?: number;
  trunkPrefix?: string;
  featured?: boolean;
  /** Extra carrier / destination groups shown on the country page. */
  extras?: { label: string; prefix?: string; price: number; type: "landline" | "mobile" }[];
};

const seeds: Seed[] = [
  { name: "Germany", slug: "germany", iso2: "DE", iso3: "DEU", dialCode: "+49", region: "europe", landline: 0.03, mobile: 0.06, sms: 0.08, interval: 60, connectionFee: 0.01, trunkPrefix: "0", featured: true, extras: [{ label: "Mobile — Vodafone", prefix: "+49 172", price: 0.07, type: "mobile" }, { label: "Mobile — Telekom", prefix: "+49 151", price: 0.065, type: "mobile" }, { label: "Berlin landline", prefix: "+49 30", price: 0.028, type: "landline" }] },
  { name: "United Kingdom", slug: "united-kingdom", iso2: "GB", iso3: "GBR", dialCode: "+44", region: "europe", landline: 0.02, mobile: 0.05, sms: 0.07, interval: 60, trunkPrefix: "0", featured: true, extras: [{ label: "London landline", prefix: "+44 20", price: 0.018, type: "landline" }, { label: "Mobile — EE", prefix: "+44 74", price: 0.055, type: "mobile" }] },
  { name: "France", slug: "france", iso2: "FR", iso3: "FRA", dialCode: "+33", region: "europe", landline: 0.025, mobile: 0.07, sms: 0.08, interval: 60, trunkPrefix: "0", featured: true, extras: [{ label: "Paris landline", prefix: "+33 1", price: 0.022, type: "landline" }] },
  { name: "Spain", slug: "spain", iso2: "ES", iso3: "ESP", dialCode: "+34", region: "europe", landline: 0.028, mobile: 0.075, sms: 0.09, interval: 60, featured: true },
  { name: "Italy", slug: "italy", iso2: "IT", iso3: "ITA", dialCode: "+39", region: "europe", landline: 0.026, mobile: 0.085, sms: 0.09, interval: 60, featured: true },
  { name: "Poland", slug: "poland", iso2: "PL", iso3: "POL", dialCode: "+48", region: "europe", landline: 0.024, mobile: 0.05, sms: 0.06, interval: 60, featured: true },
  { name: "Netherlands", slug: "netherlands", iso2: "NL", iso3: "NLD", dialCode: "+31", region: "europe", landline: 0.022, mobile: 0.055, sms: 0.08, interval: 60, trunkPrefix: "0" },
  { name: "Ukraine", slug: "ukraine", iso2: "UA", iso3: "UKR", dialCode: "+380", region: "europe", landline: 0.06, mobile: 0.11, sms: 0.09, interval: 60, trunkPrefix: "0", featured: true },
  { name: "Sweden", slug: "sweden", iso2: "SE", iso3: "SWE", dialCode: "+46", region: "europe", landline: 0.021, mobile: 0.06, sms: 0.08, interval: 60, trunkPrefix: "0" },
  { name: "Ireland", slug: "ireland", iso2: "IE", iso3: "IRL", dialCode: "+353", region: "europe", landline: 0.023, mobile: 0.09, sms: 0.08, interval: 60, trunkPrefix: "0" },
  { name: "Portugal", slug: "portugal", iso2: "PT", iso3: "PRT", dialCode: "+351", region: "europe", landline: 0.027, mobile: 0.08, sms: 0.09, interval: 60 },
  { name: "United States", slug: "united-states", iso2: "US", iso3: "USA", dialCode: "+1", region: "north-america", landline: 0.015, mobile: 0.015, sms: 0.02, interval: 60, featured: true, extras: [{ label: "Alaska landline", prefix: "+1 907", price: 0.03, type: "landline" }, { label: "Hawaii landline", prefix: "+1 808", price: 0.025, type: "landline" }] },
  { name: "Canada", slug: "canada", iso2: "CA", iso3: "CAN", dialCode: "+1", region: "north-america", landline: 0.015, mobile: 0.015, sms: 0.02, interval: 60, featured: true },
  { name: "Mexico", slug: "mexico", iso2: "MX", iso3: "MEX", dialCode: "+52", region: "north-america", landline: 0.03, mobile: 0.035, sms: 0.05, interval: 60 },
  { name: "Brazil", slug: "brazil", iso2: "BR", iso3: "BRA", dialCode: "+55", region: "south-america", landline: 0.032, mobile: 0.09, sms: 0.06, interval: 60, extras: [{ label: "São Paulo landline", prefix: "+55 11", price: 0.03, type: "landline" }] },
  { name: "Argentina", slug: "argentina", iso2: "AR", iso3: "ARG", dialCode: "+54", region: "south-america", landline: 0.04, mobile: 0.12, sms: 0.07, interval: 60 },
  { name: "Colombia", slug: "colombia", iso2: "CO", iso3: "COL", dialCode: "+57", region: "south-america", landline: 0.035, mobile: 0.1, sms: 0.07, interval: 60 },
  { name: "Chile", slug: "chile", iso2: "CL", iso3: "CHL", dialCode: "+56", region: "south-america", landline: 0.038, mobile: 0.095, sms: 0.07, interval: 60 },
  { name: "India", slug: "india", iso2: "IN", iso3: "IND", dialCode: "+91", region: "asia", landline: 0.02, mobile: 0.02, sms: 0.04, interval: 60, trunkPrefix: "0" },
  { name: "China", slug: "china", iso2: "CN", iso3: "CHN", dialCode: "+86", region: "asia", landline: 0.025, mobile: 0.025, sms: 0.06, interval: 60 },
  { name: "Japan", slug: "japan", iso2: "JP", iso3: "JPN", dialCode: "+81", region: "asia", landline: 0.035, mobile: 0.12, sms: 0.1, interval: 60, trunkPrefix: "0" },
  { name: "Singapore", slug: "singapore", iso2: "SG", iso3: "SGP", dialCode: "+65", region: "asia", landline: 0.022, mobile: 0.022, sms: 0.06, interval: 60 },
  { name: "United Arab Emirates", slug: "united-arab-emirates", iso2: "AE", iso3: "ARE", dialCode: "+971", region: "asia", landline: 0.24, mobile: 0.26, sms: 0.12, interval: 60, connectionFee: 0.02, trunkPrefix: "0" },
  { name: "South Africa", slug: "south-africa", iso2: "ZA", iso3: "ZAF", dialCode: "+27", region: "africa", landline: 0.05, mobile: 0.14, sms: 0.09, interval: 60, trunkPrefix: "0" },
  { name: "Nigeria", slug: "nigeria", iso2: "NG", iso3: "NGA", dialCode: "+234", region: "africa", landline: 0.12, mobile: 0.13, sms: 0.11, interval: 60, trunkPrefix: "0" },
  { name: "Egypt", slug: "egypt", iso2: "EG", iso3: "EGY", dialCode: "+20", region: "africa", landline: 0.11, mobile: 0.15, sms: 0.1, interval: 60, trunkPrefix: "0" },
  { name: "Kenya", slug: "kenya", iso2: "KE", iso3: "KEN", dialCode: "+254", region: "africa", landline: 0.09, mobile: 0.16, sms: 0.11, interval: 60, trunkPrefix: "0" },
  { name: "Australia", slug: "australia", iso2: "AU", iso3: "AUS", dialCode: "+61", region: "oceania", landline: 0.025, mobile: 0.08, sms: 0.09, interval: 60, trunkPrefix: "0" },
  { name: "New Zealand", slug: "new-zealand", iso2: "NZ", iso3: "NZL", dialCode: "+64", region: "oceania", landline: 0.027, mobile: 0.09, sms: 0.09, interval: 60, trunkPrefix: "0" },
];

const startingRate = (seed: Seed) => Math.min(seed.landline, seed.mobile);

export const mockCountries: Country[] = seeds.map((seed) => ({
  id: seed.slug,
  name: seed.name,
  slug: seed.slug,
  iso2: seed.iso2,
  iso3: seed.iso3,
  dialCode: seed.dialCode,
  region: seed.region,
  currencyCode: "EUR",
  trunkPrefix: seed.trunkPrefix,
  callingInstructions: seed.trunkPrefix
    ? `enter ${seed.dialCode} followed by the local number without the leading ${seed.trunkPrefix}`
    : `enter ${seed.dialCode} followed by the full local number`,
  shortDescription: `Reach customers, partners and colleagues in ${seed.name} from any Smartytel number, with per-second visibility on what every call costs.`,
  seo: {
    metaTitle: `Call ${seed.name} from €${startingRate(seed).toFixed(2)}/min | Smartytel Rates`,
    metaDescription: `View Smartytel landline, mobile and SMS rates for ${seed.name}. Transparent business communication pricing with no hidden surprises.`,
  },
  featured: seed.featured ?? false,
  active: true,
}));

export const mockRates: Rate[] = seeds.flatMap((seed) => {
  const base: Rate[] = [
    {
      id: `${seed.slug}-landline`,
      countryId: seed.slug,
      destinationType: "landline",
      destinationLabel: "Landline",
      prefix: seed.dialCode,
      price: seed.landline,
      currency: "EUR",
      unit: "minute",
      billingIntervalSeconds: seed.interval,
      connectionFee: seed.connectionFee,
      active: true,
    },
    {
      id: `${seed.slug}-mobile`,
      countryId: seed.slug,
      destinationType: "mobile",
      destinationLabel: "Mobile",
      prefix: seed.dialCode,
      price: seed.mobile,
      currency: "EUR",
      unit: "minute",
      billingIntervalSeconds: seed.interval,
      connectionFee: seed.connectionFee,
      active: true,
    },
    {
      id: `${seed.slug}-sms`,
      countryId: seed.slug,
      destinationType: "sms",
      destinationLabel: "SMS",
      prefix: seed.dialCode,
      price: seed.sms,
      currency: "EUR",
      unit: "message",
      active: true,
    },
  ];

  const extras: Rate[] = (seed.extras ?? []).map((extra, index) => ({
    id: `${seed.slug}-extra-${index}`,
    countryId: seed.slug,
    destinationType: extra.type,
    destinationLabel: extra.label,
    prefix: extra.prefix ?? seed.dialCode,
    price: extra.price,
    currency: "EUR",
    unit: "minute",
    billingIntervalSeconds: seed.interval,
    connectionFee: seed.connectionFee,
    active: true,
  }));

  return [...base, ...extras];
});

export const mockFaqs: FAQItem[] = [
  {
    id: "faq-incoming",
    question: "Are incoming calls charged?",
    answer:
      "Incoming calls to your Smartytel numbers are included in your plan. You are only charged for outbound international calls and messages at the destination rate shown above.",
    order: 1,
  },
  {
    id: "faq-mobile-landline",
    question: "Are rates different for mobile and landline numbers?",
    answer:
      "Yes. Mobile networks charge higher termination fees than fixed lines, so most destinations have a separate landline and mobile rate. Both are listed for every country.",
    order: 2,
  },
  {
    id: "faq-connection-fee",
    question: "Is there a connection fee?",
    answer:
      "Most destinations have no connection fee. Where a carrier applies one, it is shown on the country page next to the per-minute rate before you dial.",
    order: 3,
  },
  {
    id: "faq-billing",
    question: "How are calls billed?",
    answer:
      "Calls are billed per minute in the increment shown for the destination — usually 60 seconds. Messages are billed per message sent, per recipient.",
    order: 4,
  },
  {
    id: "faq-vat",
    question: "Do rates include VAT?",
    answer:
      "Rates are shown excluding VAT and other local taxes. Applicable taxes are calculated on your invoice based on your billing country and tax status.",
    order: 5,
  },
  {
    id: "faq-restrict",
    question: "Can international calling be restricted for team members?",
    answer:
      "Yes. Admins can allow or block international destinations per user or per team, and set monthly spend limits from workspace settings.",
    order: 6,
  },
  {
    id: "faq-plan",
    question: "Are rates different depending on the Smartytel plan?",
    answer:
      "Destination rates are the same on every plan. Higher plans add volume discounts on committed usage — talk to sales if you call one region heavily.",
    order: 7,
  },
  {
    id: "faq-de-emergency",
    question: "Can I call German service numbers?",
    answer:
      "Standard German landline and mobile ranges are available. Premium-rate and shared-cost service numbers are blocked by default and can be enabled on request.",
    countryId: "germany",
    order: 1,
  },
  {
    id: "faq-us-tollfree",
    question: "Are US toll-free numbers included?",
    answer:
      "Calls to US toll-free ranges (800, 833, 844, 855, 866, 877, 888) are billed at the standard landline rate shown above.",
    countryId: "united-states",
    order: 1,
  },
];

export const mockRatesPageContent: RatesPageContent = {
  heroEyebrow: "International calling rates",
  heroTitle: "Simple, transparent international rates",
  heroDescription:
    "Find the cost of calling and messaging customers, partners and teams around the world — landline, mobile and SMS, per destination.",
  searchPlaceholder: "Search by country or calling code",
  disclaimerTitle: "About these rates",
  disclaimerBody:
    "Rates are shown excluding applicable taxes unless stated otherwise. Prices may vary by destination type, carrier and subscription plan. The final rate is always displayed before a chargeable call is placed.",
  faqTitle: "International rates questions",
  ctaTitle: "Ready to connect your business worldwide?",
  ctaDescription:
    "Start using Smartytel for business calls, messaging and team communication.",
  primaryCtaLabel: "Start free trial",
  primaryCtaUrl: "/pricing",
  secondaryCtaLabel: "Talk to sales",
  secondaryCtaUrl: "/pricing#talk-to-sales",
  seo: {
    metaTitle: "International Calling Rates | Smartytel",
    metaDescription:
      "Search Smartytel international calling and messaging rates by country or calling code. Transparent landline, mobile and SMS pricing for business teams.",
  },
};
