import { test, expect } from "@playwright/test";

test("navigation supports keyboard entry, return and dismissal", async ({ page }, testInfo) => {
  await page.goto("/contact/", { waitUntil: "load" });
  if (testInfo.project.name === "mobile") {
    const toggle = page.getByRole("button", { name: "Toggle menu" });
    await toggle.press("Enter");
    const nav = page.getByRole("navigation", { name: "Mobile navigation" });
    await expect(nav).toBeVisible();
    await toggle.press("Tab");
    await expect(nav.getByRole("link", { name: "Pricing", exact: true })).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(toggle).toBeFocused();
    await expect(nav).toBeHidden();
    await toggle.press("Enter");
    await page.locator("h1").click();
    await expect(nav).toBeHidden();
    return;
  }
  const product = page.getByRole("button", { name: "Product", exact: true });
  const panel = page.getByRole("navigation", { name: "Product links" });
  await product.press("Enter");
  await expect(panel).toBeVisible();
  await product.press("Tab");
  await expect(panel.getByRole("link").first()).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(product).toBeFocused();
  await product.press("Tab");
  await page.keyboard.press("Escape");
  await expect(product).toBeFocused();
  await expect(panel).toBeHidden();
  await product.press("Enter");
  await panel.getByRole("link").last().focus();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("button", { name: "Solutions", exact: true })).toBeFocused();
  await expect(panel).toBeHidden();
  await product.press("Enter");
  await page.locator("h1").click();
  await expect(panel).toBeHidden();
  await product.press("Enter");
  await page.locator("footer a").first().focus();
  await expect(panel).toBeHidden();
});
