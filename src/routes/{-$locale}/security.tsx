import { createFileRoute } from "@tanstack/react-router";
import { MarketingPage } from "@/components/MarketingPage";
import { pages } from "@/content/pages";
import { canonicalUrl } from "@/lib/seo";

const content = pages["security"]!;

export const Route = createFileRoute("/{-$locale}/security")({
  head: ({ params }) => ({
    links: [{ rel: "canonical", href: canonicalUrl("/security", params.locale) }],
    meta: [
      { property: "og:url", content: canonicalUrl("/security", params.locale) },
      { title: "How we keep your conversations safe | Smartytel" },
      {
        name: "description",
        content:
          "Encryption, access control, monitoring and the controls your security review will ask about.",
      },
      { property: "og:title", content: "How we keep your conversations safe | Smartytel" },
      {
        property: "og:description",
        content:
          "Encryption, access control, monitoring and the controls your security review will ask about.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <MarketingPage content={content} slug="security" />,
});
