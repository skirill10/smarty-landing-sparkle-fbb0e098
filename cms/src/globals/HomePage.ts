import type { GlobalConfig } from "payload";
import { triggerRebuild } from "../hooks/triggerRebuild";

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
        { name: "eyebrow", type: "text" },
        { name: "headline", type: "text" },
        { name: "sub", type: "textarea" },
        { name: "primaryCtaLabel", type: "text" },
        { name: "secondaryCtaLabel", type: "text" },
        { name: "image", type: "upload", relationTo: "media" },
      ],
    },
    {
      name: "features",
      label: "Feature cards",
      type: "array",
      fields: [
        { name: "title", type: "text", required: true },
        { name: "body", type: "textarea" },
        {
          name: "icon",
          type: "select",
          options: [
            "phone",
            "phoneForwarded",
            "filter",
            "messageSquare",
            "bot",
            "barChart",
            "users",
            "plug",
          ].map((value) => ({ label: value, value })),
        },
        { name: "image", type: "upload", relationTo: "media" },
        { name: "alt", type: "text" },
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
            { name: "image", type: "upload", relationTo: "media" },
            { name: "alt", type: "text" },
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
            { name: "company", type: "text", required: true },
            { name: "industry", type: "text" },
            { name: "quote", type: "textarea" },
            { name: "person", type: "text" },
            { name: "role", type: "text" },
            { name: "metric", type: "text" },
            { name: "image", type: "upload", relationTo: "media" },
            { name: "alt", type: "text" },
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
          fields: [
            { name: "label", type: "text", required: true },
            { name: "image", type: "upload", relationTo: "media" },
            { name: "alt", type: "text" },
          ],
        },
      ],
    },
    {
      name: "integrations",
      type: "group",
      fields: [
        { name: "eyebrow", type: "text" },
        { name: "heading", type: "text" },
        { name: "sub", type: "textarea" },
        { name: "footnote", type: "textarea" },
      ],
    },
    {
      name: "cta",
      label: "CTA band",
      type: "group",
      fields: [
        { name: "eyebrow", type: "text" },
        { name: "headline", type: "text" },
        { name: "sub", type: "textarea" },
        { name: "primaryCtaLabel", type: "text" },
        { name: "secondaryCtaLabel", type: "text" },
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
