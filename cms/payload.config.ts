import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import sharp from "sharp";

import { MarketingPages } from "./src/collections/MarketingPages";
import { Integrations } from "./src/collections/Integrations";
import { Media } from "./src/collections/Media";
import { Users } from "./src/collections/Users";
import { SiteSettings } from "./src/globals/SiteSettings";
import { HomePage } from "./src/globals/HomePage";
import { Pricing } from "./src/globals/Pricing";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const origins = (process.env.ALLOWED_ORIGINS ?? "https://smarty.tel,http://localhost:8080")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: { titleSuffix: " · Smartytel CMS" },
  },
  editor: lexicalEditor(),
  collections: [MarketingPages, Integrations, Media, Users],
  globals: [SiteSettings, HomePage, Pricing],
  secret: process.env.PAYLOAD_SECRET ?? "",
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URI ?? "" },
  }),
  // The frontend reads published content anonymously; drafts stay behind auth.
  cors: origins,
  csrf: origins,
  upload: { limits: { fileSize: 10_000_000 } },
  typescript: { outputFile: path.resolve(dirname, "src/payload-types.ts") },
  sharp,
});
