import { Fragment, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Minus, ArrowRight } from "lucide-react";
import mark from "@/assets/smartytel-mark.png";
import { SiteHeader } from "@/components/SiteHeader";

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
  monthly: number | "Custom";
  tagline: string;
  perks: string[];
  featured?: boolean;
  cta: string;
};

const plans: Plan[] = [
  {
    name: "Starter",
    monthly: 19,
    tagline: "For solo operators who never want to miss a call.",
    perks: [
      "1 local or toll-free number",
      "Unlimited calls & texts in US/CA",
      "Shared inbox for 2 teammates",
      "Voicemail transcription",
      "Business hours & auto-replies",
    ],
    cta: "Start free trial",
  },
  {
    name: "Business",
    monthly: 34,
    tagline: "For growing teams that answer together.",
    featured: true,
    perks: [
      "Everything in Starter",
      "Unlimited shared numbers",
      "Ring groups & call routing rules",
      "AI call summaries & next steps",
      "Team analytics dashboard",
      "CRM & Zapier integrations",
    ],
    cta: "Start free trial",
  },
  {
    name: "Enterprise",
    monthly: "Custom",
    tagline: "For multi-location teams with compliance needs.",
    perks: [
      "Everything in Business",
      "SSO & advanced permissions",
      "Dedicated onboarding & CSM",
      "Custom AI agent workflows",
      "API access & webhooks",
      "99.99% uptime SLA",
    ],
    cta: "Talk to sales",
  },
];

const addOns: [string, string, string][] = [
  ["Extra phone number", "$5 /number /mo", "Local, toll-free or vanity numbers in 60+ countries."],
  ["AI receptionist", "$25 /mo", "Answers, qualifies and books while your team is busy."],
  ["Advanced analytics", "$12 /user /mo", "Custom reports, exports and live wallboards."],
];

const compareGroups: { group: string; rows: [string, string | boolean, string | boolean, string | boolean][] }[] = [
  {
    group: "Calling & texting",
    rows: [
      ["Included numbers", "1", "3", "Unlimited"],
      ["Unlimited calls & SMS (US/CA)", true, true, true],
      ["Group calling", false, true, true],
      ["Warm call transfer", false, true, true],
      ["International numbers", false, true, true],
    ],
  },
  {
    group: "Collaboration",
    rows: [
      ["Shared inbox seats", "2", "Unlimited", "Unlimited"],
      ["Internal threads & mentions", true, true, true],
      ["Ring groups & routing rules", false, true, true],
      ["Task assignment", false, true, true],
    ],
  },
  {
    group: "AI & automation",
    rows: [
      ["Voicemail transcription", true, true, true],
      ["AI call summaries", false, true, true],
      ["AI agent workflows", false, false, true],
      ["API & webhooks", false, false, true],
    ],
  },
  {
    group: "Admin & support",
    rows: [
      ["Team analytics", false, true, true],
      ["SSO / SAML", false, false, true],
      ["Support", "Email", "Priority", "Dedicated CSM"],
    ],
  },
];

const faqs: [string, string][] = [
  [
    "Is there a free trial?",
    "Yes — every plan starts with a 14-day free trial. No credit card required, and you keep the number you pick if you upgrade.",
  ],
  [
    "Can I change plans later?",
    "Change or cancel any time from billing settings. Upgrades apply instantly and we prorate the difference.",
  ],
  [
    "Do you charge per number or per user?",
    "Per user. Business and Enterprise include shared numbers so the whole team can answer from one line.",
  ],
  [
    "Can I port my existing number?",
    "Yes, porting is free and usually takes 2–5 business days. Your current line keeps working until the switch completes.",
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

  const priceFor = (plan: Plan) =>
    plan.monthly === "Custom"
      ? "Custom"
      : `$${annual ? Math.round(plan.monthly * 0.8) : plan.monthly}`;

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
            Every plan includes unlimited calling and texting in the US and Canada. Add teammates
            as you grow — no contracts, no hardware.
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
        <section className="mx-auto max-w-6xl px-5 pb-20">
          <div className="grid gap-6 md:grid-cols-3">
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
                  {plan.monthly !== "Custom" && (
                    <span className="text-base font-medium text-muted-foreground">/user/mo</span>
                  )}
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
        <section className="mx-auto max-w-6xl px-5 pb-20">
          <div className="rounded-3xl bg-primary px-8 py-16 text-center text-primary-foreground md:py-20">
            <h2 className="mx-auto max-w-2xl font-display text-4xl font-bold tracking-tight md:text-5xl">
              Try Smartytel free for 14 days
            </h2>
            <a
              href="/pricing"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3 font-semibold text-brand-foreground transition-transform hover:-translate-y-0.5"
            >
              Get started
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 text-sm text-muted-foreground">
          <Link to="/" className="flex items-center gap-2 font-display font-bold text-foreground">
            <img src={mark} alt="" width={40} height={49} loading="lazy" className="h-6 w-auto" />
            smartytel.com
          </Link>
          <span>© {new Date().getFullYear()} Smartytel. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
