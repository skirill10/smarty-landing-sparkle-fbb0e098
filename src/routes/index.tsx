import { createFileRoute } from "@tanstack/react-router";
import {
  Phone,
  MessageSquare,
  Bot,
  BarChart3,
  Users,
  Plug,
  Check,
  Play,
  ArrowRight,
  Star,
} from "lucide-react";
import dashboard from "@/assets/app-dashboard.jpg";
import mark from "@/assets/smartytel-mark.png.asset.json";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Smartytel — Business Phone & Shared Inbox for Teams" },
      {
        name: "description",
        content:
          "Smartytel is the business phone system and shared inbox that keeps every call, text and customer in one place — with an AI agent answering after hours.",
      },
      { property: "og:title", content: "Smartytel — Business Phone & Shared Inbox" },
      {
        property: "og:description",
        content:
          "Calls, texts and customers in one shared workspace. Set up a business number in minutes and never miss a lead.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

const navLinks = ["Product", "Solutions", "Pricing", "Resources"];

const features = [
  {
    icon: Phone,
    title: "Set up a business number in minutes",
    body: "Local or toll-free numbers, ported or brand new, live on every device your team already uses.",
  },
  {
    icon: Users,
    title: "Share one number, stay aligned",
    body: "Your whole team works from a single inbox with internal threads, mentions and handoffs.",
  },
  {
    icon: Bot,
    title: "Let the AI agent answer after hours",
    body: "Smarty answers, qualifies and books — then hands you a clean summary in the morning.",
  },
  {
    icon: MessageSquare,
    title: "Text customers like a human",
    body: "Snippets, auto-replies and scheduled messages that keep conversations moving.",
  },
  {
    icon: BarChart3,
    title: "Spot problems before they cost you",
    body: "Response times, missed calls and team activity, tracked per number and per teammate.",
  },
  {
    icon: Plug,
    title: "Sync with the tools you run on",
    body: "HubSpot, Salesforce, Slack, Zapier and a full API for everything else.",
  },
];

const plans = [
  {
    name: "Starter",
    price: "$15",
    tagline: "For solo operators getting off a personal number.",
    perks: ["1 local number per user", "Calls & texts in the US and Canada", "Shared contacts", "Mobile & desktop apps"],
  },
  {
    name: "Business",
    price: "$29",
    tagline: "For teams that answer every call, together.",
    perks: ["Everything in Starter", "Shared numbers & inboxes", "Call routing & IVR menus", "Analytics dashboards", "Integrations & API"],
    featured: true,
  },
  {
    name: "Scale",
    price: "Custom",
    tagline: "For contact centers and multi-location brands.",
    perks: ["Everything in Business", "Smarty AI agent, unlimited", "SSO & audit logs", "Dedicated onboarding"],
  },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground antialiased">
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-8 px-5">
          <a href="/" className="flex items-center gap-2">
            <img
              src={mark.url}
              alt="Smartytel logo"
              width={40}
              height={49}
              className="h-8 w-auto"
            />
            <span className="font-display text-xl font-bold tracking-tight">smartytel</span>
          </a>

          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((l) => (
              <a
                key={l}
                href="#features"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {l}
              </a>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <a href="#pricing" className="hidden px-3 text-sm font-medium sm:block">
              Log in
            </a>
            <a
              href="#pricing"
              className="hidden rounded-lg border border-border px-4 py-2 text-sm font-semibold transition-colors hover:bg-secondary sm:block"
            >
              Talk to sales
            </a>
            <a
              href="#pricing"
              className="rounded-lg bg-lime px-4 py-2 text-sm font-semibold text-lime-foreground transition-transform hover:-translate-y-0.5"
            >
              Try for free
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-5 pt-16 text-center md:pt-24">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Star className="size-4 fill-accent text-accent" aria-hidden="true" />
            <span className="font-semibold text-foreground">4.8 stars</span>
            <span aria-hidden="true">|</span>
            <span>2,100+ reviews</span>
          </div>
          <h1 className="mx-auto mt-8 max-w-4xl font-display text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl">
            Never lose a customer to a missed call
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Smartytel is the shared business phone and inbox that gives your team one place for every
            call, text and customer — so no opportunity slips through, even after hours.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#pricing"
              className="rounded-xl bg-lime px-6 py-3 font-semibold text-lime-foreground transition-transform hover:-translate-y-0.5"
            >
              Try for free
            </a>
            <a
              href="#features"
              className="inline-flex items-center gap-2 rounded-xl px-4 py-3 font-medium text-foreground transition-colors hover:bg-secondary"
            >
              <Play className="size-4" aria-hidden="true" />
              See how it works (1:00)
            </a>
          </div>
          <p className="mt-8 text-sm text-muted-foreground">
            Available on iOS, Android, macOS, Windows and Web
          </p>

          <div className="mt-14 rounded-3xl bg-surface p-3 md:p-8">
            <img
              src={dashboard}
              alt="Smartytel shared inbox showing calls, texts and contact details"
              width={1600}
              height={1008}
              className="w-full rounded-2xl shadow-2xl"
            />
          </div>
        </section>

        {/* Logos */}
        <section className="mx-auto max-w-6xl px-5 py-16">
          <p className="text-center text-sm font-medium text-muted-foreground">
            Powering conversations for 40,000+ businesses
          </p>
          <div className="mt-8 grid grid-cols-2 gap-6 opacity-70 sm:grid-cols-3 md:grid-cols-6">
            {["Northwind", "Kelso Realty", "Bright Dental", "Halden Legal", "Vera Health", "Junkaway"].map(
              (name) => (
                <div
                  key={name}
                  className="text-center font-display text-base font-semibold tracking-tight text-muted-foreground"
                >
                  {name}
                </div>
              ),
            )}
          </div>
        </section>

        {/* Features */}
        <section id="features" className="border-y border-border bg-surface py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-5">
            <h2 className="max-w-2xl font-display text-4xl font-bold tracking-tight md:text-5xl">
              Always say hello with Smartytel
            </h2>
            <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
              {features.map(({ icon: Icon, title, body }) => (
                <article key={title} className="bg-card p-8">
                  <span className="inline-flex size-11 items-center justify-center rounded-xl bg-lime text-lime-foreground">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 font-display text-xl font-semibold tracking-tight">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-3">
          {[
            ["38%", "more calls answered in the first month"],
            ["4 hrs", "saved per rep every week on follow-ups"],
            ["12 min", "average time to get a number live"],
          ].map(([stat, label]) => (
            <div key={stat}>
              <p className="font-display text-5xl font-bold tracking-tight">{stat}</p>
              <p className="mt-2 max-w-xs text-muted-foreground">{label}</p>
            </div>
          ))}
        </section>

        {/* Pricing */}
        <section id="pricing" className="border-t border-border py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-5">
            <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
              Simple pricing, per user
            </h2>
            <p className="mt-4 text-muted-foreground">Billed monthly. Cancel any time.</p>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
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
                    <h3 className="font-display text-lg font-semibold">{plan.name}</h3>
                    {plan.featured && (
                      <span className="rounded-full bg-lime px-3 py-1 text-xs font-semibold text-lime-foreground">
                        Most popular
                      </span>
                    )}
                  </div>
                  <p className="mt-5 font-display text-4xl font-bold tracking-tight">
                    {plan.price}
                    {plan.price !== "Custom" && (
                      <span className="text-base font-medium text-muted-foreground">/user/mo</span>
                    )}
                  </p>
                  <p className="mt-3 text-sm text-muted-foreground">{plan.tagline}</p>
                  <ul className="mt-6 space-y-3 text-sm">
                    {plan.perks.map((perk) => (
                      <li key={perk} className="flex gap-2">
                        <Check className="mt-0.5 size-4 shrink-0 text-accent-foreground" aria-hidden="true" />
                        <span className="text-muted-foreground">{perk}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#pricing"
                    className={
                      plan.featured
                        ? "mt-8 block rounded-xl bg-lime px-4 py-3 text-center font-semibold text-lime-foreground"
                        : "mt-8 block rounded-xl border border-border px-4 py-3 text-center font-semibold transition-colors hover:bg-secondary"
                    }
                  >
                    {plan.price === "Custom" ? "Talk to sales" : "Start free trial"}
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-6xl px-5 pb-20">
          <div className="rounded-3xl bg-primary px-8 py-16 text-center text-primary-foreground md:py-20">
            <h2 className="mx-auto max-w-2xl font-display text-4xl font-bold tracking-tight md:text-5xl">
              Your next customer is calling right now
            </h2>
            <a
              href="#pricing"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-lime px-6 py-3 font-semibold text-lime-foreground transition-transform hover:-translate-y-0.5"
            >
              Try Smartytel free
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 text-sm text-muted-foreground">
          <span className="font-display font-bold text-foreground">smartytel.com</span>
          <span>© {new Date().getFullYear()} Smartytel. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
