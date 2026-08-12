import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CtaBand } from "@/components/CtaBand";
import { Link } from "@/components/Link";
import { useT } from "@/i18n/LocaleProvider";
import { useContactContent, useSocialLinks } from "@/lib/cms-content";
import * as si from "simple-icons";
import {
  ArrowRight,
  Headphones,
  MessageSquare,
  Newspaper,
  Puzzle,
  Settings,
  Users,
  Activity,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { canonicalUrl } from "@/lib/seo";

const linkedinPath =
  "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z";

type Channel = {
  icon: LucideIcon;
  title: string;
  body: string;
  cta: string;
  to?: string;
  href?: string;
};

const channelFallback: Channel[] = [
  {
    icon: MessageSquare,
    title: "Talk to sales",
    body: "Connect with our team to see how Smartytel fits your business, understand pricing, or request a live demo.",
    cta: "Contact sales",
    to: "/pricing",
  },
  {
    icon: Headphones,
    title: "Customer support",
    body: "Get help from our support team, or browse guides, FAQs and tutorials in the resource center.",
    cta: "Contact support",
    href: "mailto:support@smartytel.com",
  },
  {
    icon: Puzzle,
    title: "Become a partner",
    body: "Have an idea for partnering with us, or unsure which partner program fits best? Let's talk it through.",
    cta: "Contact partnerships",
    to: "/partners",
  },
  {
    icon: Settings,
    title: "Developer support",
    body: "Resources built for developers integrating with the Smartytel API, webhooks and SDKs.",
    cta: "Visit developer docs",
    to: "/docs",
  },
  {
    icon: Newspaper,
    title: "Press inquiries",
    body: "Reach our media team for press information, company facts and interview requests.",
    cta: "Email the press team",
    href: "mailto:press@smartytel.com",
  },
  {
    icon: Users,
    title: "Join our community",
    body: "For Smartytel discussions, tips and product updates, join our community on Reddit.",
    cta: "Join the community",
    href: "https://www.reddit.com/r/smartytel",
  },
];

const fallbackSocials = [
  { name: "LinkedIn", href: "https://www.linkedin.com/company/smartytel", path: linkedinPath },
  { name: "X", href: "https://x.com/smartytel", path: si.siX.path },
  { name: "YouTube", href: "https://www.youtube.com/@smartytel", path: si.siYoutube.path },
  { name: "Instagram", href: "https://www.instagram.com/smartytel", path: si.siInstagram.path },
];

function ContactPage() {
  const t = useT();
  const socials = useSocialLinks(fallbackSocials);
  const { hero, channels } = useContactContent({
    hero: {
      eyebrow: "Contact",
      headline: "Contact us",
      sub: "Get in touch with Smartytel for demos, support, billing questions, partnerships and press \u2014 answered on the phone system we build.",
    },
    channels: channelFallback,
  });

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main>
        <section className="mx-auto max-w-4xl px-5 pb-12 pt-16 text-center md:pt-24">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand">
            {t(hero.eyebrow)}
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
            {t(hero.headline)}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {t(hero.sub)}
          </p>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-6">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {channels.map((channel) => {
              const Icon = channel.icon;
              const cta = (
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-colors group-hover:text-foreground">
                  {t(channel.cta)}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              );
              const inner = (
                <>
                  <span className="grid size-11 place-items-center rounded-md bg-brand/10 text-brand">
                    <Icon className="size-5" />
                  </span>
                  <h2 className="mt-5 font-display text-lg font-bold tracking-tight">
                    {t(channel.title)}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {t(channel.body)}
                  </p>
                  {cta}
                </>
              );
              const className =
                "group flex h-full flex-col rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-foreground/30 hover:shadow-lg";

              return channel.to ? (
                <Link key={channel.title} to={channel.to} className={className}>
                  {inner}
                </Link>
              ) : (
                <a
                  key={channel.title}
                  href={channel.href}
                  {...(channel.href?.startsWith("http")
                    ? { target: "_blank", rel: "noreferrer noopener" }
                    : {})}
                  className={className}
                >
                  {inner}
                </a>
              );
            })}
          </div>

          <div className="mt-6 flex justify-center">
            <Link
              to="/status"
              className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-3 text-sm font-semibold transition-all hover:-translate-y-0.5 hover:bg-dark hover:text-dark-foreground"
            >
              <Activity className="size-4" />
              {t("Check system status")}
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16">
          <div className="rounded-2xl border border-border bg-surface px-6 py-12 text-center md:px-12">
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
              {t("Connect with us")}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              {t("Follow us on social media to stay updated on all the latest Smartytel news.")}
            </p>
            <ul className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {socials.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-5 py-3 text-sm font-semibold transition-all hover:-translate-y-0.5 hover:bg-dark hover:text-dark-foreground"
                  >
                    <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden="true">
                      <path d={social.path} />
                    </svg>
                    {t(social.name)}
                  </a>
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

export const Route = createFileRoute("/{-$locale}/contact")({
  head: ({ params }) => ({
    links: [{ rel: "canonical", href: canonicalUrl("/contact", params.locale) }],
    meta: [
      { property: "og:url", content: canonicalUrl("/contact", params.locale) },
      { title: "Contact us | Smartytel" },
      {
        name: "description",
        content:
          "Contact Smartytel for demos, sales, customer support, partnerships, developer help and press \u2014 plus our social channels and system status.",
      },
      { property: "og:title", content: "Contact us | Smartytel" },
      {
        property: "og:description",
        content:
          "Contact Smartytel for demos, sales, customer support, partnerships, developer help and press.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});
