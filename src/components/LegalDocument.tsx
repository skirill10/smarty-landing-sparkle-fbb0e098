import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useT } from "@/i18n/LocaleProvider";

export type LegalSection = {
  heading: string;
  paragraphs?: string[];
  items?: { term?: string; body: string }[];
};

export type LegalDoc = {
  eyebrow: string;
  title: string;
  intro: string[];
  updated: string;
  sections: LegalSection[];
  footer?: string[];
  /** Render lists as plain bullets instead of cards. */
  plain?: boolean;
};

export function LegalDocument({ doc }: { doc: LegalDoc }) {
  const t = useT();

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main>
        <section className="mx-auto max-w-3xl px-5 pb-10 pt-16 md:pt-24">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand">
            {t(doc.eyebrow)}
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold leading-[1.08] tracking-tight md:text-5xl">
            {t(doc.title)}
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">{t(doc.updated)}</p>
          {doc.intro.map((p) => (
            <p key={p} className="mt-6 text-lg leading-relaxed text-muted-foreground">
              {t(p)}
            </p>
          ))}
        </section>

        <section className="mx-auto max-w-3xl px-5 pb-16">
          <div className="divide-y divide-border border-t border-border">
            {doc.sections.map((section, index) => (
              <article key={section.heading} className="py-9">
                <h2 className="font-display text-xl font-bold tracking-tight md:text-2xl">
                  <span className="mr-2 text-brand">{index + 1}.</span>
                  {t(section.heading)}
                </h2>
                {section.paragraphs?.map((p) => (
                  <p key={p} className="mt-4 leading-relaxed text-muted-foreground">
                    {t(p)}
                  </p>
                ))}
                {section.items ? (
                  <ul
                    className={
                      doc.plain
                        ? "mt-4 grid list-disc gap-2 pl-5 leading-relaxed text-muted-foreground"
                        : "mt-5 grid gap-3"
                    }
                  >
                    {section.items.map((item) => (
                      <li
                        key={item.body}
                        className={
                          doc.plain
                            ? ""
                            : "rounded-xl border border-border bg-card px-5 py-4 text-sm leading-relaxed text-muted-foreground"
                        }
                      >
                        {item.term ? (
                          <span className="font-semibold text-foreground">{t(item.term)}: </span>
                        ) : null}
                        {t(item.body)}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>

          {doc.footer?.map((p) => (
            <p key={p} className="mt-8 leading-relaxed text-muted-foreground">
              {t(p)}
            </p>
          ))}
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
