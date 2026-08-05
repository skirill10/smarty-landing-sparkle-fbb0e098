import type { GlobalConfig } from "payload";
import { triggerRebuild } from "../hooks/triggerRebuild";

/** Field names mirror src/routes/pricing.tsx so copy overlays cleanly. */
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
        { name: "monthly", type: "number" },
        { name: "annualMonthly", type: "number" },
        { name: "tagline", type: "textarea" },
        { name: "cta", type: "text" },
        { name: "featured", type: "checkbox" },
        { name: "perks", type: "array", fields: [{ name: "value", type: "text", required: true }] },
      ],
    },
    {
      name: "addOns",
      label: "Add-on modules",
      type: "array",
      fields: [
        { name: "name", type: "text", required: true },
        { name: "price", type: "text" },
        {
          name: "unit",
          type: "textarea",
          admin: { description: "First line is the billing unit; a second line shows as the note." },
        },
        { name: "note", type: "textarea" },
        { name: "linkLabel", type: "text" },
      ],
    },
    {
      name: "aiTiers",
      label: "AI call packages",
      type: "array",
      fields: [
        { name: "tier", type: "text", required: true },
        { name: "price", type: "text" },
        { name: "included", type: "text" },
        { name: "overage", type: "text" },
      ],
    },
    {
      name: "faqs",
      type: "array",
      fields: [
        { name: "question", type: "text", required: true },
        { name: "answer", type: "textarea", required: true },
      ],
    },
    {
      name: "cta",
      label: "Pricing CTA band",
      type: "group",
      fields: [
        { name: "title", type: "text" },
        { name: "primaryLabel", type: "text" },
        { name: "primaryUrl", type: "text" },
        { name: "secondaryLabel", type: "text" },
        { name: "secondaryUrl", type: "text" },
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
