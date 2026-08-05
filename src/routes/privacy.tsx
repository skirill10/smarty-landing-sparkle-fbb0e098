import { createFileRoute } from "@tanstack/react-router";
import { MarketingPage } from "@/components/MarketingPage";
import { pages } from "@/content/pages";

const content = pages["privacy"]!;

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy at Smartytel | Smartytel" },
      { name: "description", content: "What we collect, why we collect it, where it is stored and how long we keep it." },
      { property: "og:title", content: "Privacy at Smartytel | Smartytel" },
      { property: "og:description", content: "What we collect, why we collect it, where it is stored and how long we keep it." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <MarketingPage content={content} />,
});
