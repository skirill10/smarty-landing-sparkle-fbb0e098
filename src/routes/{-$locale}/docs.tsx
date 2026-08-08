import { createFileRoute } from "@tanstack/react-router";
import { MarketingPage } from "@/components/MarketingPage";
import { pages } from "@/content/pages";
import { canonicalUrl } from "@/lib/seo";

const content = pages["docs"]!;

export const Route = createFileRoute("/{-$locale}/docs")({
  head: ({ params }) => ({
    links: [{ rel: "canonical", href: canonicalUrl("/docs", params.locale) }],
    meta: [
      { property: "og:url", content: canonicalUrl("/docs", params.locale) },
      { title: "Documentation for builders | Smartytel" },
      {
        name: "description",
        content: "Authentication, endpoints, webhooks and examples for the Smartytel API.",
      },
      { property: "og:title", content: "Documentation for builders | Smartytel" },
      {
        property: "og:description",
        content: "Authentication, endpoints, webhooks and examples for the Smartytel API.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <MarketingPage content={content} slug="docs" />,
});
