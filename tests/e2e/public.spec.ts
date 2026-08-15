import { expect, test } from "@playwright/test";

for (const [route, language] of [
    ["/", "en"],
    ["/ru", "ru"],
] as const) {
    test(`renders ${route}`, async ({ page }) => {
        // Увеличиваем таймаут для медленных страниц
        test.slow();

        const consoleErrors: string[] = [];
        const pageErrors: string[] = [];
        const failedRequests: string[] = [];

        page.on("console", (message) => {
            if (message.type() === "error") {
                const text = message.text();
                // Игнорируем ошибки Яндекс.Метрики и cookie
                if (
                    !text.includes("metrika_enabled") &&
                    !text.includes("yandex") &&
                    !text.includes("hdrc.yandex.net") &&
                    !text.includes("XML Parsing Error")
                ) {
                    consoleErrors.push(text);
                }
            }
        });

        page.on("pageerror", (error) => {
            // Игнорируем ошибки от внешних скриптов
            if (!error.message.includes("yandex")) {
                pageErrors.push(error.message);
            }
        });

        page.on("requestfailed", (request) => {
            const url = request.url();
            const errorText = request.failure()?.errorText ?? "";

            // Игнорируем известные внешние запросы
            if (url.startsWith("https://hdrc.yandex.net/")) {
                return;
            }

            if (url.includes("_rsc=") && errorText.includes("ERR_ABORTED")) {
                return;
            }

            // Игнорируем все запросы к Яндекс.Метрике
            if (
                url.includes("yandex.ru") ||
                url.includes("mc.yandex") ||
                url.includes("yandex.net")
            ) {
                return;
            }

            failedRequests.push(url);
        });

        // Используем domcontentloaded вместо networkidle для ускорения
        const response = await page.goto(route, {
            waitUntil: "domcontentloaded",
            timeout: 45000, // Явный таймаут
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

    await page.goto("/", { waitUntil: "domcontentloaded" });

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
    const response = await page.goto("/project/999999999", {
        waitUntil: "domcontentloaded",
    });

    expect(response?.status()).toBe(404);
});
