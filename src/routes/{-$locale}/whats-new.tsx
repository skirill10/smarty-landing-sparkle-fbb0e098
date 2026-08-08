import { createFileRoute } from "@tanstack/react-router";
import { MarketingPage } from "@/components/MarketingPage";
import { pages } from "@/content/pages";
import { canonicalUrl } from "@/lib/seo";

const content = pages["whats-new"]!;

export const Route = createFileRoute("/{-$locale}/whats-new")({
  head: ({ params }) => ({
    links: [{ rel: "canonical", href: canonicalUrl("/whats-new", params.locale) }],
    meta: [
      { property: "og:url", content: canonicalUrl("/whats-new", params.locale) },
      { title: "What's New: Smartytel Product Updates | Smartytel" },
      {
        name: "description",
        content:
          "Smartytel release notes and product updates across calling, messaging, AI Assist, analytics and the API \u2014 with early deprecation notices.",
      },
      { property: "og:title", content: "What's New: Smartytel Product Updates | Smartytel" },
      {
        property: "og:description",
        content:
          "Smartytel release notes and product updates across calling, messaging, AI Assist, analytics and the API \u2014 with early deprecation notices.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <MarketingPage content={content} slug="whats-new" />,
});
