import { expect, test } from "@playwright/test";

for (const [name, route] of [
  ["home-en", "/"],
  ["home-ru", "/ru"],
  ["login", "/login"],
] as const) {
  test(`matches ${name}`, async ({ page }) => {
    await page.goto(route, {
      waitUntil: "networkidle",
    });

    await page.addStyleTag({
      content: [
        "*",
        "*::before",
        "*::after",
        "{",
        "animation-duration: 0s !important;",
        "transition-duration: 0s !important;",
        "caret-color: transparent !important;",
        "}",
      ].join(""),
    });

    await page.evaluate(async () => {
      await document.fonts.ready;

      const images = Array.from(document.images);

      await Promise.all(
        images.map((image) => {
          if (image.complete) {
            return Promise.resolve();
          }

          return new Promise<void>((resolve) => {
            image.addEventListener("load", () => resolve(), {
              once: true,
            });
            image.addEventListener("error", () => resolve(), {
              once: true,
            });
          });
        }),
      );
    });

    await expect(page).toHaveScreenshot(`${name}.png`, {
      fullPage: true,
      animations: "disabled",
      maxDiffPixelRatio: 0.01,
    });
  });
}
