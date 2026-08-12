import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

for (const route of ["/", "/ru", "/login"]) {
  test(`has no automatic accessibility violations on ${route}`, async ({
    page,
  }) => {
    await page.goto(route);

    const result = await new AxeBuilder({
      page,
    })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    expect(result.violations).toEqual([]);
  });
}

test("supports keyboard navigation through the contact form", async ({
  page,
}) => {
  await page.goto("/#contacts");

  await page.locator('input[name="name"]').focus();

  await expect(page.locator('input[name="name"]')).toBeFocused();

  await page.keyboard.press("Tab");

  await expect(page.locator('input[name="email"]')).toBeFocused();

  await page.keyboard.press("Tab");

  await expect(page.locator('textarea[name="message"]')).toBeFocused();
});
