import { Fragment, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Minus } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CtaBand } from "@/components/CtaBand";


export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Smartytel Pricing — Business Phone Plans Per User" },
      {
        name: "description",
        content:
          "Simple per-user pricing for Smartytel business phone: shared numbers, call routing, AI notes and analytics. Monthly or annual billing, cancel any time.",
      },
      { property: "og:title", content: "Smartytel Pricing — Business Phone Plans Per User" },
      {
        property: "og:description",
        content:
          "Compare Smartytel plans: Starter, Business and Enterprise. Per-user pricing with shared numbers, routing, AI notes and analytics.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PricingPage,
});

type Plan = {
  name: string;
  monthly: number;
  annualMonthly: number;
  tagline: string;
  perks: string[];
  featured?: boolean;
  cta: string;
};

const plans: Plan[] = [
  {
    name: "Trial",
    monthly: 0,
    annualMonthly: 0,
    tagline: "14 days free with a demo number — see everything before you pay.",
    perks: [
      "14-day free trial",
      "Demo phone number included",
      "Calling & messaging basics",
      "No credit card required",
    ],
    cta: "Start 14-day trial",
  },
  {
    name: "Startup",
    monthly: 15,
    annualMonthly: 12,
    tagline: "For solo operators and small teams getting off a personal number.",
    perks: [
      "1 local number included",
      "Free local & long-distance calls",
      "SMS messaging included",
      "WhatsApp, Telegram & chat apps",
      "Mobile & desktop apps",
    ],
    cta: "Start free trial",
  },
  {
    name: "Business",
    monthly: 25,
    annualMonthly: 20,
    tagline: "For teams that answer together across the US, Canada and Europe.",
    featured: true,
    perks: [
      "Everything in Startup",
      "IVR phone menus",
      "Call recording",
      "Call hunting & call forwarding",
      "AI assistance add-on",
      "Live chat support",
    ],
    cta: "Start free trial",
  },
  {
    name: "Scale",
    monthly: 35,
    annualMonthly: 28,
    tagline: "For contact centres and multi-location brands.",
    perks: [
      "Everything in Business",
      "Call transcription & AI summaries",
      "Custom telephony flows",
      "Slack & email integration flows",
      "Advanced analytics",
      "Dedicated priority support",
    ],
    cta: "Talk to sales",
  },
];

const addOns: [string, string, string][] = [
  ["Extra phone number", "$15 /number /mo", "Local or toll-free numbers priced country by country across the US, Canada, the UK and Europe."],
  ["Number porting", "$5 one-time", "Bring your existing US, Canadian or European number with you."],
  ["IVR phone menu", "$1.50 /mo", "Multi-level menus that send every caller to the right team."],
  ["Call recording", "$1.50 /mo", "Record, store and replay calls for coaching and compliance."],
  ["Call hunting", "$0.50 /mo", "Ring the whole team in order until someone picks up."],
  ["Call forwarding", "$1.50 /mo", "Send calls to mobiles, landlines or other countries."],
  ["AI assistance", "$3.50 /mo", "AI answers, qualifies and helps your team while they are busy."],
  ["Transcribe & summarise calls", "$2.50 /mo", "Every call written up with next steps, in any supported language."],
  ["Help desk (ticketing)", "$5 /user /mo", "Turn calls, SMS and chats into trackable tickets."],
  ["Connect center (CRM)", "$10 /user /mo", "Contacts, pipelines and history alongside every conversation."],
  ["Advanced analytics", "$15 /mo", "Custom reports, exports and live wallboards."],
  ["Integration flows (Slack, email)", "$10 /mo", "Push calls, notes and alerts into the tools you already use."],
  ["Historical reports beyond 3 months", "$30 /mo", "Long-term call detail records for audits and QA."],
  ["Custom telephony automated flows", "$50 one-time", "We build bespoke routing and automation for your operation."],
];

const aiTiers: [string, string, string, string][] = [
  ["Tier 1", "$0 /mo", "10 AI calls", "$1.00 per extra call"],
  ["Tier 2", "$25 /mo", "40 AI calls", "$0.75 per extra call"],
  ["Tier 3", "$49 /mo", "100 AI calls", "$0.65 per extra call"],
  ["Tier 4", "$99 /mo", "250 AI calls", "$0.55 per extra call"],
  ["Tier 5", "$199 /mo", "600 AI calls", "$0.45 per extra call"],
];

