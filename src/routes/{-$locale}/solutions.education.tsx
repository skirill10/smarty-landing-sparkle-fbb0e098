import { createFileRoute } from "@tanstack/react-router";
import { MarketingPage } from "@/components/MarketingPage";
import { pages } from "@/content/pages";

const content = pages["solutions/education"]!;

export const Route = createFileRoute("/{-$locale}/solutions/education")({
  head: () => ({
    meta: [
      { title: "One number for parents, students and staff | Smartytel" },
      { name: "description", content: "Term-time hours, departmental routing and broadcast SMS for closures and reminders." },
      { property: "og:title", content: "One number for parents, students and staff | Smartytel" },
      { property: "og:description", content: "Term-time hours, departmental routing and broadcast SMS for closures and reminders." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <MarketingPage content={content} slug="solutions/education" />,
});
