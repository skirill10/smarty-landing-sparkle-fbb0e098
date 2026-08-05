import { Link } from "@/components/Link";
import { ArrowRight } from "lucide-react";
import { REGION_LABELS, type CountryRateRow, type CurrencyCode } from "../types";
import { formatInterval } from "../utils/format";
import { CountryFlag } from "./CountryFlag";
import { MobileRateCard } from "./MobileRateCard";
import { RateValue } from "./RateValue";

type RatesTableProps = {
  rows: CountryRateRow[];
  currency: CurrencyCode;
  caption?: string;
};

export function RatesTable({ rows, currency, caption = "International calling and messaging rates by destination" }: RatesTableProps) {
  return (
    <>
      {/* Mobile: stacked cards */}
      <div className="grid gap-4 md:hidden">
        {rows.map((row) => (
          <MobileRateCard key={row.country.id} row={row} currency={currency} />
        ))}
      </div>

      {/* Desktop: semantic table */}
      <div className="hidden overflow-hidden rounded-2xl border border-border bg-card md:block">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr className="border-b border-border bg-light-grey/60">
              <th scope="col" className="px-6 py-4 font-display text-sm font-semibold">Destination</th>
              <th scope="col" className="px-4 py-4 font-display text-sm font-semibold">Calling code</th>
              <th scope="col" className="px-4 py-4 font-display text-sm font-semibold">Landline</th>
              <th scope="col" className="px-4 py-4 font-display text-sm font-semibold">Mobile</th>
              <th scope="col" className="px-4 py-4 font-display text-sm font-semibold">SMS</th>
              <th scope="col" className="px-4 py-4 font-display text-sm font-semibold">Billing interval</th>
              <th scope="col" className="px-6 py-4 text-right font-display text-sm font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ country, landline, mobile, sms }) => (
              <tr key={country.id} className="border-b border-border last:border-0 transition-colors hover:bg-light-grey/40">
                <th scope="row" className="h-[68px] px-6 py-4 text-left font-normal">
                  <span className="flex items-center gap-3">
                    <CountryFlag iso2={country.iso2} name={country.name} flagUrl={country.flagUrl} />
                    <span>
                      <Link
                        to="/rates/$countrySlug"
                        params={{ countrySlug: country.slug }}
                        className="font-semibold hover:underline"
                      >
                        {country.name}
                      </Link>
                      <span className="block text-xs text-muted-foreground">
                        {REGION_LABELS[country.region]}
                      </span>
                    </span>
                  </span>
                </th>
                <td className="px-4 py-4 text-sm tabular-nums text-muted-foreground">{country.dialCode}</td>
                <td className="px-4 py-4">
                  <RateValue rate={landline} currency={currency} service="landline" />
                </td>
                <td className="px-4 py-4">
                  <RateValue rate={mobile} currency={currency} service="mobile" />
                </td>
                <td className="px-4 py-4">
                  <RateValue rate={sms} currency={currency} service="sms" />
                </td>
                <td className="px-4 py-4 text-sm text-muted-foreground">
                  {formatInterval(landline?.billingIntervalSeconds)}
                </td>
                <td className="px-6 py-4 text-right">
                  <Link
                    to="/rates/$countrySlug"
                    params={{ countrySlug: country.slug }}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
                  >
                    View details
                    <ArrowRight className="size-4" aria-hidden="true" />
                    <span className="sr-only">for {country.name}</span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
