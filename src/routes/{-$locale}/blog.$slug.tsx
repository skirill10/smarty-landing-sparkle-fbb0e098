import { createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CtaBand } from "@/components/CtaBand";
import { Link } from "@/components/Link";
import { LexicalRichText } from "@/components/LexicalRichText";
import { EmptyState, ErrorState } from "@/features/rates/components/States";
import { articlesQueries } from "@/lib/cms";

const ORIGIN = "https://smarty.tel";

export const Route = createFileRoute("/{-$locale}/blog/$slug")({
  loader: async ({ context, params }) => {
    const article = await context.queryClient.ensureQueryData(articlesQueries.detail(params.slug));
    if (!article) throw notFound();
    return article;
  },
  head: ({ params, loaderData }) => {
    const url = `${ORIGIN}/blog/${params.slug}`;
    if (!loaderData) {
      return {
        meta: [
          { title: "Article unavailable | Smartytel" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const title = loaderData.metaTitle || `${loaderData.title} | Smartytel`;
    const description = loaderData.metaDescription || loaderData.excerpt;
    return {
      links: [{ rel: "canonical", href: url }],
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ArticlePage,
  errorComponent: () => (
    <div className="mx-auto max-w-3xl px-5 py-32">
      <ErrorState />
    </div>
  ),
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-5 py-32">
      <EmptyState
        title="We couldn't find that article"
        body="It may have been moved or unpublished. Check the blog for current posts."
        action={
          <Link
            to="/blog"
            className="rounded-md bg-foreground px-5 py-2.5 text-sm font-semibold text-background"
          >
            Back to blog
          </Link>
        }
      />
    </div>
  ),
});

function ArticlePage() {
  const article = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main>
        <article className="mx-auto max-w-2xl px-5 pb-20 pt-16 md:pt-24">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back to blog
          </Link>

          <h1 className="mt-6 font-display text-3xl font-bold leading-[1.1] tracking-tight md:text-5xl">
            {article.title}
          </h1>

          {(article.author || article.publishedDate) && (
            <p className="mt-4 text-sm text-muted-foreground">
              {[article.author, article.publishedDate].filter(Boolean).join(" · ")}
            </p>
          )}

          {article.coverImage?.url && (
            <img
              src={article.coverImage.url}
              alt={article.coverImage.alt ?? ""}
              className="mt-8 w-full rounded-2xl border border-border object-cover"
            />
          )}

          <LexicalRichText content={article.body} />
        </article>

        <CtaBand />
      </main>

      <SiteFooter />
    </div>
  );
}
