import { flagEmoji } from "../utils/format";

type CountryFlagProps = {
  iso2: string;
  name: string;
  flagUrl?: string | undefined;
  className?: string;
};

/**
 * Flag rendered as a Unicode glyph by default (zero bytes to download); a
 * CMS-supplied flagUrl is used when present and lazy-loaded.
 */
export function CountryFlag({ iso2, name, flagUrl, className = "" }: CountryFlagProps) {
  if (flagUrl) {
    return (
      <img
        src={flagUrl}
        alt={`Flag of ${name}`}
        loading="lazy"
        decoding="async"
        width={24}
        height={18}
        className={`h-[18px] w-6 shrink-0 rounded-[3px] object-cover ${className}`}
      />
    );
  }

  return (
    <span
      role="img"
      aria-label={`Flag of ${name}`}
      className={`shrink-0 text-lg leading-none ${className}`}
    >
      {flagEmoji(iso2)}
    </span>
  );
}
