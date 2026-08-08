import { createFileRoute } from "@tanstack/react-router";
import { MarketingPage } from "@/components/MarketingPage";
import { pages } from "@/content/pages";
import { canonicalUrl } from "@/lib/seo";

const content = pages["voicemail-generator"]!;

export const Route = createFileRoute("/{-$locale}/voicemail-generator")({
  head: ({ params }) => ({
    links: [{ rel: "canonical", href: canonicalUrl("/voicemail-generator", params.locale) }],
    meta: [
      { property: "og:url", content: canonicalUrl("/voicemail-generator", params.locale) },
      { title: "Free Voicemail Greeting Generator | Smartytel" },
      {
        name: "description",
        content:
          "Free voicemail greeting generator: create professional business voicemail scripts for after hours, holidays and overflow, in any language.",
      },
      { property: "og:title", content: "Free Voicemail Greeting Generator | Smartytel" },
      {
        property: "og:description",
        content:
          "Free voicemail greeting generator: create professional business voicemail scripts for after hours, holidays and overflow, in any language.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <MarketingPage content={content} slug="voicemail-generator" />,
});
