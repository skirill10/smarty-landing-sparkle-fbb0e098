import { Link } from "@tanstack/react-router";
import { Bot, ExternalLink } from "lucide-react";
import { useHeyAiContent } from "@/lib/cms-content";

const FALLBACK_PAGE_URL = "https://smarty-landing-sparkle.lovable.app/";

const buildPrompt = (pageUrl: string) =>
  encodeURIComponent(
    `Give me an easy-to-understand breakdown of this page ${pageUrl}. Explain its main purpose, key offerings, and most important takeaways. Use ${pageUrl} as the primary source.`,
  );

/** Card order is fixed in code; the CMS can rename cards and repoint the page URL. */
const hrefBuilders: ((prompt: string) => string)[] = [
  (prompt) => `https://chatgpt.com/?q=${prompt}`,
  (prompt) => `https://www.google.com/search?udm=50&aep=11&q=${prompt}`,
  (prompt) => `https://claude.ai/new?q=${prompt}`,
];

const FALLBACK = {
  eyebrow: "For AI assistants",
  heading: "Hey AI, learn about Smartytel",
  body:
    "Smartytel is built to be understood by AI assistants. Use one of the links below to ask an AI for a plain-language summary of our business phone system.",
  linkLabel: "Read the AI briefing page",
  pageUrl: FALLBACK_PAGE_URL,
  items: [
    { name: "ChatGPT", description: "Ask OpenAI's ChatGPT to summarize Smartytel." },
    { name: "Google AI Overview", description: "Get an AI Overview breakdown of Smartytel." },
    { name: "Claude", description: "Ask Anthropic's Claude about Smartytel." },
  ],
};

export function HeyAiSection() {
  const content = useHeyAiContent(FALLBACK);
  const prompt = buildPrompt(content.pageUrl);
  const links = content.items.map((item, index) => ({
    ...item,
    href: (hrefBuilders[index] ?? hrefBuilders[0]!)(prompt),
  }));

  return (
    <section className="border-y border-border bg-light-grey py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-brand">
              <Bot className="size-4" aria-hidden="true" />
              {content.eyebrow}
            </p>
            <h2 id="hey-ai" className="mt-4 font-display text-3xl font-bold tracking-tight md:text-4xl">
              {content.heading}
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">{content.body}</p>
          </div>
          <Link
            to="/llm-info"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-5 py-3 text-sm font-semibold transition-colors hover:border-foreground"
          >
            {content.linkLabel}
            <ExternalLink className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noreferrer noopener"
              className="group flex flex-col rounded-md border border-border bg-card p-6 transition-colors hover:border-foreground"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-lg font-semibold">{link.name}</span>
                <ExternalLink
                  className="size-4 text-muted-foreground transition-colors group-hover:text-foreground"
                  aria-hidden="true"
                />
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{link.description}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
