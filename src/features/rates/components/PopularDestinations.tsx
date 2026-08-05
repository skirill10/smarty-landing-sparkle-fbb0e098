import { Link } from "@/components/Link";
import { ArrowUpRight } from "lucide-react";
import type { CountryRateRow, CurrencyCode } from "../types";
import { convert, formatPrice } from "../utils/format";
import { CountryFlag } from "./CountryFlag";

/** Compact grid of frequently searched destinations, driven entirely by data. */
export function PopularDestinations({
  rows,
  currency,
}: {
  rows: CountryRateRow[];
  currency: CurrencyCode;
}) {
  if (!rows.length) return null;

  return (
    <section aria-labelledby="popular-destinations" className="mx-auto max-w-7xl px-5 pb-4">
      <h2 id="popular-destinations" className="font-display text-xl font-semibold tracking-tight">
        Popular destinations
      </h2>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {rows.map(({ country, landline, mobile }) => {
          const cheapest = Math.min(
            landline?.price ?? Number.POSITIVE_INFINITY,
            mobile?.price ?? Number.POSITIVE_INFINITY,
          );
          const from = Number.isFinite(cheapest)
            ? formatPrice(convert(cheapest, landline?.currency ?? "EUR", currency), currency)
            : null;

          return (
            <li key={country.id}>
              <Link
                to="/rates/$countrySlug"
                params={{ countrySlug: country.slug }}
                className="group flex h-full items-center justify-between gap-3 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-foreground"
              >
                <span className="flex min-w-0 items-center gap-3">
                  <CountryFlag iso2={country.iso2} name={country.name} flagUrl={country.flagUrl} />
                  <span className="min-w-0">
                    <span className="block truncate font-semibold">{country.name}</span>
                    <span className="block text-sm text-muted-foreground">{country.dialCode}</span>
                  </span>
                </span>
                <span className="shrink-0 text-right">
                  {from ? (
                    <span className="block text-sm font-semibold tabular-nums">from {from}</span>
                  ) : null}
                  <ArrowUpRight
                    className="ml-auto mt-1 size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
