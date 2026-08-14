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

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - link "Логотип" [ref=e3]:
      - /url: /
      - img "Logo" [ref=e4]
      - paragraph [ref=e5]: SADOVNIKOV
    - button "Открыть меню" [ref=e6] [cursor=pointer]
  - main [ref=e10]:
    - generic [ref=e12]:
      - generic [ref=e13]:
        - generic [ref=e14]:
          - generic [ref=e15]: Email
          - textbox "Email" [ref=e16]
        - generic [ref=e17]:
          - generic [ref=e18]: Password
          - textbox "Password" [ref=e19]
      - button [ref=e20] [cursor=pointer]:
        - paragraph [ref=e21]: Sign in
  - contentinfo [ref=e22]:
    - generic [ref=e23]:
      - paragraph [ref=e28]: vlad.sad28@yandex.ru
      - link [ref=e29]:
        - /url: https://t.me/VlassaDassa
        - paragraph [ref=e33]: "@VlassaDassa"
      - paragraph [ref=e38]: +7 (900) 015-81-16
  - alert [ref=e39]
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