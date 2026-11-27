import { expect, test, type Page, type Route } from "@playwright/test";

const cors = { "access-control-allow-origin": "*" };

const form = {
  id: "test-demo",
  title: "Test demo request",
  submitButtonLabel: "Request a demo",
  confirmationType: "message",
  fields: [
    { blockType: "text", name: "name", label: "Name", required: true },
    { blockType: "email", name: "email", label: "Work email", required: true },
    { blockType: "text", name: "company", label: "Company", defaultValue: "Example team" },
  ],
};

// Every CMS request is intercepted. These tests cannot send a live enquiry.
async function mockCms(page: Page, submit: (route: Route) => Promise<void>, unavailable = false) {
  let failLoad = unavailable;
  await page.route("https://cms.smarty.tel/api/**", async (route) => {
    const url = new URL(route.request().url());
    if (route.request().method() === "OPTIONS") {
      await route.fulfill({
        status: 204,
        headers: {
          "access-control-allow-origin": "*",
          "access-control-allow-headers": "content-type",
          "access-control-allow-methods": "GET,POST,OPTIONS",
        },
      });
    } else if (url.pathname === "/api/form-submissions") {
      await submit(route);
    } else if (url.pathname === "/api/forms") {
      if (failLoad) {
        failLoad = false;
        await route.fulfill({ headers: cors, status: 503 });
      } else await route.fulfill({ headers: cors, json: { docs: [form] } });
    } else {
      await route.fulfill({ headers: cors, json: {} });
    }
  });
}

async function fillEnquiry(page: Page) {
  await page.getByRole("textbox", { name: "Name", exact: true }).fill("Website test");
  await page.getByRole("textbox", { name: "Work email" }).fill("website-test@example.invalid");
}

test("CMS failure offers retry and loads defaults when recovered", async ({ page }) => {
  await mockCms(page, (route) => route.abort(), true);
  await page.goto("/pricing/#talk-to-sales");
  await expect(page.getByRole("alert")).toContainText("could not be loaded");
  await page.getByRole("button", { name: "Try again" }).click();
  await expect(page.getByRole("textbox", { name: "Company", exact: true })).toHaveValue(
    "Example team",
  );
});

test("required validation never sends an empty enquiry", async ({ page }) => {
  let submissions = 0;
  await mockCms(page, async (route) => {
    submissions++;
    await route.fulfill({ headers: cors, status: 500 });
  });
  await page.goto("/pricing/#talk-to-sales");
  await page.getByRole("textbox", { name: "Name", exact: true }).fill("   ");
  await page.getByRole("button", { name: "Request a demo", exact: true }).click();
  await expect(page.getByText("Required", { exact: true })).toBeVisible();
  expect(submissions).toBe(0);
  await expect(page.getByText("Thanks — we'll be in touch shortly.")).toHaveCount(0);
});

test("rejected request retains input and permits a successful retry", async ({ page }) => {
  let submissions = 0;
  await mockCms(page, async (route) => {
    submissions++;
    await route.fulfill({
      headers: cors,
      status: submissions === 1 ? 503 : 201,
      json: { doc: { id: "mock-submission" } },
    });
  });
  await page.goto("/pricing/#talk-to-sales");
  await fillEnquiry(page);
  await page.getByRole("button", { name: "Request a demo", exact: true }).click();
  await expect(page.getByRole("alert")).toContainText("Something went wrong");
  await expect(page.getByRole("textbox", { name: "Work email" })).toHaveValue(
    "website-test@example.invalid",
  );
  await expect(page.getByText("Thanks — we'll be in touch shortly.")).toHaveCount(0);
  await page.getByRole("button", { name: "Request a demo", exact: true }).click();
  await expect(page.getByRole("status")).toContainText("Thanks");
  expect(submissions).toBe(2);
});

test("pending submission disables repeat sends and only succeeds after acceptance", async ({
  page,
}) => {
  let submissions = 0;
  let release!: () => void;
  const gate = new Promise<void>((resolve) => {
    release = resolve;
  });
  await mockCms(page, async (route) => {
    submissions++;
    await gate;
    await route.fulfill({ headers: cors, status: 201, json: { doc: { id: "mock-submission" } } });
  });
  await page.goto("/pricing/#talk-to-sales");
  await fillEnquiry(page);
  const button = page.getByRole("button", { name: "Request a demo", exact: true });
  await button.click();
  await expect(button).toBeDisabled();
  await expect(page.getByText("Thanks — we'll be in touch shortly.")).toHaveCount(0);
  await expect.poll(() => submissions).toBe(1);
  release();
  await expect(page.getByRole("status")).toContainText("Thanks");
  expect(submissions).toBe(1);
});
