import { createFileRoute } from "@tanstack/react-router";
import { MarketingPage } from "@/components/MarketingPage";
import { pages } from "@/content/pages";

const content = pages["solutions/sales"]!;

export const Route = createFileRoute("/solutions/sales")({
  head: () => ({
    meta: [
      { title: "Call more, guess less | Smartytel" },
      { name: "description", content: "Click-to-call from the pipeline, AI notes after every conversation and reporting on what actually closes." },
      { property: "og:title", content: "Call more, guess less | Smartytel" },
      { property: "og:description", content: "Click-to-call from the pipeline, AI notes after every conversation and reporting on what actually closes." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <MarketingPage content={content} />,
});
