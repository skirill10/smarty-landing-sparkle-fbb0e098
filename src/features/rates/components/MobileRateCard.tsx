import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { REGION_LABELS, type CountryRateRow, type CurrencyCode } from "../types";
import { formatInterval } from "../utils/format";
import { CountryFlag } from "./CountryFlag";
import { RateValue } from "./RateValue";

/** Stacked card used instead of a wide horizontal table on small screens. */
export function MobileRateCard({ row, currency }: { row: CountryRateRow; currency: CurrencyCode }) {
  const { country, landline, mobile, sms } = row;

  return (
    <article className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <CountryFlag iso2={country.iso2} name={country.name} flagUrl={country.flagUrl} />
          <div className="min-w-0">
            <h3 className="truncate font-display text-base font-semibold">{country.name}</h3>
            <p className="text-sm text-muted-foreground">
              {country.dialCode} · {REGION_LABELS[country.region]}
            </p>
          </div>
        </div>
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
        <div>
          <dt className="text-muted-foreground">Landline</dt>
          <dd className="mt-0.5">
            <RateValue rate={landline} currency={currency} service="landline" />
          </dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Mobile</dt>
          <dd className="mt-0.5">
            <RateValue rate={mobile} currency={currency} service="mobile" />
          </dd>
        </div>
        <div>
          <dt className="text-muted-foreground">SMS</dt>
          <dd className="mt-0.5">
            <RateValue rate={sms} currency={currency} service="sms" />
          </dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Billing</dt>
          <dd className="mt-0.5 text-sm">{formatInterval(landline?.billingIntervalSeconds)}</dd>
        </div>
      </dl>

      <Link
        to="/rates/$countrySlug"
        params={{ countrySlug: country.slug }}
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
      >
        View {country.name} details
        <ArrowRight className="size-4" aria-hidden="true" />
      </Link>
    </article>
  );
}
