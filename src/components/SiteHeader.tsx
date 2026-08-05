import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Building2,
  ChevronDown,
  Filter,
  GraduationCap,
  HeartPulse,
  Home,
  ListChecks,
  Menu,
  MessageSquare,
  Phone,
  PhoneForwarded,
  Plug,
  Rocket,
  Scale,
  Store,
  Terminal,
  Users,
  Wrench,
  X,
} from "lucide-react";
import mark from "@/assets/smartytel-mark.png";
import { useHeaderMenus } from "@/lib/cms-content";
import { useT } from "@/i18n/LocaleProvider";

type Item = { label: string; icon?: typeof Phone; to?: string };
type Group = { heading: string; items: Item[] };
type MenuDef = { label: string; groups: Group[]; wide?: boolean };

const fallbackMenus: MenuDef[] = [
  {
    label: "Product",
    groups: [
      {
        heading: "Connect",
        items: [
          { label: "Calling", icon: Phone, to: "/calling" },
          { label: "Text messaging", icon: MessageSquare, to: "/messaging" },
          { label: "Phone menu & routing", icon: PhoneForwarded, to: "/phone-menu" },
        ],
      },
      {
        heading: "Collaborate",
        items: [
          { label: "Shared numbers", icon: Users, to: "/shared-numbers" },
          { label: "Analytics & oversight", icon: BarChart3, to: "/analytics" },
          { label: "CRM", icon: Building2, to: "/crm" },
          { label: "Tasks", icon: ListChecks, to: "/tasks" },
        ],
      },
      {
        heading: "Automate",
        items: [
          { label: "Smarty AI Assist", icon: Bot, to: "/ai-agent" },
          { label: "Integrations", icon: Plug, to: "/integrations" },
          { label: "Smartytel API", icon: Terminal, to: "/developers" },
        ],
      },
    ],
  },
  {
    label: "Solutions",
    groups: [
      {
        heading: "By industry",
        items: [
          { label: "Home services", icon: Home, to: "/solutions/home-services" },
          { label: "Law firms", icon: Scale, to: "/solutions/law-firms" },
          { label: "Property management", icon: Building2, to: "/solutions/property-management" },
          { label: "Healthcare", icon: HeartPulse, to: "/solutions/healthcare" },
          { label: "Education", icon: GraduationCap, to: "/solutions/education" },
        ],
      },
      {
        heading: "By company size",
        items: [
          { label: "Startups", icon: Rocket, to: "/solutions/startups" },
          { label: "Small business", icon: Store, to: "/solutions/small-business" },
          { label: "Franchise", icon: Building2, to: "/solutions/franchise" },
        ],
      },
      {
        heading: "By use case",
        items: [
          { label: "Sales", icon: BarChart3, to: "/solutions/sales" },
          { label: "Support", icon: Wrench, to: "/solutions/support" },
          { label: "Operations", icon: Filter, to: "/solutions/operations" },
        ],
      },
    ],
  },
  {
    label: "Resources",
    wide: true,
    groups: [
      {
        heading: "Learn more",
        items: [
          { label: "Blog", to: "/blog" },
          { label: "Customers", to: "/customers" },
          { label: "Partners", to: "/partners" },
          { label: "Product demo", to: "/demo" },
          { label: "Webinars", to: "/resources" },
          { label: "Tutorials", to: "/resources" },
          { label: "Voicemail generator", to: "/resources" },
          { label: "Number generator", to: "/resources" },
          { label: "Community", to: "/resources" },
        ],
      },
      {
        heading: "Get help",
        items: [
          { label: "Resource center", to: "/resources" },
          { label: "Smartytel Academy", to: "/resources" },
          { label: "Developer docs", to: "/docs" },
          { label: "What's new", to: "/blog" },
          { label: "Downloads", to: "/resources" },
          { label: "Port your number", to: "/port-your-number" },
          { label: "Carrier registration", to: "/port-your-number" },
          { label: "System status", to: "/status" },
        ],
      },
      {
        heading: "Company",
        items: [
          { label: "About", to: "/about" },
          { label: "Careers", to: "/careers" },
          { label: "Press", to: "/blog" },
          { label: "Podcast", to: "/blog" },
          { label: "Contact us", to: "/contact" },
        ],
      },
    ],
  },
];

