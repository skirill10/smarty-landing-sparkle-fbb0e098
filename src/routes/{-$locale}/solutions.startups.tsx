import { createFileRoute } from "@tanstack/react-router";
import { MarketingPage } from "@/components/MarketingPage";
import { pages } from "@/content/pages";
import { canonicalUrl } from "@/lib/seo";

const content = pages["solutions/startups"]!;

export const Route = createFileRoute("/{-$locale}/solutions/startups")({
  head: ({ params }) => ({
    links: [{ rel: "canonical", href: canonicalUrl("/solutions/startups", params.locale) }],
    meta: [
      { property: "og:url", content: canonicalUrl("/solutions/startups", params.locale) },
      { title: "A real phone presence on day one | Smartytel" },
      {
        name: "description",
        content:
          "Pick a number, invite the team and start taking calls in minutes \u2014 from $12 per user per month.",
      },
      { property: "og:title", content: "A real phone presence on day one | Smartytel" },
      {
        property: "og:description",
        content:
          "Pick a number, invite the team and start taking calls in minutes \u2014 from $12 per user per month.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <MarketingPage content={content} slug="solutions/startups" />,
});
