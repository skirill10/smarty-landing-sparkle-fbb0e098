import { createFileRoute } from "@tanstack/react-router";
import { MarketingPage } from "@/components/MarketingPage";
import { pages } from "@/content/pages";

const content = pages["phone-menu"]!;

export const Route = createFileRoute("/phone-menu")({
  head: () => ({
    meta: [
      { title: "Phone menus and routing that match how you work | Smartytel" },
      { name: "description", content: "Build IVR menus, business-hours rules, hunt groups and forwarding without waiting on a telecoms engineer." },
      { property: "og:title", content: "Phone menus and routing that match how you work | Smartytel" },
      { property: "og:description", content: "Build IVR menus, business-hours rules, hunt groups and forwarding without waiting on a telecoms engineer." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <MarketingPage content={content} slug="phone-menu" />,
});
