import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Building2,
  Check,
  Contact,
  Filter,
  Megaphone,
  PhoneCall,
  Plug,
  Target,
  Workflow,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CtaBand } from "@/components/CtaBand";
import crmShot from "@/assets/showcase-ai.jpg";
import pipelineShot from "@/assets/showcase-analytics.jpg";

export const Route = createFileRoute("/crm")({
  head: () => ({
    meta: [
      { title: "CRM Built Into Your Business Phone | Smartytel" },
      {
        name: "description",
        content:
          "A CRM built into your business phone system: contacts, leads, deals and full call history in one place for $10 per user per month.",
      },
      { property: "og:title", content: "CRM Built Into Your Business Phone | Smartytel" },
      {
        property: "og:description",
        content:
          "A CRM built into your phone system: every call, text and note on the contact record, with AI lead qualification and bulk campaigns.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CrmPage,
});

const features: { title: string; body: string; icon: typeof Contact }[] = [
  {
    title: "One contact record",
    body: "Every call, SMS, WhatsApp thread, note and recording lands on the contact automatically — no data entry.",
    icon: Contact,
  },
  {
    title: "Leads & opportunities",
    body: "Drag deals through your own stages, set values and close dates, and see what is stuck at a glance.",
    icon: Target,
  },
  {
    title: "Click-to-call from the record",
    body: "Dial, text or transfer straight from the pipeline with the right number and the whole history in view.",
    icon: PhoneCall,
  },
  {
    title: "AI lead qualification",
    body: "The AI assistant answers, qualifies and summarises the lead, then routes it to the right rep with next steps.",
    icon: Bot,
  },
  {
    title: "Campaigns & bulk outreach",
    body: "Run mass calling and bulk SMS campaigns to a saved segment, then track replies in the same inbox.",
    icon: Megaphone,
  },
  {
    title: "Segments & smart filters",
    body: "Filter by country, owner, tag, stage or last contact — and save the view for the whole team.",
    icon: Filter,
  },
  {
    title: "Pipeline reporting",
    body: "Conversion, response time and rep activity reports across the US, Canada, the UK and Europe.",
    icon: BarChart3,
  },
  {
    title: "Two-way CRM sync",
    body: "Already on Salesforce, HubSpot, Pipedrive or Zoho? Sync contacts and log activity both ways.",
    icon: Plug,
  },
  {
    title: "Automated flows",
    body: "Trigger follow-up tasks, Slack alerts and emails when a call ends or a deal changes stage.",
    icon: Workflow,
  },
];

const included = [
  "Unlimited contacts and companies",
  "Custom fields and tags",
  "Shared team pipelines",
  "Call, SMS and chat history on every record",
  "Tasks, reminders and notes",
  "CSV import and export",
  "Role-based access",
  "GDPR-ready data handling in the EU",
];

function CrmPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main>
        {/* Hero */}
        <section className="mx-auto max-w-7xl px-5 pt-16 pb-14 md:pt-24">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-center">
            <div>
              <p className="font-semibold uppercase tracking-widest text-accent-foreground">
                Connect Center · CRM
              </p>
              <h1 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-6xl">
                A CRM that lives inside your phone system
              </h1>
              <p className="mt-5 max-w-xl text-lg text-muted-foreground">
                Contacts, leads, pipelines and campaigns sitting right next to the calls and texts
                that created them. $10 per user per month on any Smartytel plan — across the US,
                Canada, the UK and every European country.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/pricing"
                  className="inline-flex items-center gap-1.5 rounded-md bg-brand px-5 py-3 font-semibold text-brand-foreground transition-transform hover:-translate-y-0.5"
                >
                  Start free trial <ArrowRight className="size-4" />
                </Link>
                <Link
                  to="/pricing"
                  className="inline-flex items-center rounded-md border border-border px-5 py-3 font-semibold transition-colors hover:bg-secondary"
                >
                  See pricing
                </Link>
              </div>
            </div>
            <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-xl">
              <img
                src={crmShot}
                alt="Smartytel CRM contact record with call history and AI lead summary"
                className="h-full w-full object-cover"
                width={1024}
                height={768}
              />
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="bg-light-grey py-20">
          <div className="mx-auto max-w-7xl px-5">
            <h2 className="max-w-2xl font-display text-3xl font-bold tracking-tight md:text-4xl">
              Everything a sales team needs, without another tab
            </h2>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <article key={feature.title} className="rounded-2xl border border-border bg-card p-7">
                  <feature.icon className="size-6 text-brand" strokeWidth={2} aria-hidden="true" />
                  <h3 className="mt-5 font-display text-lg font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{feature.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Included */}
        <section className="mx-auto max-w-7xl px-5 py-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-lg">
              <img
                src={pipelineShot}
                alt="Smartytel CRM pipeline and conversion reporting"
                className="h-full w-full object-cover"
                width={1024}
                height={768}
                loading="lazy"
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs font-semibold uppercase tracking-widest">
                <Building2 className="size-3.5 text-brand" aria-hidden="true" /> Included in Connect
                Center
              </div>
              <h2 className="mt-5 font-display text-3xl font-bold tracking-tight md:text-4xl">
                One price, the whole customer picture
              </h2>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {included.map((item) => (
                  <li key={item} className="flex gap-2 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-accent-foreground" aria-hidden="true" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/pricing"
                className="mt-9 inline-flex items-center gap-1.5 rounded-md bg-brand px-5 py-3 font-semibold text-brand-foreground transition-transform hover:-translate-y-0.5"
              >
                Add CRM for $10 / user <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </section>

        <CtaBand
          eyebrow="Connect Center"
          title="Turn every call into a tracked opportunity"
          subtitle="Add the CRM to any plan and let AI qualify, summarise and route your leads automatically."
          primaryLabel="Start free trial"
          secondaryLabel="Talk to sales"
        />
      </main>

      <SiteFooter />
    </div>
  );
}
