# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: visual.spec.ts >> matches login
- Location: tests\e2e\visual.spec.ts:3:1

# Error details

```
Error: expect(page).toHaveScreenshot(expected) failed

Timeout: 5000ms
  Timeout 5000ms exceeded.

  Snapshot: login.png

Call log:
  - Expect "toHaveScreenshot(login.png)" with timeout 5000ms
    - generating new stable screenshot expectation
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - Timeout 5000ms exceeded.

```

# Test source

```ts
  1  | import { expect, test } from "@playwright/test";
  2  | 
  3  | test("matches login", async ({ page }) => {
  4  |     await page.goto("/login", {
  5  |         waitUntil: "networkidle",
  6  |     });
  7  | 
> 8  |     await expect(page).toHaveScreenshot("login.png", {
     |                        ^ Error: expect(page).toHaveScreenshot(expected) failed
  9  |         fullPage: true,
  10 |         animations: "disabled",
  11 |         maxDiffPixelRatio: 0.01,
  12 |     });
  13 | });
  14 | 
```