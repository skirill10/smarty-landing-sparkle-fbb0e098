import { createFileRoute } from "@tanstack/react-router";
import { MarketingPage } from "@/components/MarketingPage";
import { pages } from "@/content/pages";
import { canonicalUrl } from "@/lib/seo";

const content = pages["messaging"]!;

export const Route = createFileRoute("/{-$locale}/messaging")({
  head: ({ params }) => ({
    links: [{ rel: "canonical", href: canonicalUrl("/messaging", params.locale) }],
    meta: [
      { property: "og:url", content: canonicalUrl("/messaging", params.locale) },
      { title: "Text, WhatsApp and Telegram from your business n | Smartytel" },
      {
        name: "description",
        content:
          "One shared inbox for SMS, WhatsApp and Telegram so customers can reply the way they prefer and nothing sits unanswered.",
      },
      {
        property: "og:title",
        content: "Text, WhatsApp and Telegram from your business n | Smartytel",
      },
      {
        property: "og:description",
        content:
          "One shared inbox for SMS, WhatsApp and Telegram so customers can reply the way they prefer and nothing sits unanswered.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <MarketingPage content={content} slug="messaging" />,
});
