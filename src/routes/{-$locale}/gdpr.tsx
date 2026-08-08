import { createFileRoute } from "@tanstack/react-router";
import { MarketingPage } from "@/components/MarketingPage";
import { pages } from "@/content/pages";
import { canonicalUrl } from "@/lib/seo";

const content = pages["gdpr"]!;

export const Route = createFileRoute("/{-$locale}/gdpr")({
  head: ({ params }) => ({
    links: [{ rel: "canonical", href: canonicalUrl("/gdpr", params.locale) }],
    meta: [
      { property: "og:url", content: canonicalUrl("/gdpr", params.locale) },
      { title: "GDPR and EU data protection | Smartytel" },
      {
        name: "description",
        content:
          "Data processing terms, subprocessors and transfer mechanisms for European customers.",
      },
      { property: "og:title", content: "GDPR and EU data protection | Smartytel" },
      {
        property: "og:description",
        content:
          "Data processing terms, subprocessors and transfer mechanisms for European customers.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <MarketingPage content={content} slug="gdpr" />,
});
