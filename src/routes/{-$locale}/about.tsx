import { createFileRoute } from "@tanstack/react-router";
import { MarketingPage } from "@/components/MarketingPage";
import { pages } from "@/content/pages";
import { canonicalUrl } from "@/lib/seo";

const content = pages["about"]!;

export const Route = createFileRoute("/{-$locale}/about")({
  head: ({ params }) => ({
    links: [{ rel: "canonical", href: canonicalUrl("/about", params.locale) }],
    meta: [
      { property: "og:url", content: canonicalUrl("/about", params.locale) },
      { title: "Why we built Smartytel | Smartytel" },
      {
        name: "description",
        content:
          "We think a business phone should be as easy to run as email \u2014 and should work the same in Berlin as in Boston.",
      },
      { property: "og:title", content: "Why we built Smartytel | Smartytel" },
      {
        property: "og:description",
        content:
          "We think a business phone should be as easy to run as email \u2014 and should work the same in Berlin as in Boston.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <MarketingPage content={content} slug="about" />,
});
