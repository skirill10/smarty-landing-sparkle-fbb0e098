import { createFileRoute } from "@tanstack/react-router";
import { MarketingPage } from "@/components/MarketingPage";
import { pages } from "@/content/pages";
import { canonicalUrl } from "@/lib/seo";

const content = pages["community"]!;

export const Route = createFileRoute("/{-$locale}/community")({
  head: ({ params }) => ({
    links: [{ rel: "canonical", href: canonicalUrl("/community", params.locale) }],
    meta: [
      { property: "og:url", content: canonicalUrl("/community", params.locale) },
      { title: "Smartytel Community Forum | Smartytel" },
      {
        name: "description",
        content:
          "Join the Smartytel community to share call routing setups, AI prompts and API automations, and vote on what we build next.",
      },
      { property: "og:title", content: "Smartytel Community Forum | Smartytel" },
      {
        property: "og:description",
        content:
          "Join the Smartytel community to share call routing setups, AI prompts and API automations, and vote on what we build next.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <MarketingPage content={content} slug="community" />,
});
