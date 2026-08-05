import { getPayload } from "payload";
import config from "../payload.config";
import { pages } from "./seed-data/pages";
import { integrations } from "./seed-data/integrations";
import { siteSettings } from "./seed-data/site-settings";
import { homePage } from "./seed-data/home";
import { pricingPage } from "./seed-data/pricing";

/**
 * Seeds the CMS with the copy that currently ships in the repo, so nothing is
 * lost when the frontend starts reading from Payload.
 *
 * Run once after the first deploy:  bun run seed  (or  npm run seed)
 */
const run = async () => {
  const payload = await getPayload({ config });

  for (const [slug, page] of Object.entries(pages)) {
    const existing = await payload.find({
      collection: "marketing-pages",
      where: { slug: { equals: slug } },
      limit: 1,
    });

    const data = { ...page, slug };

    if (existing.docs[0]) {
      await payload.update({
        collection: "marketing-pages",
        id: existing.docs[0].id,
        data,
      });
    } else {
      await payload.create({ collection: "marketing-pages", data });
    }
    console.log(`seeded page: ${slug}`);
  }

  for (const [index, integration] of integrations.entries()) {
    const existing = await payload.find({
      collection: "integrations",
      where: { name: { equals: integration.name } },
      limit: 1,
    });
    const data = { ...integration, order: index };
    if (existing.docs[0]) {
      await payload.update({ collection: "integrations", id: existing.docs[0].id, data });
    } else {
      await payload.create({ collection: "integrations", data });
    }
  }
  console.log(`seeded ${integrations.length} integrations`);

  await payload.updateGlobal({ slug: "site-settings", data: siteSettings });
  console.log("seeded site settings");

  await payload.updateGlobal({ slug: "home", data: homePage as never });
  console.log("seeded home page");

  await payload.updateGlobal({ slug: "pricing", data: pricingPage as never });
  console.log("seeded pricing page");

  process.exit(0);
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
