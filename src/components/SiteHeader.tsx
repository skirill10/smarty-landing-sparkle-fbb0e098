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

type Item = { label: string; icon?: typeof Phone; to?: string };
type Group = { heading: string; items: Item[] };
type MenuDef = { label: string; groups: Group[]; wide?: boolean };

const menus: MenuDef[] = [
  {
    label: "Product",
    groups: [
      {
        heading: "Connect",
        items: [
          { label: "Calling", icon: Phone },
          { label: "Text messaging", icon: MessageSquare },
          { label: "Phone menu & routing", icon: PhoneForwarded },
        ],
      },
      {
        heading: "Collaborate",
        items: [
          { label: "Shared numbers", icon: Users },
          { label: "Analytics & oversight", icon: BarChart3 },
          { label: "CRM", icon: Building2, to: "/crm" },
          { label: "Tasks", icon: ListChecks },
        ],
      },
      {
        heading: "Automate",
        items: [
          { label: "Sona AI agent", icon: Bot },
          { label: "Integrations", icon: Plug },
          { label: "Smartytel API", icon: Terminal },
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
          { label: "Home services", icon: Home },
          { label: "Law firms", icon: Scale },
          { label: "Property management", icon: Building2 },
          { label: "Healthcare", icon: HeartPulse },
          { label: "Education", icon: GraduationCap },
        ],
      },
      {
        heading: "By company size",
        items: [
          { label: "Startups", icon: Rocket },
          { label: "Small business", icon: Store },
          { label: "Franchise", icon: Building2 },
        ],
      },
      {
        heading: "By use case",
        items: [
          { label: "Sales", icon: BarChart3 },
          { label: "Support", icon: Wrench },
          { label: "Operations", icon: Filter },
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
          { label: "Blog" },
          { label: "Customers" },
          { label: "Partners" },
          { label: "Product demo" },
          { label: "Webinars" },
          { label: "Tutorials" },
          { label: "Voicemail generator" },
          { label: "Number generator" },
          { label: "Community" },
        ],
      },
      {
        heading: "Get help",
        items: [
          { label: "Resource center" },
          { label: "Smartytel Academy" },
          { label: "Developer docs" },
          { label: "What's new" },
          { label: "Downloads" },
          { label: "Port your number" },
          { label: "Carrier registration" },
          { label: "System status" },
        ],
      },
      {
        heading: "Company",
        items: [
          { label: "About" },
          { label: "Careers" },
          { label: "Press" },
          { label: "Podcast" },
          { label: "Contact us" },
        ],
      },
    ],
  },
];

function MegaPanel({ menu }: { menu: MenuDef }) {
  return (
    <div
      className={`grid gap-8 p-7 ${menu.wide ? "grid-cols-3" : "grid-cols-3"}`}
    >
      {menu.groups.map((g) => (
        <div key={g.heading}>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {g.heading}
          </p>
          <ul className="space-y-1">
            {g.items.map((it) => (
              <li key={it.label}>
                <a
                  href="#features"
                  className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm font-medium text-foreground/85 transition-colors hover:bg-secondary hover:text-foreground"
                >
                  {it.icon ? (
                    <it.icon className="size-4 shrink-0 text-brand" strokeWidth={2} />
                  ) : null}
                  {it.label}
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
            className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            onMouseEnter={() => setOpen(null)}
          >
            Pricing
          </a>
          <MenuTrigger menu={menus[2]!} open={open} setOpen={setOpen} />
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <a href="/pricing" className="hidden px-3 text-sm font-medium sm:block">
            Log in
          </a>
          <a
            href="/pricing"
            className="hidden rounded-lg border border-border px-4 py-2 text-sm font-semibold transition-colors hover:bg-secondary sm:block"
          >
            Talk to sales
          </a>
          <a
            href="/pricing"
            className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground transition-transform hover:-translate-y-0.5"
          >
            Try for free
          </a>
          <button
            type="button"
            aria-label="Toggle menu"
            className="rounded-lg p-2 md:hidden"
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
                        <p className="text-sm font-semibold">Ready to get started?</p>
                        <a
                          href="/pricing"
                          className="text-sm font-medium text-brand hover:underline"
                        >
                          Watch a quick demo →
                        </a>
                      </div>
                      <a
                        href="/pricing"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground"
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
              <p className="mb-2 font-display text-base font-bold">{m.label}</p>
              {m.groups.map((g) => (
                <div key={g.heading} className="mb-3">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {g.heading}
                  </p>
                  <ul className="space-y-0.5">
                    {g.items.map((it) => (
                      <li key={it.label}>
                        <a href="#features" className="block py-1 text-sm text-foreground/85">
                          {it.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
          <a href="/pricing" className="block py-3 font-display text-base font-bold">
            Pricing
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
  const active = open === menu.label;
  return (
    <button
      type="button"
      aria-expanded={active}
      onMouseEnter={() => setOpen(menu.label)}
      onClick={() => setOpen(active ? null : menu.label)}
      className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
        active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {menu.label}
      <ChevronDown
        className={`size-3.5 transition-transform ${active ? "rotate-180" : ""}`}
      />
    </button>
  );
}
