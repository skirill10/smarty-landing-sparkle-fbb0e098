import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { DEFAULT_LOCALE, getLocaleDef, isLocaleCode, type LocaleCode } from "./config";

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

function detectLocale(): LocaleCode {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && isLocaleCode(stored)) return stored;
  } catch {
    // Ignore storage errors.
  }
  const candidates = navigator.languages ?? [navigator.language];
  for (const tag of candidates) {
    const base = tag.toLowerCase().split("-")[0] ?? "";
    if (base === "zh") return "zh";
    if (isLocaleCode(base)) return base;
  }
  return DEFAULT_LOCALE;
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<LocaleCode>(DEFAULT_LOCALE);
  const [messages, setMessages] = useState<Record<string, string>>({});

  // Read the visitor's choice after hydration so server and client markup match.
  useEffect(() => {
    const detected = detectLocale();
    if (detected !== DEFAULT_LOCALE) setLocaleState(detected);
  }, []);

  useEffect(() => {
    let active = true;
    if (locale === DEFAULT_LOCALE) {
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

  const setLocale = useCallback((next: LocaleCode) => {
    setLocaleState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Ignore storage errors.
    }
  }, []);

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
