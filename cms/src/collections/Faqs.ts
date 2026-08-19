import type { CollectionConfig } from "payload";
import { triggerRebuild } from "../hooks/triggerRebuild";

/** Rates FAQs: global entries (no country slug) plus per-country extras. */
export const Faqs: CollectionConfig = {
  slug: "faqs",
  admin: {
    useAsTitle: "question",
    defaultColumns: ["question", "countryId", "order"],
    group: "Rates",
  },
  defaultSort: "order",
  access: { read: () => true },
  hooks: { afterChange: [triggerRebuild] },
  fields: [
    { name: "question", type: "text", required: true },
    { name: "answer", type: "textarea", required: true },
    {
      name: "countryId",
      label: "Country slug (optional)",
      type: "text",
      admin: { description: "Leave empty to show on the main rates page." },
    },
    { name: "order", type: "number", defaultValue: 0, admin: { position: "sidebar" } },
  ],
};
