import { createFileRoute } from "@tanstack/react-router";
import { MarketingPage } from "@/components/MarketingPage";
import { pages } from "@/content/pages";
import { canonicalUrl } from "@/lib/seo";

const content = pages["academy"]!;

export const Route = createFileRoute("/{-$locale}/academy")({
  head: ({ params }) => ({
    links: [{ rel: "canonical", href: canonicalUrl("/academy", params.locale) }],
    meta: [
      { property: "og:url", content: canonicalUrl("/academy", params.locale) },
      { title: "Smartytel Academy: Free Courses & Certification | Smartytel" },
      {
        name: "description",
        content:
          "Free Smartytel Academy courses for admins, agents and managers, with certification on routing, analytics and daily inbox workflow.",
      },
      {
        property: "og:title",
        content: "Smartytel Academy: Free Courses & Certification | Smartytel",
      },
      {
        property: "og:description",
        content:
          "Free Smartytel Academy courses for admins, agents and managers, with certification on routing, analytics and daily inbox workflow.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <MarketingPage content={content} slug="academy" />,
});
