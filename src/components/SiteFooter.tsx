import { Link } from "@tanstack/react-router";
import mark from "@/assets/smartytel-mark.png";

type Column = { heading: string; links: { label: string; to?: string }[] };

const columns: Column[] = [
  {
    heading: "Product",
    links: [
      { label: "Calling" },
      { label: "Text messaging" },
      { label: "Phone menu & routing" },
      { label: "Shared numbers" },
      { label: "CRM", to: "/crm" },
      { label: "Analytics & oversight" },
      { label: "Sona AI agent" },
      { label: "Integrations" },
      { label: "Smartytel API" },

    ],
  },
  {
    heading: "Solutions",
    links: [
      { label: "Home services" },
      { label: "Law firms" },
      { label: "Property management" },
      { label: "Healthcare" },
      { label: "Startups" },
      { label: "Small business" },
      { label: "Sales teams" },
      { label: "Support teams" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Blog" },
      { label: "Guides" },
      { label: "Help center" },
      { label: "Number porting" },
      { label: "Coverage & countries" },
      { label: "Release notes" },
      { label: "Status" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About us" },
      { label: "Careers" },
      { label: "Partners" },
      { label: "Contact sales" },
      { label: "Pricing", to: "/pricing" },
    ],
  },
];

const regions = [
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

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-5 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_3fr]">
          <div>
            <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold">
              <img src={mark} alt="" width={40} height={49} loading="lazy" className="h-7 w-auto" />
              smartytel
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              One business phone for your whole team — with local and toll-free numbers across the
              US, Canada, the UK and every European country.
            </p>
            <a
              href="/pricing"
              className="mt-6 inline-flex rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground transition-transform hover:-translate-y-0.5"
            >
              Start free trial
            </a>
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
                        <a href="#features" className="transition-colors hover:text-foreground">
                          {link.label}
                        </a>
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

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground">
          <span>© {new Date().getFullYear()} Smartytel. All rights reserved.</span>
          <span className="flex flex-wrap gap-5">
            <a href="#features" className="hover:text-foreground">Privacy</a>
            <a href="#features" className="hover:text-foreground">Terms</a>
            <a href="#features" className="hover:text-foreground">GDPR</a>
            <a href="#features" className="hover:text-foreground">Security</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
