import type { CollectionConfig } from "payload";

/** CMS editors. Only authenticated users can write content. */
export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: { useAsTitle: "email", group: "Admin" },
  fields: [{ name: "name", type: "text" }],
};
