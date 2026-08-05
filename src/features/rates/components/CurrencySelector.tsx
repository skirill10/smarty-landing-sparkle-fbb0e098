import { CURRENCY_LIST } from "../utils/format";
import type { CurrencyCode } from "../types";

const selectClass =
  "h-12 w-full rounded-xl border border-border bg-card px-4 text-sm font-medium outline-none transition-colors focus-visible:border-foreground focus-visible:ring-2 focus-visible:ring-brand/40";

export function CurrencySelector({
  value,
  onChange,
  id = "rates-currency",
  hint,
}: {
  value: CurrencyCode;
  onChange: (value: CurrencyCode) => void;
  id?: string;
  /** Optional note, e.g. that the currency was picked from the visitor's region. */
  hint?: string | undefined;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Currency
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value as CurrencyCode)}
        aria-describedby={hint ? `${id}-hint` : undefined}
        className={selectClass}
      >
        {CURRENCY_LIST.map((currency) => (
          <option key={currency.code} value={currency.code}>
            {currency.code} — {currency.label}
          </option>
        ))}
      </select>
      {hint ? (
        <p id={`${id}-hint`} className="mt-2 text-xs text-muted-foreground">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export { selectClass };
