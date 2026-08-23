import { createFileRoute } from "@tanstack/react-router";
import { MarketingPage } from "@/components/MarketingPage";
import { pages } from "@/content/pages";
import { canonicalUrl } from "@/lib/seo";

const content = pages["demo"]!;

export const Route = createFileRoute("/{-$locale}/demo")({
  head: ({ params }) => ({
    links: [{ rel: "canonical", href: canonicalUrl("/demo", params.locale) }],
    meta: [
      { property: "og:url", content: canonicalUrl("/demo", params.locale) },
      { title: "See Smartytel in ten minutes | Smartytel" },
      {
        name: "description",
        content:
          "A walkthrough of shared numbers, routing, the AI agent, the built-in CRM and reporting.",
      },
      { property: "og:title", content: "See Smartytel in ten minutes | Smartytel" },
      {
        property: "og:description",
        content:
          "A walkthrough of shared numbers, routing, the AI agent, the built-in CRM and reporting.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <MarketingPage content={content} slug="demo" formType="demo" />,
});
