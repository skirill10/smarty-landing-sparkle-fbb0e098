import type { GlobalConfig } from "payload";
import { triggerRebuild } from "../hooks/triggerRebuild";

/** Copy for the /rates directory page (hero, disclaimer, FAQ heading, CTA). */
export const RatesPage: GlobalConfig = {
  slug: "rates-page",
  label: "Rates page",
  admin: { group: "Rates" },
  access: { read: () => true },
  hooks: { afterChange: [triggerRebuild] },
  fields: [
    { name: "heroEyebrow", type: "text" },
    { name: "heroTitle", type: "text" },
    { name: "heroDescription", type: "textarea" },
    { name: "searchPlaceholder", type: "text" },
    { name: "disclaimerTitle", type: "text" },
    { name: "disclaimerBody", type: "textarea" },
    { name: "faqTitle", type: "text" },
    { name: "ctaTitle", type: "text" },
    { name: "ctaDescription", type: "textarea" },
    { name: "primaryCtaLabel", type: "text" },
    { name: "primaryCtaUrl", type: "text" },
    { name: "secondaryCtaLabel", type: "text" },
    { name: "secondaryCtaUrl", type: "text" },
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
