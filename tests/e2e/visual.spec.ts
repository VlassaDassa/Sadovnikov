import { expect, test } from "@playwright/test";

test("matches login", async ({ page }) => {
    await page.goto("/login", {
        waitUntil: "networkidle",
    });

    await expect(page).toHaveScreenshot("login.png", {
        fullPage: true,
        animations: "disabled",
        maxDiffPixelRatio: 0.01,
    });
});
