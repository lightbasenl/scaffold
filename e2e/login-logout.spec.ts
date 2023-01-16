import { test, expect } from "@playwright/test";

test("login -> logout", async ({ page }) => {
  await page.goto("/private");
  await expect(page).toHaveTitle("Scaffold");
  await expect(page).toHaveURL("/");

  await page.goto("/nl");
  await expect(page).toHaveTitle("Scaffold");
  await expect(page).toHaveURL("/nl");

  // TODO: test login / logout
});
