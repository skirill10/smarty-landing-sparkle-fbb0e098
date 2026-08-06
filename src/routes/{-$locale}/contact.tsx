import { createFileRoute } from "@tanstack/react-router";
import { MarketingPage } from "@/components/MarketingPage";
import { pages } from "@/content/pages";

const content = pages["contact"]!;

export const Route = createFileRoute("/{-$locale}/contact")({
  head: () => ({
    meta: [
      { title: "Talk to a human | Smartytel" },
      {
        name: "description",
        content:
          "Sales, support and partnership enquiries \u2014 answered on the phone system we build.",
      },
      { property: "og:title", content: "Talk to a human | Smartytel" },
      {
        property: "og:description",
        content:
          "Sales, support and partnership enquiries \u2014 answered on the phone system we build.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <MarketingPage content={content} slug="contact" />,
});
