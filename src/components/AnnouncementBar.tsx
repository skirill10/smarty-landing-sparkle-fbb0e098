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
      className="relative bg-gradient-to-r from-[#6D29A4] to-[#7071E5] px-4 py-2.5 text-white"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 text-sm sm:gap-4">
        <span className="flex shrink-0 items-center gap-2.5">
          <span className="flex size-7 items-center justify-center rounded-lg bg-gradient-to-br from-[#F472B6] to-[#A855F7] shadow-sm">
            <Sparkles className="size-4 text-white" aria-hidden="true" />
          </span>
          <span className="font-medium">Introducing Smarty AI Assist: No missed calls, no missed customers.</span>
        </span>
        <span className="flex shrink-0 flex-wrap items-center gap-2">
          <a
            href="/ai-agent"
            className="rounded-lg bg-[#111827] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#111827]/90"
          >
            Experience AI
          </a>
          <a
            href="/demo"
            className="rounded-lg border border-white/40 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/10"
          >
            RSVP webinar
          </a>
        </span>
      </div>

      <button
        type="button"
        onClick={close}
        aria-label="Dismiss announcement"
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-white transition-colors hover:bg-white/10"
      >
        <X className="size-4" aria-hidden="true" />
      </button>
    </div>
  );
}
