import { Link } from "@/components/Link";
import * as si from "simple-icons";
import mark from "@/assets/smartytel-mark.png";
import { useFooterContent, useSocialLinks } from "@/lib/cms-content";
import { useT } from "@/i18n/LocaleProvider";
import { LanguageSelector } from "@/components/LanguageSelector";

/** LinkedIn's mark isn't shipped by simple-icons, so its path is inlined. */
const linkedinPath =
  "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z";

const fallbackSocials: { name: string; href: string; path: string }[] = [
  { name: "LinkedIn", href: "https://www.linkedin.com/company/smartytel", path: linkedinPath },
  { name: "X", href: "https://x.com/smartytel", path: si.siX.path },
  { name: "Reddit", href: "https://www.reddit.com/r/smartytel", path: si.siReddit.path },
  { name: "Instagram", href: "https://www.instagram.com/smartytel", path: si.siInstagram.path },
  { name: "YouTube", href: "https://www.youtube.com/@smartytel", path: si.siYoutube.path },
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
      { label: "Downloads", to: "/downloads" },
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
  const t = useT();
  const socials = useSocialLinks(fallbackSocials);
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
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">{t(note)}</p>
            <Link
              to="/pricing"
              className="mt-6 inline-flex rounded-md bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground transition-all hover:-translate-y-0.5 hover:bg-dark hover:text-dark-foreground"
            >
              {t("Start free trial")}
            </Link>
          </div>

          <nav className="grid grid-cols-2 gap-8 sm:grid-cols-4" aria-label="Footer">
            {columns.map((column) => (
              <div key={column.heading}>
                <p className="font-display text-sm font-bold uppercase tracking-widest text-foreground">
                  {t(column.heading)}
                </p>
                <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      {link.to ? (
                        <Link to={link.to} className="transition-colors hover:text-foreground">
                          {t(link.label)}
                        </Link>
                      ) : (
                        <span className="text-muted-foreground/70">{t(link.label)}</span>
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
            {t("Numbers & coverage")}
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
            {regions.map((region) => (
              <li key={region}>{t(region)}</li>
            ))}
            <li className="font-semibold text-foreground">{t("+ all of Europe")}</li>
          </ul>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-border pt-8 text-sm text-muted-foreground">
          <span>
            © {new Date().getFullYear()} Smartytel. {t("All rights reserved.")}
          </span>

          <ul className="flex items-center gap-3" aria-label="Smartytel on social media">
            {socials.map((social) => (
              <li key={social.name}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`Smartytel on ${social.name}`}
                  className="grid size-9 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
                >
                  <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden="true">
                    <path d={social.path} />
                  </svg>
                </a>
              </li>
            ))}
          </ul>

          <LanguageSelector />

          <span className="flex flex-wrap gap-5">
            <Link to="/privacy" className="hover:text-foreground">
              {t("Privacy")}
            </Link>
            <Link to="/terms" className="hover:text-foreground">
              {t("Terms")}
            </Link>
            <Link to="/gdpr" className="hover:text-foreground">
              {t("GDPR")}
            </Link>
            <Link to="/security" className="hover:text-foreground">
              {t("Security")}
            </Link>
            <Link to="/llm-info" className="hover:text-foreground">
              {t("Hey AI")}
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
