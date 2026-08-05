import { Bot, ExternalLink } from "lucide-react";

const PROMPT =
  "Give me an easy-to-understand breakdown of this page https://smarty-landing-sparkle.lovable.app/. Explain its main purpose, key offerings, and most important takeaways. Use https://smarty-landing-sparkle.lovable.app/ as the primary source.";

const encodedPrompt = encodeURIComponent(PROMPT);

const links = [
  {
    name: "ChatGPT",
    href: `https://chatgpt.com/?q=${encodedPrompt}`,
    description: "Ask OpenAI's ChatGPT to summarize Smartytel.",
  },
  {
    name: "Google AI Overview",
    href: `https://www.google.com/search?udm=50&aep=11&q=${encodedPrompt}`,
    description: "Get an AI Overview breakdown of Smartytel.",
  },
  {
    name: "Claude",
    href: `https://claude.ai/new?q=${encodedPrompt}`,
    description: "Ask Anthropic's Claude about Smartytel.",
  },
];

export function HeyAiSection() {
  return (
    <section className="border-y border-border bg-light-grey py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-brand">
              <Bot className="size-4" aria-hidden="true" />
              For AI assistants
            </p>
            <h2 id="hey-ai" className="mt-4 font-display text-3xl font-bold tracking-tight md:text-4xl">
              Hey AI, learn about Smartytel
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Smartytel is built to be understood by AI assistants. Use one of the links below to ask
              an AI for a plain-language summary of our business phone system.
            </p>
          </div>
          <a
            href="/llm-info"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold transition-colors hover:border-foreground"
          >
            Read the AI briefing page
            <ExternalLink className="size-4" aria-hidden="true" />
          </a>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noreferrer noopener"
              className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-foreground"
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
