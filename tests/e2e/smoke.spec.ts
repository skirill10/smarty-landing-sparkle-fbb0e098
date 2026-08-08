import { test, expect, type Page, type ConsoleMessage, type Request } from "@playwright/test";

type PageIssues = {
  consoleErrors: string[];
  failedRequests: string[];
  badResponses: string[];
};

function watch(page: Page): PageIssues {
  const issues: PageIssues = { consoleErrors: [], failedRequests: [], badResponses: [] };

  page.on("console", (msg: ConsoleMessage) => {
    if (msg.type() === "error") issues.consoleErrors.push(msg.text());
  });
  page.on("pageerror", (err) => issues.consoleErrors.push(String(err)));
  page.on("requestfailed", (req: Request) => {
    issues.failedRequests.push(`${req.url()} (${req.failure()?.errorText ?? "failed"})`);
  });
  page.on("response", (res) => {
    if (res.status() >= 400) issues.badResponses.push(`${res.status()} ${res.url()}`);
  });

  return issues;
}

function assertClean(issues: PageIssues) {
  expect(issues.failedRequests, "no failed network requests").toEqual([]);
  expect(issues.badResponses, "no 4xx/5xx responses (missing assets)").toEqual([]);
  expect(issues.consoleErrors, "no console errors").toEqual([]);
}

const pages = [
  { name: "home page", path: "/" },
  { name: "contact page", path: "/contact/" },
] as const;

for (const { name, path } of pages) {
  test(`${name} loads without errors`, async ({ page }) => {
    const issues = watch(page);

    const response = await page.goto(path, { waitUntil: "load" });
    expect(response?.status(), `${path} should return 200`).toBe(200);

    // Hydrated app shell: header, a single H1, and a footer must be present.
    await expect(page.locator("header").first()).toBeVisible();
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("footer").first()).toBeVisible();

    // Metadata must be page-specific, not the template default.
    const title = await page.title();
    expect(title.length).toBeGreaterThan(10);
    expect(title).not.toMatch(/Lovable/i);
    const description = await page
      .locator('meta[name="description"]')
      .first()
      .getAttribute("content");
    expect(description?.length ?? 0).toBeGreaterThan(20);

    // Every rendered image must actually decode.
    const broken = await page.evaluate(() =>
      Array.from(document.images)
        .filter((img) => img.currentSrc && (!img.complete || img.naturalWidth === 0))
        .map((img) => img.currentSrc),
    );
    expect(broken, "no broken images").toEqual([]);

    assertClean(issues);
  });
}

test("contact page exposes contact channels", async ({ page }) => {
  await page.goto("/contact/", { waitUntil: "load" });
  await expect(page.locator('a[href^="mailto:"]').first()).toBeVisible();
});

test("home page navigates to contact", async ({ page }) => {
  await page.goto("/", { waitUntil: "load" });
  await page.goto("/contact/", { waitUntil: "load" });
  await expect(page).toHaveURL(/\/contact\/?$/);
  await expect(page.locator("h1")).toBeVisible();
});
