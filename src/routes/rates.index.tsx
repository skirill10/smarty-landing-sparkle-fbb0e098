import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { ArrowRight, Globe2, MessageSquare, PhoneCall } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CtaBand } from "@/components/CtaBand";
import { ratesQueries } from "@/features/rates/hooks/ratesQueries";
import { useDebouncedValue } from "@/features/rates/hooks/useDebouncedValue";
import { RatesSearch } from "@/features/rates/components/RatesSearch";
import { RatesFilters } from "@/features/rates/components/RatesFilters";
import { RatesTable } from "@/features/rates/components/RatesTable";
import { PopularDestinations } from "@/features/rates/components/PopularDestinations";
import { RatesDisclaimer } from "@/features/rates/components/RatesDisclaimer";
import { RatesFAQ } from "@/features/rates/components/RatesFAQ";
import { EmptyState, ErrorState, LoadingState } from "@/features/rates/components/States";
import { DEFAULT_PAGE_SIZE } from "@/features/rates/api/ratesRepository";
import type { CurrencyCode, DestinationType, RatesSort, Region } from "@/features/rates/types";

const CANONICAL = "https://smarty-landing-sparkle.lovable.app/rates";

const searchSchema = z.object({
  q: fallback(z.string(), "").default(""),
  region: fallback(z.string(), "all").default("all"),
  service: fallback(z.string(), "all").default("all"),
  currency: fallback(z.string(), "EUR").default("EUR"),
  sort: fallback(z.string(), "name-asc").default("name-asc"),
  page: fallback(z.number().int(), 1).default(1),
});

const REGION_VALUES = ["all", "europe", "north-america", "south-america", "asia", "africa", "oceania"];
const SERVICE_VALUES = ["all", "landline", "mobile", "sms"];
const SORT_VALUES = ["name-asc", "name-desc", "price-asc", "price-desc"];
const CURRENCY_VALUES = ["EUR", "USD", "GBP"];

export const Route = createFileRoute("/rates/")({
  validateSearch: zodValidator(searchSchema),
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(ratesQueries.content());
  },
  head: () => ({
    meta: [
      { title: "International Calling & SMS Rates by Country | Smartytel" },
      {
        name: "description",
        content:
          "Compare Smartytel international calling and messaging rates by country. Per-minute landline and mobile pricing, SMS rates and billing intervals in EUR, USD or GBP.",
      },
      { property: "og:title", content: "International Calling & SMS Rates by Country | Smartytel" },
      {
        property: "og:description",
        content:
          "Transparent per-minute and per-message rates for 20+ destinations, with search, regional filters and currency switching.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: CANONICAL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://smarty-landing-sparkle.lovable.app/" },
            { "@type": "ListItem", position: 2, name: "International rates", item: CANONICAL },
          ],
        }),
      },
    ],
  }),
  component: RatesIndexPage,
  errorComponent: () => (
    <div className="mx-auto max-w-3xl px-5 py-32">
      <ErrorState />
    </div>
  ),
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-5 py-32">
      <EmptyState title="Rates unavailable" body="We couldn't find the rates directory." />
    </div>
  ),
});

function RatesIndexPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  const region = (REGION_VALUES.includes(search.region) ? search.region : "all") as Region | "all";
  const service = (SERVICE_VALUES.includes(search.service) ? search.service : "all") as DestinationType | "all";
  const sort = (SORT_VALUES.includes(search.sort) ? search.sort : "name-asc") as RatesSort;
  const currency = (CURRENCY_VALUES.includes(search.currency) ? search.currency : "EUR") as CurrencyCode;
  const page = Math.max(1, Math.min(50, search.page));

  const [term, setTerm] = useState(search.q.slice(0, 60));
  const debouncedTerm = useDebouncedValue(term, 300);

  // Push the debounced term into the URL so results stay shareable.
  useEffect(() => {
    if (debouncedTerm === search.q) return;
    navigate({ to: "/rates", search: { ...search, q: debouncedTerm, page: 1 }, replace: true });
  }, [debouncedTerm, search.q, navigate]);

  const { data: content } = useSuspenseQuery(ratesQueries.content());
  const listQuery = useQuery(
    ratesQueries.list({ search: debouncedTerm, region, service, sort, page, limit: DEFAULT_PAGE_SIZE }),
  );
  const featuredQuery = useQuery(ratesQueries.list({ region: "all", sort: "name-asc", limit: 8, page: 1 }));
  const faqQuery = useQuery(ratesQueries.faqs());

  const rows = listQuery.data?.docs ?? [];
  const total = listQuery.data?.totalDocs ?? 0;
  const totalPages = listQuery.data?.totalPages ?? 1;

  const popular = useMemo(
    () => (featuredQuery.data?.docs ?? []).filter((row) => row.country.featured).slice(0, 8),
    [featuredQuery.data],
  );

  const resultsLabel = listQuery.isPending
    ? "Loading destinations…"
    : `${total} destination${total === 1 ? "" : "s"}`;

  const update = (patch: Record<string, string | number>) =>
    navigate({ to: "/rates", search: { ...search, ...patch, page: 1 } });

  const reset = () => {
    setTerm("");
    navigate({
      to: "/rates",
      search: { q: "", region: "all", service: "all", currency, sort: "name-asc", page: 1 },
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main>
        {/* Hero */}
        <section className="border-b border-border bg-light-grey/60">
          <div className="mx-auto max-w-7xl px-5 py-16 md:py-24">
            <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
              <ol className="flex items-center gap-2">
                <li>
                  <Link to="/" className="hover:underline">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="font-medium text-foreground">
                  International rates
                </li>
              </ol>
            </nav>

            <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-brand">
              <Globe2 className="size-4" aria-hidden="true" />
              {content.heroEyebrow}
            </p>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold tracking-tight md:text-6xl">
              {content.heroTitle}
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{content.heroDescription}</p>

            <div className="mt-8 max-w-xl">
              <RatesSearch value={term} onChange={setTerm} placeholder={content.searchPlaceholder} />
            </div>

            <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4 text-sm">
              <div className="flex items-center gap-2">
                <PhoneCall className="size-4 text-brand" aria-hidden="true" />
                <dt className="text-muted-foreground">Calls billed</dt>
                <dd className="font-semibold">per second after the first minute</dd>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="size-4 text-brand" aria-hidden="true" />
                <dt className="text-muted-foreground">Messaging</dt>
                <dd className="font-semibold">per message, no monthly minimum</dd>
              </div>
            </dl>
          </div>
        </section>

        <PopularDestinations rows={popular} currency={currency} />

        {/* Directory */}
        <section aria-labelledby="rates-directory" className="mx-auto max-w-7xl px-5 py-12">
          <h2 id="rates-directory" className="font-display text-2xl font-bold tracking-tight md:text-3xl">
            All destinations
          </h2>

          <div className="mt-6">
            <RatesFilters
              region={region}
              service={service}
              currency={currency}
              sort={sort}
              resultsLabel={resultsLabel}
              onReset={reset}
              onChange={(patch) => update(patch as Record<string, string>)}
            />
          </div>

          <div className="mt-8">
            {listQuery.isError ? (
              <ErrorState onRetry={() => listQuery.refetch()} />
            ) : listQuery.isPending ? (
              <LoadingState />
            ) : rows.length === 0 ? (
              <EmptyState
                action={
                  <button
                    type="button"
                    onClick={reset}
                    className="rounded-xl bg-foreground px-5 py-2.5 text-sm font-semibold text-background"
                  >
                    Clear filters
                  </button>
                }
              />
            ) : (
              <RatesTable rows={rows} currency={currency} />
            )}
          </div>

          {totalPages > 1 && !listQuery.isPending && rows.length > 0 ? (
            <nav aria-label="Pagination" className="mt-8 flex items-center justify-between gap-4">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => navigate({ to: "/rates", search: { ...search, page: page - 1 } })}
                className="rounded-xl border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>
              <p className="text-sm text-muted-foreground" aria-live="polite">
                Page {page} of {totalPages}
              </p>
              <button
                type="button"
                disabled={page >= totalPages}
                onClick={() => navigate({ to: "/rates", search: { ...search, page: page + 1 } })}
                className="rounded-xl border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </nav>
          ) : null}
        </section>

        <RatesDisclaimer title={content.disclaimerTitle} body={content.disclaimerBody} />

        <RatesFAQ title={content.faqTitle} items={faqQuery.data ?? []} />

        <section className="border-t border-border bg-light-grey/60 py-16">
          <div className="mx-auto flex max-w-4xl flex-col items-start gap-6 px-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold tracking-tight">{content.ctaTitle}</h2>
              <p className="mt-2 max-w-xl text-muted-foreground">{content.ctaDescription}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to={content.primaryCtaUrl}
                className="inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground"
              >
                {content.primaryCtaLabel}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              {content.secondaryCtaLabel && content.secondaryCtaUrl ? (
                <Link
                  to={content.secondaryCtaUrl}
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold"
                >
                  {content.secondaryCtaLabel}
                </Link>
              ) : null}
            </div>
          </div>
        </section>

        <CtaBand />
      </main>

      <SiteFooter />
    </div>
  );
}
