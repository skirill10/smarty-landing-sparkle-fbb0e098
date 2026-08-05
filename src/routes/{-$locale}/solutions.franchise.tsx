import { createFileRoute } from "@tanstack/react-router";
import { MarketingPage } from "@/components/MarketingPage";
import { pages } from "@/content/pages";

const content = pages["solutions/franchise"]!;

export const Route = createFileRoute("/{-$locale}/solutions/franchise")({
  head: () => ({
    meta: [
      { title: "Local numbers, central oversight | Smartytel" },
      { name: "description", content: "Give every location a local number while head office keeps one view of volume, response times and quality." },
      { property: "og:title", content: "Local numbers, central oversight | Smartytel" },
      { property: "og:description", content: "Give every location a local number while head office keeps one view of volume, response times and quality." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <MarketingPage content={content} slug="solutions/franchise" />,
});
