import { Link } from "@tanstack/react-router";
import { ArrowRight, Plus } from "lucide-react";
import * as si from "simple-icons";
import { useIntegrationBrands } from "@/lib/cms-content";

type Brand = { name: string; icon: { path: string; hex: string } };

const fallbackBrands: Brand[] = [
  { name: "HubSpot", icon: si.siHubspot },
  { name: "Zapier", icon: si.siZapier },
  { name: "Make", icon: si.siMake },
  { name: "n8n", icon: si.siN8n },
  { name: "Notion", icon: si.siNotion },
  { name: "Jira", icon: si.siJira },
  { name: "Gmail", icon: si.siGmail },
  { name: "Google Calendar", icon: si.siGooglecalendar },
  { name: "Google Sheets", icon: si.siGooglesheets },
  { name: "Google Drive", icon: si.siGoogledrive },
  { name: "Dropbox", icon: si.siDropbox },
  { name: "Intercom", icon: si.siIntercom },
  { name: "Zendesk", icon: si.siZendesk },
  { name: "Zoho", icon: si.siZoho },
  { name: "Asana", icon: si.siAsana },
  { name: "Trello", icon: si.siTrello },
  { name: "ClickUp", icon: si.siClickup },
  { name: "Airtable", icon: si.siAirtable },
  { name: "Calendly", icon: si.siCalendly },
  { name: "WhatsApp", icon: si.siWhatsapp },
  { name: "Telegram", icon: si.siTelegram },
  { name: "Zoom", icon: si.siZoom },
  { name: "Shopify", icon: si.siShopify },
  { name: "WooCommerce", icon: si.siWoocommerce },
  { name: "WordPress", icon: si.siWordpress },
  { name: "Mailchimp", icon: si.siMailchimp },
  { name: "Stripe", icon: si.siStripe },
  { name: "PayPal", icon: si.siPaypal },
  { name: "Square", icon: si.siSquare },
  { name: "QuickBooks", icon: si.siQuickbooks },
  { name: "Xero", icon: si.siXero },
  { name: "Google Analytics", icon: si.siGoogleanalytics },
];

const iconRegistry = si as unknown as Record<string, { path: string; hex: string } | undefined>;

const resolveIcon = (slug: string) =>
  iconRegistry[`si${slug.charAt(0).toUpperCase()}${slug.slice(1).toLowerCase()}`] ?? null;

export function IntegrationsSection() {
  const brands = useIntegrationBrands(fallbackBrands, resolveIcon as never);

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

        <div className="mt-14 rounded-3xl bg-secondary/60 p-5 sm:p-8">
          <ul className="grid grid-cols-4 gap-3 sm:grid-cols-6 sm:gap-4 lg:grid-cols-8">
            {brands.map((brand) => (
              <li key={brand.name}>
                <div
                  title={brand.name}
                  className="group grid aspect-square place-items-center rounded-2xl bg-card shadow-sm ring-1 ring-border/60 transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <svg
                    role="img"
                    aria-label={brand.name}
                    viewBox="0 0 24 24"
                    className="size-7 transition-transform group-hover:scale-110 sm:size-8"
                    fill={`#${brand.icon.hex}`}
                  >
                    <path d={brand.icon.path} />
                  </svg>
                </div>
              </li>
            ))}
            {Array.from({ length: 8 }).map((_, i) => (
              <li key={`slot-${i}`} className={i > 3 ? "hidden lg:block" : ""}>
                <div className="grid aspect-square place-items-center rounded-2xl border-2 border-dashed border-border">
                  <Plus className="size-5 text-muted-foreground/60" aria-hidden="true" />
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Plus Salesforce, Pipedrive, Microsoft Teams and Outlook — and anything else you can reach
            with our open API and webhooks.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            to="/crm"
            className="inline-flex items-center gap-1.5 rounded-md bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground transition-all hover:-translate-y-0.5 hover:bg-dark hover:text-dark-foreground"
          >
            Explore the built-in CRM <ArrowRight className="size-4" />
          </Link>
          <a
            href="#integrations"
            className="inline-flex items-center gap-1.5 rounded-md border border-border px-5 py-3 text-sm font-semibold transition-colors hover:bg-dark hover:text-dark-foreground"
          >
            Browse all integrations
          </a>
        </div>
      </div>
    </section>
  );
}