function MegaPanel({ menu }: { menu: MenuDef }) {
  const t = useT();

  return (
    <div
      className={`grid gap-8 p-7 ${menu.wide ? "grid-cols-3" : "grid-cols-3"}`}
    >
      {menu.groups.map((g) => (
        <div key={g.heading}>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {t(g.heading)}
          </p>
          <ul className="space-y-1">
            {g.items.map((it) => (
              <li key={it.label}>
                <a
                  href={it.to ?? "/pricing"}
                  className="flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm font-medium text-foreground/85 transition-colors hover:bg-secondary hover:text-foreground"
                >
                  {it.icon ? (
                    <it.icon className="size-4 shrink-0 text-brand" strokeWidth={2} />
                  ) : null}
                  {t(it.label)}
                </a>
              </li>
            ))}

          </ul>
        </div>
      ))}
    </div>
  );
}

export function SiteHeader() {
  const t = useT();
  const menus = useHeaderMenus(fallbackMenus);
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(null);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div
        ref={wrap}
        className="mx-auto flex h-16 max-w-6xl items-center gap-8 px-5"
        onMouseLeave={() => setOpen(null)}
      >
        <a href="/" className="flex items-center gap-2">
          <img src={mark} alt="Smartytel logo" width={40} height={49} className="h-8 w-auto" />
          <span className="font-display text-xl font-bold tracking-tight">smartytel</span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {menus.slice(0, 2).map((m) => (
            <MenuTrigger key={m.label} menu={m} open={open} setOpen={setOpen} />
          ))}
          <a
            href="/pricing"
            className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            onMouseEnter={() => setOpen(null)}
          >
            {t("Pricing")}
          </a>
          <MenuTrigger menu={menus[2]!} open={open} setOpen={setOpen} />
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <a href="/pricing" className="hidden px-3 text-sm font-medium sm:block">
            {t("Log in")}
          </a>
          <a
            href="/pricing#talk-to-sales"
            className="hidden rounded-md border border-border px-4 py-2 text-sm font-semibold transition-colors hover:bg-dark hover:text-dark-foreground sm:block"
          >
            {t("Talk to sales")}
          </a>
          <a
            href="/pricing"
            className="rounded-md bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground transition-transform hover:-translate-y-0.5"
          >
            {t("Try for free")}
          </a>
          <button
            type="button"
            aria-label={t("Toggle menu")}
            className="rounded-md p-2 md:hidden"
            onClick={() => setMobile((v) => !v)}
          >
            {mobile ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Desktop mega panel */}
      {open ? (
        <div
          className="absolute inset-x-0 top-16 hidden md:block"
          onMouseEnter={() => setOpen(open)}
          onMouseLeave={() => setOpen(null)}
        >
          <div className="mx-auto max-w-6xl px-5">
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
              {(() => {
                const menu = menus.find((m) => m.label === open)!;
                return (
                  <>
                    <MegaPanel menu={menu} />
                    <div className="flex items-center justify-between gap-4 border-t border-border bg-secondary/60 px-7 py-4">
                      <div>
                        <p className="text-sm font-semibold">{t("Ready to get started?")}</p>
                        <a
                          href="/demo"
                          className="text-sm font-medium text-brand hover:underline"
                        >
                          {t("Watch a quick demo →")}
                        </a>
                      </div>
                      <a
                        href="/pricing"
                        className="inline-flex items-center gap-1.5 rounded-md bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground"
                      >
                        Set up your number <ArrowRight className="size-4" />
                      </a>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      ) : null}

      {/* Mobile menu */}
      {mobile ? (
        <div className="max-h-[75vh] overflow-y-auto border-t border-border bg-background px-5 py-4 md:hidden">
          {menus.map((m) => (
            <div key={m.label} className="border-b border-border/60 py-3 last:border-0">
              <p className="mb-2 font-display text-base font-bold">{t(m.label)}</p>
              {m.groups.map((g) => (
                <div key={g.heading} className="mb-3">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {t(g.heading)}
                  </p>
                  <ul className="space-y-0.5">
                    {g.items.map((it) => (
                      <li key={it.label}>
                        <a href={it.to ?? "/pricing"} className="block py-1 text-sm text-foreground/85">
                          {t(it.label)}
                        </a>
                      </li>
                    ))}

                  </ul>
                </div>
              ))}
            </div>
          ))}
          <a href="/pricing" className="block py-3 font-display text-base font-bold">
            {t("Pricing")}
          </a>
        </div>
      ) : null}
    </header>
  );
}

function MenuTrigger({
  menu,
  open,
  setOpen,
}: {
  menu: MenuDef;
  open: string | null;
  setOpen: (v: string | null) => void;
}) {
  const t = useT();
  const active = open === menu.label;
  return (
    <button
      type="button"
      aria-expanded={active}
      onMouseEnter={() => setOpen(menu.label)}
      onClick={() => setOpen(active ? null : menu.label)}
      className={`flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
        active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {t(menu.label)}
      <ChevronDown
        className={`size-3.5 transition-transform ${active ? "rotate-180" : ""}`}
      />
    </button>
  );
}
