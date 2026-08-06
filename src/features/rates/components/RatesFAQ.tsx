import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FAQItem } from "../types";

/** Accessible disclosure list; each item is data-driven. */
export function RatesFAQ({ title, items }: { title: string; items: FAQItem[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  if (!items.length) return null;

  return (
    <section aria-labelledby="rates-faq" className="border-t border-border py-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-[1fr_1.4fr]">
        <h2 id="rates-faq" className="font-display text-3xl font-bold tracking-tight md:text-4xl">
          {title}
        </h2>
        <dl className="divide-y divide-border border-y border-border">
          {items.map((item) => {
            const isOpen = openId === item.id;
            const panelId = `faq-panel-${item.id}`;
            return (
              <div key={item.id} className="py-5">
                <dt>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    className="flex w-full items-center justify-between gap-4 text-left font-display text-base font-semibold focus-visible:ring-2 focus-visible:ring-brand/40"
                  >
                    {item.question}
                    <ChevronDown
                      className={`size-5 shrink-0 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    />
                  </button>
                </dt>
                <dd id={panelId} hidden={!isOpen} className="mt-3 max-w-2xl text-muted-foreground">
                  {item.answer}
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
