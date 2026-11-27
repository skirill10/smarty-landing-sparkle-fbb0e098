import { test, expect } from "@playwright/test";

test("footer retains downloads and a single status link after CMS hydration", async ({ page }) => {
  await page.route("https://cms.smarty.tel/api/globals/site-settings?**", (route) =>
    route.fulfill({
      json: {
        footerColumns: [
          { heading: "Product", links: [] },
          { heading: "Solutions", links: [] },
          {
            heading: "Resources",
            links: [
              { label: "Blog", to: "/blog" },
              { label: "Guides", to: "/resources" },
              { label: "Developer docs", to: "/docs" },
              { label: "Number porting", to: "/port-your-number" },
              { label: "Customers", to: "/customers" },
              { label: "Product demo", to: "/demo" },
              { label: "Status", to: "/status" },
            ],
          },
        ],
        socials: [],
      },
      headers: { "Access-Control-Allow-Origin": "*" },
    }),
  );
  await page.goto("/contact/", { waitUntil: "networkidle" });
  const footer = page.getByRole("navigation", { name: "Footer", exact: true });
  await expect(footer.getByRole("link", { name: "Status", exact: true })).toHaveCount(1);
  await expect(footer.getByRole("link", { name: "Downloads", exact: true })).toHaveAttribute(
    "href",
    "/downloads",
  );
  await expect(footer.getByRole("link", { name: "Guides", exact: true })).toHaveAttribute(
    "href",
    "https://support.smarty.tel",
  );
  await expect(
    page.locator(
      'a[href="https://x.com/smartytel"], a[href="https://www.youtube.com/@smartytel"], a[href="https://www.linkedin.com/company/smartytel"], a[href="https://www.reddit.com/r/smartytel"], a[href="https://www.instagram.com/smartytel"]',
    ),
  ).toHaveCount(0);
  await footer.getByRole("link", { name: "Downloads", exact: true }).click();
  await expect(page).toHaveURL(/\/downloads\/?$/);
  await expect(page.locator("h1")).toBeVisible();
});
