// Translates src/i18n/source.json into src/i18n/messages/<locale>.json via the
// Lovable AI Gateway. Existing translations are kept; only missing keys are sent.
import { readFileSync, writeFileSync, existsSync } from "node:fs";

const LOCALES = [
  ["es", "Spanish"],
  ["nl", "Dutch"],
  ["fr", "French"],
  ["de", "German"],
  ["sv", "Swedish"],
  ["pl", "Polish"],
  ["el", "Greek"],
  ["uk", "Ukrainian"],
  ["ja", "Japanese"],
  ["zh", "Simplified Chinese"],
  ["tr", "Turkish"],
  ["ar", "Arabic"],
];
const CHUNK = 40;
const source = JSON.parse(readFileSync("src/i18n/source.json", "utf8"));
const key = process.env.LOVABLE_API_KEY;
if (!key) throw new Error("LOVABLE_API_KEY missing");

async function translateChunk(items, language) {
  const body = {
    model: "google/gemini-2.5-flash",
    messages: [
      {
        role: "system",
        content:
          `You are a professional software localiser. Translate UI and marketing strings for Smartytel, a business phone system, into ${language}. ` +
          `Rules: keep the brand names "Smartytel", "Smarty AI Assist", "WhatsApp", "Telegram", "CRM", "API", "SMS", "IVR" untranslated; ` +
          `keep punctuation, arrows, currency symbols and numbers as-is; keep the tone concise and commercial; do not add explanations. ` +
          `Reply with a JSON object mapping each input string to its translation, nothing else.`,
      },
      { role: "user", content: JSON.stringify(items) },
    ],
    response_format: { type: "json_object" },
  };
  const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`${language}: ${res.status} ${await res.text()}`);
  const json = await res.json();
  return JSON.parse(json.choices[0].message.content);
}

for (const [code, language] of LOCALES) {
  const path = `src/i18n/messages/${code}.json`;
  const current = existsSync(path) ? JSON.parse(readFileSync(path, "utf8")) : {};
  const missing = source.filter((s) => !current[s]);
  for (let i = 0; i < missing.length; i += CHUNK) {
    const chunk = missing.slice(i, i + CHUNK);
    let attempt = 0;
    for (;;) {
      try {
        Object.assign(current, await translateChunk(chunk, language));
        break;
      } catch (error) {
        if (++attempt >= 3) throw error;
        await new Promise((r) => setTimeout(r, 2000 * attempt));
      }
    }
  }
  const ordered = {};
  for (const s of source) if (current[s]) ordered[s] = current[s];
  writeFileSync(path, JSON.stringify(ordered, null, 2) + "\n");
  console.log(code, Object.keys(ordered).length, "/", source.length);
}
