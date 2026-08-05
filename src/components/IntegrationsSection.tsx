import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

const integrations: { name: string; category: string }[] = [
  { name: "Salesforce", category: "CRM" },
  { name: "HubSpot", category: "CRM" },
  { name: "Pipedrive", category: "CRM" },
  { name: "Slack", category: "Messaging" },
  { name: "Microsoft Teams", category: "Messaging" },
  { name: "Gmail", category: "Email" },
  { name: "Outlook", category: "Email" },
  { name: "Google Contacts", category: "Contacts" },
  { name: "Zapier", category: "Automation" },
  { name: "Make", category: "Automation" },
  { name: "Zoho", category: "CRM" },
  { name: "Zendesk", category: "Support" },
  { name: "Intercom", category: "Support" },
  { name: "Google Calendar", category: "Scheduling" },
  { name: "Shopify", category: "Commerce" },
  { name: "Webhooks & API", category: "Developers" },
];

export function IntegrationsSection() {
  return (
    <section id="integrations" className="border-t border-border py-24">
      <div className="mx-auto max-w-7xl px-5">
        <div className="grid gap-8 md:grid-cols-[1.1fr_1fr] md:items-end">
          <div>
            <p className="font-semibold uppercase tracking-widest text-accent-foreground">
              Integrations
            </p>
            <h2 className="mt-4 max-w-xl font-display text-3xl font-bold tracking-tight md:text-5xl">
              Plays nicely with the tools you already run on
            </h2>
          </div>
          <p className="text-lg text-muted-foreground">
            Sync contacts, log every call and text, and trigger follow-ups automatically — across
            your CRM, help desk, inbox and automation stack. Build anything else with our API and
            webhooks.
          </p>
        </div>

        <ul className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {integrations.map((item) => (
            <li key={item.name}>
              <a
                href="#integrations"
                className="flex h-full items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-lg"
              >
                <span
                  aria-hidden="true"
                  className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand/10 font-display text-base font-bold text-brand"
                >
                  {item.name.slice(0, 2)}
                </span>
                <span>
                  <span className="block font-display text-sm font-semibold">{item.name}</span>
                  <span className="block text-xs text-muted-foreground">{item.category}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            to="/crm"
            className="inline-flex items-center gap-1.5 rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground transition-transform hover:-translate-y-0.5"
          >
            Explore the built-in CRM <ArrowRight className="size-4" />
          </Link>
          <a
            href="#integrations"
            className="inline-flex items-center gap-1.5 rounded-xl border border-border px-5 py-3 text-sm font-semibold transition-colors hover:bg-secondary"
          >
            Browse all integrations
          </a>
        </div>
      </div>
    </section>
  );
}
