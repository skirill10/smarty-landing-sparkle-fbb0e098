import type { GlobalConfig } from "payload";
import { triggerRebuild } from "../hooks/triggerRebuild";

/** Hero + contact channel cards for the /contact page. Icons stay in code. */
export const ContactPage: GlobalConfig = {
  slug: "contact-page",
  label: "Contact page",
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
      ],
    },
    {
      name: "channels",
      type: "array",
      admin: {
        description: "Matched to the bundled cards in order; blank fields keep the built-in copy.",
      },
      fields: [
        { name: "title", type: "text" },
        { name: "body", type: "textarea" },
        { name: "cta", type: "text" },
        { name: "to", label: "Internal path (e.g. /pricing)", type: "text" },
        { name: "href", label: "External / mailto URL", type: "text" },
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
