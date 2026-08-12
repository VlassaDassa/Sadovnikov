import { expect, test } from "@playwright/test";

test("redirects an anonymous visitor from admin to login", async ({ page }) => {
  await page.goto("/admin");

  await expect(page).toHaveURL(/\/login(?:\/)?$/);

  await expect(page.locator('input[name="email"]')).toBeVisible();

  await expect(page.locator('input[name="password"]')).toBeVisible();
});

test("shows one generic error for invalid credentials", async ({ page }) => {
  await page.goto("/login");

  await page.locator('input[name="email"]').fill("user@example.com");

  await page.locator('input[name="password"]').fill("wrong-password");

  await page.locator('button[type="submit"]').click();

  await expect(page.getByText("Invalid credentials")).toBeVisible();

  await expect(page).toHaveURL(/\/login(?:\/)?$/);
});
