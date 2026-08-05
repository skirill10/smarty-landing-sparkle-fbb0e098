import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { usePricingCta } from "@/lib/cms-content";

type ActionCardProps = {
  to: string;
  hash?: string | undefined;
  label: string;
  tone: "dark" | "light";
};

function ActionCard({ to, hash, label, tone }: ActionCardProps) {
  const dark = tone === "dark";
  return (
    <Link
      to={to}
      {...(hash ? { hash } : {})}
      className={`group relative flex h-40 w-full flex-col justify-end rounded-md p-6 transition-transform hover:-translate-y-1 sm:w-56 ${
        dark ? "bg-dark text-dark-foreground" : "bg-light-grey text-foreground"
      }`}
    >
      <span className="absolute right-6 top-6 grid size-11 place-items-center rounded-md bg-brand text-brand-foreground">
        <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
      </span>
      <span className="font-display text-lg font-semibold">{label}</span>
    </Link>
  );
}

/**
 * Split CTA band: oversized headline on the left, two tappable action cards
 * on the right. Used on the pricing page instead of the standard CtaBand.
 */
export function PricingCta({
  title = "Never miss a call or customer",
  primary = { label: "Try for free", to: "/demo" },
  secondary = { label: "Talk to Sales", to: "/pricing", hash: "talk-to-sales" },
}: {
  title?: string;
  primary?: { label: string; to: string; hash?: string };
  secondary?: { label: string; to: string; hash?: string };
}) {
  const content = usePricingCta({ title, primary, secondary });

  return (
    <section aria-labelledby="pricing-cta" className="border-y border-border bg-background">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-5 py-20 lg:flex-row lg:items-center lg:justify-between">
        <h2
          id="pricing-cta"
          className="max-w-xl font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl"
        >
          {content.title}
        </h2>
        <div className="flex flex-col gap-4 sm:flex-row">
          <ActionCard
            tone="dark"
            label={content.primary.label}
            to={content.primary.to}
            hash={content.primary.hash}
          />
          <ActionCard
            tone="light"
            label={content.secondary.label}
            to={content.secondary.to}
            hash={content.secondary.hash}
          />
        </div>
      </div>
    </section>
  );
}
