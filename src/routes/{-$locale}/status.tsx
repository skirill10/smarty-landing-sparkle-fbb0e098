import { createFileRoute } from "@tanstack/react-router";
import { MarketingPage } from "@/components/MarketingPage";
import { pages } from "@/content/pages";
import { canonicalUrl } from "@/lib/seo";

const content = pages["status"]!;

export const Route = createFileRoute("/{-$locale}/status")({
  head: ({ params }) => ({
    links: [{ rel: "canonical", href: canonicalUrl("/status", params.locale) }],
    meta: [
      { property: "og:url", content: canonicalUrl("/status", params.locale) },
      { title: "Platform status and incident history | Smartytel" },
      {
        name: "description",
        content:
          "Live availability for calling, messaging, apps and the API, plus a record of past incidents.",
      },
      { property: "og:title", content: "Platform status and incident history | Smartytel" },
      {
        property: "og:description",
        content:
          "Live availability for calling, messaging, apps and the API, plus a record of past incidents.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <MarketingPage content={content} slug="status" />,
});
