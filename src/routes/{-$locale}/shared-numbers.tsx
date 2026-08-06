import { createFileRoute } from "@tanstack/react-router";
import { MarketingPage } from "@/components/MarketingPage";
import { pages } from "@/content/pages";

const content = pages["shared-numbers"]!;

export const Route = createFileRoute("/{-$locale}/shared-numbers")({
  head: () => ({
    meta: [
      { title: "Shared numbers, shared context | Smartytel" },
      {
        name: "description",
        content:
          "Give teams a number they own together, with permissions, notes and full call history for everyone who needs it.",
      },
      { property: "og:title", content: "Shared numbers, shared context | Smartytel" },
      {
        property: "og:description",
        content:
          "Give teams a number they own together, with permissions, notes and full call history for everyone who needs it.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <MarketingPage content={content} slug="shared-numbers" />,
});
