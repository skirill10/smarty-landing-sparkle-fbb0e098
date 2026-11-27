import { describe, expect, test } from "bun:test";
import { BETA_URL, LOGIN_URL, SUPPORT_URL, publicDestination } from "../../src/lib/public-access";

describe("public website journeys", () => {
  test("existing users and beta applicants have separate destinations", () => {
    for (const path of ["/login", "/de/login/"]) expect(publicDestination(path)).toBe(LOGIN_URL);
    for (const path of ["/signup", "/sign-up/", "/fr/register", "/ar/early-access/"])
      expect(publicDestination(path)).toBe(BETA_URL);
  });
  test("beta campaign attribution survives routing", () => {
    expect(publicDestination("/de/signup?utm_source=demo#join")).toBe(
      "/early-access/?utm_source=demo#join",
    );
  });
  test("help journeys lead to the working portal", () => {
    for (const path of ["/resources", "/tutorials/", "/de/academy"])
      expect(publicDestination(path)).toBe(SUPPORT_URL);
  });
  test("does not rewrite working pages, anchors or external links", () => {
    for (const path of [
      "/pricing#talk-to-sales",
      "/de/calling",
      "#features",
      "mailto:support@smarty.tel",
      "https://dev.smarty.tel/authentication",
    ])
      expect(publicDestination(path)).toBe(path);
  });
});
