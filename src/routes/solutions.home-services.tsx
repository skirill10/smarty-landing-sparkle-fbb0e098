import { createFileRoute } from "@tanstack/react-router";
import { MarketingPage } from "@/components/MarketingPage";
import { pages } from "@/content/pages";

const content = pages["solutions/home-services"]!;

export const Route = createFileRoute("/solutions/home-services")({
  head: () => ({
    meta: [
      { title: "Never miss the job because nobody could answer | Smartytel" },
      { name: "description", content: "Dispatchers, techs in vans and an after-hours line \u2014 all on one number your customers already know." },
      { property: "og:title", content: "Never miss the job because nobody could answer | Smartytel" },
      { property: "og:description", content: "Dispatchers, techs in vans and an after-hours line \u2014 all on one number your customers already know." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <MarketingPage content={content} />,
});
