import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { formBuilderPlugin } from "@payloadcms/plugin-form-builder";
import sharp from "sharp";

import { MarketingPages } from "./src/collections/MarketingPages";
import { Integrations } from "./src/collections/Integrations";
import { Countries } from "./src/collections/Countries";
import { Rates } from "./src/collections/Rates";
import { Faqs } from "./src/collections/Faqs";
import { LegalDocuments } from "./src/collections/LegalDocuments";
import { Articles } from "./src/collections/Articles";
import { Media } from "./src/collections/Media";
import { Users } from "./src/collections/Users";
import { SiteSettings } from "./src/globals/SiteSettings";
import { HomePage } from "./src/globals/HomePage";
import { Pricing } from "./src/globals/Pricing";
import { RatesPage } from "./src/globals/RatesPage";
import { CrmPage } from "./src/globals/CrmPage";
import { ContactPage } from "./src/globals/ContactPage";
import { LlmInfoPage } from "./src/globals/LlmInfoPage";

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
  collections: [
    MarketingPages,
    Integrations,
    Countries,
    Rates,
    Faqs,
    LegalDocuments,
    Articles,
    Media,
    Users,
  ],
  globals: [SiteSettings, HomePage, Pricing, RatesPage, CrmPage, ContactPage, LlmInfoPage],
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
  plugins: [
    formBuilderPlugin({
      // Contact / demo-request forms only for now. Payment, upload, country,
      // state and date fields are unused on smarty.tel today; enable them if
      // a form genuinely needs them instead of turning every field on by default.
      fields: {
        text: true,
        textarea: true,
        select: true,
        email: true,
        checkbox: true,
        radio: true,
        payment: false,
        upload: false,
        country: false,
        state: false,
        date: false,
      },
      formOverrides: {
        admin: { group: "Forms" },
        fields: ({ defaultFields }) => [
          ...defaultFields,
          {
            name: "formType",
            type: "select",
            admin: {
              position: "sidebar",
              description: "Semantic tag for the frontend adapter and future form types.",
            },
            options: [
              { label: "Contact", value: "contact" },
              { label: "Demo request", value: "demo" },
            ],
          },
        ],
      },
      formSubmissionOverrides: {
        admin: { group: "Forms" },
      },
    }),
  ],
});
