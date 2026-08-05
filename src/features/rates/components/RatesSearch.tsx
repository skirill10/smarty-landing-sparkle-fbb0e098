import { Search } from "lucide-react";

type RatesSearchProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  id?: string;
  label?: string;
};

export function RatesSearch({
  value,
  onChange,
  placeholder,
  id = "rates-search",
  label = "Search rates by country or calling code",
}: RatesSearchProps) {
  return (
    <div className="w-full">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <input
          id={id}
          type="search"
          inputMode="search"
          autoComplete="off"
          maxLength={60}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="h-12 w-full rounded-xl border border-border bg-card pl-11 pr-4 text-sm outline-none transition-colors focus-visible:border-foreground focus-visible:ring-2 focus-visible:ring-brand/40"
        />
      </div>
    </div>
  );
}
