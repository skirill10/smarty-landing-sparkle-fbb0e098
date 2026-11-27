import { useT } from "@/i18n/LocaleProvider";

export function SkipLink() {
  const t = useT();
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-background focus:px-4 focus:py-3 focus:text-foreground focus:outline-2 focus:outline-offset-2"
      onClick={() => document.getElementById("main-content")?.focus()}
    >
      {t("Skip to main content")}
    </a>
  );
}
