import { createFileRoute } from "@tanstack/react-router";
import { MarketingPage } from "@/components/MarketingPage";
import { pages } from "@/content/pages";
import { canonicalUrl } from "@/lib/seo";

const content = pages["webinars"]!;

export const Route = createFileRoute("/{-$locale}/webinars")({
  head: ({ params }) => ({
    links: [{ rel: "canonical", href: canonicalUrl("/webinars", params.locale) }],
    meta: [
      { property: "og:url", content: canonicalUrl("/webinars", params.locale) },
      { title: "Business Phone Webinars & Live Sessions | Smartytel" },
      {
        name: "description",
        content:
          "Live webinars and on-demand replays on call routing, AI answering, porting and running a shared team inbox with Smartytel.",
      },
      { property: "og:title", content: "Business Phone Webinars & Live Sessions | Smartytel" },
      {
        property: "og:description",
        content:
          "Live webinars and on-demand replays on call routing, AI answering, porting and running a shared team inbox with Smartytel.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <MarketingPage content={content} slug="webinars" />,
});
