import { CURRENCIES, CURRENCY_SYMBOLS } from "../utils/format";
import type { CurrencyCode } from "../types";

const selectClass =
  "h-12 w-full rounded-xl border border-border bg-card px-4 text-sm font-medium outline-none transition-colors focus-visible:border-foreground focus-visible:ring-2 focus-visible:ring-brand/40";

export function CurrencySelector({
  value,
  onChange,
  id = "rates-currency",
}: {
  value: CurrencyCode;
  onChange: (value: CurrencyCode) => void;
  id?: string;
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
        className={selectClass}
      >
        {CURRENCIES.map((currency) => (
          <option key={currency} value={currency}>
            {currency} ({CURRENCY_SYMBOLS[currency]})
          </option>
        ))}
      </select>
    </div>
  );
}

export { selectClass };
