import type {
  Country,
  CurrencyCode,
  DestinationType,
  Rate,
  Region,
} from "../types";

/* ------------------------------------------------------------------ CSV ---- */

/** Minimal RFC-4180 CSV parser (handles quoted fields and embedded newlines). */
export function parseCsv(input: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let quoted = false;
  const text = input.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    if (quoted) {
      if (char === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i += 1;
        } else quoted = false;
      } else field += char;
      continue;
    }
    if (char === '"') quoted = true;
    else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else field += char;
  }
  row.push(field);
  rows.push(row);
  return rows.filter((cells) => cells.some((cell) => cell.trim() !== ""));
}

/* -------------------------------------------------------------- mapping ---- */

const norm = (value: string) => value.trim().toLowerCase().replace(/[^a-z0-9]+/g, "");

const COLUMN_ALIASES: Record<string, string[]> = {
  country: ["country", "countryname", "destination", "destinationcountry", "name"],
  iso2: ["iso2", "iso", "isocode", "iso3166", "cc", "countryiso", "countrycode2"],
  iso3: ["iso3", "iso3code"],
  dialCode: ["dialcode", "callingcode", "countryprefix", "prefix", "idd", "dial", "code"],
  region: ["region", "continent", "zone", "area"],
  landline: ["landline", "fixed", "fixedline", "landlinerate", "landlineperminute", "fixedlinerate"],
  mobile: ["mobile", "mobilerate", "cell", "cellular", "mobileperminute"],
  sms: ["sms", "smsrate", "message", "messagerate", "smsprice"],
  currency: ["currency", "currencycode", "ccy"],
  interval: ["interval", "billinginterval", "billingincrement", "increment", "billing"],
  connectionFee: ["connectionfee", "setupfee", "callsetupfee", "connectcharge"],
  featured: ["featured", "popular", "highlight", "top"],
  slug: ["slug", "urlslug", "countryslug"],
  destinationType: ["type", "destinationtype", "service", "servicetype"],
  destinationLabel: ["destination", "destinationlabel", "label", "carrier", "network", "breakout"],
  price: ["price", "rate", "perminute", "priceperminute", "cost", "amount"],
  notes: ["notes", "note", "description", "comment", "instructions"],
};

/** ISO2 -> region for the destinations we ship flags/copy for. */
const REGION_BY_ISO2: Record<string, Region> = {
  AT: "europe", BE: "europe", BG: "europe", CH: "europe", CY: "europe", CZ: "europe",
  DE: "europe", DK: "europe", EE: "europe", ES: "europe", FI: "europe", FR: "europe",
  GB: "europe", GR: "europe", HR: "europe", HU: "europe", IE: "europe", IS: "europe",
  IT: "europe", LT: "europe", LU: "europe", LV: "europe", MT: "europe", NL: "europe",
  NO: "europe", PL: "europe", PT: "europe", RO: "europe", RS: "europe", SE: "europe",
  SI: "europe", SK: "europe", UA: "europe", MD: "europe", AL: "europe", TR: "asia",
  US: "north-america", CA: "north-america", MX: "north-america", GT: "north-america",
  CR: "north-america", PA: "north-america", DO: "north-america", JM: "north-america",
  BR: "south-america", AR: "south-america", CL: "south-america", CO: "south-america",
  PE: "south-america", UY: "south-america", EC: "south-america", VE: "south-america",
  CN: "asia", JP: "asia", KR: "asia", IN: "asia", ID: "asia", MY: "asia", SG: "asia",
  TH: "asia", VN: "asia", PH: "asia", PK: "asia", BD: "asia", IL: "asia", AE: "asia",
  SA: "asia", QA: "asia", KZ: "asia", HK: "asia", TW: "asia",
  ZA: "africa", NG: "africa", EG: "africa", KE: "africa", MA: "africa", GH: "africa",
  TN: "africa", DZ: "africa", ET: "africa", TZ: "africa",
  AU: "oceania", NZ: "oceania", FJ: "oceania", PG: "oceania",
};

const REGION_ALIASES: Record<string, Region> = {
  europe: "europe", eu: "europe", eea: "europe", emea: "europe",
  northamerica: "north-america", namer: "north-america", na: "north-america",
  usacanada: "north-america", southamerica: "south-america", latam: "south-america",
  latinamerica: "south-america", asia: "asia", apac: "asia", asiapacific: "asia",
  middleeast: "asia", africa: "africa", oceania: "oceania", australia: "oceania",
};

const CURRENCIES: CurrencyCode[] = [
  "EUR", "USD", "GBP", "CHF", "CAD", "AUD", "PLN", "SEK", "NOK", "DKK", "CZK", "RON", "AED", "INR",
];

function buildHeaderIndex(header: string[]): Record<string, number> {
  const map: Record<string, number> = {};
  header.forEach((raw, index) => {
    const key = norm(raw);
    if (!key) return;
    for (const [field, aliases] of Object.entries(COLUMN_ALIASES)) {
      if (map[field] !== undefined) continue;
      if (aliases.some((alias) => key === alias || key.startsWith(alias))) map[field] = index;
    }
  });
  return map;
}

