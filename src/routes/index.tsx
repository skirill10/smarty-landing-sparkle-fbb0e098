import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Phone,
  PhoneForwarded,
  Filter,
  MessageSquare,
  Bot,
  BarChart3,
  Users,
  Plug,
  Check,
  Play,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";
import dashboard from "@/assets/app-dashboard.jpg";
import featThreads from "@/assets/feat-threads.jpg";
import featGroupCall from "@/assets/feat-group-call.jpg";
import featTransfer from "@/assets/feat-transfer.jpg";
import featTeamAnalytics from "@/assets/feat-team-analytics.jpg";
import featFilters from "@/assets/feat-filters.jpg";
import featCallLogs from "@/assets/feat-call-logs.jpg";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

import { CtaBand } from "@/components/CtaBand";
import { BuiltForSection } from "@/components/BuiltForSection";
import { IntegrationsSection } from "@/components/IntegrationsSection";
import { HeyAiSection } from "@/components/HeyAiSection";
import { useT } from "@/i18n/LocaleProvider";
import { useHomeContent } from "@/lib/cms-content";

import showcaseNumbers from "@/assets/showcase-numbers.jpg";
import showcaseShared from "@/assets/showcase-shared.jpg";
import showcaseRouting from "@/assets/showcase-routing.jpg";
import showcaseAi from "@/assets/showcase-ai.jpg";
import showcaseAnalytics from "@/assets/showcase-analytics.jpg";
import showcaseIntegrations from "@/assets/showcase-integrations.jpg";
import storyWindow from "@/assets/story-window-services.jpg";
import storyDental from "@/assets/story-dental.jpg";
import storyRealty from "@/assets/story-realty.jpg";
import storyHvac from "@/assets/story-hvac.jpg";
import storyLegal from "@/assets/story-legal.jpg";
import storyJunkaway from "@/assets/story-junkaway.jpg";

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

