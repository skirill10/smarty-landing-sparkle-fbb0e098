import { createFileRoute } from "@tanstack/react-router";
import { Globe, Monitor, Smartphone } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { canonicalUrl } from "@/lib/seo";

export const Route = createFileRoute("/{-$locale}/downloads")({
  head: ({ params }) => ({
    links: [{ rel: "canonical", href: canonicalUrl("/downloads", params.locale) }],
    meta: [
      { title: "Apps and beta access | Smartytel" },
      {
        name: "description",
        content: "Find the right access route for the Smartytel beta and existing accounts.",
      },
    ],
  }),
  component: DownloadsPage,
});

function DownloadsPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <p className="font-semibold uppercase tracking-widest text-brand">Apps and access</p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold tracking-tight md:text-6xl">
          Get access to Smartytel
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Smartytel is in early beta. Join the list for an invitation, or sign in if the team has
          already provided your account. Registration does not provide immediate access.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <article className="rounded-2xl border border-border bg-card p-7">
            <Globe className="size-8 text-brand" aria-hidden="true" />
            <h2 className="mt-5 font-display text-2xl font-bold">Web app</h2>
            <p className="mt-3 text-muted-foreground">
              Already have an account? Use your existing Smartytel login.
            </p>
            <a
              className="mt-6 inline-flex min-h-11 items-center rounded-md bg-brand px-5 py-3 font-semibold text-brand-foreground"
              href="https://app.smarty.tel/smarty/login"
            >
              Sign in to the web app
            </a>
          </article>
          {[
            { name: "iOS and Android", Icon: Smartphone },
            { name: "Mac and Windows", Icon: Monitor },
          ].map(({ name, Icon }) => (
            <article key={name} className="rounded-2xl border border-border bg-card p-7">
              <Icon className="size-8 text-brand" aria-hidden="true" />
              <h2 className="mt-5 font-display text-2xl font-bold">{name}</h2>
              <p className="mt-3 text-muted-foreground">
                Public downloads are not available on this page. The team will share access
                instructions with eligible beta participants.
              </p>
              <a
                className="mt-6 inline-flex min-h-11 items-center rounded-md border border-border px-5 py-3 font-semibold"
                href="/early-access/"
              >
                Join free beta
              </a>
            </article>
          ))}
        </div>
        <section className="mt-12 border-t border-border pt-8">
          <h2 className="font-display text-2xl font-bold">Already invited and need help?</h2>
          <p className="mt-3 text-muted-foreground">
            Contact support for help with account access or installation instructions.
          </p>
          <a
            href="https://support.smarty.tel"
            className="mt-4 inline-flex min-h-11 items-center font-semibold text-brand underline"
          >
            Get support
          </a>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
