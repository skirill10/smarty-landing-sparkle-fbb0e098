export type LocaleCode =
  | "en"
  | "es"
  | "nl"
  | "fr"
  | "de"
  | "sv"
  | "pl"
  | "el"
  | "uk"
  | "ja"
  | "zh"
  | "tr"
  | "ar";

export type LocaleDef = {
  code: LocaleCode;
  /** Name shown in the language selector, in the language itself. */
  label: string;
  /** English name, used for translation prompts and aria labels. */
  englishName: string;
  dir: "ltr" | "rtl";
};

export const DEFAULT_LOCALE: LocaleCode = "en";

export const locales: LocaleDef[] = [
  { code: "en", label: "English", englishName: "English", dir: "ltr" },
  { code: "es", label: "Español", englishName: "Spanish", dir: "ltr" },
  { code: "nl", label: "Nederlands", englishName: "Dutch", dir: "ltr" },
  { code: "fr", label: "Français", englishName: "French", dir: "ltr" },
  { code: "de", label: "Deutsch", englishName: "German", dir: "ltr" },
  { code: "sv", label: "Svenska", englishName: "Swedish", dir: "ltr" },
  { code: "pl", label: "Polski", englishName: "Polish", dir: "ltr" },
  { code: "el", label: "Ελληνικά", englishName: "Greek", dir: "ltr" },
  { code: "uk", label: "Українська", englishName: "Ukrainian", dir: "ltr" },
  { code: "ja", label: "日本語", englishName: "Japanese", dir: "ltr" },
  { code: "zh", label: "中文", englishName: "Chinese (Simplified)", dir: "ltr" },
  { code: "tr", label: "Türkçe", englishName: "Turkish", dir: "ltr" },
  { code: "ar", label: "العربية", englishName: "Arabic", dir: "rtl" },
];

export const localeCodes = locales.map((l) => l.code);

export function isLocaleCode(value: string): value is LocaleCode {
  return (localeCodes as string[]).includes(value);
}

export function getLocaleDef(code: LocaleCode): LocaleDef {
  return locales.find((l) => l.code === code) ?? locales[0]!;
}
