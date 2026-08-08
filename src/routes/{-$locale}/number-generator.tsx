import { createFileRoute } from "@tanstack/react-router";
import { MarketingPage } from "@/components/MarketingPage";
import { pages } from "@/content/pages";
import { canonicalUrl } from "@/lib/seo";

const content = pages["number-generator"]!;

export const Route = createFileRoute("/{-$locale}/number-generator")({
  head: ({ params }) => ({
    links: [{ rel: "canonical", href: canonicalUrl("/number-generator", params.locale) }],
    meta: [
      { property: "og:url", content: canonicalUrl("/number-generator", params.locale) },
      { title: "Free Phone Number Generator for Testing | Smartytel" },
      {
        name: "description",
        content:
          "Generate valid-format test phone numbers for the US, Canada, the UK and Europe. Bulk export as CSV and validate lists before importing.",
      },
      { property: "og:title", content: "Free Phone Number Generator for Testing | Smartytel" },
      {
        property: "og:description",
        content:
          "Generate valid-format test phone numbers for the US, Canada, the UK and Europe. Bulk export as CSV and validate lists before importing.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <MarketingPage content={content} slug="number-generator" />,
});
