import { createFileRoute } from "@tanstack/react-router";
import { MarketingPage } from "@/components/MarketingPage";
import { pages } from "@/content/pages";

const content = pages["terms"]!;

export const Route = createFileRoute("/{-$locale}/terms")({
  head: () => ({
    meta: [
      { title: "Terms of service | Smartytel" },
      {
        name: "description",
        content:
          "The agreement covering your use of Smartytel numbers, calling, messaging and add-on modules.",
      },
      { property: "og:title", content: "Terms of service | Smartytel" },
      {
        property: "og:description",
        content:
          "The agreement covering your use of Smartytel numbers, calling, messaging and add-on modules.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <MarketingPage content={content} slug="terms" />,
});
