import { createFileRoute } from "@tanstack/react-router";
import { MarketingPage } from "@/components/MarketingPage";
import { pages } from "@/content/pages";

const content = pages["solutions/healthcare"]!;

export const Route = createFileRoute("/solutions/healthcare")({
  head: () => ({
    meta: [
      { title: "Calm, compliant patient communication | Smartytel" },
      { name: "description", content: "Appointment reminders, triage menus and private lines for clinicians, with recordings locked down." },
      { property: "og:title", content: "Calm, compliant patient communication | Smartytel" },
      { property: "og:description", content: "Appointment reminders, triage menus and private lines for clinicians, with recordings locked down." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <MarketingPage content={content} slug="solutions/healthcare" />,
});