const compareGroups: {
  group: string;
  rows: [string, string | boolean, string | boolean, string | boolean, string | boolean][];
}[] = [
  {
    group: "Numbers, calling & messaging",
    rows: [
      ["Included phone number", "Demo", "1", "1", "1"],
      ["Local calls (US, CA, UK, EU)", true, true, true, true],
      ["Long-distance calls", false, true, true, true],
      ["SMS messaging", false, true, true, true],
      ["WhatsApp, Telegram & chat apps", false, true, true, true],
      ["Extra numbers per country", false, "$15 /mo", "$15 /mo", "$15 /mo"],
      ["Number porting", false, "$5 once", "$5 once", "$5 once"],
    ],
  },
  {
    group: "Call handling",
    rows: [
      ["IVR phone menus", false, false, "$1.50 /mo", "$1.50 /mo"],
      ["Call recording", false, false, "$1.50 /mo", "$1.50 /mo"],
      ["Call hunting", false, false, "$0.50 /mo", "$0.50 /mo"],
      ["Call forwarding", false, false, "$1.50 /mo", "$1.50 /mo"],
      ["Custom telephony flows", false, false, false, "$50 once"],
    ],
  },
  {
    group: "AI & automation",
    rows: [
      ["AI assistance", false, false, "$3.50 /mo", "$3.50 /mo"],
      ["Transcription & call summaries", false, false, false, "$2.50 /mo"],
      ["AI call packages", false, "Tier 1–5", "Tier 1–5", "Tier 1–5"],
      ["Integration flows (Slack, email)", false, false, false, "$10 /mo"],
    ],
  },
  {
    group: "Apps, reporting & support",
    rows: [
      ["Help desk (ticketing)", false, "$5 /user", "$5 /user", "$5 /user"],
      ["Connect center (CRM)", false, "$10 /user", "$10 /user", "$10 /user"],
      ["Advanced analytics", false, "$15 /mo", false, "$15 /mo"],
      ["Reports beyond 3 months", false, false, "$30 /mo", "$30 /mo"],
      ["Support", "Email", "Email", "Live chat", "Dedicated priority"],
    ],
  },
];

const faqs: [string, string][] = [
  [
    "Is there a free trial?",
    "Yes — every account starts on the 14-day Trial plan with a demo number. No credit card required, and you pick a real number when you subscribe.",
  ],
  [
    "How much does it cost per user?",
    "Startup is $15 per user per month, Business $25 and Scale $35. Pay yearly and you save 20% — $12, $20 and $28 per user per month.",
  ],
  [
    "Which countries are included?",
    "Local calling is included country by country across the US, Canada, the UK and the whole of Europe — Germany, France, Spain, Italy, the Netherlands, Poland, the Nordics and more. Numbers are priced per country.",
  ],
  [
    "Are features charged separately?",
    "Core calling and messaging are included in your plan. Optional modules like IVR, recording, AI assistance, CRM or advanced analytics are low monthly add-ons, so you only pay for what you switch on.",
  ],
  [
    "Can I port my existing number?",
    "Yes — porting is a $5 one-time fee per number and usually takes 2–5 business days. Your current line keeps working until the switch completes.",
  ],
  [
    "Can I change plans later?",
    "Change or cancel any time from billing settings. Upgrades apply instantly and we prorate the difference.",
  ],
];

function PriceCell({ value }: { value: string | boolean }) {
  if (value === true)
    return <Check className="mx-auto size-4 text-accent-foreground" aria-hidden="true" />;
  if (value === false)
    return <Minus className="mx-auto size-4 text-muted-foreground/50" aria-hidden="true" />;
  return <span className="text-sm text-muted-foreground">{value}</span>;
}

