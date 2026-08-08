import { createFileRoute } from "@tanstack/react-router";
import { MarketingPage } from "@/components/MarketingPage";
import { pages } from "@/content/pages";
import { canonicalUrl } from "@/lib/seo";

const content = pages["solutions/property-management"]!;

export const Route = createFileRoute("/{-$locale}/solutions/property-management")({
  head: ({ params }) => ({
    links: [{ rel: "canonical", href: canonicalUrl("/solutions/property-management", params.locale) }],
    meta: [
      { property: "og:url", content: canonicalUrl("/solutions/property-management", params.locale) },
      { title: "One line for tenants, owners and contractors | Smartytel" },
      {
        name: "description",
        content:
          "Route by building or portfolio, keep maintenance requests in writing, and prove what was promised.",
      },
      { property: "og:title", content: "One line for tenants, owners and contractors | Smartytel" },
      {
        property: "og:description",
        content:
          "Route by building or portfolio, keep maintenance requests in writing, and prove what was promised.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <MarketingPage content={content} slug="solutions/property-management" />,
});
