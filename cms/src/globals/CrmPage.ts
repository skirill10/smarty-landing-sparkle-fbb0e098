import type { GlobalConfig } from "payload";
import { triggerRebuild } from "../hooks/triggerRebuild";

/** Hero + feature copy for the /crm page. Layout, icons and screenshots stay in code. */
export const CrmPage: GlobalConfig = {
  slug: "crm-page",
  label: "CRM page",
  admin: { group: "Pages" },
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
        { name: "primaryCta", type: "text" },
        { name: "secondaryCta", type: "text" },
      ],
    },
    {
      name: "features",
      type: "array",
      admin: { description: "Matched to the bundled cards in order; blank fields keep the built-in copy." },
      fields: [
        { name: "title", type: "text" },
        { name: "body", type: "textarea" },
      ],
    },
    {
      name: "seo",
      type: "group",
      fields: [
        { name: "metaTitle", type: "text" },
        { name: "metaDescription", type: "textarea" },
      ],
    },
  ],
};
