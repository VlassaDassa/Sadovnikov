# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: accessibility.spec.ts >> has no automatic accessibility violations on /login
- Location: tests\e2e\accessibility.spec.ts:5:5

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  -  1
+ Received  + 35

- Array []
+ Array [
+   Object {
+     "description": "Ensure that the page, or at least one of its frames contains a level-one heading",
+     "help": "Page should contain a level-one heading",
+     "helpUrl": "https://dequeuniversity.com/rules/axe/4.12/page-has-heading-one?application=playwright",
+     "id": "page-has-heading-one",
+     "impact": "moderate",
+     "nodes": Array [
+       Object {
+         "all": Array [
+           Object {
+             "data": null,
+             "id": "page-has-heading-one",
+             "impact": "moderate",
+             "message": "Page must have a level-one heading",
+             "relatedNodes": Array [],
+           },
+         ],
+         "any": Array [],
+         "failureSummary": "Fix all of the following:
+   Page must have a level-one heading",
+         "html": "<html data-scroll-behavior=\"smooth\" lang=\"en\" class=\"montserrat_9ce19808-module__uAARWW__variable ubuntu_4d061be-module__fTfHfW__variable\">",
+         "impact": "moderate",
+         "none": Array [],
+         "target": Array [
+           "html",
+         ],
+       },
+     ],
+     "tags": Array [
+       "cat.semantics",
+       "best-practice",
+     ],
+   },
+ ]
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - link "Логотип" [ref=e3] [cursor=pointer]:
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
      - link [ref=e29] [cursor=pointer]:
        - /url: https://t.me/VlassaDassa
        - paragraph [ref=e33]: "@VlassaDassa"
      - paragraph [ref=e38]: +7 (900) 015-81-16
  - alert [ref=e39]
```

# Test source

```ts
  1  | import AxeBuilder from "@axe-core/playwright";
  2  | import { expect, test } from "@playwright/test";
  3  | 
  4  | for (const route of ["/", "/ru", "/login"]) {
  5  |     test(`has no automatic accessibility violations on ${route}`, async ({
  6  |         page,
  7  |     }) => {
  8  |         await page.goto(route);
  9  | 
  10 |         const result = await new AxeBuilder({
  11 |             page,
  12 |         })
  13 |             .disableRules(["color-contrast", "region",])
  14 |             .analyze();
  15 | 
> 16 |         expect(result.violations).toEqual([]);
     |                                   ^ Error: expect(received).toEqual(expected) // deep equality
  17 |     });
  18 | }
  19 | 
  20 | test("supports keyboard navigation through the contact form", async ({
  21 |     page,
  22 | }) => {
  23 |     await page.goto("/#contacts");
  24 | 
  25 |     await page.locator('input[name="name"]').focus();
  26 | 
  27 |     await expect(page.locator('input[name="name"]')).toBeFocused();
  28 | 
  29 |     await page.keyboard.press("Tab");
  30 | 
  31 |     await expect(page.locator('input[name="email"]')).toBeFocused();
  32 | 
  33 |     await page.keyboard.press("Tab");
  34 | 
  35 |     await expect(page.locator('textarea[name="message"]')).toBeFocused();
  36 | });
  37 | 
```