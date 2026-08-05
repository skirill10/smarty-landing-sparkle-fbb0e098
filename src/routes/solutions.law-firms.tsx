import { createFileRoute } from "@tanstack/react-router";
import { MarketingPage } from "@/components/MarketingPage";
import { pages } from "@/content/pages";

const content = pages["solutions/law-firms"]!;

export const Route = createFileRoute("/solutions/law-firms")({
  head: () => ({
    meta: [
      { title: "A phone system that keeps client matters clean | Smartytel" },
      { name: "description", content: "Confidential lines, recorded consent, and every call logged against the right matter." },
      { property: "og:title", content: "A phone system that keeps client matters clean | Smartytel" },
      { property: "og:description", content: "Confidential lines, recorded consent, and every call logged against the right matter." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <MarketingPage content={content} />,
});
