import { createFileRoute } from "@tanstack/react-router";
import { MarketingPage } from "@/components/MarketingPage";
import { pages } from "@/content/pages";
import { canonicalUrl } from "@/lib/seo";

const content = pages["press"]!;

export const Route = createFileRoute("/{-$locale}/press")({
  head: ({ params }) => ({
    links: [{ rel: "canonical", href: canonicalUrl("/press", params.locale) }],
    meta: [
      { property: "og:url", content: canonicalUrl("/press", params.locale) },
      { title: "Press & Media Resources | Smartytel" },
      {
        name: "description",
        content:
          "Smartytel press kit: company facts, brand assets, executive bios and a direct media contact for journalists and analysts.",
      },
      { property: "og:title", content: "Press & Media Resources | Smartytel" },
      {
        property: "og:description",
        content:
          "Smartytel press kit: company facts, brand assets, executive bios and a direct media contact for journalists and analysts.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <MarketingPage content={content} slug="press" />,
});
