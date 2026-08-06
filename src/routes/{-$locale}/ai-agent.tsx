import { createFileRoute } from "@tanstack/react-router";
import { MarketingPage } from "@/components/MarketingPage";
import { pages } from "@/content/pages";

const content = pages["ai-agent"]!;

export const Route = createFileRoute("/{-$locale}/ai-agent")({
  head: () => ({
    meta: [
      { title: "An AI agent that answers, qualifies and summaris | Smartytel" },
      {
        name: "description",
        content:
          "Smarty AI Assist picks up when nobody can, asks the right questions, then hands a clean summary to the right person.",
      },
      {
        property: "og:title",
        content: "An AI agent that answers, qualifies and summaris | Smartytel",
      },
      {
        property: "og:description",
        content:
          "Smarty AI Assist picks up when nobody can, asks the right questions, then hands a clean summary to the right person.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <MarketingPage content={content} slug="ai-agent" />,
});
