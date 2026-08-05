import { createFileRoute } from "@tanstack/react-router";
import { MarketingPage } from "@/components/MarketingPage";
import { pages } from "@/content/pages";

const content = pages["resources"]!;

export const Route = createFileRoute("/{-$locale}/resources")({
  head: () => ({
    meta: [
      { title: "Everything you need to run your phone system wel | Smartytel" },
      { name: "description", content: "Guides, tutorials, downloads and status information in one place." },
      { property: "og:title", content: "Everything you need to run your phone system wel | Smartytel" },
      { property: "og:description", content: "Guides, tutorials, downloads and status information in one place." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <MarketingPage content={content} slug="resources" />,
});
