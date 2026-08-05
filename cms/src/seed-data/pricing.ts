/** Pricing page copy as it ships in src/routes/pricing.tsx. Icons stay in the repo. */
const perks = (items: string[]) => items.map((value) => ({ value }));

export const pricingPage = {
  eyebrow: "Pricing",
  heading: "Business phone pricing, per user",
  sub: "14 days free, then from $12 per user per month billed yearly. Local calling across the US, Canada, the UK and all of Europe.",
  plans: [
    {
      name: "Startup",
      monthly: 15,
      annualMonthly: 12,
      tagline: "For solo operators and small teams getting off a personal number.",
      cta: "Start free trial",
      perks: perks([
        "1 local number included",
        "Free local & long-distance calls",
        "SMS messaging included",
        "WhatsApp, Telegram & chat apps",
        "Mobile & desktop apps",
      ]),
    },
    {
      name: "Business",
      monthly: 25,
      annualMonthly: 20,
      tagline: "For teams that answer together across the US, Canada and Europe.",
      cta: "Start free trial",
      featured: true,
      perks: perks([
        "Everything in Startup",
        "IVR phone menus",
        "Call recording",
        "Call hunting & call forwarding",
        "AI assistance add-on",
        "Live chat support",
      ]),
    },
    {
      name: "Scale",
      monthly: 35,
      annualMonthly: 28,
      tagline: "For contact centres and multi-location brands.",
      cta: "Talk to sales",
      perks: perks([
        "Everything in Business",
        "Call transcription & AI summaries",
        "Custom telephony flows",
        "Slack & email integration flows",
        "Advanced analytics",
        "Dedicated priority support",
      ]),
    },
  ],
  addOns: [
    {
      name: "Additional phone numbers",
      price: "15",
      unit: "Per number, per month\nPriced country by country",
    },
    {
      name: "International calling and messaging",
      note: "Per minute or per message rate based on the destination across the US, Canada, the UK and Europe.",
      linkLabel: "See rates",
    },
    {
      name: "Number porting",
      price: "5",
      unit: "One-time, per number\nKeep your existing number",
    },
    { name: "IVR phone menu", price: "1.50", unit: "Per month\nMulti-level auto-attendant" },
    { name: "Call recording", price: "1.50", unit: "Per month\nStore and replay every call" },
    { name: "Call hunting", price: "0.50", unit: "Per month\nRing the team in order" },
    {
      name: "Call forwarding",
      price: "1.50",
      unit: "Per month\nMobiles, landlines, other countries",
    },
    { name: "AI assistance", price: "3.50", unit: "Per month\nAI answers and qualifies" },
    {
      name: "Transcribe and summarise calls",
      price: "2.50",
      unit: "Per month\nEvery call written up",
    },
    {
      name: "Help desk (trouble ticketing)",
      price: "5",
      unit: "Per user, per month\nTickets, SLAs, case management",
    },
    {
      name: "Connect center (CRM)",
      price: "10",
      unit: "Per user, per month\nContacts, leads, pipelines",
      linkLabel: "Explore CRM",
    },
    { name: "Advanced analytics", price: "15", unit: "Per month\nCustom reports and wallboards" },
    {
      name: "Integration flows (Slack, email)",
      price: "10",
      unit: "Per month\nPush calls into your tools",
    },
    {
      name: "Historical call reports beyond 3 months",
      price: "30",
      unit: "Per month\nLong-term call detail records",
    },
    {
      name: "Custom telephony automated flows",
      price: "50",
      unit: "One-time setup\nBespoke routing built for you",
    },
    {
      name: "Automated SMS (API, Zapier, Make)",
      price: "0.01",
      unit: "Per outgoing text message",
    },
  ],
  aiTiers: [
    { tier: "Tier 1", price: "$0 /mo", included: "10 AI calls", overage: "$1.00 per extra call" },
    { tier: "Tier 2", price: "$25 /mo", included: "40 AI calls", overage: "$0.75 per extra call" },
    { tier: "Tier 3", price: "$49 /mo", included: "100 AI calls", overage: "$0.65 per extra call" },
    { tier: "Tier 4", price: "$99 /mo", included: "250 AI calls", overage: "$0.55 per extra call" },
    { tier: "Tier 5", price: "$199 /mo", included: "600 AI calls", overage: "$0.45 per extra call" },
  ],
  faqs: [
    {
      question: "Is there a free trial?",
      answer:
        "Yes — every account starts on the 14-day Trial plan with a demo number. No credit card required, and you pick a real number when you subscribe.",
    },
    {
      question: "How much does it cost per user?",
      answer:
        "Startup is $15 per user per month, Business $25 and Scale $35. Pay yearly and you save 20% — $12, $20 and $28 per user per month.",
    },
    {
      question: "Which countries are included?",
      answer:
        "Local calling is included country by country across the US, Canada, the UK and the whole of Europe — Germany, France, Spain, Italy, the Netherlands, Poland, the Nordics and more. Numbers are priced per country.",
    },
    {
      question: "Are features charged separately?",
      answer:
        "Core calling and messaging are included in your plan. Optional modules like IVR, recording, AI assistance, CRM or advanced analytics are low monthly add-ons, so you only pay for what you switch on.",
    },
    {
      question: "Can I port my existing number?",
      answer:
        "Yes — porting is a $5 one-time fee per number and usually takes 2–5 business days. Your current line keeps working until the switch completes.",
    },
    {
      question: "Can I change plans later?",
      answer:
        "Change or cancel any time from billing settings. Upgrades apply instantly and we prorate the difference.",
    },
  ],
  metaTitle: "Pricing — Business Phone System from $12/user | Smartytel",
  metaDescription:
    "Compare Smartytel plans and add-ons. Per-user pricing with shared numbers, routing, AI notes and analytics across the US, Canada, the UK and Europe.",
};
