import { AlertTriangle, Search } from "lucide-react";

export function LoadingState({ rows = 6, label = "Loading rates" }: { rows?: number; label?: string }) {
  return (
    <div role="status" aria-live="polite" className="space-y-3">
      <span className="sr-only">{label}</span>
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className="h-16 animate-pulse rounded-xl border border-border bg-light-grey/60"
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export function EmptyState({
  title = "No destinations match your search",
  body = "Try a different country name or calling code, or clear the filters to see every destination.",
  action,
}: {
  title?: string;
  body?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-12 text-center">
      <Search className="mx-auto size-6 text-muted-foreground" aria-hidden="true" />
      <h3 className="mt-4 font-display text-lg font-semibold">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">{body}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}

export function ErrorState({ onRetry }: { onRetry?: () => void }) {
  return (
    <div role="alert" className="rounded-2xl border border-border bg-card p-12 text-center">
      <AlertTriangle className="mx-auto size-6 text-muted-foreground" aria-hidden="true" />
      <h3 className="mt-4 font-display text-lg font-semibold">We couldn't load the rates</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
        Something went wrong fetching the rate table. Please try again in a moment.
      </p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-6 rounded-md border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-secondary"
        >
          Try again
        </button>
      ) : null}
    </div>
  );
}
