import { createFileRoute } from "@tanstack/react-router";
import { MarketingPage } from "@/components/MarketingPage";
import { pages } from "@/content/pages";
import { canonicalUrl } from "@/lib/seo";

const content = pages["carrier-registration"]!;

export const Route = createFileRoute("/{-$locale}/carrier-registration")({
  head: ({ params }) => ({
    links: [{ rel: "canonical", href: canonicalUrl("/carrier-registration", params.locale) }],
    meta: [
      { property: "og:url", content: canonicalUrl("/carrier-registration", params.locale) },
      { title: "Carrier & 10DLC Sender Registration | Smartytel" },
      {
        name: "description",
        content:
          "Register your business for 10DLC, toll-free messaging, branded caller ID and EU/UK sender IDs so calls connect and texts get delivered.",
      },
      { property: "og:title", content: "Carrier & 10DLC Sender Registration | Smartytel" },
      {
        property: "og:description",
        content:
          "Register your business for 10DLC, toll-free messaging, branded caller ID and EU/UK sender IDs so calls connect and texts get delivered.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <MarketingPage content={content} slug="carrier-registration" />,
});
