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
      { title: "Request a Smartytel demo | Smartytel" },
      {
        name: "description",
        content:
          "Request a walkthrough for your team. We will follow up to arrange a demo and confirm the features available for your workspace.",
      },
      { property: "og:title", content: "Request a Smartytel demo | Smartytel" },
      {
        property: "og:description",
        content:
          "Request a walkthrough for your team. We will follow up to arrange a demo and confirm the features available for your workspace.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <MarketingPage content={content} slug="demo" formType="demo" />,
});
