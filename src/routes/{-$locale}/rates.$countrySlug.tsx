import { createFileRoute, notFound } from "@tanstack/react-router";
import { Link } from "@/components/Link";
import { useEffect, useState } from "react";
import { useSuspenseQuery, useQuery } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight, Info, PhoneCall } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CtaBand } from "@/components/CtaBand";
import { ratesQueries } from "@/features/rates/hooks/ratesQueries";
import { CountryFlag } from "@/features/rates/components/CountryFlag";
import { CurrencySelector } from "@/features/rates/components/CurrencySelector";
import { RatesFAQ } from "@/features/rates/components/RatesFAQ";
import { EmptyState, ErrorState } from "@/features/rates/components/States";
import { REGION_LABELS, SERVICE_LABELS, type CurrencyCode } from "@/features/rates/types";
import { CURRENCY_LABELS, formatInterval, formatRate } from "@/features/rates/utils/format";
import { detectCurrency, saveCurrency } from "@/features/rates/utils/detectCurrency";

const ORIGIN = "https://smarty-landing-sparkle.lovable.app";

export const Route = createFileRoute("/{-$locale}/rates/$countrySlug")({
  loader: async ({ context, params }) => {
    const country = await context.queryClient.ensureQueryData(ratesQueries.country(params.countrySlug));
    if (!country) throw notFound();
    await context.queryClient.ensureQueryData(ratesQueries.countryRates(country.id));
    return { name: country.name, dialCode: country.dialCode, description: country.shortDescription ?? "" };
  },
  head: ({ params, loaderData }) => {
    const url = `${ORIGIN}/rates/${params.countrySlug}`;
    if (!loaderData) {
      return { meta: [{ title: "Destination unavailable | Smartytel" }, { name: "robots", content: "noindex" }] };
    }
    const title = `Call ${loaderData.name} Rates (${loaderData.dialCode}) | Smartytel`;
    const description =
      loaderData.description ||
      `Per-minute landline and mobile calling rates plus SMS pricing for ${loaderData.name} (${loaderData.dialCode}) on Smartytel.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${ORIGIN}/` },
              { "@type": "ListItem", position: 2, name: "International rates", item: `${ORIGIN}/rates` },
              { "@type": "ListItem", position: 3, name: loaderData.name, item: url },
            ],
          }),
        },
      ],
    };
  },
  component: CountryRatesPage,
  errorComponent: () => (
    <div className="mx-auto max-w-3xl px-5 py-32">
      <ErrorState />
    </div>
  ),
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-5 py-32">
      <EmptyState
        title="We don't publish rates for that destination yet"
        body="Check the full directory for every country we currently cover."
        action={
          <Link to="/rates" className="rounded-md bg-foreground px-5 py-2.5 text-sm font-semibold text-background">
            Back to all rates
          </Link>
        }
      />
    </div>
  ),
});

