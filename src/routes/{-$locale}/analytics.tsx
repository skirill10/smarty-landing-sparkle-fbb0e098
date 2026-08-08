import { createFileRoute } from "@tanstack/react-router";
import { MarketingPage } from "@/components/MarketingPage";
import { pages } from "@/content/pages";
import { canonicalUrl } from "@/lib/seo";

const content = pages["analytics"]!;

export const Route = createFileRoute("/{-$locale}/analytics")({
  head: ({ params }) => ({
    links: [{ rel: "canonical", href: canonicalUrl("/analytics", params.locale) }],
    meta: [
      { property: "og:url", content: canonicalUrl("/analytics", params.locale) },
      { title: "Analytics that show what your phone is really do | Smartytel" },
      {
        name: "description",
        content:
          "Volume, response times, missed calls and rep activity across every number, team and country.",
      },
      {
        property: "og:title",
        content: "Analytics that show what your phone is really do | Smartytel",
      },
      {
        property: "og:description",
        content:
          "Volume, response times, missed calls and rep activity across every number, team and country.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <MarketingPage content={content} slug="analytics" />,
});
