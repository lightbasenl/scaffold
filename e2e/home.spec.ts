import { test, expect } from "@playwright/test";

test("should be able to show the default homepage", async ({ page, context }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Scaffold/);
});
