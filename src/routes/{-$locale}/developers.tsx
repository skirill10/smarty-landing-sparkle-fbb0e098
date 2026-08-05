import { createFileRoute } from "@tanstack/react-router";
import { MarketingPage } from "@/components/MarketingPage";
import { pages } from "@/content/pages";

const content = pages["developers"]!;

export const Route = createFileRoute("/{-$locale}/developers")({
  head: () => ({
    meta: [
      { title: "The Smartytel API | Smartytel" },
      { name: "description", content: "Provision numbers, place calls, send messages and stream events from your own product." },
      { property: "og:title", content: "The Smartytel API | Smartytel" },
      { property: "og:description", content: "Provision numbers, place calls, send messages and stream events from your own product." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <MarketingPage content={content} slug="developers" />,
});
