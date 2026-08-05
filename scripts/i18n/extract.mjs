// Heuristic extractor: pulls human-readable string literals out of the files that
// render main-menu pages, so they can be added to the translation source list.
import { readFileSync } from "node:fs";

const FILES = [
  "src/routes/index.tsx",
  "src/routes/pricing.tsx",
  "src/components/SiteHeader.tsx",
  "src/components/SiteFooter.tsx",
  "src/components/CtaBand.tsx",
  "src/components/PricingCta.tsx",
  "src/components/HeyAiSection.tsx",
  "src/components/BuiltForSection.tsx",
  "src/components/IntegrationsSection.tsx",
  "src/components/MarketingPage.tsx",
  "src/components/LanguageSelector.tsx",
];

const bad = /(^\/|^#|^https?:|px-|py-|text-|bg-|rounded|grid|flex|@\/|\.(tsx?|jpg|png|svg|json)$|^[a-z-]+$)/;
const out = new Set();
for (const file of FILES) {
  const src = readFileSync(file, "utf8");
  for (const match of src.matchAll(/"((?:[^"\\]|\\.){4,240})"/g)) {
    const value = match[1].replace(/\\n/g, "\n").replace(/\\"/g, '"');
    if (bad.test(value) || !/[A-Za-z]{3}/.test(value)) continue;
    if (!/^[A-Z(“0-9$+©]/.test(value)) continue;
    out.add(value.trim());
  }
  // JSX text nodes on their own line, e.g. "  Start free trial"
  for (const line of src.split("\n")) {
    const text = line.trim();
    if (/^[A-Z][A-Za-z0-9 ,.'&?!:%$—–()+/-]{3,120}$/.test(text) && / /.test(text) && !text.includes("=")) {
      out.add(text.replace(/\s*→$/, " →"));
    }
  }
}
console.log(JSON.stringify([...out], null, 2));
