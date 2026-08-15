import { expect, test } from "@playwright/test";

test("redirects an anonymous visitor from admin to login", async ({ page }) => {
    await page.goto("/admin");

    await expect(page).toHaveURL(/\/login(?:\/)?$/);

    await expect(page.locator('input[name="email"]')).toBeVisible();

    await expect(page.locator('input[name="password"]')).toBeVisible();
});

test("shows one generic error for invalid credentials", async ({ page }) => {
    await page.goto("/login");

    await page.locator('input[name="email"]').fill("wrong@example.com");
    await page.locator('input[name="password"]').fill("wrongpassword");
    await page.locator('button[type="submit"]').click();

    const errorElement = page.locator('[role="error"], .error, p.error');

    await expect(errorElement).toBeVisible({ timeout: 10000 });

    const text = await errorElement.textContent();
    expect(text?.trim().length).toBeGreaterThan(0);

    await expect(page).toHaveURL(/\/login(?:\/)?$/);
});
