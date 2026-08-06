import { createFileRoute } from "@tanstack/react-router";
import { MarketingPage } from "@/components/MarketingPage";
import { pages } from "@/content/pages";

const content = pages["integrations"]!;

export const Route = createFileRoute("/{-$locale}/integrations")({
  head: () => ({
    meta: [
      { title: "Plays nicely with the tools you already run on | Smartytel" },
      {
        name: "description",
        content:
          "Sync contacts, log calls and texts, and trigger follow-ups across your CRM, help desk, inbox and automation stack.",
      },
      {
        property: "og:title",
        content: "Plays nicely with the tools you already run on | Smartytel",
      },
      {
        property: "og:description",
        content:
          "Sync contacts, log calls and texts, and trigger follow-ups across your CRM, help desk, inbox and automation stack.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <MarketingPage content={content} slug="integrations" />,
});
