import { flagEmoji } from "../utils/format";

type CountryFlagProps = {
  iso2: string;
  name: string;
  flagUrl?: string | undefined;
  className?: string;
};

/**
 * Flags render as SVG images (flagcdn) because Unicode flag glyphs are not
 * drawn on Windows and most Linux desktops. The emoji stays as a fallback if
 * the image fails, and a CMS-supplied flagUrl always wins.
 */
export function CountryFlag({ iso2, name, flagUrl, className = "" }: CountryFlagProps) {
  const code = iso2.toLowerCase();
  const src = flagUrl ?? `https://flagcdn.com/${code}.svg`;

  return (
    <span
      className={`relative inline-flex h-[18px] w-6 shrink-0 items-center justify-center overflow-hidden rounded-[3px] border border-border/70 bg-secondary text-[11px] leading-none ${className}`}
    >
      <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
        {flagEmoji(iso2) || iso2.toUpperCase()}
      </span>
      <img
        src={src}
        alt={`Flag of ${name}`}
        loading="lazy"
        decoding="async"
        decoding="async"
        width={24}
        height={18}
        className="relative h-full w-full object-cover"
        onError={(event) => {
          event.currentTarget.style.display = "none";
        }}
      />
    </span>
  );
}
