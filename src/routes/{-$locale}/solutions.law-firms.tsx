import { createFileRoute } from "@tanstack/react-router";
import { MarketingPage } from "@/components/MarketingPage";
import { pages } from "@/content/pages";
import { canonicalUrl } from "@/lib/seo";

const content = pages["solutions/law-firms"]!;

export const Route = createFileRoute("/{-$locale}/solutions/law-firms")({
  head: ({ params }) => ({
    links: [{ rel: "canonical", href: canonicalUrl("/solutions/law-firms", params.locale) }],
    meta: [
      { property: "og:url", content: canonicalUrl("/solutions/law-firms", params.locale) },
      { title: "A phone system that keeps client matters clean | Smartytel" },
      {
        name: "description",
        content:
          "Confidential lines, recorded consent, and every call logged against the right matter.",
      },
      {
        property: "og:title",
        content: "A phone system that keeps client matters clean | Smartytel",
      },
      {
        property: "og:description",
        content:
          "Confidential lines, recorded consent, and every call logged against the right matter.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <MarketingPage content={content} slug="solutions/law-firms" />,
});
