import { useEffect, useState } from "react";
import { Sparkles, X } from "lucide-react";

const STORAGE_KEY = "smartytel-announcement-closed";

export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === "true") {
        setDismissed(true);
      }
    } catch {
      // Ignore storage errors.
    }
  }, []);

  const close = () => {
    setDismissed(true);
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // Ignore storage errors.
    }
  };

  if (dismissed) return null;

  return (
    <div
      role="banner"
      className="relative bg-gradient-to-r from-brand to-primary px-4 py-2.5 text-brand-foreground"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 text-sm sm:gap-4">
        <span className="flex items-center gap-2">
          <Sparkles className="hidden size-4 sm:block" aria-hidden="true" />
          <span className="font-medium">Introducing Smarty AI Assist: No missed calls, no missed customers.</span>
        </span>
        <span className="flex flex-wrap items-center gap-2">
          <a
            href="/ai-agent"
            className="rounded-md bg-foreground px-3 py-1.5 text-xs font-semibold text-background transition-colors hover:bg-foreground/90"
          >
            Experience AI
          </a>
          <a
            href="/demo"
            className="rounded-md border border-brand-foreground/30 px-3 py-1.5 text-xs font-semibold text-brand-foreground transition-colors hover:bg-brand-foreground/10"
          >
            RSVP webinar
          </a>
        </span>
      </div>

      <button
        type="button"
        onClick={close}
        aria-label="Dismiss announcement"
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-brand-foreground transition-colors hover:bg-brand-foreground/10"
      >
        <X className="size-4" aria-hidden="true" />
      </button>
    </div>
  );
}
