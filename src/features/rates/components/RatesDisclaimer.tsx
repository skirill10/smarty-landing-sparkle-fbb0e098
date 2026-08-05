import { Info } from "lucide-react";

export function RatesDisclaimer({ title, body }: { title?: string | undefined; body: string }) {
  return (
    <section aria-labelledby="rates-disclaimer" className="mx-auto max-w-7xl px-5 py-10">
      <div className="flex gap-4 rounded-2xl border border-border bg-light-grey/60 p-6">
        <Info className="mt-0.5 size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
        <div>
          <h2 id="rates-disclaimer" className="font-display text-sm font-semibold">
            {title ?? "About these rates"}
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">{body}</p>
        </div>
      </div>
    </section>
  );
}
