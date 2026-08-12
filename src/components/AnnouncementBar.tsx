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
      className="relative min-h-[52px] bg-gradient-to-r from-primary to-brand py-2 pl-4 pr-11 text-brand-foreground sm:px-4"
    >
      <div className="mx-auto flex min-h-[36px] w-full max-w-7xl items-center gap-3 sm:h-full sm:justify-center sm:gap-4">
        <span className="flex min-w-0 flex-1 items-center gap-2.5 text-xs sm:flex-none sm:shrink-0 sm:text-sm">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand-pink to-brand-magenta shadow-sm">
            <Sparkles className="size-4 text-brand-foreground" aria-hidden="true" />
          </span>
          <span className="line-clamp-2 font-medium sm:line-clamp-none">{content.message}</span>
        </span>
        <span className="flex shrink-0 items-center gap-2">
          <a
            href={lp(content.primaryUrl)}
            className="whitespace-nowrap rounded-[6px] bg-dark px-3 py-2 text-xs font-semibold text-dark-foreground transition-colors hover:bg-dark/90 sm:px-4"
          >
            {content.primaryLabel}
          </a>
          <a
            href={lp(content.secondaryUrl)}
            className="hidden whitespace-nowrap rounded-[6px] border border-brand-foreground/40 px-4 py-2 text-xs font-semibold text-brand-foreground transition-colors hover:bg-brand-foreground/10 sm:inline-block"
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
