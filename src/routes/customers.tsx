import { createFileRoute } from "@tanstack/react-router";
import { MarketingPage } from "@/components/MarketingPage";
import { pages } from "@/content/pages";

const content = pages["customers"]!;

export const Route = createFileRoute("/customers")({
  head: () => ({
    meta: [
      { title: "Teams that answer with Smartytel | Smartytel" },
      { name: "description", content: "Dental groups, law firms, HVAC dispatchers, property managers and startups across the US, Canada, the UK and Europe." },
      { property: "og:title", content: "Teams that answer with Smartytel | Smartytel" },
      { property: "og:description", content: "Dental groups, law firms, HVAC dispatchers, property managers and startups across the US, Canada, the UK and Europe." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <MarketingPage content={content} />,
});
