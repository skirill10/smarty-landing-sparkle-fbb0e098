import type { CollectionConfig } from "payload";
import { triggerRebuild } from "../hooks/triggerRebuild";

/**
 * One document per marketing URL on smarty.tel.
 * `slug` matches the frontend path without the leading slash, e.g.
 * "calling" or "solutions/law-firms".
 */
export const MarketingPages: CollectionConfig = {
  slug: "marketing-pages",
  admin: {
    useAsTitle: "headline",
    defaultColumns: ["slug", "headline", "updatedAt"],
    group: "Content",
  },
  access: { read: () => true },
  hooks: { afterChange: [triggerRebuild] },
  fields: [
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: { description: 'Path without the leading slash, e.g. "solutions/law-firms".' },
    },
    { name: "eyebrow", type: "text", required: true },
    { name: "headline", type: "text", required: true },
    { name: "sub", type: "textarea", required: true },
    {
      name: "bullets",
      type: "array",
      minRows: 1,
      labels: { singular: "Bullet", plural: "Bullets" },
      fields: [
        { name: "title", type: "text", required: true },
        { name: "body", type: "textarea", required: true },
      ],
    },
    {
      name: "proof",
      type: "array",
      labels: { singular: "Proof point", plural: "Proof points" },
      fields: [{ name: "value", type: "text", required: true }],
    },
    {
      type: "collapsible",
      label: "SEO",
      fields: [
        { name: "metaTitle", type: "text", required: true, maxLength: 65 },
        { name: "metaDescription", type: "textarea", required: true, maxLength: 165 },
      ],
    },
  ],
};
