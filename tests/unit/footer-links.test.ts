import { describe, expect, test } from "bun:test";
import { mergeFooterLinks, isAvailableSocialDestination } from "../../src/lib/footer-links";

describe("footer destination records", () => {
  const fallback = [
    { label: "Downloads", to: "/downloads" },
    { label: "Demo", to: "/demo" },
    { label: "Status", to: "/status" },
  ];
  test("missing CMS entries do not shift or duplicate links", () => {
    expect(
      mergeFooterLinks(fallback, [
        { label: "Service status", to: "/status/" },
        { label: "Request a demo", to: "/demo" },
        { label: "Duplicate status", to: "https://smarty.tel/status" },
      ]),
    ).toEqual([
      fallback[0],
      { label: "Request a demo", to: "/demo" },
      { label: "Service status", to: "/status/" },
    ]);
  });
  test("complete extra links survive, incomplete records do not inherit unrelated destinations", () => {
    expect(
      mergeFooterLinks(fallback, [
        { label: "Incomplete" },
        { to: "/contact" },
        { label: "Contact", to: "/contact" },
      ]),
    ).toEqual([...fallback, { label: "Contact", to: "/contact" }]);
  });
  test("hide confirmed missing profiles but permit replacement URLs", () => {
    expect(isAvailableSocialDestination("https://x.com/smartytel/")).toBe(false);
    expect(isAvailableSocialDestination("https://www.youtube.com/@smartytel?view=home")).toBe(
      false,
    );
    expect(isAvailableSocialDestination("https://www.youtube.com/@confirmed-channel")).toBe(true);
    expect(isAvailableSocialDestination("https://www.linkedin.com/company/smartytel")).toBe(true);
  });
});
