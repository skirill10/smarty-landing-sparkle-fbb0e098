import type { GlobalConfig } from "payload";
import { triggerRebuild } from "../hooks/triggerRebuild";

export const Pricing: GlobalConfig = {
  slug: "pricing",
  label: "Pricing page",
  admin: { group: "Global" },
  access: { read: () => true },
  hooks: { afterChange: [triggerRebuild] },
  fields: [
    { name: "eyebrow", type: "text" },
    { name: "heading", type: "text" },
    { name: "sub", type: "textarea" },
    {
      name: "plans",
      type: "array",
      fields: [
        { name: "name", type: "text", required: true },
        { name: "badge", type: "text" },
        { name: "priceMonthly", type: "text" },
        { name: "priceAnnual", type: "text" },
        { name: "priceNote", type: "text" },
        { name: "description", type: "textarea" },
        { name: "ctaLabel", type: "text" },
        { name: "highlight", type: "checkbox" },
        {
          name: "features",
          type: "array",
          fields: [{ name: "value", type: "text", required: true }],
        },
      ],
    },
    {
      name: "addons",
      label: "Add-on modules",
      type: "array",
      fields: [
        { name: "name", type: "text", required: true },
        { name: "price", type: "text" },
        { name: "unit", type: "text" },
        { name: "body", type: "textarea" },
      ],
    },
    {
      name: "comparison",
      label: "Comparison table",
      type: "array",
      fields: [
        { name: "group", type: "text" },
        {
          name: "rows",
          type: "array",
          fields: [
            { name: "label", type: "text", required: true },
            { name: "trial", type: "text" },
            { name: "startup", type: "text" },
            { name: "business", type: "text" },
            { name: "scale", type: "text" },
          ],
        },
      ],
    },
    {
      name: "faq",
      type: "array",
      fields: [
        { name: "question", type: "text", required: true },
        { name: "answer", type: "textarea", required: true },
      ],
    },
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
