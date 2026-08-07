import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Bell, Check, Headphones, RefreshCw, ShieldCheck, Zap } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CtaBand } from "@/components/CtaBand";
import { Link } from "@/components/Link";
import { useT } from "@/i18n/LocaleProvider";

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
  head: () => ({
    meta: [
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
