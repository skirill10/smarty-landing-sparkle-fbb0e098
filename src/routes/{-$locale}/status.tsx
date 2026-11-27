import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { canonicalUrl } from "@/lib/seo";

export const Route = createFileRoute("/{-$locale}/status")({
  head: ({ params }) => ({
    links: [{ rel: "canonical", href: canonicalUrl("/status", params.locale) }],
    meta: [
      { title: "Service status and support | Smartytel" },
      {
        name: "description",
        content: "How to get help with a Smartytel service issue during early beta.",
      },
    ],
  }),
  component: StatusPage,
});

function StatusPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="mx-auto max-w-4xl px-5 py-16 md:py-24">
        <p className="font-semibold uppercase tracking-widest text-brand">Service status</p>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-6xl">
          Need help with a service issue?
        </h1>
        <div className="mt-8 rounded-2xl border border-border bg-card p-7">
          <h2 className="font-display text-2xl font-bold">
            Public status reporting is not available yet
          </h2>
          <p className="mt-4 text-muted-foreground">
            This page does not provide live monitoring, an uptime guarantee or an incident history.
            We cannot confirm current service availability here.
          </p>
          <p className="mt-4 text-muted-foreground">
            If calling, messaging or access is not working, contact the support team. Include the
            affected feature, when the issue started and any error message. Do not include passwords
            or API keys.
          </p>
          <a
            href="https://support.smarty.tel"
            className="mt-6 inline-flex min-h-11 items-center rounded-md bg-brand px-6 py-3 font-semibold text-brand-foreground"
          >
            Get support
          </a>
          <a
            href="mailto:support@smarty.tel"
            className="ml-4 mt-4 inline-flex min-h-11 items-center underline"
          >
            Email support
          </a>
        </div>
        <div className="mt-8">
          <h2 className="font-display text-2xl font-bold">Follow an existing request</h2>
          <p className="mt-3 text-muted-foreground">
            Sign in to the support portal to read replies and add information to your ticket.
          </p>
          <a
            href="https://support.smarty.tel/helpdesk/my-tickets"
            className="mt-4 inline-flex min-h-11 items-center font-semibold text-brand underline"
          >
            View your tickets
          </a>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
