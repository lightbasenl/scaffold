import { test, expect } from "@playwright/test";

test("login -> logout", async ({ page }) => {
  await page.goto("/private");
  await expect(page).toHaveTitle("Scaffold");
  await expect(page).toHaveURL("/");

  await page.goto("/nl");
  await expect(page).toHaveTitle("Scaffold");
  await expect(page).toHaveURL("/nl");

  await page.click("data-test=index.login");
  await expect(page).toHaveTitle("Geheime pagina");
  await expect(page).toHaveURL("/nl/private");

  await page.click("data-test=private.index.logout");
  await expect(page).toHaveTitle("Scaffold");
  await expect(page).toHaveURL("/nl");
});
