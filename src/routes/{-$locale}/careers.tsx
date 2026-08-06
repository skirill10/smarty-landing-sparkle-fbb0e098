import { createFileRoute } from "@tanstack/react-router";
import { MarketingPage } from "@/components/MarketingPage";
import { pages } from "@/content/pages";

const content = pages["careers"]!;

export const Route = createFileRoute("/{-$locale}/careers")({
  head: () => ({
    meta: [
      { title: "Come build the phone system teams actually like | Smartytel" },
      {
        name: "description",
        content: "Engineering, support and go-to-market roles across Europe and North America.",
      },
      {
        property: "og:title",
        content: "Come build the phone system teams actually like | Smartytel",
      },
      {
        property: "og:description",
        content: "Engineering, support and go-to-market roles across Europe and North America.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <MarketingPage content={content} slug="careers" />,
});
