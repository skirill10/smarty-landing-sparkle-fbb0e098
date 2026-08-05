import { createFileRoute } from "@tanstack/react-router";
import { MarketingPage } from "@/components/MarketingPage";
import { pages } from "@/content/pages";

const content = pages["solutions/property-management"]!;

export const Route = createFileRoute("/solutions/property-management")({
  head: () => ({
    meta: [
      { title: "One line for tenants, owners and contractors | Smartytel" },
      { name: "description", content: "Route by building or portfolio, keep maintenance requests in writing, and prove what was promised." },
      { property: "og:title", content: "One line for tenants, owners and contractors | Smartytel" },
      { property: "og:description", content: "Route by building or portfolio, keep maintenance requests in writing, and prove what was promised." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <MarketingPage content={content} slug="solutions/property-management" />,
});
