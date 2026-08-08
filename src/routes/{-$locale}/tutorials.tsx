import { createFileRoute } from "@tanstack/react-router";
import { MarketingPage } from "@/components/MarketingPage";
import { pages } from "@/content/pages";
import { canonicalUrl } from "@/lib/seo";

const content = pages["tutorials"]!;

export const Route = createFileRoute("/{-$locale}/tutorials")({
  head: ({ params }) => ({
    links: [{ rel: "canonical", href: canonicalUrl("/tutorials", params.locale) }],
    meta: [
      { property: "og:url", content: canonicalUrl("/tutorials", params.locale) },
      { title: "Smartytel Tutorials & How-To Guides | Smartytel" },
      {
        name: "description",
        content:
          "Step-by-step tutorials for setting up numbers, call routing, AI Assist and integrations in your Smartytel workspace.",
      },
      { property: "og:title", content: "Smartytel Tutorials & How-To Guides | Smartytel" },
      {
        property: "og:description",
        content:
          "Step-by-step tutorials for setting up numbers, call routing, AI Assist and integrations in your Smartytel workspace.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <MarketingPage content={content} slug="tutorials" />,
});
