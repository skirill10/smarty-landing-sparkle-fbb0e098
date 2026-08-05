import { Fragment, useState } from "react";
import { z } from "zod";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeftRight,
  ArrowUpRight,
  BarChart3,
  Bot,
  Building2,
  Check,
  FileText,
  Globe,
  History,
  LifeBuoy,
  ListTree,
  Mic,
  Minus,
  PhoneForwarded,
  PhoneOutgoing,
  Plug,
  ChevronDown,
  Users,
  Workflow,
  Zap,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PricingCta } from "@/components/PricingCta";
import { usePricingContent } from "@/lib/cms-content";



export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Business Phone System Pricing & Plans | Smartytel" },
      {
        name: "description",
        content:
          "Business phone system pricing from $12 per user per month: shared numbers, call routing, AI notes and analytics in the US, Canada, the UK and Europe.",
      },
      { property: "og:title", content: "Business Phone System Pricing & Plans | Smartytel" },
      {
        property: "og:description",
        content:
          "Compare Smartytel plans and add-ons. Per-user pricing with shared numbers, routing, AI notes and analytics across the US, Canada, the UK and Europe.",
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

type AddOn = {
  name: string;
  icon: typeof Check;
  price?: string;
  unit?: string;
  note?: string;
  linkLabel?: string;
};

const addOns: AddOn[] = [
  {
    name: "Additional phone numbers",
    icon: PhoneOutgoing,
    price: "15",
    unit: "Per number, per month\nPriced country by country",
  },
  {
    name: "International calling and messaging",
    icon: Globe,
    note: "Per minute or per message rate based on the destination across the US, Canada, the UK and Europe.",
    linkLabel: "See rates",
  },
  {
    name: "Number porting",
    icon: ArrowLeftRight,
    price: "5",
    unit: "One-time, per number\nKeep your existing number",
  },
  {
    name: "IVR phone menu",
    icon: ListTree,
    price: "1.50",
    unit: "Per month\nMulti-level auto-attendant",
  },
  {
    name: "Call recording",
    icon: Mic,
    price: "1.50",
    unit: "Per month\nStore and replay every call",
  },
  {
    name: "Call hunting",
    icon: Users,
    price: "0.50",
    unit: "Per month\nRing the team in order",
  },
  {
    name: "Call forwarding",
    icon: PhoneForwarded,
    price: "1.50",
    unit: "Per month\nMobiles, landlines, other countries",
  },
  {
    name: "AI assistance",
    icon: Bot,
    price: "3.50",
    unit: "Per month\nAI answers and qualifies",
  },
  {
    name: "Transcribe and summarise calls",
    icon: FileText,
    price: "2.50",
    unit: "Per month\nEvery call written up",
  },
  {
    name: "Help desk (trouble ticketing)",
    icon: LifeBuoy,
    price: "5",
    unit: "Per user, per month\nTickets, SLAs, case management",
  },
  {
    name: "Connect center (CRM)",
    icon: Building2,
    price: "10",
    unit: "Per user, per month\nContacts, leads, pipelines",
    linkLabel: "Explore CRM",
  },
  {
    name: "Advanced analytics",
    icon: BarChart3,
    price: "15",
    unit: "Per month\nCustom reports and wallboards",
  },
  {
    name: "Integration flows (Slack, email)",
    icon: Plug,
    price: "10",
    unit: "Per month\nPush calls into your tools",
  },
  {
    name: "Historical call reports beyond 3 months",
    icon: History,
    price: "30",
    unit: "Per month\nLong-term call detail records",
  },
  {
    name: "Custom telephony automated flows",
    icon: Workflow,
    price: "50",
    unit: "One-time setup\nBespoke routing built for you",
  },
  {
    name: "Automated SMS (API, Zapier, Make)",
    icon: Zap,
    price: "0.01",
    unit: "Per outgoing text message",
  },
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
    "Yes — every plan starts with a 14-day free trial and a demo number. No credit card required, and you pick a real number when you subscribe.",
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


function FaqList({ items }: { items: [string, string][] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <dl className="divide-y divide-border border-y border-border">
      {items.map(([q, a], i) => {
        const isOpen = open === i;
        return (
          <div key={q} className="py-5">
            <dt>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 text-left font-display text-base font-semibold"
              >
                {q}
                <ChevronDown
                  className={`size-5 shrink-0 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>
            </dt>
            <dd
              className={`grid overflow-hidden text-muted-foreground transition-all duration-300 ${
                isOpen ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">{a}</div>
            </dd>
          </div>
        );
      })}
    </dl>
  );
}

const salesSchema = z.object({
  name: z.string().trim().min(1, { message: "Please enter your name" }).max(100),
  email: z.string().trim().email({ message: "Enter a valid work email" }).max(255),
  company: z.string().trim().min(1, { message: "Please enter your company" }).max(120),
  phone: z.string().trim().max(30).optional(),
  seats: z.string().trim().max(40).optional(),
  message: z.string().trim().max(1000).optional(),
});

function TalkToSalesSection() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget)) as Record<string, string>;
    const result = salesSchema.safeParse(data);
    if (!result.success) {
      const next: Record<string, string> = {};
      for (const issue of result.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      return;
    }
    setErrors({});
    setSent(true);
  };

  const field = "mt-2 w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-foreground";

  return (
    <section id="talk-to-sales" className="border-t border-border py-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-[1fr_1.1fr]">
        <div>
          <p className="font-semibold uppercase tracking-widest text-accent-foreground">Talk to sales</p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight md:text-4xl">
            Request a call with our team
          </h2>
          <p className="mt-4 text-muted-foreground">
            Tell us about your team and we will call you back within one business day with pricing,
            number availability across the US, Canada, the UK and Europe, and a live walkthrough.
          </p>
          <ul className="mt-8 space-y-3 text-sm">
            {[
              "Volume pricing for 10+ users",
              "Number porting and country-by-country coverage",
              "Custom telephony flows and integrations",
              "Security, GDPR and procurement questions",
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <Check className="mt-0.5 size-4 shrink-0 text-accent-foreground" aria-hidden="true" />
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-border bg-card p-8">
          {sent ? (
            <div className="py-10 text-center">
              <Check className="mx-auto size-8 text-accent-foreground" aria-hidden="true" />
              <h3 className="mt-4 font-display text-xl font-semibold">Thanks — request received</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                A specialist will call you within one business day.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
              <label className="block text-sm font-semibold sm:col-span-1">
                Full name
                <input name="name" maxLength={100} className={field} placeholder="Alex Moreau" />
                {errors['name'] ? <span className="mt-1 block text-xs font-normal text-destructive">{errors['name']}</span> : null}
              </label>
              <label className="block text-sm font-semibold sm:col-span-1">
                Work email
                <input name="email" type="email" maxLength={255} className={field} placeholder="alex@company.com" />
                {errors['email'] ? <span className="mt-1 block text-xs font-normal text-destructive">{errors['email']}</span> : null}
              </label>
              <label className="block text-sm font-semibold sm:col-span-1">
                Company
                <input name="company" maxLength={120} className={field} placeholder="Company name" />
                {errors['company'] ? <span className="mt-1 block text-xs font-normal text-destructive">{errors['company']}</span> : null}
              </label>
              <label className="block text-sm font-semibold sm:col-span-1">
                Phone number
                <input name="phone" maxLength={30} className={field} placeholder="+1 555 000 1234" />
              </label>
              <label className="block text-sm font-semibold sm:col-span-2">
                Team size
                <select name="seats" className={field} defaultValue="">
                  <option value="">Select team size</option>
                  <option>1–5 users</option>
                  <option>6–20 users</option>
                  <option>21–50 users</option>
                  <option>51–200 users</option>
                  <option>200+ users</option>
                </select>
              </label>
              <label className="block text-sm font-semibold sm:col-span-2">
                What would you like to cover?
                <textarea name="message" rows={4} maxLength={1000} className={field} placeholder="Countries you need numbers in, current provider, timeline…" />
              </label>
              <button
                type="submit"
                className="sm:col-span-2 rounded-xl bg-brand px-5 py-3 font-semibold text-brand-foreground"
              >
                Request a call
              </button>
              <p className="sm:col-span-2 text-xs text-muted-foreground">
                We only use these details to contact you about Smartytel.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function PricingPage() {
  const [annual, setAnnual] = useState(true);
  // Bundled copy stays the fallback; the CMS overlays text and prices at runtime.
  const {
    plans: planList,
    addOns: addOnList,
    aiTiers: aiTierList,
    faqs: faqList,
  } = usePricingContent({ plans, addOns, aiTiers, faqs });

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
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
            Start free for 14 days, then from $12 per user per month. Local calling included across
            the US, Canada, the UK and every European country — and you only pay for the modules you
            switch on.
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
            {planList.map((plan) => (
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
                  href={plan.cta === "Talk to sales" ? "#talk-to-sales" : "/pricing"}
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
        <section className="bg-dark py-24 text-dark-foreground">
          <div className="mx-auto max-w-7xl px-5">
            <h2 className="text-center font-display text-4xl font-bold tracking-tight md:text-5xl">
              Add-ons
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-dark-foreground/60">
              Every module is priced separately, so a two-person shop pays nothing for features a
              call centre needs. Numbers are priced country by country across the US, Canada, the UK
              and Europe.
            </p>
            <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {addOnList.map((addOn) => (
                <div
                  key={addOn.name}
                  className="flex flex-col rounded-2xl bg-dark-foreground/[0.07] p-8"
                >
                  <addOn.icon className="size-7 text-brand" strokeWidth={2} aria-hidden="true" />
                  <h3 className="mt-8 font-display text-xl font-semibold">{addOn.name}</h3>
                  {addOn.note ? (
                    <p className="mt-3 text-sm text-dark-foreground/60">{addOn.note}</p>
                  ) : null}
                  {addOn.price ? (
                    <div className="mt-5 flex items-end gap-3">
                      <p className="font-display text-4xl font-bold leading-none tracking-tight">
                        <span className="align-super text-lg font-medium">$</span>
                        {addOn.price}
                      </p>
                      {addOn.unit ? (
                        <p className="whitespace-pre-line text-sm leading-snug text-dark-foreground/60">
                          {addOn.unit}
                        </p>
                      ) : null}
                    </div>
                  ) : null}
                  {addOn.linkLabel ? (
                    <Link
                      to={addOn.linkLabel === "Explore CRM" ? "/crm" : "/pricing"}
                      className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline"
                    >
                      {addOn.linkLabel} <ArrowUpRight className="size-4" />
                    </Link>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* AI call packages */}
        <section className="mx-auto max-w-7xl px-5 py-20">
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
            AI call packages
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Let the AI agent answer, qualify and book. Pick a monthly package of AI-handled calls —
            go over it and you simply pay the per-call rate.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {aiTierList.map(([tier, price, calls, overage]) => (
              <div key={tier} className="rounded-2xl border border-border bg-card p-6">
                <p className="font-display text-sm font-semibold uppercase tracking-widest text-accent-foreground">
                  {tier}
                </p>
                <p className="mt-3 font-display text-3xl font-bold tracking-tight">{price}</p>
                <p className="mt-3 text-sm font-semibold">{calls}</p>
                <p className="mt-1 text-sm text-muted-foreground">{overage}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Comparison */}
        <section className="mx-auto max-w-7xl px-5 pb-20">
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
            Compare every feature
          </h2>
          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-left">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-4 pr-4 font-display text-sm font-semibold">Feature</th>
                  {planList.map((plan) => (
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
                    {section.rows.map(([label, a, b, c, d]) => (
                      <tr key={label} className="border-b border-border">
                        <td className="py-4 pr-4 text-sm">{label}</td>
                        {[b, c, d].map((value, i) => (
                          <td key={i} className="py-4 px-4 text-center">
                            <PriceCell value={value} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </section>


        <TalkToSalesSection />

        {/* FAQ */}
        <section className="border-t border-border py-20">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-[1fr_1.4fr]">
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
              Pricing questions
            </h2>
            <FaqList items={faqList} />
          </div>
        </section>
        <PricingCta />
      </main>

      <SiteFooter />

    </div>
  );
}
