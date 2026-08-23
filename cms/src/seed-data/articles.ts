import { richText } from "./richText";

/**
 * One placeholder post so /blog and /blog/$slug render end-to-end.
 * Replace or add more through the Payload admin — this collection has no
 * bundled fallback, unlike marketing-pages.
 */
export const placeholderArticle = {
  slug: "welcome-to-the-smartytel-blog",
  status: "published" as const,
  publishedDate: new Date().toISOString(),
  author: "Smartytel Team",
  title: "Welcome to the Smartytel blog",
  excerpt: "Notes on phones, teams and customer conversation — starting here.",
  body: richText(
    "We're using this space for practical writing on call handling, AI answering, coverage in Europe and getting more out of your phone system. Check back soon for more.",
  ),
  metaTitle: "Welcome to the Smartytel blog",
  metaDescription: "Notes on phones, teams and customer conversation — starting here.",
};