const stories = [
  {
    business: "Pink's Window Services",
    person: "Carter Smith",
    role: "Co-Founder",
    quote: "We're so confident in saying, 'Hey everybody, just get on Smartytel. Save yourself the time, save yourself the hassle.'",
    stat: "375+",
    statLabel: "hours saved weekly",
    image: storyWindow,
    alt: "Window cleaning crew working on a residential home",
  },
  {
    business: "Bright Dental",
    person: "Dr. Priya Malhotra",
    role: "Practice Owner",
    quote: "Patients used to wait on hold for 10 minutes. Now our front desk answers every text in seconds.",
    stat: "98%",
    statLabel: "message response rate",
    image: storyDental,
    alt: "Dental office receptionist greeting a patient",
  },
  {
    business: "Kelso Realty",
    person: "Marcus Kelso",
    role: "Broker",
    quote: "One number for the whole team means no buyer ever gets sent to voicemail.",
    stat: "3x",
    statLabel: "more showings booked",
    image: storyRealty,
    alt: "Real estate agent showing a home",
  },
  {
    business: "Northwind HVAC",
    person: "Elena Torres",
    role: "Operations Manager",
    quote: "Routing after-hours emergencies straight to the on-call tech saved us from losing a $40k contract.",
    stat: "24/7",
    statLabel: "emergency coverage",
    image: storyHvac,
    alt: "HVAC technician servicing an outdoor unit",
  },
  {
    business: "Halden Legal",
    person: "Sam Halden",
    role: "Managing Partner",
    quote: "Clients can text us instead of playing phone tag. It changed how we close cases.",
    stat: "42%",
    statLabel: "faster intake replies",
    image: storyLegal,
    alt: "Legal team reviewing documents in a conference room",
  },
  {
    business: "Junkaway",
    person: "Riley Park",
    role: "Owner",
    quote: "Crews in the field finally have one inbox for calls, texts and photos. No more chasing threads.",
    stat: "200+",
    statLabel: "extra jobs scheduled monthly",
    image: storyJunkaway,
    alt: "Junk removal crew loading a truck",
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Business Phone System & Shared Inbox | Smartytel" },
      {
        name: "description",
        content:
          "Smartytel is the business phone system and shared team inbox for calls, SMS and WhatsApp — local numbers in the US, Canada, the UK and across Europe.",
      },
      { property: "og:title", content: "Business Phone System & Shared Inbox | Smartytel" },
      {
        property: "og:description",
        content:
          "Calls, texts and customers in one shared workspace. Get a business phone number in the US, Canada, the UK or any European country in minutes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});


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
    name: "Trial",
    price: "$0",
    unit: "/14 days",
    tagline: "Try everything with a demo number, no card needed.",
    perks: ["14-day free trial", "Demo phone number", "Calling & messaging basics", "Mobile & desktop apps"],
  },
  {
    name: "Startup",
    price: "$15",
    unit: "/user/mo",
    tagline: "For solo operators getting off a personal number.",
    perks: ["1 local number included", "Local & long-distance calls", "SMS & chat apps", "Contacts and call history"],
  },
  {
    name: "Business",
    price: "$25",
    unit: "/user/mo",
    tagline: "For teams that answer every call, together.",
    perks: ["Everything in Startup", "IVR phone menus", "Call recording & hunting", "Call forwarding", "AI assistance add-on"],
    featured: true,
  },
  {
    name: "Scale",
    price: "$35",
    unit: "/user/mo",
    tagline: "For contact centers and multi-location brands.",
    perks: ["Everything in Business", "AI transcripts & summaries", "Custom telephony flows", "Advanced analytics", "Priority support"],
  },
];


/** Bundled copy; the CMS overlays text on top of this at runtime. */
const homeFallback = {
  hero: {
    rating: "4.8 stars",
    reviews: "2,100+ reviews",
    headline: "The business phone system that never misses a call",
    sub: "Smartytel gives your team a shared business phone number and one inbox for every call, SMS and WhatsApp thread — with local numbers across the US, Canada, the UK and every European country, and an AI agent answering after hours.",
    primaryCta: "Try for free",
    secondaryCta: "See how it works (1:00)",
    platforms: "Available on iOS, Android, macOS, Windows and Web",
  },
  logos: {
    heading: "Powering conversations for 40,000+ businesses",
    items: ["Northwind", "Kelso Realty", "Bright Dental", "Halden Legal", "Vera Health", "Junkaway"],
  },
  featureGroups,
  showcaseHeading: "Everything a modern business phone system should do",
  showcase,
  storiesHeading: "Business phone stories from teams like yours",
  storiesSub: "See how teams stay connected with customers.",
  stories,
  plans,
};

function StoriesSlider({ items }: { items: typeof stories }) {
  const t = useT();
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i === 0 ? items.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === items.length - 1 ? 0 : i + 1));

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {items.map((story) => (
            <div key={story.business} className="w-full shrink-0 px-1">
              <article className="grid overflow-hidden rounded-3xl border border-dark-foreground/10 bg-dark-foreground/10 md:grid-cols-2">
                <div className="relative">
                  <img
                    src={story.image}
                    alt={story.alt}
                    loading="lazy"
                    width={1024}
                    height={768}
                    className="h-64 w-full object-cover md:h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6">
                    <p className="font-display text-4xl font-bold text-dark-foreground drop-shadow-sm">{story.stat}</p>
                    <p className="text-sm font-medium text-dark-foreground/90">{t(story.statLabel)}</p>
                  </div>
                </div>
                <div className="flex flex-col justify-center p-8 md:p-12">
                  <p className="font-display text-xl font-semibold text-brand">{story.business}</p>
                  <blockquote className="mt-4 font-display text-2xl font-medium leading-snug tracking-tight text-dark-foreground md:text-3xl">
                    “{t(story.quote)}”
                  </blockquote>
                  <div className="mt-6">
                    <p className="font-semibold text-dark-foreground/90">{story.person}</p>
                    <p className="text-sm text-dark-foreground/70">{t(story.role)}</p>
                  </div>
                  <a
                    href="#features"
                    className="mt-8 inline-flex w-fit items-center gap-2 rounded-md bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground transition-all hover:-translate-y-0.5 hover:bg-dark hover:text-dark-foreground"
                  >
                    {t("Read the story")}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </a>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <a href="#features" className="inline-flex items-center gap-2 text-sm font-semibold text-dark-foreground hover:text-brand">
          {t("View all stories")}
          <ArrowRight className="size-4" aria-hidden="true" />
        </a>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={prev}
            className="rounded-md border border-dark-foreground/20 p-2 text-dark-foreground transition-colors hover:bg-dark-foreground/10"
            aria-label={t("Previous story")}
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={next}
            className="rounded-md border border-dark-foreground/20 p-2 text-dark-foreground transition-colors hover:bg-dark-foreground/10"
            aria-label={t("Next story")}
          >
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

function Landing() {
  const t = useT();
  const {
    hero,
    logos,
    featureGroups: featureGroupsContent,
    showcaseHeading,
    showcase: showcaseContent,
    storiesHeading,
    storiesSub,
    stories: storiesContent,
  } = useHomeContent(homeFallback);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground antialiased">
      <SiteHeader />


      <main>
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-5 pt-16 text-center md:pt-24">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Star className="size-4 fill-accent text-accent" aria-hidden="true" />
            <span className="font-semibold text-foreground">{t(hero.rating)}</span>
            <span aria-hidden="true">|</span>
            <span>{t(hero.reviews)}</span>
          </div>
          <h1 className="mx-auto mt-8 max-w-4xl font-display text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl">
            {t(hero.headline)}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            {t(hero.sub)}
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/pricing"
              className="rounded-md bg-brand px-6 py-3 font-semibold text-brand-foreground transition-all hover:-translate-y-0.5 hover:bg-dark hover:text-dark-foreground"
            >
              {t(hero.primaryCta)}
            </a>
            <a
              href="#features"
              className="inline-flex items-center gap-2 rounded-md px-4 py-3 font-medium text-foreground transition-colors hover:bg-dark hover:text-dark-foreground"
            >
              <Play className="size-4" aria-hidden="true" />
              {t(hero.secondaryCta)}
            </a>
          </div>
          <p className="mt-8 text-sm text-muted-foreground">
            {t(hero.platforms)}
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
            {t(logos.heading)}
          </p>
          <div className="mt-8 grid grid-cols-2 gap-6 opacity-70 sm:grid-cols-3 md:grid-cols-6">
            {logos.items.map(
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
            {featureGroupsContent.map(({ heading, cards }) => (
              <div key={heading} className="mt-14">
                <h3 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                  {t(heading)}
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
                          {t(title)}
                        </h4>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(body)}</p>
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
          <h2 className="max-w-2xl font-display text-4xl font-bold tracking-tight md:text-5xl">
            {t(showcaseHeading)}
          </h2>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {showcaseContent.map(({ title, link, image, alt }) => (
              <article
                key={title}
                className="flex flex-col overflow-hidden rounded-2xl bg-light-grey p-8"
              >
                <h3 className="font-display text-2xl font-semibold leading-snug tracking-tight">
                  {t(title)}
                </h3>
                <a
                  href="#features"
                  className="mt-5 inline-flex items-center gap-2 font-medium text-foreground hover:text-brand"
                >
                  {t(link)}
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

        {/* Business stories */}
        <section className="bg-dark py-20 text-dark-foreground md:py-28">
          <div className="mx-auto max-w-6xl px-5">
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <h2 className="max-w-2xl font-display text-4xl font-bold tracking-tight md:text-5xl">
                {t(storiesHeading)}
              </h2>
              <p className="text-dark-foreground/80">{t(storiesSub)}</p>
            </div>
            <div className="mt-12">
              <StoriesSlider items={storiesContent} />
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
              <p className="mt-2 max-w-xs text-muted-foreground">{t(label!)}</p>
            </div>
          ))}
        </section>

        <BuiltForSection />

        <IntegrationsSection />

        <HeyAiSection />

        {/* CTA */}
        <CtaBand />
      </main>

      <SiteFooter />

    </div>
  );
}
