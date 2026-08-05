import { createFileRoute } from "@tanstack/react-router";
import { MarketingPage } from "@/components/MarketingPage";
import { pages } from "@/content/pages";

const content = pages["blog"]!;

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Notes on phones, teams and customer conversation | Smartytel" },
      { name: "description", content: "Practical writing on call handling, AI answering, coverage in Europe and getting more out of your phone system." },
      { property: "og:title", content: "Notes on phones, teams and customer conversation | Smartytel" },
      { property: "og:description", content: "Practical writing on call handling, AI answering, coverage in Europe and getting more out of your phone system." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <MarketingPage content={content} slug="blog" />,
});
