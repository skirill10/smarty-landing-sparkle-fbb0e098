import { createFileRoute } from "@tanstack/react-router";
import { MarketingPage } from "@/components/MarketingPage";
import { pages } from "@/content/pages";

const content = pages["calling"]!;

export const Route = createFileRoute("/{-$locale}/calling")({
  head: () => ({
    meta: [
      { title: "A business phone line your whole team can answer | Smartytel" },
      { name: "description", content: "Ring groups, transfers, voicemail and call recording on shiny local numbers across the US, Canada, the UK and every European country." },
      { property: "og:title", content: "A business phone line your whole team can answer | Smartytel" },
      { property: "og:description", content: "Ring groups, transfers, voicemail and call recording on shiny local numbers across the US, Canada, the UK and every European country." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <MarketingPage content={content} slug="calling" />,
});
