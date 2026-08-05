import type { CurrencyCode, DestinationType, Rate } from "../types";
import { formatRate } from "../utils/format";

const SERVICE_MARKS: Record<DestinationType, string> = {
  landline: "LL",
  mobile: "MO",
  sms: "SMS",
};

type RateValueProps = {
  rate?: Rate | undefined;
  currency: CurrencyCode;
  service?: DestinationType | undefined;
  /** Shows the short service mark so the value never relies on colour alone. */
  showMark?: boolean;
};

export function RateValue({ rate, currency, service, showMark = false }: RateValueProps) {
  if (!rate) {
    return (
      <span className="text-sm text-muted-foreground">
        <span aria-hidden="true">—</span>
        <span className="sr-only">Not available</span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-baseline gap-2 whitespace-nowrap">
      {showMark && service ? (
        <span className="rounded border border-border px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
          {SERVICE_MARKS[service]}
        </span>
      ) : null}
      <span className="text-sm font-semibold tabular-nums">{formatRate(rate, currency)}</span>
    </span>
  );
}
