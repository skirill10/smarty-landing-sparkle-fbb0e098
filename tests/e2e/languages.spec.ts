import { test, expect } from "@playwright/test";

const locales = ["en", "es", "nl", "fr", "de", "sv", "pl", "el", "uk", "ja", "zh", "tr", "ar"];

test("all language selections keep the current page, query and anchor", async ({ page }) => {
  await page.goto("/contact/?utm_source=locale-test#contact-form", { waitUntil: "load" });
  for (const locale of locales) {
    const selector = page.locator("footer select");
    await selector.selectOption(locale);
    await expect(selector).toHaveValue(locale);
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
    await expect(page.locator("html")).toHaveAttribute("dir", locale === "ar" ? "rtl" : "ltr");
    const url = new URL(page.url());
    expect(url.pathname.replace(/\/$/, "")).toBe(
      locale === "en" ? "/contact" : `/${locale}/contact`,
    );
    expect(url.searchParams.get("utm_source")).toBe("locale-test");
    expect(url.hash).toBe("#contact-form");
    if (locale !== "en") {
      await expect(
        page.locator("header").getByRole("link", { name: "Join free beta", exact: true }),
      ).toHaveCount(0);
    }
  }
});

test("keyboard users can skip navigation and reduced motion is respected", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/contact/", { waitUntil: "load" });
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to main content", exact: true });
  await expect(skip).toBeFocused();
  await expect(skip).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
  await expect(page.locator("main")).toHaveCount(1);
  const duration = await page
    .locator("header a")
    .first()
    .evaluate((element) => getComputedStyle(element).transitionDuration);
  expect(parseFloat(duration)).toBeLessThan(0.001);
});
