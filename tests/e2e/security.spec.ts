import { expect, test } from "@playwright/test";

test("does not expose an admin page anonymously", async ({ page }) => {
  await page.goto("/admin");

  await expect(page).toHaveURL(/\/login(?:\/)?$/);
});

test("rejects upload path traversal", async ({ request }) => {
  for (const route of [
    "/uploads/portfolio/../package.json",
    "/uploads/portfolio/%2e%2e/package.json",
    "/uploads/portfolio/projects%5c1%5cfile.webp",
  ]) {
    const response = await request.get(route);

    expect(response.status()).not.toBe(200);
  }
});

test("does not return a stack trace on a missing page", async ({ request }) => {
  const response = await request.get("/missing-route-for-security-test");

  const body = await response.text();

  expect(response.status()).toBe(404);
  expect(body).not.toContain("node_modules");
  expect(body).not.toContain("PrismaClient");
  expect(body).not.toContain("DATABASE_URL");
});

test("sets basic response security headers", async ({ request }) => {
  const response = await request.get("/");

  expect(response.headers()["x-content-type-options"]).toBe("nosniff");

  expect(response.headers()["referrer-policy"]).toBeDefined();
});
