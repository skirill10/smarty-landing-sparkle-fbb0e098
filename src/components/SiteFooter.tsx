import { Link } from "@tanstack/react-router";
import * as si from "simple-icons";
import mark from "@/assets/smartytel-mark.png";
import { useFooterContent } from "@/lib/cms-content";

const socials: { name: string; href: string; icon: { path: string } }[] = [
  { name: "LinkedIn", href: "https://www.linkedin.com/company/smartytel", icon: si.siLinkedin },
  { name: "X", href: "https://x.com/smartytel", icon: si.siX },
  { name: "Reddit", href: "https://www.reddit.com/r/smartytel", icon: si.siReddit },
  { name: "Instagram", href: "https://www.instagram.com/smartytel", icon: si.siInstagram },
  { name: "YouTube", href: "https://www.youtube.com/@smartytel", icon: si.siYoutube },
];


type Column = { heading: string; links: { label: string; to?: string }[] };

const fallbackColumns: Column[] = [
  {
    heading: "Product",
    links: [
      { label: "Calling", to: "/calling" },
      { label: "Text messaging", to: "/messaging" },
      { label: "Phone menu & routing", to: "/phone-menu" },
      { label: "Shared numbers", to: "/shared-numbers" },
      { label: "CRM", to: "/crm" },
      { label: "Analytics & oversight", to: "/analytics" },
      { label: "Smarty AI Assist", to: "/ai-agent" },
      { label: "Integrations", to: "/integrations" },
      { label: "Smartytel API", to: "/developers" },
    ],
  },
  {
    heading: "Solutions",
    links: [
      { label: "Home services", to: "/solutions/home-services" },
      { label: "Law firms", to: "/solutions/law-firms" },
      { label: "Property management", to: "/solutions/property-management" },
      { label: "Healthcare", to: "/solutions/healthcare" },
      { label: "Startups", to: "/solutions/startups" },
      { label: "Small business", to: "/solutions/small-business" },
      { label: "Sales teams", to: "/solutions/sales" },
      { label: "Support teams", to: "/solutions/support" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Blog", to: "/blog" },
      { label: "Guides", to: "/resources" },
      { label: "Developer docs", to: "/docs" },
      { label: "Number porting", to: "/port-your-number" },
      { label: "Customers", to: "/customers" },
      { label: "Product demo", to: "/demo" },
      { label: "Status", to: "/status" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About us", to: "/about" },
      { label: "Careers", to: "/careers" },
      { label: "Partners", to: "/partners" },
      { label: "Contact sales", to: "/contact" },
      { label: "Pricing", to: "/pricing" },
    ],
  },
];


const fallbackRegions = [
  "United States",
  "Canada",
  "United Kingdom",
  "Ireland",
  "Germany",
  "France",
  "Spain",
  "Italy",
  "Netherlands",
  "Belgium",
  "Poland",
  "Sweden",
  "Denmark",
  "Norway",
  "Finland",
  "Portugal",
  "Austria",
  "Switzerland",
  "Czechia",
  "Romania",
];

const fallbackNote =
  "One business phone for your whole team \u2014 with local and toll-free numbers across the US, Canada, the UK and every European country.";

export function SiteFooter() {
  const { columns, regions, note } = useFooterContent({
    columns: fallbackColumns,
    regions: fallbackRegions,
    note: fallbackNote,
  });

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-5 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_3fr]">
          <div>
            <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold">
              <img src={mark} alt="" width={40} height={49} loading="lazy" className="h-7 w-auto" />
              smartytel
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">{note}</p>
            <Link
              to="/pricing"
              className="mt-6 inline-flex rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground transition-transform hover:-translate-y-0.5"
            >
              Start free trial
            </Link>
          </div>

          <nav className="grid grid-cols-2 gap-8 sm:grid-cols-4" aria-label="Footer">
            {columns.map((column) => (
              <div key={column.heading}>
                <p className="font-display text-sm font-bold uppercase tracking-widest text-foreground">
                  {column.heading}
                </p>
                <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      {link.to ? (
                        <Link to={link.to} className="transition-colors hover:text-foreground">
                          {link.label}
                        </Link>
                      ) : (
                        <span className="text-muted-foreground/70">{link.label}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-14 border-t border-border pt-8">
          <p className="font-display text-sm font-bold uppercase tracking-widest text-foreground">
            Numbers &amp; coverage
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
            {regions.map((region) => (
              <li key={region}>{region}</li>
            ))}
            <li className="font-semibold text-foreground">+ all of Europe</li>
          </ul>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-border pt-8 text-sm text-muted-foreground">
          <span>© {new Date().getFullYear()} Smartytel. All rights reserved.</span>

          <ul className="flex items-center gap-3" aria-label="Smartytel on social media">
            {socials.map((social) => (
              <li key={social.name}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`Smartytel on ${social.name}`}
                  className="grid size-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
                >
                  <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden="true">
                    <path d={social.icon.path} />
                  </svg>
                </a>
              </li>
            ))}
          </ul>

          <span className="flex flex-wrap gap-5">
            <Link to="/privacy" className="hover:text-foreground">Privacy</Link>
            <Link to="/terms" className="hover:text-foreground">Terms</Link>
            <Link to="/gdpr" className="hover:text-foreground">GDPR</Link>
            <Link to="/security" className="hover:text-foreground">Security</Link>
            <Link to="/llm-info" className="hover:text-foreground">Hey AI</Link>
          </span>
        </div>

      </div>
    </footer>
  );
}
