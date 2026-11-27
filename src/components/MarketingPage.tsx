import { Link } from "@/components/Link";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Check } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CtaBand } from "@/components/CtaBand";
import { PayloadForm } from "@/components/PayloadForm";
import { cmsEnabled, fetchMarketingPage } from "@/lib/cms";
import { useT } from "@/i18n/LocaleProvider";

export type MarketingContent = {
  eyebrow: string;
  headline: string;
  sub: string;
  bullets: { title: string; body: string }[];
  proof?: string[];
  metaTitle: string;
  metaDescription: string;
};

export function MarketingPage({
  content,
  slug,
  formType,
}: {
  content: MarketingContent;
  slug?: string;
  /** Optional Payload form-builder form rendered before the closing CTA band. */
  formType?: "contact" | "demo";
}) {
  // Copy is baked in at build time; when a CMS is configured we refresh it at
  // runtime so edits appear without waiting for the next deploy.
  const t = useT();
  const { data } = useQuery({
    queryKey: ["marketing-page", slug],
    queryFn: () => fetchMarketingPage(slug!),
    enabled: cmsEnabled && Boolean(slug),
    staleTime: 60_000,
  });

  const page = data ?? content;
  const isDemo = formType === "demo";

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main>
        <section className="mx-auto max-w-6xl px-5 pb-16 pt-16 md:pt-24">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand">
            {t(page.eyebrow)}
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
            {t(isDemo ? "See how Smartytel could work for your team" : page.headline)}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            {t(
              isDemo
                ? "Tell us about your workflow and the features you want to explore. Our team will follow up to arrange a demo; submitting a request does not book a time or create an account."
                : page.sub,
            )}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to={formType === "demo" ? "#request-demo" : "/early-access/"}
              className="inline-flex items-center gap-2 rounded-md bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground transition-all hover:-translate-y-0.5 hover:bg-dark hover:text-dark-foreground"
            >
              {t(formType === "demo" ? "Request a demo" : "Join free beta")}{" "}
              <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/pricing"
              className="inline-flex items-center rounded-md border border-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-dark hover:text-dark-foreground"
            >
              {t("See pricing")}
            </Link>
          </div>
        </section>

        <section className="bg-light-grey py-20">
          <div className="mx-auto max-w-6xl px-5">
            <h2 className="max-w-2xl font-display text-3xl font-bold tracking-tight md:text-4xl">
              {t("What you get")}
            </h2>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {page.bullets.map((b) => (
                <div key={t(b.title)} className="rounded-2xl border border-border bg-card p-7">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-brand/12">
                    <Check className="size-5 text-brand" strokeWidth={2.5} />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold">{t(b.title)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(b.body)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-20">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                {t("Confirm availability for your workspace")}
              </h2>
              <p className="mt-5 text-muted-foreground">
                Smartytel is in early beta. Available numbers, countries, channels and integrations
                depend on your invitation, provider connections and workspace configuration. Confirm
                the features and costs you need with our team before making a commitment.
              </p>
              <Link
                to="/pricing"
                className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
              >
                {t("Compare plans and add-ons")} <ArrowRight className="size-4" />
              </Link>
            </div>
            <ul className="grid gap-3 self-start">
              {[
                "Free beta registration; access requires an invitation",
                "Provider and integration setup may be required",
                "Confirm calling rates and add-on costs with the team",
              ].map((p) => (
                <li
                  key={p}
                  className="flex items-start gap-3 rounded-xl border border-border bg-card px-5 py-4 text-sm font-medium"
                >
                  <Check className="mt-0.5 size-4 shrink-0 text-brand" strokeWidth={2.5} />
                  {t(p)}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {formType && (
          <section id="request-demo" className="mx-auto max-w-2xl scroll-mt-24 px-5 pb-20">
            <div className="rounded-2xl border border-border bg-card p-7 md:p-10">
              <PayloadForm formType={formType} />
            </div>
          </section>
        )}

        <CtaBand />
      </main>

      <SiteFooter />
    </div>
  );
}