function slugify(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function toNumber(raw: string | undefined): number | undefined {
  if (!raw) return undefined;
  const cleaned = raw.replace(/[^\d.,-]/g, "").replace(/\s/g, "");
  if (!cleaned) return undefined;
  // "0,035" (EU decimal comma) vs "1,234.56"
  const value =
    cleaned.includes(",") && !cleaned.includes(".")
      ? Number(cleaned.replace(",", "."))
      : Number(cleaned.replace(/,/g, ""));
  return Number.isFinite(value) ? value : undefined;
}

function toDialCode(raw: string | undefined): string | undefined {
  if (!raw) return undefined;
  const digits = raw.replace(/[^\d]/g, "");
  return digits ? `+${digits}` : undefined;
}

function toCurrency(raw: string | undefined, fallback: CurrencyCode): CurrencyCode {
  const code = (raw ?? "").trim().toUpperCase() as CurrencyCode;
  return CURRENCIES.includes(code) ? code : fallback;
}

function toRegion(raw: string | undefined, iso2: string): Region {
  const key = norm(raw ?? "");
  return REGION_ALIASES[key] ?? REGION_BY_ISO2[iso2.toUpperCase()] ?? "europe";
}

function toDestinationType(raw: string | undefined): DestinationType | undefined {
  const key = norm(raw ?? "");
  if (!key) return undefined;
  if (key.startsWith("sms") || key.startsWith("message") || key.startsWith("text")) return "sms";
  if (key.startsWith("mobile") || key.startsWith("cell")) return "mobile";
  if (key.startsWith("landline") || key.startsWith("fixed")) return "landline";
  return undefined;
}

const truthy = (raw: string | undefined) =>
  ["yes", "true", "1", "y", "x", "✓"].includes((raw ?? "").trim().toLowerCase());

export type ParsedSheet = { countries: Country[]; rates: Rate[] };

/**
 * Converts a Google Sheet CSV export into typed countries + rates.
 *
 * Two layouts are supported automatically:
 *  - wide:  one row per country with landline / mobile / sms price columns
 *  - long:  one row per destination with a "type" and "price" column
 * Column headers are matched case-insensitively against common aliases.
 */
export function parseRatesSheet(
  csv: string,
  options: { defaultCurrency?: CurrencyCode } = {},
): ParsedSheet {
  const defaultCurrency = options.defaultCurrency ?? "EUR";
  const table = parseCsv(csv);
  if (table.length < 2) return { countries: [], rates: [] };

  // The header may not be the very first row (title rows are common).
  let headerIndex = 0;
  let header = table[0] ?? [];
  let index = buildHeaderIndex(header);
  for (let i = 0; i < Math.min(table.length, 6); i += 1) {
    const candidate = buildHeaderIndex(table[i] ?? []);
    if (candidate['country'] !== undefined) {
      headerIndex = i;
      header = table[i] ?? [];
      index = candidate;
      break;
    }
  }
  if (index['country'] === undefined) return { countries: [], rates: [] };

  const cell = (row: string[], field: string): string | undefined => {
    const at = index[field];
    if (at === undefined) return undefined;
    const value = row[at];
    return value?.trim() ? value.trim() : undefined;
  };

  const countries = new Map<string, Country>();
  const rates: Rate[] = [];
  const isLong = index['destinationType'] !== undefined && index['price'] !== undefined;
  const seenHeadline = new Set<string>();

  for (const row of table.slice(headerIndex + 1)) {
    const name = cell(row, "country");
    if (!name) continue;

    const slug = cell(row, "slug") ?? slugify(name);
    if (!slug) continue;
    const iso2 = (cell(row, "iso2") ?? "").toUpperCase().slice(0, 2);
    const currency = toCurrency(cell(row, "currency"), defaultCurrency);
    const interval = toNumber(cell(row, "interval"));
    const connectionFee = toNumber(cell(row, "connectionFee"));

    if (!countries.has(slug)) {
      countries.set(slug, {
        id: slug,
        name,
        slug,
        iso2: iso2 || slug.slice(0, 2).toUpperCase(),
        iso3: cell(row, "iso3")?.toUpperCase(),
        dialCode: toDialCode(cell(row, "dialCode")) ?? "",
        region: toRegion(cell(row, "region"), iso2),
        currencyCode: currency,
        shortDescription: cell(row, "notes"),
        featured: truthy(cell(row, "featured")),
        active: true,
      });
    }

    const push = (
      type: DestinationType,
      price: number,
      label?: string | undefined,
      prefix?: string | undefined,
    ) => {
      const headlineKey = `${slug}:${type}`;
      const isHeadline = !label && !seenHeadline.has(headlineKey);
      if (isHeadline) seenHeadline.add(headlineKey);
      rates.push({
        id: `${slug}-${type}-${rates.length}`,
        countryId: slug,
        destinationType: type,
        ...(label ? { destinationLabel: label } : {}),
        ...(prefix ? { prefix } : {}),
        price,
        currency,
        unit: type === "sms" ? "message" : "minute",
        ...(interval ? { billingIntervalSeconds: interval } : {}),
        ...(connectionFee !== undefined ? { connectionFee } : {}),
        active: true,
      });
    };

    if (isLong) {
      const type = toDestinationType(cell(row, "destinationType"));
      const price = toNumber(cell(row, "price"));
      if (type && price !== undefined) {
        const rawLabel = cell(row, "destinationLabel");
        const label = rawLabel && norm(rawLabel) !== norm(name) ? rawLabel : undefined;
        push(type, price, label, cell(row, "dialCode") ? undefined : undefined);
      }
      continue;
    }

    (["landline", "mobile", "sms"] as DestinationType[]).forEach((type) => {
      const price = toNumber(cell(row, type));
      if (price !== undefined) push(type, price);
    });
  }

  return { countries: [...countries.values()], rates };
}
