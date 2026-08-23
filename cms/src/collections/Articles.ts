import type { CollectionConfig } from "payload";
import { triggerRebuild } from "../hooks/triggerRebuild";

/**
 * Blog / editorial articles for /blog and /blog/$slug.
 *
 * Unlike marketing-pages and legal-documents, there is no bundled fallback
 * copy for articles — this collection is the sole source, so `status` gates
 * what the frontend lists and renders.
 */
export const Articles: CollectionConfig = {
  slug: "articles",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "status", "publishedDate"],
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
        description: "Route slug: /blog/<slug>",
      },
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "draft",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
      ],
      admin: { position: "sidebar" },
    },
    { name: "publishedDate", type: "date", admin: { position: "sidebar" } },
    { name: "author", type: "text" },
    { name: "title", type: "text", required: true },
    { name: "excerpt", type: "textarea", required: true },
    { name: "coverImage", type: "upload", relationTo: "media" },
    { name: "body", type: "richText" },
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