function PricingPage() {
  const [annual, setAnnual] = useState(true);

  const priceFor = (plan: Plan) => `$${annual ? plan.annualMonthly : plan.monthly}`;


  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main>
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-5 pt-16 pb-10 text-center md:pt-24">
          <p className="font-semibold uppercase tracking-widest text-accent-foreground">Pricing</p>
          <h1 className="mx-auto mt-4 max-w-3xl font-display text-4xl font-bold tracking-tight md:text-6xl">
            One phone system, priced per person
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
            Every plan includes unlimited calling and texting across the US, Canada, the UK and all
            of Europe. Add teammates as you grow — no contracts, no hardware.

          </p>

          <div className="mt-9 inline-flex items-center gap-1 rounded-full border border-border bg-card p-1">
            <button
              type="button"
              onClick={() => setAnnual(true)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                annual ? "bg-brand text-brand-foreground" : "text-muted-foreground"
              }`}
            >
              Annual · save 20%
            </button>
            <button
              type="button"
              onClick={() => setAnnual(false)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                annual ? "text-muted-foreground" : "bg-brand text-brand-foreground"
              }`}
            >
              Monthly
            </button>
          </div>
        </section>

        {/* Plans */}
        <section className="mx-auto max-w-7xl px-5 pb-20">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {plans.map((plan) => (
              <article
                key={plan.name}
                className={
                  plan.featured
                    ? "rounded-2xl border-2 border-foreground bg-card p-8"
                    : "rounded-2xl border border-border bg-card p-8"
                }
              >
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-lg font-semibold">{plan.name}</h2>
                  {plan.featured && (
                    <span className="rounded-full bg-brand px-3 py-1 text-xs font-semibold text-brand-foreground">
                      Most popular
                    </span>
                  )}
                </div>
                <p className="mt-5 font-display text-4xl font-bold tracking-tight">
                  {priceFor(plan)}
                  <span className="text-base font-medium text-muted-foreground">
                    {plan.monthly === 0 ? "/14 days" : "/user/mo"}
                  </span>
                </p>

                <p className="mt-3 text-sm text-muted-foreground">{plan.tagline}</p>
                <a
                  href="/pricing"
                  className={
                    plan.featured
                      ? "mt-7 block rounded-xl bg-brand px-4 py-3 text-center font-semibold text-brand-foreground"
                      : "mt-7 block rounded-xl border border-border px-4 py-3 text-center font-semibold transition-colors hover:bg-secondary"
                  }
                >
                  {plan.cta}
                </a>
                <ul className="mt-7 space-y-3 text-sm">
                  {plan.perks.map((perk) => (
                    <li key={perk} className="flex gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-accent-foreground" aria-hidden="true" />
                      <span className="text-muted-foreground">{perk}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* Add-ons */}
        <section className="bg-light-grey py-20">
          <div className="mx-auto max-w-6xl px-5">
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">Add-ons</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {addOns.map(([name, price, desc]) => (
                <div key={name} className="rounded-2xl border border-border bg-card p-7">
                  <h3 className="font-display text-lg font-semibold">{name}</h3>
                  <p className="mt-2 font-display text-2xl font-bold tracking-tight">{price}</p>
                  <p className="mt-3 text-sm text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison */}
        <section className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
            Compare every feature
          </h2>
          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-4 pr-4 font-display text-sm font-semibold">Feature</th>
                  {plans.map((plan) => (
                    <th key={plan.name} className="py-4 px-4 text-center font-display text-sm font-semibold">
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {compareGroups.map((section) => (
                  <Fragment key={section.group}>
                    <tr className="bg-light-grey">
                      <td colSpan={4} className="py-3 pr-4 pl-3 font-semibold text-sm">
                        {section.group}
                      </td>
                    </tr>
                    {section.rows.map(([label, a, b, c]) => (
                      <tr key={label} className="border-b border-border">
                        <td className="py-4 pr-4 text-sm">{label}</td>
                        <td className="py-4 px-4 text-center">
                          <PriceCell value={a} />
                        </td>
                        <td className="py-4 px-4 text-center">
                          <PriceCell value={b} />
                        </td>
                        <td className="py-4 px-4 text-center">
                          <PriceCell value={c} />
                        </td>
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-border py-20">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-[1fr_1.4fr]">
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
              Pricing questions
            </h2>
            <dl className="space-y-8">
              {faqs.map(([q, a]) => (
                <div key={q}>
                  <dt className="font-display text-base font-semibold">{q}</dt>
                  <dd className="mt-2 text-muted-foreground">{a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* CTA */}
        <CtaBand
          eyebrow="Start today"
          title="Pick a plan, be answering calls right now"
          subtitle="14 days free on every plan. Port your number, invite the team, and let AI handle the notes."
          primaryLabel="Start free trial"
          secondaryLabel="Talk to sales"
        />
      </main>

      <SiteFooter />

    </div>
  );
}
