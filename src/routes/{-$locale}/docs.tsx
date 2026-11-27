import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import body from "@/content/developer-docs.html?raw";

import { canonicalUrl } from "@/lib/seo";

export const Route = createFileRoute("/{-$locale}/docs")({
  head: ({ params }) => ({
    links: [{ rel: "canonical", href: canonicalUrl("/docs", params.locale) }],
    meta: [
      { property: "og:url", content: canonicalUrl("/docs", params.locale) },
      { title: "Documentation for builders | Smartytel" },
      {
        name: "description",
        content: "Authentication, endpoints, webhooks and examples for the Smartytel API.",
      },
      { property: "og:title", content: "Documentation for builders | Smartytel" },
      {
        property: "og:description",
        content: "Authentication, endpoints, webhooks and examples for the Smartytel API.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main dangerouslySetInnerHTML={{ __html: body }} />
      <SiteFooter />
    </div>
  ),
});
