import { createFileRoute } from "@tanstack/react-router";
import { MarketingPage } from "@/components/MarketingPage";
import { pages } from "@/content/pages";
import { canonicalUrl } from "@/lib/seo";

const content = pages["solutions/support"]!;

export const Route = createFileRoute("/{-$locale}/solutions/support")({
  head: ({ params }) => ({
    links: [{ rel: "canonical", href: canonicalUrl("/solutions/support", params.locale) }],
    meta: [
      { property: "og:url", content: canonicalUrl("/solutions/support", params.locale) },
      { title: "Support queues without a call-centre budget | Smartytel" },
      {
        name: "description",
        content: "Queues, hunt groups, SLAs and a shared inbox for calls, SMS and chat apps.",
      },
      { property: "og:title", content: "Support queues without a call-centre budget | Smartytel" },
      {
        property: "og:description",
        content: "Queues, hunt groups, SLAs and a shared inbox for calls, SMS and chat apps.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <MarketingPage content={content} slug="solutions/support" />,
});
