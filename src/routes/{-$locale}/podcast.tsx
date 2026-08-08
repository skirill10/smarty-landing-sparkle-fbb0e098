import { createFileRoute } from "@tanstack/react-router";
import { MarketingPage } from "@/components/MarketingPage";
import { pages } from "@/content/pages";
import { canonicalUrl } from "@/lib/seo";

const content = pages["podcast"]!;

export const Route = createFileRoute("/{-$locale}/podcast")({
  head: ({ params }) => ({
    links: [{ rel: "canonical", href: canonicalUrl("/podcast", params.locale) }],
    meta: [
      { property: "og:url", content: canonicalUrl("/podcast", params.locale) },
      { title: "The Smartytel Podcast | Smartytel" },
      {
        name: "description",
        content:
          "A podcast about business phones and customer conversations: operator interviews, telecom explained and honest takes on AI answering.",
      },
      { property: "og:title", content: "The Smartytel Podcast | Smartytel" },
      {
        property: "og:description",
        content:
          "A podcast about business phones and customer conversations: operator interviews, telecom explained and honest takes on AI answering.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <MarketingPage content={content} slug="podcast" />,
});
