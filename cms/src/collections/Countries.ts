import type { CollectionConfig } from "payload";
import { triggerRebuild } from "../hooks/triggerRebuild";

const regionOptions = [
  { label: "Europe", value: "europe" },
  { label: "North America", value: "north-america" },
  { label: "South America", value: "south-america" },
  { label: "Asia", value: "asia" },
  { label: "Africa", value: "africa" },
  { label: "Oceania", value: "oceania" },
];

/**
 * Destinations shown on /rates and /rates/$countrySlug.
 *
 * The frontend treats `slug` as the country identity, so rates reference a
 * country by slug ("germany"). Switching VITE_CONTENT_SOURCE between "local"
 * and "payload" therefore needs no data migration.
 */
export const Countries: CollectionConfig = {
  slug: "countries",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "iso2", "dialCode", "region", "featured", "active"],
    group: "Rates",
    defaultSort: "name",
  },
  access: { read: () => true },
  hooks: { afterChange: [triggerRebuild] },
  fields: [
    { name: "name", type: "text", required: true },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: { description: 'URL segment, e.g. "united-kingdom".' },
    },
    { name: "iso2", type: "text", required: true, maxLength: 2 },
    { name: "iso3", type: "text", maxLength: 3 },
    { name: "dialCode", type: "text", required: true, admin: { description: 'e.g. "+44".' } },
    { name: "region", type: "select", required: true, options: regionOptions },
    { name: "trunkPrefix", type: "text" },
    { name: "callingInstructions", type: "textarea" },
    { name: "shortDescription", type: "textarea" },
    {
      name: "seo",
      type: "group",
      fields: [
        { name: "metaTitle", type: "text" },
        { name: "metaDescription", type: "textarea" },
      ],
    },
    { name: "featured", type: "checkbox", defaultValue: false, admin: { position: "sidebar" } },
    { name: "active", type: "checkbox", defaultValue: true, admin: { position: "sidebar" } },
  ],
};
