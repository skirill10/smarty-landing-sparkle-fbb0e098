import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CtaBand } from "@/components/CtaBand";
import { Link } from "@/components/Link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useT } from "@/i18n/LocaleProvider";
import { canonicalUrl } from "@/lib/seo";
import { articlesQueries } from "@/lib/cms";

function BlogPage() {
  const t = useT();
  const { data: articles } = useQuery(articlesQueries.list());

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main>
        <section className="mx-auto max-w-4xl px-5 pb-12 pt-16 text-center md:pt-24">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand">{t("Blog")}</p>
          <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
            {t("Notes on phones, teams and customer conversation")}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {t(
              "Practical writing on call handling, AI answering, coverage in Europe and getting more out of your phone system.",
            )}
          </p>
        </section>

        <section className="mx-auto max-w-6xl px-5 pb-20">
          {articles?.length ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <Link key={article.id} to="/blog/$slug" params={{ slug: article.slug }}>
                  <Card className="h-full transition-all hover:-translate-y-0.5 hover:border-foreground/30 hover:shadow-lg">
                    <CardHeader>
                      <CardTitle className="font-display text-lg">{t(article.title)}</CardTitle>
                      <CardDescription>{t(article.excerpt)}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                        {t("Read more")}
                        <ArrowRight className="size-4" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">
              {t("New articles are on the way — check back soon.")}
            </p>
          )}
        </section>

        <CtaBand />
      </main>

      <SiteFooter />
    </div>
  );
}

export const Route = createFileRoute("/{-$locale}/blog")({
  head: ({ params }) => ({
    links: [{ rel: "canonical", href: canonicalUrl("/blog", params.locale) }],
    meta: [
      { property: "og:url", content: canonicalUrl("/blog", params.locale) },
      { title: "Notes on phones, teams and customer conversation | Smartytel" },
      {
        name: "description",
        content:
          "Practical writing on call handling, AI answering, coverage in Europe and getting more out of your phone system.",
      },
      {
        property: "og:title",
        content: "Notes on phones, teams and customer conversation | Smartytel",
      },
      {
        property: "og:description",
        content:
          "Practical writing on call handling, AI answering, coverage in Europe and getting more out of your phone system.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BlogPage,
});
