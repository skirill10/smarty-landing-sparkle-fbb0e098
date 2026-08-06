import { REGION_LABELS, REGIONS, type Region } from "../types";
import { selectClass } from "./CurrencySelector";

export function RegionFilter({
  value,
  onChange,
  id = "rates-region",
}: {
  value: Region | "all";
  onChange: (value: Region | "all") => void;
  id?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-xs font-semibold uppercase tracking-wide text-muted-foreground"
      >
        Region
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value as Region | "all")}
        className={selectClass}
      >
        <option value="all">All regions</option>
        {REGIONS.map((region) => (
          <option key={region} value={region}>
            {REGION_LABELS[region]}
          </option>
        ))}
      </select>
    </div>
  );
}
