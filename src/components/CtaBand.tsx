import { useLocalePath } from "@/components/Link";
import { ArrowRight, Phone, Sparkles, Check } from "lucide-react";

type CtaBandProps = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
};

const fallbackProofPoints = ["Free beta registration", "No credit card", "Invitation required"];

export function CtaBand(props: CtaBandProps) {
  const lp = useLocalePath();
  const eyebrow = props.eyebrow ?? "Early beta";
  const title = props.title ?? "Help shape Smartytel";
  const subtitle =
    "Join the free beta list. We will contact you when invitations are available. Registration does not create an active account or provide immediate access.";
  const primaryLabel = "Join free beta";
  const secondaryLabel = "Request a demo";
  const proofPoints = fallbackProofPoints;

  return (
    <section className="w-full">
      <div className="relative isolate w-full overflow-hidden bg-cta-mesh px-6 py-20 text-primary-foreground md:px-14 md:py-28">
        {/* glow orbs */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 -top-28 size-[26rem] rounded-full bg-brand/40 blur-3xl animate-glow-drift"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -right-20 size-[22rem] rounded-full bg-primary-foreground/15 blur-3xl animate-glow-drift-slow"
        />
        {/* fine grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-cta-grid opacity-40"
        />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-[1.15fr_0.85fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 bg-primary-foreground/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest backdrop-blur">
              <Sparkles className="size-3.5" aria-hidden="true" />
              {eyebrow}
            </span>

            <h2 className="mt-6 max-w-xl font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
              {title.split(" right now")[0]}
              {title.includes(" right now") && (
                <span className="bg-cta-shine bg-clip-text text-transparent"> right now</span>
              )}
            </h2>

            <p className="mt-5 max-w-lg text-lg text-primary-foreground/75">{subtitle}</p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="/early-access/"
                className="group inline-flex items-center gap-2 rounded-md bg-brand px-7 py-4 font-display font-bold text-brand-foreground shadow-brand-glow transition-all hover:-translate-y-0.5 hover:bg-dark hover:text-dark-foreground hover:shadow-brand-glow-lg"
              >
                {primaryLabel}
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </a>
              <a
                href={lp("/demo#request-demo")}
                className="inline-flex items-center gap-2 rounded-md border border-primary-foreground/30 px-7 py-4 font-semibold backdrop-blur transition-colors hover:bg-white hover:text-dark"
              >
                {secondaryLabel}
              </a>
            </div>

            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-primary-foreground/70">
              {proofPoints.map((point) => (
                <li key={point} className="flex items-center gap-2">
                  <Check className="size-4 text-brand" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Illustrative product preview; not a live service metric. */}
          <div className="relative mx-auto w-full max-w-sm">
            <div className="rounded-3xl border border-primary-foreground/15 bg-primary-foreground/10 p-6 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <span className="relative flex size-12 items-center justify-center rounded-2xl bg-brand text-brand-foreground">
                  <Phone className="size-5 animate-ring-tilt" aria-hidden="true" />
                  <span
                    className="absolute inset-0 rounded-2xl bg-brand animate-ping-slow"
                    aria-hidden="true"
                  />
                </span>
                <div>
                  <p className="font-display font-bold">Product preview · Incoming call</p>
                  <p className="text-sm text-primary-foreground/65">+1 (415) 555-0138 · New lead</p>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {[
                  ["Ringing team", "Sales · 3 devices"],
                  ["AI note-taker", "Armed"],
                  ["Availability", "Depends on setup"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between rounded-xl bg-primary-foreground/10 px-4 py-3 text-sm"
                  >
                    <span className="text-primary-foreground/70">{label}</span>
                    <span className="font-semibold">{value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-1.5" aria-hidden="true">
                {[6, 14, 22, 12, 28, 18, 9, 24, 15, 30, 11, 20].map((h, i) => (
                  <span
                    key={i}
                    className="w-1.5 rounded-full bg-brand/80 animate-wave"
                    style={{ height: `${h}px`, animationDelay: `${i * 90}ms` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
