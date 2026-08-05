import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  admin: { group: "Content" },
  access: { read: () => true },
  upload: {
    staticDir: "media",
    imageSizes: [
      { name: "thumbnail", width: 400 },
      { name: "card", width: 1024 },
      { name: "hero", width: 1920 },
    ],
    mimeTypes: ["image/*"],
  },
  fields: [{ name: "alt", type: "text", required: true }],
};
