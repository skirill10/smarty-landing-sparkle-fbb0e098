import type { GlobalConfig } from "payload";
import { triggerRebuild } from "../hooks/triggerRebuild";

/**
 * Field names mirror the shapes used by src/routes/index.tsx so the frontend can
 * overlay CMS copy on top of the bundled defaults without any mapping layer.
 * Images stay in the repo; the CMS owns the words.
 */
export const HomePage: GlobalConfig = {
  slug: "home",
  label: "Home page",
  admin: { group: "Global" },
  access: { read: () => true },
  hooks: { afterChange: [triggerRebuild] },
  fields: [
    {
      name: "hero",
      type: "group",
      fields: [
        { name: "rating", type: "text" },
        { name: "reviews", type: "text" },
        { name: "headline", type: "text" },
        { name: "sub", type: "textarea" },
        { name: "primaryCta", type: "text" },
        { name: "secondaryCta", type: "text" },
        { name: "platforms", type: "text" },
      ],
    },
    {
      name: "logos",
      type: "group",
      fields: [
        { name: "heading", type: "text" },
        { name: "items", type: "array", fields: [{ name: "value", type: "text", required: true }] },
      ],
    },
    {
      name: "featureGroups",
      label: "Feature groups",
      type: "array",
      fields: [
        { name: "heading", type: "text", required: true },
        {
          name: "cards",
          type: "array",
          fields: [
            { name: "title", type: "text", required: true },
            { name: "body", type: "textarea" },
          ],
        },
      ],
    },
    {
      name: "showcase",
      type: "group",
      fields: [
        { name: "heading", type: "text" },
        {
          name: "items",
          type: "array",
          fields: [
            { name: "title", type: "text", required: true },
            { name: "link", type: "text" },
          ],
        },
      ],
    },
    {
      name: "stories",
      type: "group",
      fields: [
        { name: "heading", type: "text" },
        { name: "sub", type: "textarea" },
        {
          name: "items",
          type: "array",
          fields: [
            { name: "business", type: "text", required: true },
            { name: "person", type: "text" },
            { name: "role", type: "text" },
            { name: "quote", type: "textarea" },
            { name: "stat", type: "text" },
            { name: "statLabel", type: "text" },
          ],
        },
      ],
    },
    {
      name: "builtFor",
      label: "Built for section",
      type: "group",
      fields: [
        { name: "heading", type: "text" },
        {
          name: "items",
          type: "array",
          admin: { description: "Matched to the bundled tiles in order; images stay in code." },
          fields: [{ name: "label", type: "text" }],
        },
      ],
    },
    {
      name: "plans",
      label: "Plan teasers",
      type: "array",
      fields: [
        { name: "name", type: "text", required: true },
        { name: "price", type: "text" },
        { name: "unit", type: "text" },
        { name: "tagline", type: "textarea" },
        { name: "perks", type: "array", fields: [{ name: "value", type: "text", required: true }] },
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
