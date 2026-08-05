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
import featThreads from "@/assets/feat-threads.jpg";
import featGroupCall from "@/assets/feat-group-call.jpg";
import featTransfer from "@/assets/feat-transfer.jpg";
import featTeamAnalytics from "@/assets/feat-team-analytics.jpg";
import featFilters from "@/assets/feat-filters.jpg";
import featCallLogs from "@/assets/feat-call-logs.jpg";
import mark from "@/assets/smartytel-mark.png.asset.json";
import showcaseNumbers from "@/assets/showcase-numbers.jpg";
import showcaseShared from "@/assets/showcase-shared.jpg";
import showcaseRouting from "@/assets/showcase-routing.jpg";
import showcaseAi from "@/assets/showcase-ai.jpg";
import showcaseAnalytics from "@/assets/showcase-analytics.jpg";
import showcaseIntegrations from "@/assets/showcase-integrations.jpg";

const showcase = [
  {
    title: "Set up a business number in minutes",
    link: "Get a number",
    image: showcaseNumbers,
    alt: "List of available local and toll-free business phone numbers",
  },
  {
    title: "Share one number and stay aligned with your team",
    link: "Shared numbers",
    image: showcaseShared,
    alt: "Shared team inbox with call and message threads",
  },
  {
    title: "Route incoming calls the right person instantly",
    link: "Call routing",
    image: showcaseRouting,
    alt: "Call routing flow with business hours and team ring groups",
  },
  {
    title: "Never miss a lead. Let AI answer when your team can't",
    link: "Smarty AI agent",
    image: showcaseAi,
    alt: "AI generated summary of a new inbound lead",
  },
  {
    title: "Spot issues before they cost your business",
    link: "Analytics",
    image: showcaseAnalytics,
    alt: "Call volume analytics chart with missed and answered calls",
  },
  {
    title: "Sync calls and texts with your favorite tools",
    link: "Integrations",
    image: showcaseIntegrations,
    alt: "Grid of app integration logos",
  },
];



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

const featureGroups = [
  {
    heading: "Easy collaboration",
    cards: [
      {
        icon: MessageSquare,
        title: "Internal threads",
        body: "Use threads to solve problems behind the scenes as a team",
        image: featThreads,
        alt: "Internal team thread with replies on a customer message",
      },
      {
        icon: Users,
        title: "Group calling",
        body: "Bring anyone else you need on your team into the conversation",
        image: featGroupCall,
        alt: "Call in progress card showing seven people on the call",
      },
      {
        icon: PhoneForwarded,
        title: "Warm transfer",
        body: "Ensure a smooth hand-off by sharing context while transferring calls",
        image: featTransfer,
        alt: "Shared inboxes list with a call transfer request",
      },
    ],
  },
  {
    heading: "Better team oversight",
    cards: [
      {
        icon: BarChart3,
        title: "Team analytics",
        body: "Managers can see an in-depth overview of team activity",
        image: featTeamAnalytics,
        alt: "Call volume chart with missed, incoming and outgoing calls",
      },
      {
        icon: Filter,
        title: "Filter conversations",
        body: "Sort conversations to focus on what needs attention",
        image: featFilters,
        alt: "Conversation list filtered by unread and unresponded",
      },
      {
        icon: Phone,
        title: "View call logs by priority",
        body: "See the call activity that matters most to you",
        image: featCallLogs,
        alt: "Call log list with a status dropdown open",
      },
    ],
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
              className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground transition-transform hover:-translate-y-0.5"
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
              className="rounded-xl bg-brand px-6 py-3 font-semibold text-brand-foreground transition-transform hover:-translate-y-0.5"
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
        <section id="features" className="border-y border-border bg-light-grey py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-5">
            <h2 className="max-w-2xl font-display text-4xl font-bold tracking-tight md:text-5xl">
              Always say hello with Smartytel
            </h2>
            {featureGroups.map(({ heading, cards }) => (
              <div key={heading} className="mt-14">
                <h3 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                  {heading}
                </h3>
                <div className="mt-6 grid gap-6 md:grid-cols-3">
                  {cards.map(({ icon: Icon, title, body, image, alt }) => (
                    <article
                      key={title}
                      className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card"
                    >
                      <div className="p-7">
                        <Icon className="size-6 text-brand" aria-hidden="true" />
                        <h4 className="mt-5 font-display text-lg font-semibold tracking-tight">
                          {title}
                        </h4>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
                      </div>
                      <div className="mt-auto max-h-52 overflow-hidden border-t border-border px-6 pt-6">
                        <img
                          src={image}
                          alt={alt}
                          loading="lazy"
                          width={720}
                          height={560}
                          className="w-full rounded-t-xl"
                        />
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* Showcase bento */}
        <section className="mx-auto max-w-6xl px-5 py-20 md:py-28">
          <div className="grid gap-6 md:grid-cols-3">
            {showcase.map(({ title, link, image, alt }) => (
              <article
                key={title}
                className="flex flex-col overflow-hidden rounded-2xl bg-light-grey p-8"
              >
                <h3 className="font-display text-2xl font-semibold leading-snug tracking-tight">
                  {title}
                </h3>
                <a
                  href="#features"
                  className="mt-5 inline-flex items-center gap-2 font-medium text-foreground hover:text-brand"
                >
                  {link}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </a>
                <img
                  src={image}
                  alt={alt}
                  loading="lazy"
                  width={928}
                  height={720}
                  className="mt-8 w-full rounded-xl"
                />
              </article>
            ))}
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
                      <span className="rounded-full bg-brand px-3 py-1 text-xs font-semibold text-brand-foreground">
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
                        ? "mt-8 block rounded-xl bg-brand px-4 py-3 text-center font-semibold text-brand-foreground"
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
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3 font-semibold text-brand-foreground transition-transform hover:-translate-y-0.5"
            >
              Try Smartytel free
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 text-sm text-muted-foreground">
          <span className="flex items-center gap-2 font-display font-bold text-foreground">
            <img
              src={mark.url}
              alt=""
              width={40}
              height={49}
              loading="lazy"
              className="h-6 w-auto"
            />
            smartytel.com
          </span>

          <span>© {new Date().getFullYear()} Smartytel. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
