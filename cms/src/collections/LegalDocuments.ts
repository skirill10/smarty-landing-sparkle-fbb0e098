import type { CollectionConfig } from "payload";
import { triggerRebuild } from "../hooks/triggerRebuild";

/**
 * Legal pages (privacy, terms, refund, connectivity, usage).
 *
 * The slug must match the route: /privacy -> "privacy". Anything left blank
 * keeps the copy bundled in the repo, so a page can never render empty.
 */
export const LegalDocuments: CollectionConfig = {
  slug: "legal-documents",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "updated"],
    group: "Pages",
  },
  access: { read: () => true },
  hooks: { afterChange: [triggerRebuild] },
  fields: [
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        position: "sidebar",
        description: "Route slug without slashes: privacy, terms, refund, connectivity, usage.",
      },
    },
    { name: "eyebrow", type: "text", defaultValue: "Legal" },
    { name: "title", type: "text", required: true },
    { name: "updated", type: "text", admin: { description: "e.g. Effective date: 7 August 2026" } },
    {
      name: "intro",
      type: "array",
      fields: [{ name: "value", type: "textarea", required: true }],
    },
    {
      name: "sections",
      type: "array",
      admin: { description: "Matched to the bundled sections in order." },
      fields: [
        { name: "heading", type: "text" },
        { name: "paragraphs", type: "array", fields: [{ name: "value", type: "textarea" }] },
        {
          name: "items",
          type: "array",
          fields: [
            { name: "term", type: "text" },
            { name: "body", type: "textarea" },
          ],
        },
      ],
    },
    { name: "footer", type: "array", fields: [{ name: "value", type: "textarea" }] },
    {
      type: "collapsible",
      label: "SEO",
      fields: [
        { name: "metaTitle", type: "text" },
        { name: "metaDescription", type: "textarea" },
      ],
    },
  ],
};
