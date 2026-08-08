import { createFileRoute } from "@tanstack/react-router";
import { MarketingPage } from "@/components/MarketingPage";
import { pages } from "@/content/pages";
import { canonicalUrl } from "@/lib/seo";

const content = pages["careers"]!;

export const Route = createFileRoute("/{-$locale}/careers")({
  head: ({ params }) => ({
    links: [{ rel: "canonical", href: canonicalUrl("/careers", params.locale) }],
    meta: [
      { property: "og:url", content: canonicalUrl("/careers", params.locale) },
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
