import type { CurrencyCode, DestinationType, Region, RatesSort } from "../types";
import { SERVICE_LABELS } from "../types";
import { CurrencySelector, selectClass } from "./CurrencySelector";
import { RegionFilter } from "./RegionFilter";

export type RatesFilterState = {
  region: Region | "all";
  service: DestinationType | "all";
  currency: CurrencyCode;
  sort: RatesSort;
};

type RatesFiltersProps = RatesFilterState & {
  onChange: (patch: Partial<RatesFilterState>) => void;
  resultsLabel: string;
  onReset: () => void;
};

const services: (DestinationType | "all")[] = ["all", "landline", "mobile", "sms"];

export function RatesFilters({
  region,
  service,
  currency,
  sort,
  onChange,
  resultsLabel,
  onReset,
}: RatesFiltersProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="grid gap-5 md:grid-cols-3">
        <RegionFilter value={region} onChange={(value) => onChange({ region: value })} />

        <div>
          <label
            htmlFor="rates-sort"
            className="mb-2 block text-xs font-semibold uppercase tracking-wide text-muted-foreground"
          >
            Sort by
          </label>
          <select
            id="rates-sort"
            value={sort}
            onChange={(event) => onChange({ sort: event.target.value as RatesSort })}
            className={selectClass}
          >
            <option value="name-asc">Country A–Z</option>
            <option value="name-desc">Country Z–A</option>
            <option value="price-asc">Lowest rate first</option>
            <option value="price-desc">Highest rate first</option>
          </select>
        </div>

        <CurrencySelector value={currency} onChange={(value) => onChange({ currency: value })} />
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5">
        <fieldset>
          <legend className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Service
          </legend>
          <div className="flex flex-wrap gap-2">
            {services.map((item) => {
              const active = service === item;
              return (
                <button
                  key={item}
                  type="button"
                  aria-pressed={active}
                  onClick={() => onChange({ service: item })}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-brand/40 ${
                    active
                      ? "border-foreground bg-foreground text-background"
                      : "border-border text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  {item === "all" ? "All" : SERVICE_LABELS[item]}
                </button>
              );
            })}
          </div>
        </fieldset>

        <div className="flex items-center gap-4">
          <p aria-live="polite" className="text-sm text-muted-foreground">
            {resultsLabel}
          </p>
          <button
            type="button"
            onClick={onReset}
            className="text-sm font-semibold underline decoration-border underline-offset-4 hover:decoration-foreground"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
