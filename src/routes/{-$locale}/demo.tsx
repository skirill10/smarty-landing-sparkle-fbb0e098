import { createFileRoute } from "@tanstack/react-router";
import { MarketingPage } from "@/components/MarketingPage";
import { pages } from "@/content/pages";

const content = pages["demo"]!;

export const Route = createFileRoute("/{-$locale}/demo")({
  head: () => ({
    meta: [
      { title: "See Smartytel in ten minutes | Smartytel" },
      {
        name: "description",
        content:
          "A walkthrough of shared numbers, routing, the AI agent, the built-in CRM and reporting.",
      },
      { property: "og:title", content: "See Smartytel in ten minutes | Smartytel" },
      {
        property: "og:description",
        content:
          "A walkthrough of shared numbers, routing, the AI agent, the built-in CRM and reporting.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <MarketingPage content={content} slug="demo" />,
});
