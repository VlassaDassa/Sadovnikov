import { expect, test } from "@playwright/test";

test("validates the contact form in the browser", async ({ page }) => {
    await page.goto("/");

    const contacts = page.locator("#contacts");
    const name = contacts.locator('input[name="name"]');
    const email = contacts.locator('input[name="email"]');
    const message = contacts.locator('textarea[name="message"]');
    const send = contacts.getByRole("button");

    await expect(send).toHaveAttribute("aria-disabled", "true");

    await name.fill("J");
    await email.fill("invalid");
    await message.fill("short");

    await expect(contacts.getByText(/name/i)).toBeVisible();

    await expect(contacts.getByText(/email/i)).toBeVisible();

    await expect(contacts.getByText(/between 10 and 300/i)).toBeVisible();
});

test("enables sending only for the server contract", async ({ page }) => {
    await page.goto("/");

    const contacts = page.locator("#contacts");
    const name = contacts.locator('input[name="name"]');
    const email = contacts.locator('input[name="email"]');
    const message = contacts.locator('textarea[name="message"]');
    const send = contacts.getByRole("button");

    await name.fill("J");
    await email.fill("john@example.com");
    await message.fill("A valid message body.");

    await expect(send).toHaveAttribute("aria-disabled", "true");
    await name.fill("John");
    await expect(send).toHaveAttribute("aria-disabled", "false");
});
