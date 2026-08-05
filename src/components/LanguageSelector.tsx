import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Globe } from "lucide-react";
import { locales } from "@/i18n/config";
import { useLocale } from "@/i18n/LocaleProvider";

export function LanguageSelector() {
  const { locale, setLocale, t } = useLocale();
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const current = locales.find((l) => l.code === locale) ?? locales[0]!;

  useEffect(() => {
    if (!open) return;
    function onDown(event: MouseEvent) {
      if (!wrap.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={wrap} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("Select language")}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3.5 py-2 text-sm font-medium text-foreground transition-colors hover:border-foreground"
      >
        <Globe className="size-4 text-brand" aria-hidden="true" />
        {current.label}
        <ChevronDown
          className={`size-3.5 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {open ? (
        <ul
          role="listbox"
          aria-label={t("Language")}
          className="absolute bottom-full z-50 mb-2 max-h-72 w-52 overflow-y-auto rounded-md border border-border bg-card p-1 shadow-xl"
        >
          {locales.map((option) => {
            const active = option.code === locale;
            return (
              <li key={option.code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  lang={option.code}
                  onClick={() => {
                    setLocale(option.code);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between gap-2 rounded-md px-3 py-2 text-start text-sm transition-colors hover:bg-secondary ${
                    active ? "font-semibold text-foreground" : "text-foreground/85"
                  }`}
                >
                  <span>
                    {option.label}
                    <span className="ms-2 text-xs uppercase text-muted-foreground">
                      {option.code}
                    </span>
                  </span>
                  {active ? <Check className="size-4 text-brand" aria-hidden="true" /> : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
