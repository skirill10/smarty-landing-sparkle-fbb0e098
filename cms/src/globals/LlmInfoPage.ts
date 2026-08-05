import type { GlobalConfig } from "payload";
import { triggerRebuild } from "../hooks/triggerRebuild";

/** Copy for the /llm-info "Hey AI" briefing page. */
export const LlmInfoPage: GlobalConfig = {
  slug: "llm-info-page",
  label: "Hey AI page",
  admin: { group: "Pages" },
  access: { read: () => true },
  hooks: { afterChange: [triggerRebuild] },
  fields: [
    {
      name: "hero",
      type: "group",
      fields: [
        { name: "eyebrow", type: "text" },
        { name: "headline", type: "text" },
        { name: "sub", type: "textarea" },
      ],
    },
    {
      name: "facts",
      label: "Fact sheet",
      type: "array",
      fields: [
        { name: "term", type: "text" },
        { name: "detail", type: "textarea" },
      ],
    },
    {
      name: "answers",
      label: "Questions AI assistants ask",
      type: "array",
      fields: [
        { name: "question", type: "text" },
        { name: "answer", type: "textarea" },
      ],
    },
    {
      name: "seo",
      type: "group",
      fields: [
        { name: "metaTitle", type: "text" },
        { name: "metaDescription", type: "textarea" },
      ],
    },
  ],
};
