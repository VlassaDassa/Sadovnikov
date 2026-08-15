import { expect, test } from "@playwright/test";

test("matches login", async ({ page }) => {
    await page.goto("/login", { waitUntil: "domcontentloaded" });

    await page.waitForFunction(() => document.fonts.ready);

    await page.waitForTimeout(1000);

    await expect(page).toHaveScreenshot("login.png", {
        fullPage: true,
        animations: "disabled",
        maxDiffPixelRatio: 0.02, // 2% отклонения допустимы
        timeout: 15000,
    });
});
