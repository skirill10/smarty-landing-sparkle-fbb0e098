import { createFileRoute } from "@tanstack/react-router";
import { MarketingPage } from "@/components/MarketingPage";
import { pages } from "@/content/pages";
import { canonicalUrl } from "@/lib/seo";

const content = pages["partners"]!;

export const Route = createFileRoute("/{-$locale}/partners")({
  head: ({ params }) => ({
    links: [{ rel: "canonical", href: canonicalUrl("/partners", params.locale) }],
    meta: [
      { property: "og:url", content: canonicalUrl("/partners", params.locale) },
      { title: "Build and resell with Smartytel | Smartytel" },
      {
        name: "description",
        content:
          "Agencies, MSPs and consultancies deploying business phone, AI answering and CRM for their clients.",
      },
      { property: "og:title", content: "Build and resell with Smartytel | Smartytel" },
      {
        property: "og:description",
        content:
          "Agencies, MSPs and consultancies deploying business phone, AI answering and CRM for their clients.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <MarketingPage content={content} slug="partners" />,
});
