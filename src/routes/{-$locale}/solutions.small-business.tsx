import { createFileRoute } from "@tanstack/react-router";
import { MarketingPage } from "@/components/MarketingPage";
import { pages } from "@/content/pages";

const content = pages["solutions/small-business"]!;

export const Route = createFileRoute("/{-$locale}/solutions/small-business")({
  head: () => ({
    meta: [
      { title: "Stop running the business off a personal mobile | Smartytel" },
      { name: "description", content: "A shared business number your team can answer, with texting, voicemail and simple reporting." },
      { property: "og:title", content: "Stop running the business off a personal mobile | Smartytel" },
      { property: "og:description", content: "A shared business number your team can answer, with texting, voicemail and simple reporting." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <MarketingPage content={content} slug="solutions/small-business" />,
});
