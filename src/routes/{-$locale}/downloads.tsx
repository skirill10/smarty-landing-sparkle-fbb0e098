import { createFileRoute } from "@tanstack/react-router";
import * as si from "simple-icons";
import { ArrowRight, Bell, Check, Headphones, RefreshCw, ShieldCheck, Zap } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CtaBand } from "@/components/CtaBand";
import { Link } from "@/components/Link";
import { useT } from "@/i18n/LocaleProvider";
import { canonicalUrl } from "@/lib/seo";

/** Windows' mark isn't shipped by simple-icons, so its path is inlined. */
const windowsPath =
  "M0 3.449L9.75 2.1v9.451H0V3.449zm10.949-1.5L24 0v11.4H10.949V1.949zM0 12.6h9.75v9.451L0 20.699V12.6zm10.949 0H24V24l-13.051-1.85V12.6z";

/** A simple browser-window glyph stands in for the web app. */
const webPath =
  "M2 2h20a1 1 0 011 1v18a1 1 0 01-1 1H2a1 1 0 01-1-1V3a1 1 0 011-1zm1 5v13h18V7H3zm1.5-3.25a.9.9 0 100 1.8.9.9 0 000-1.8zm3 0a.9.9 0 100 1.8.9.9 0 000-1.8zM5 9h5v9H5V9zm7 0h7v9h-7V9z";

type Platform = {
  name: string;
  kind: string;
  path: string;
  color: string;
  requirement: string;
  cta: string;
  href: string;
};

const platforms: Platform[] = [
  {
    name: "iOS",
    kind: "Mobile app",
    path: si.siAppstore.path,
    color: "#0D96F6",
    requirement: "iPhone and iPad, iOS 16 or later",
    cta: "Get it on the App Store",
    href: "https://apps.apple.com/app/smartytel",
  },
  {
    name: "Android",
    kind: "Mobile app",
    path: si.siGoogleplay.path,
    color: "#00A263",
    requirement: "Phones and tablets, Android 10 or later",
    cta: "Get it on Google Play",
    href: "https://play.google.com/store/apps/details?id=com.smartytel.app",
  },
  {
    name: "Mac",
    kind: "Desktop app",
    path: si.siApple.path,
    color: "#111111",
    requirement: "Apple silicon and Intel, macOS 13 or later",
    cta: "Download for Mac",
    href: "https://smartytel.com/download/mac",
  },
  {
    name: "Windows",
    kind: "Desktop app",
    path: windowsPath,
    color: "#0F8CE9",
    requirement: "Windows 10 and 11, 64-bit installer",
    cta: "Download for Windows",
    href: "https://smartytel.com/download/windows",
  },
  {
    name: "Web",
    kind: "Web app",
    path: webPath,
    color: "#7071E5",
    requirement: "Chrome, Edge, Safari and Firefox — nothing to install",
    cta: "Open the web app",
    href: "https://app.smartytel.com",
  },
];

const highlights = [
  {
    icon: Zap,
    title: "One login, every device",
    body: "Calls, texts, WhatsApp and Telegram stay in sync across desktop, mobile and web.",
  },
  {
    icon: Bell,
    title: "Native notifications",
    body: "Ring on the device you are actually using, with shared-number and IVR routing respected.",
  },
  {
    icon: Headphones,
    title: "HD audio and headsets",
    body: "Echo cancellation, device switching and hotkeys for mute, hold and transfer.",
  },
  {
    icon: RefreshCw,
    title: "Automatic updates",
    body: "Desktop apps update quietly in the background, so your team is always on the latest build.",
  },
  {
    icon: ShieldCheck,
    title: "Secure by default",
    body: "Encrypted signalling and media, SSO-ready sign-in and remote sign-out for lost devices.",
  },
  {
    icon: Check,
    title: "Works on any plan",
    body: "Every app is included from $12 per user per month — no per-device charges.",
  },
];

