import { defineConfig, devices } from "@playwright/test";

const PORT = Number(process.env["PW_PORT"] ?? 4180);
const ROOT = process.env["PW_STATIC_ROOT"] ?? "dist/client";
const baseURL = process.env["PW_BASE_URL"] ?? `http://127.0.0.1:${PORT}`;

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 60_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  forbidOnly: !!process.env["CI"],
  retries: process.env["CI"] ? 1 : 0,
  reporter: process.env["CI"] ? [["list"], ["html", { open: "never" }]] : [["list"]],
  use: {
    baseURL,
    viewport: { width: 1280, height: 900 },
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 5"] } },
  ],
  // Serve the built static artifact; skipped when PW_BASE_URL points elsewhere.
  ...(process.env["PW_BASE_URL"]
    ? {}
    : {
        webServer: {
          command: `python3 -m http.server ${PORT} --bind 127.0.0.1 --directory ${ROOT}`,
          url: baseURL,
          reuseExistingServer: !process.env["CI"],
          timeout: 60_000,
        },
      }),
});
