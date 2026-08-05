import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useNavigate, useParams, useRouterState } from "@tanstack/react-router";
import {
  DEFAULT_LOCALE,
  getLocaleDef,
  isLocaleCode,
  localeToPrefix,
  prefixToLocale,
  type LocaleCode,
} from "./config";

const STORAGE_KEY = "smartytel-locale";

/** Message bundles are loaded on demand so English visitors download nothing extra. */
const loaders: Record<Exclude<LocaleCode, "en">, () => Promise<Record<string, string>>> = {
  es: () => import("./messages/es.json").then((m) => m.default),
  nl: () => import("./messages/nl.json").then((m) => m.default),
  fr: () => import("./messages/fr.json").then((m) => m.default),
  de: () => import("./messages/de.json").then((m) => m.default),
  sv: () => import("./messages/sv.json").then((m) => m.default),
  pl: () => import("./messages/pl.json").then((m) => m.default),
  el: () => import("./messages/el.json").then((m) => m.default),
  uk: () => import("./messages/uk.json").then((m) => m.default),
  ja: () => import("./messages/ja.json").then((m) => m.default),
  zh: () => import("./messages/zh.json").then((m) => m.default),
  tr: () => import("./messages/tr.json").then((m) => m.default),
  ar: () => import("./messages/ar.json").then((m) => m.default),
};

type LocaleContextValue = {
  locale: LocaleCode;
  setLocale: (locale: LocaleCode) => void;
  /** Translate an English source string; falls back to the English text. */
  t: (source: string) => string;
};

const LocaleContext = createContext<LocaleContextValue>({
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
  t: (source) => source,
});

function storedLocale(): LocaleCode | undefined {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && isLocaleCode(stored)) return stored;
  } catch {
    // Ignore storage errors.
  }
  return undefined;
}

function browserLocale(): LocaleCode | undefined {
  const candidates = navigator.languages ?? [navigator.language];
  for (const tag of candidates) {
    const base = tag.toLowerCase().split("-")[0] ?? "";
    if (base === "zh") return "zh";
    if (isLocaleCode(base)) return base;
  }
  return undefined;
}

/** Path without the language prefix, e.g. "/es/pricing" -> "/pricing". */
function stripPrefix(pathname: string) {
  const [, first = "", ...rest] = pathname.split("/");
  if (prefixToLocale(first)) return "/" + rest.join("/");
  return pathname;
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  // The URL is the source of truth: /es/pricing renders Spanish.
  const params = useParams({ strict: false }) as { locale?: string };
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const locale = prefixToLocale(params.locale) ?? DEFAULT_LOCALE;
  const [messages, setMessages] = useState<Record<string, string>>({});

  const goToLocale = useCallback(
    (next: LocaleCode) => {
      const rest = stripPrefix(pathname).replace(/\/$/, "");
      navigate({
        to: `/{-$locale}${rest}` as never,
        params: { locale: localeToPrefix(next) } as never,
      });
    },
    [navigate, pathname],
  );

  const setLocale = useCallback(
    (next: LocaleCode) => {
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // Ignore storage errors.
      }
      goToLocale(next);
    },
    [goToLocale],
  );

  // First visit on an unprefixed URL: honour a saved choice or the browser.
  useEffect(() => {
    if (params.locale) return;
    const preferred = storedLocale() ?? browserLocale();
    if (preferred && preferred !== DEFAULT_LOCALE) goToLocale(preferred);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Canonicalise aliases such as /ua/ -> /uk/.
  useEffect(() => {
    if (params.locale && params.locale !== localeToPrefix(locale)) goToLocale(locale);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.locale]);

  useEffect(() => {
    let active = true;
    if (locale === "en") {
      setMessages({});
    } else {
      loaders[locale]()
        .then((loaded) => {
          if (active) setMessages(loaded);
        })
        .catch(() => {
          if (active) setMessages({});
        });
    }
    const def = getLocaleDef(locale);
    document.documentElement.lang = locale;
    document.documentElement.dir = def.dir;
    return () => {
      active = false;
    };
  }, [locale]);

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      setLocale,
      t: (source: string) => messages[source] ?? source,
    }),
    [locale, setLocale, messages],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  return useContext(LocaleContext);
}

/** Shorthand for components that only need the translate function. */
export function useT() {
  return useContext(LocaleContext).t;
}