function PlatformCard({ platform }: { platform: Platform }) {
  const t = useT();

  return (
    <a
      href={platform.href}
      target="_blank"
      rel="noreferrer noopener"
      className="group flex flex-col items-center rounded-2xl border-2 border-foreground/85 bg-card px-5 py-8 text-center transition-all hover:-translate-y-1 hover:shadow-xl"
    >
      <svg
        viewBox="0 0 24 24"
        className="size-12 fill-current"
        style={{ color: platform.color }}
        aria-hidden="true"
      >
        <path d={platform.path} />
      </svg>
      <span className="mt-6 font-display text-2xl font-bold tracking-tight">{platform.name}</span>
      <span className="mt-1 text-sm text-muted-foreground">{t(platform.kind)}</span>
      <span className="mt-4 text-xs leading-relaxed text-muted-foreground">
        {t(platform.requirement)}
      </span>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand group-hover:underline">
        {t(platform.cta)} <ArrowRight className="size-4" />
      </span>
    </a>
  );
}

function Downloads() {
  const t = useT();

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main>
        <section className="mx-auto max-w-6xl px-5 pb-14 pt-16 md:pt-24">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand">
            {t("Downloads")}
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
            {t("Smartytel on every device your team uses")}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            {t(
              "Download the iOS, Android, Mac and Windows apps, or work straight from the browser. Your numbers, shared inbox and CRM follow you everywhere.",
            )}
          </p>
        </section>

        <section className="mx-auto max-w-6xl px-5 pb-20">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {platforms.map((p) => (
              <PlatformCard key={p.name} platform={p} />
            ))}
          </div>
        </section>

        <section className="bg-light-grey py-20">
          <div className="mx-auto max-w-6xl px-5">
            <h2 className="max-w-2xl font-display text-3xl font-bold tracking-tight md:text-4xl">
              {t("The same phone system, wherever you work")}
            </h2>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {highlights.map((h) => (
                <div key={h.title} className="rounded-2xl border border-border bg-card p-7">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-brand/12">
                    <h.icon className="size-5 text-brand" strokeWidth={2.5} />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold">{t(h.title)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(h.body)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-20">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                {t("Getting your team set up")}
              </h2>
              <p className="mt-5 text-muted-foreground">
                {t(
                  "Install the app, sign in with your Smartytel account and pick the numbers you answer. Admins can push the desktop apps with their usual device management tools.",
                )}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  to="/pricing"
                  className="inline-flex items-center gap-2 rounded-md bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground transition-all hover:-translate-y-0.5 hover:bg-dark hover:text-dark-foreground"
                >
                  {t("Start free trial")} <ArrowRight className="size-4" />
                </Link>
                <Link
                  to="/docs"
                  className="inline-flex items-center rounded-md border border-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-dark hover:text-dark-foreground"
                >
                  {t("Developer docs")}
                </Link>
              </div>
            </div>
            <ul className="grid gap-3 self-start">
              {[
                "Silent install packages for Windows and Mac fleets",
                "SSO sign-in and remote sign-out for lost devices",
                "Number porting help while you roll the apps out",
                "Status page and release notes for every update",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-border bg-card px-5 py-4 text-sm font-medium"
                >
                  <Check className="mt-0.5 size-4 shrink-0 text-brand" strokeWidth={2.5} />
                  {t(item)}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <CtaBand />
      </main>

      <SiteFooter />
    </div>
  );
}

export const Route = createFileRoute("/{-$locale}/downloads")({
  head: ({ params }) => ({
    links: [{ rel: "canonical", href: canonicalUrl("/downloads", params.locale) }],
    meta: [
      { property: "og:url", content: canonicalUrl("/downloads", params.locale) },
      { title: "Download the Smartytel apps for iOS, Android, Mac & Windows" },
      {
        name: "description",
        content:
          "Get Smartytel on iPhone, Android, Mac, Windows and the web — one business phone system with shared numbers, texting and CRM on every device.",
      },
      {
        property: "og:title",
        content: "Download the Smartytel apps for iOS, Android, Mac & Windows",
      },
      {
        property: "og:description",
        content:
          "Get Smartytel on iPhone, Android, Mac, Windows and the web — one business phone system on every device.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Downloads,
});