function CountryRatesPage() {
  const { countrySlug } = Route.useParams();
  const [currency, setCurrency] = useState<CurrencyCode>("EUR");
  const [autoCurrency, setAutoCurrency] = useState(true);

  // Pick the visitor's currency once on the client; a manual change sticks.
  useEffect(() => {
    const { currency: detectedCurrency, source } = detectCurrency();
    if (source !== "default") setCurrency(detectedCurrency);
    setAutoCurrency(source === "location");
  }, []);

  const changeCurrency = (value: CurrencyCode) => {
    setCurrency(value);
    setAutoCurrency(false);
    saveCurrency(value);
  };

  const { data: country } = useSuspenseQuery(ratesQueries.country(countrySlug));
  const ratesQuery = useQuery({
    ...ratesQueries.countryRates(country?.id ?? ""),
    enabled: Boolean(country?.id),
  });
  const faqQuery = useQuery(ratesQueries.faqs(country?.id));
  const related = useQuery(ratesQueries.countries(country ? { region: country.region, limit: 8 } : {}));

  if (!country) return null;
  const rates = ratesQuery.data ?? [];

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main>
        <section className="border-b border-border bg-light-grey/60">
          <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
            <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link to="/" className="hover:underline">Home</Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link to="/rates" className="hover:underline">International rates</Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="font-medium text-foreground">{country.name}</li>
              </ol>
            </nav>

            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <div className="flex items-center gap-3">
                  <CountryFlag iso2={country.iso2} name={country.name} flagUrl={country.flagUrl} className="text-3xl" />
                  <p className="text-sm font-semibold uppercase tracking-wide text-brand">
                    {REGION_LABELS[country.region]} · {country.dialCode}
                  </p>
                </div>
                <h1 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
                  Calling and SMS rates for {country.name}
                </h1>
                {country.shortDescription ? (
                  <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{country.shortDescription}</p>
                ) : null}
              </div>
              <div className="w-full max-w-[200px]">
                <CurrencySelector
                  value={currency}
                  onChange={changeCurrency}
                  id="country-currency"
                  hint={
                    autoCurrency
                      ? `Showing ${CURRENCY_LABELS[currency]} based on your region.`
                      : undefined
                  }
                />
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="country-rate-table" className="mx-auto max-w-6xl px-5 py-14">
          <h2 id="country-rate-table" className="font-display text-2xl font-bold tracking-tight">
            Rate breakdown
          </h2>

          {rates.length === 0 ? (
            <div className="mt-6">
              <EmptyState
                title="Rates coming soon"
                body={`We're finalising published pricing for ${country.name}. Talk to sales for a quote today.`}
              />
            </div>
          ) : (
            <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card">
              <table className="w-full border-collapse text-left">
                <caption className="sr-only">Rates to {country.name} by service</caption>
                <thead>
                  <tr className="border-b border-border bg-light-grey/60">
                    <th scope="col" className="px-6 py-4 font-display text-sm font-semibold">Service</th>
                    <th scope="col" className="px-4 py-4 font-display text-sm font-semibold">Destination</th>
                    <th scope="col" className="px-4 py-4 font-display text-sm font-semibold">Rate</th>
                    <th scope="col" className="px-6 py-4 font-display text-sm font-semibold">Billing</th>
                  </tr>
                </thead>
                <tbody>
                  {rates.map((rate) => (
                    <tr key={rate.id} className="border-b border-border last:border-0">
                      <th scope="row" className="px-6 py-4 text-left font-semibold">
                        {SERVICE_LABELS[rate.destinationType]}
                      </th>
                      <td className="px-4 py-4 text-sm text-muted-foreground">
                        {rate.destinationLabel ?? rate.prefix ?? country.dialCode}
                      </td>
                      <td className="px-4 py-4 text-sm font-semibold tabular-nums">
                        {formatRate(rate, currency)}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {rate.unit === "message" ? "Per message" : formatInterval(rate.billingIntervalSeconds)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="flex items-center gap-2 font-display text-base font-semibold">
                <PhoneCall className="size-4 text-brand" aria-hidden="true" />
                How to dial {country.name}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {country.callingInstructions ??
                  `Dial ${country.dialCode} followed by the local number.`}
                {country.trunkPrefix
                  ? ` Drop the national trunk prefix ${country.trunkPrefix} when dialling from abroad.`
                  : ""}
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-light-grey/60 p-6">
              <h3 className="flex items-center gap-2 font-display text-base font-semibold">
                <Info className="size-4 text-muted-foreground" aria-hidden="true" />
                Good to know
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Rates exclude local taxes and are converted from EUR at indicative FX. Premium, satellite
                and special-service numbers are priced separately.
              </p>
            </div>
          </div>
        </section>

        {related.data && related.data.length > 1 ? (
          <section aria-labelledby="related-destinations" className="border-t border-border py-14">
            <div className="mx-auto max-w-6xl px-5">
              <h2 id="related-destinations" className="font-display text-xl font-semibold tracking-tight">
                More destinations in {REGION_LABELS[country.region]}
              </h2>
              <ul className="mt-6 flex flex-wrap gap-3">
                {related.data
                  .filter((item) => item.id !== country.id)
                  .map((item) => (
                    <li key={item.id}>
                      <Link
                        to="/rates/$countrySlug"
                        params={{ countrySlug: item.slug }}
                        className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm font-semibold transition-colors hover:border-foreground"
                      >
                        <CountryFlag iso2={item.iso2} name={item.name} flagUrl={item.flagUrl} />
                        {item.name}
                      </Link>
                    </li>
                  ))}
              </ul>
              <Link
                to="/rates"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
              >
                <ArrowLeft className="size-4" aria-hidden="true" />
                Back to all international rates
              </Link>
            </div>
          </section>
        ) : null}

        <RatesFAQ title={`${country.name} calling FAQs`} items={faqQuery.data ?? []} />

        <section className="border-t border-border bg-light-grey/60 py-14">
          <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-5 px-5">
            <p className="font-display text-xl font-semibold">
              Need a committed volume rate for {country.name}?
            </p>
            <Link
              to="/pricing"
              hash="talk-to-sales"
              className="inline-flex items-center gap-2 rounded-md bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground transition-colors hover:bg-dark hover:text-dark-foreground"
            >
              Talk to sales
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </section>

        <CtaBand />
      </main>

      <SiteFooter />
    </div>
  );
}
