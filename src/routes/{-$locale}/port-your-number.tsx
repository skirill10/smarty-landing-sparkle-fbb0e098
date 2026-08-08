import { createFileRoute } from "@tanstack/react-router";
import { MarketingPage } from "@/components/MarketingPage";
import { pages } from "@/content/pages";
import { canonicalUrl } from "@/lib/seo";

const content = pages["port-your-number"]!;

export const Route = createFileRoute("/{-$locale}/port-your-number")({
  head: ({ params }) => ({
    links: [{ rel: "canonical", href: canonicalUrl("/port-your-number", params.locale) }],
    meta: [
      { property: "og:url", content: canonicalUrl("/port-your-number", params.locale) },
      { title: "Keep the number your customers already dial | Smartytel" },
      {
        name: "description",
        content:
          "Port landline, mobile and toll-free numbers from your current provider for a one-time $5 per number.",
      },
      { property: "og:title", content: "Keep the number your customers already dial | Smartytel" },
      {
        property: "og:description",
        content:
          "Port landline, mobile and toll-free numbers from your current provider for a one-time $5 per number.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <MarketingPage content={content} slug="port-your-number" />,
});
