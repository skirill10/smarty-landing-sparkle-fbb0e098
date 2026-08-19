import type { CollectionConfig } from "payload";
import { triggerRebuild } from "../hooks/triggerRebuild";

/** Logos shown in the "Plays nicely with the tools you already run on" grid. */
export const Integrations: CollectionConfig = {
  slug: "integrations",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "iconSlug", "category", "order"],
    group: "Content",
  },
  defaultSort: "order",
  access: { read: () => true },
  hooks: { afterChange: [triggerRebuild] },
  fields: [
    { name: "name", type: "text", required: true },
    {
      name: "iconSlug",
      type: "text",
      admin: {
        description:
          'simple-icons slug, e.g. "hubspot" or "googlecalendar". Leave empty and upload a logo instead.',
      },
    },
    { name: "logo", type: "upload", relationTo: "media" },
    {
      name: "category",
      type: "select",
      defaultValue: "other",
      options: [
        { label: "CRM", value: "crm" },
        { label: "Automation", value: "automation" },
        { label: "Productivity", value: "productivity" },
        { label: "Support", value: "support" },
        { label: "Commerce", value: "commerce" },
        { label: "Finance", value: "finance" },
        { label: "Messaging", value: "messaging" },
        { label: "Other", value: "other" },
      ],
    },
    { name: "order", type: "number", defaultValue: 0, admin: { position: "sidebar" } },
  ],
};
