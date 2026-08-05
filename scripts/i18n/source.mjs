// Builds src/i18n/source.json: every English string that should be translated.
// Scope: site chrome (header, footer, CTAs) + the pages reachable from the main menu.
import { writeFileSync } from "node:fs";
import { pages } from "../../src/content/pages.ts";

const CHROME = [
  // Header
  "Product", "Solutions", "Resources", "Pricing", "Log in", "Talk to sales", "Try for free",
  "Toggle menu", "Connect", "Collaborate", "Automate", "By industry", "By company size",
  "By use case", "Learn more", "Get help", "Company",
  "Calling", "Text messaging", "Phone menu & routing", "Shared numbers", "Analytics & oversight",
  "CRM", "Tasks", "Smarty AI Assist", "Integrations", "Smartytel API",
  "Home services", "Law firms", "Property management", "Healthcare", "Education",
  "Startups", "Small business", "Franchise", "Sales", "Support", "Operations",
  "Blog", "Customers", "Partners", "Product demo", "Webinars", "Tutorials",
  "Voicemail generator", "Number generator", "Community", "Resource center",
  "Smartytel Academy", "Developer docs", "What's new", "Downloads", "Port your number",
  "Carrier registration", "System status", "About", "Careers", "Press", "Podcast", "Contact us",
  "Ready to get started?", "Watch a quick demo →", "Set up your number",
  // Footer / language
  "Language", "Select language", "International rates", "Follow us",
  // Shared CTAs
  "Never miss a call or customer", "Start free trial", "See pricing", "See rates",
  "Book a demo", "Get started", "Contact sales", "Learn more",
];

const seen = new Set();
const out = [];
const add = (value) => {
  if (typeof value !== "string") return;
  const trimmed = value.trim();
  if (!trimmed || seen.has(trimmed)) return;
  seen.add(trimmed);
  out.push(trimmed);
};

CHROME.forEach(add);

for (const content of Object.values(pages)) {
  add(content.eyebrow);
  add(content.headline);
  add(content.sub);
  for (const bullet of content.bullets ?? []) {
    add(bullet.title);
    add(bullet.body);
  }
}

writeFileSync("src/i18n/source.json", JSON.stringify(out, null, 2) + "\n");
console.log("source strings:", out.length);
