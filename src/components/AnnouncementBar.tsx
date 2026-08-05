import { useLocalePath } from "@/components/Link";
import { useEffect, useState } from "react";
import { Sparkles, X } from "lucide-react";
import { useAnnouncement } from "@/lib/cms-content";

const STORAGE_KEY = "smartytel-announcement-closed";

const FALLBACK = {
  enabled: true,
  message: "Introducing Smarty AI Assist: No missed calls, no missed customers.",
  primaryLabel: "Experience AI",
  primaryUrl: "/ai-agent",
  secondaryLabel: "RSVP webinar",
  secondaryUrl: "/demo",
};

export function AnnouncementBar() {
  const lp = useLocalePath();
  const [dismissed, setDismissed] = useState(false);
  const content = useAnnouncement(FALLBACK);

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

  if (dismissed || !content.enabled) return null;

  return (
    <div
      role="banner"
      className="relative h-[52px] bg-gradient-to-r from-primary to-brand px-4 text-brand-foreground"
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-center gap-3 text-sm sm:gap-4">
        <span className="flex shrink-0 items-center gap-2.5">
          <span className="flex size-7 items-center justify-center rounded-lg bg-gradient-to-br from-brand-pink to-brand-magenta shadow-sm">
            <Sparkles className="size-4 text-brand-foreground" aria-hidden="true" />
          </span>
          <span className="font-medium">{content.message}</span>
        </span>
        <span className="flex shrink-0 flex-wrap items-center gap-2">
          <a
            href={lp(content.primaryUrl)}
            className="rounded-[6px] bg-dark px-4 py-2 text-xs font-semibold text-dark-foreground transition-colors hover:bg-dark/90"
          >
            {content.primaryLabel}
          </a>
          <a
            href={lp(content.secondaryUrl)}
            className="rounded-[6px] border border-brand-foreground/40 px-4 py-2 text-xs font-semibold text-brand-foreground transition-colors hover:bg-brand-foreground/10"
          >
            {content.secondaryLabel}
          </a>
        </span>
      </div>

      <button
        type="button"
        onClick={close}
        aria-label="Dismiss announcement"
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-[6px] p-1.5 text-brand-foreground transition-colors hover:bg-brand-foreground/10"
      >
        <X className="size-4" aria-hidden="true" />
      </button>
    </div>
  );
}
