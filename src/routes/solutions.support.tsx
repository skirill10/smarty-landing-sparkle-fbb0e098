import { createFileRoute } from "@tanstack/react-router";
import { MarketingPage } from "@/components/MarketingPage";
import { pages } from "@/content/pages";

const content = pages["solutions/support"]!;

export const Route = createFileRoute("/solutions/support")({
  head: () => ({
    meta: [
      { title: "Support queues without a call-centre budget | Smartytel" },
      { name: "description", content: "Queues, hunt groups, SLAs and a shared inbox for calls, SMS and chat apps." },
      { property: "og:title", content: "Support queues without a call-centre budget | Smartytel" },
      { property: "og:description", content: "Queues, hunt groups, SLAs and a shared inbox for calls, SMS and chat apps." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <MarketingPage content={content} slug="solutions/support" />,
});
