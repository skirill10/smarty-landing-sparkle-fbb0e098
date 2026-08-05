import { createFileRoute } from "@tanstack/react-router";
import { MarketingPage } from "@/components/MarketingPage";
import { pages } from "@/content/pages";

const content = pages["tasks"]!;

export const Route = createFileRoute("/{-$locale}/tasks")({
  head: () => ({
    meta: [
      { title: "Follow-ups that survive the end of the call | Smartytel" },
      { name: "description", content: "Turn calls and messages into tasks with owners and due dates, so promises made on the phone actually happen." },
      { property: "og:title", content: "Follow-ups that survive the end of the call | Smartytel" },
      { property: "og:description", content: "Turn calls and messages into tasks with owners and due dates, so promises made on the phone actually happen." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <MarketingPage content={content} slug="tasks" />,
});
