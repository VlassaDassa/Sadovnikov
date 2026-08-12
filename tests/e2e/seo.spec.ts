import { expect, test } from "@playwright/test";

for (const route of ["/", "/ru"]) {
  test(`has public metadata on ${route}`, async ({ page }) => {
    await page.goto(route);

    await expect(page).toHaveTitle(/.+/);

    const description = page.locator('meta[name="description"]');

    await expect(description).toHaveAttribute("content", /.+/);

    const canonical = page.locator('link[rel="canonical"]');

    await expect(canonical).toHaveCount(1);

    const openGraphTitle = page.locator('meta[property="og:title"]');

    await expect(openGraphTitle).toHaveAttribute("content", /.+/);
  });
}

test("exposes robots and sitemap endpoints", async ({ request }) => {
  const robots = await request.get("/robots.txt");
  const sitemap = await request.get("/sitemap.xml");

  expect(robots.status()).toBe(200);
  expect(sitemap.status()).toBe(200);
  expect(await robots.text()).toContain("Sitemap");
  expect(await sitemap.text()).toContain("<urlset");
});

test("keeps admin pages out of search results", async ({ page }) => {
  await page.goto("/admin");

  const robots = page.locator('meta[name="robots"]');

  await expect(robots).toHaveAttribute("content", /noindex/i);
});
