import type { GlobalConfig } from "payload";
import { triggerRebuild } from "../hooks/triggerRebuild";

const linkFields = [
  { name: "label", type: "text" as const, required: true },
  { name: "to", type: "text" as const, required: true },
  { name: "description", type: "text" as const },
];

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site settings",
  admin: { group: "Global" },
  access: { read: () => true },
  hooks: { afterChange: [triggerRebuild] },
  fields: [
    { name: "brandName", type: "text", defaultValue: "Smartytel" },
    { name: "logo", type: "upload", relationTo: "media" },
    {
      name: "navGroups",
      label: "Header menus",
      type: "array",
      fields: [
        { name: "label", type: "text", required: true },
        { name: "to", type: "text" },
        { name: "links", type: "array", fields: linkFields },
      ],
    },
    {
      name: "footerColumns",
      type: "array",
      fields: [
        { name: "heading", type: "text", required: true },
        { name: "links", type: "array", fields: linkFields },
      ],
    },
    {
      name: "regions",
      label: "Coverage regions",
      type: "array",
      fields: [{ name: "value", type: "text", required: true }],
    },
    {
      name: "socials",
      type: "array",
      fields: [
        { name: "label", type: "text", required: true },
        { name: "url", type: "text", required: true },
      ],
    },
    { name: "footerNote", type: "textarea" },
    {
      name: "cta",
      label: "Closing CTA band",
      type: "group",
      fields: [
        { name: "eyebrow", type: "text" },
        { name: "title", type: "text" },
        { name: "subtitle", type: "textarea" },
        { name: "primaryLabel", type: "text" },
        { name: "secondaryLabel", type: "text" },
        {
          name: "proofPoints",
          type: "array",
          fields: [{ name: "value", type: "text", required: true }],
        },
      ],
    },
  ],
};
