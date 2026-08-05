import { createFileRoute } from "@tanstack/react-router";
import { MarketingPage } from "@/components/MarketingPage";
import { pages } from "@/content/pages";

const content = pages["gdpr"]!;

export const Route = createFileRoute("/gdpr")({
  head: () => ({
    meta: [
      { title: "GDPR and EU data protection | Smartytel" },
      { name: "description", content: "Data processing terms, subprocessors and transfer mechanisms for European customers." },
      { property: "og:title", content: "GDPR and EU data protection | Smartytel" },
      { property: "og:description", content: "Data processing terms, subprocessors and transfer mechanisms for European customers." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <MarketingPage content={content} />,
});
