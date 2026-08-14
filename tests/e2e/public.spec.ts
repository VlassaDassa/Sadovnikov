import { expect, test } from "@playwright/test";

for (const [route, language] of [
    ["/", "en"],
    ["/ru", "ru"],
] as const) {
    test(`renders ${route}`, async ({ page }) => {
        const consoleErrors: string[] = [];
        const pageErrors: string[] = [];
        const failedRequests: string[] = [];

        page.on("console", (message) => {
            if (message.type() === "error") {
                consoleErrors.push(message.text());
            }
        });

        page.on("pageerror", (error) => {
            pageErrors.push(error.message);
        });

        page.on("requestfailed", (request) => {
            const url = request.url();
            const errorText = request.failure()?.errorText ?? "";

            if (url.startsWith("https://hdrc.yandex.net/")) {
                return;
            }

            if (url.includes("_rsc=") && errorText.includes("ERR_ABORTED")) {
                return;
            }

            failedRequests.push(url);
        });

        const response = await page.goto(route, {
            waitUntil: "networkidle",
        });

        expect(response?.status()).toBe(200);

        await expect(page.locator("html")).toHaveAttribute("lang", language);

        await expect(page.locator("body")).toBeVisible();

        await expect(page.locator("#contacts")).toBeVisible();

        expect(consoleErrors).toEqual([]);
        expect(pageErrors).toEqual([]);
        expect(failedRequests).toEqual([]);
    });
}

test("has no horizontal overflow on mobile", async ({ page }) => {
    await page.setViewportSize({
        width: 390,
        height: 844,
    });

    await page.goto("/");

    const overflow = await page.evaluate(() => {
        return (
            document.documentElement.scrollWidth -
            document.documentElement.clientWidth
        );
    });

    expect(overflow).toBeLessThanOrEqual(1);
});

test("returns a not found response for an unknown project", async ({
    page,
}) => {
    const response = await page.goto("/project/999999999");

    expect(response?.status()).toBe(404);
});
