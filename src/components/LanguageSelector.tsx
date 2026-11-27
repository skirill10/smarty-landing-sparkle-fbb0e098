import { Globe } from "lucide-react";
import { isLocaleCode, locales } from "@/i18n/config";
import { useLocale } from "@/i18n/LocaleProvider";

export function LanguageSelector() {
  const { locale, setLocale, t } = useLocale();
  return (
    <label className="inline-flex min-h-11 items-center gap-2 rounded-md border border-border bg-card px-3.5 text-sm font-medium text-foreground">
      <Globe className="size-4 text-brand" aria-hidden="true" />
      <span className="sr-only">{t("Select language")}</span>
      <select
        value={locale}
        onChange={(event) => {
          if (isLocaleCode(event.target.value)) setLocale(event.target.value);
        }}
        className="min-h-11 max-w-full cursor-pointer bg-transparent py-2 focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        {locales.map((option) => (
          <option key={option.code} value={option.code} lang={option.code} dir={option.dir}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
