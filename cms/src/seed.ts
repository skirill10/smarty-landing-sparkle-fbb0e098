import { getPayload } from "payload";
import config from "../payload.config";
import { pages } from "./seed-data/pages";
import { integrations } from "./seed-data/integrations";
import { siteSettings } from "./seed-data/site-settings";
import { homePage } from "./seed-data/home";
import { pricingPage } from "./seed-data/pricing";
import { countries, faqs, rates, ratesPage } from "./seed-data/rates";
import { crmPage, llmInfoPage } from "./seed-data/extra-pages";
import { contactPage } from "./seed-data/contact";
import { forms } from "./seed-data/forms";
import { placeholderArticle } from "./seed-data/articles";

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

  for (const country of countries) {
    const existing = await payload.find({
      collection: "countries",
      where: { slug: { equals: country.slug } },
      limit: 1,
    });
    if (existing.docs[0]) {
      await payload.update({
        collection: "countries",
        id: existing.docs[0].id,
        data: country as never,
      });
    } else {
      await payload.create({ collection: "countries", data: country as never });
    }
  }
  console.log(`seeded ${countries.length} countries`);

  for (const { key, ...rate } of rates) {
    const existing = await payload.find({
      collection: "rates",
      where: {
        countryId: { equals: rate.countryId },
        destinationType: { equals: rate.destinationType },
        destinationLabel: { equals: rate.destinationLabel },
      },
      limit: 1,
    });
    if (existing.docs[0]) {
      await payload.update({ collection: "rates", id: existing.docs[0].id, data: rate as never });
    } else {
      await payload.create({ collection: "rates", data: rate as never });
    }
    void key;
  }
  console.log(`seeded ${rates.length} rates`);

  for (const faq of faqs) {
    const existing = await payload.find({
      collection: "faqs",
      where: { question: { equals: faq.question } },
      limit: 1,
    });
    if (existing.docs[0]) {
      await payload.update({ collection: "faqs", id: existing.docs[0].id, data: faq as never });
    } else {
      await payload.create({ collection: "faqs", data: faq as never });
    }
  }
  console.log(`seeded ${faqs.length} rates FAQs`);

  await payload.updateGlobal({ slug: "rates-page", data: ratesPage as never });
  await payload.updateGlobal({ slug: "crm-page", data: crmPage as never });
  await payload.updateGlobal({ slug: "llm-info-page", data: llmInfoPage as never });
  await payload.updateGlobal({ slug: "contact-page", data: contactPage as never });
  console.log("seeded rates, CRM and Hey AI page copy");

  for (const form of forms) {
    const existing = await payload.find({
      collection: "forms",
      where: { formType: { equals: form.formType } },
      limit: 1,
    });
    if (existing.docs[0]) {
      await payload.update({ collection: "forms", id: existing.docs[0].id, data: form as never });
    } else {
      await payload.create({ collection: "forms", data: form as never });
    }
  }
  console.log(`seeded ${forms.length} forms`);

  const existingArticle = await payload.find({
    collection: "articles",
    where: { slug: { equals: placeholderArticle.slug } },
    limit: 1,
  });
  if (existingArticle.docs[0]) {
    await payload.update({
      collection: "articles",
      id: existingArticle.docs[0].id,
      data: placeholderArticle as never,
    });
  } else {
    await payload.create({ collection: "articles", data: placeholderArticle as never });
  }
  console.log("seeded placeholder article");

  process.exit(0);
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
