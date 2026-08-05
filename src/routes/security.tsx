import { createFileRoute } from "@tanstack/react-router";
import { MarketingPage } from "@/components/MarketingPage";
import { pages } from "@/content/pages";

const content = pages["security"]!;

export const Route = createFileRoute("/security")({
  head: () => ({
    meta: [
      { title: "How we keep your conversations safe | Smartytel" },
      { name: "description", content: "Encryption, access control, monitoring and the controls your security review will ask about." },
      { property: "og:title", content: "How we keep your conversations safe | Smartytel" },
      { property: "og:description", content: "Encryption, access control, monitoring and the controls your security review will ask about." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <MarketingPage content={content} slug="security" />,
});
