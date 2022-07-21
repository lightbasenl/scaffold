import { test, expect } from "@playwright/test";

test("API route", async ({ page }) => {
  await page.goto("/robots.txt");
  await expect(await page.content()).toContain("Disallow");

  await page.goto("/api/_health");
});
