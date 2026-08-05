import { createFileRoute } from "@tanstack/react-router";
import { MarketingPage } from "@/components/MarketingPage";
import { pages } from "@/content/pages";

const content = pages["solutions/operations"]!;

export const Route = createFileRoute("/solutions/operations")({
  head: () => ({
    meta: [
      { title: "Make the phone part of your process | Smartytel" },
      { name: "description", content: "Automate what happens after a call: tasks, alerts, handovers and reporting." },
      { property: "og:title", content: "Make the phone part of your process | Smartytel" },
      { property: "og:description", content: "Automate what happens after a call: tasks, alerts, handovers and reporting." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <MarketingPage content={content} />,
});
