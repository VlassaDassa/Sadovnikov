# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: public.spec.ts >> renders /
- Location: tests\e2e\public.spec.ts:7:5

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 5

- Array []
+ Array [
+   "[JavaScript Error: \"Cookie “metrika_enabled” has been rejected for invalid domain.\" {file: \"http://127.0.0.1:3000/\" line: 0}]",
+   "[JavaScript Error: \"Cookie “metrika_enabled” has been rejected for invalid domain.\" {file: \"http://127.0.0.1:3000/\" line: 0}]",
+   "[JavaScript Error: \"Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at https://hdrc.yandex.net/. (Reason: CORS request did not succeed). Status code: (null).\"]",
+ ]
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - paragraph [ref=e2]: Message
  - generic [ref=e3]:
    - generic [ref=e4] [cursor=pointer]
    - navigation "Mobile navigation" [ref=e7]:
      - list [ref=e8]:
        - listitem [ref=e9]:
          - link [ref=e10] [cursor=pointer]:
            - /url: /#contacts
            - paragraph [ref=e11]: contacts
        - listitem [ref=e14]:
          - link [ref=e15] [cursor=pointer]:
            - /url: /#about
            - paragraph [ref=e16]: about
        - listitem [ref=e19]:
          - link [ref=e20] [cursor=pointer]:
            - /url: /#portfolio
            - paragraph [ref=e21]: portfolio
    - generic [ref=e24] [cursor=pointer]:
      - generic [ref=e25]: RU
      - generic [ref=e26]: EN
  - banner [ref=e28]:
    - link "Логотип" [ref=e29] [cursor=pointer]:
      - /url: /
      - img "Logo" [ref=e30]
      - paragraph [ref=e31]: SADOVNIKOV
    - navigation "Primary navigation" [ref=e32]:
      - list [ref=e33]:
        - listitem [ref=e34]:
          - link "contacts" [ref=e35] [cursor=pointer]:
            - /url: /#contacts
        - listitem [ref=e36]:
          - link "about" [ref=e37] [cursor=pointer]:
            - /url: /#about
        - listitem [ref=e38]:
          - link "portfolio" [ref=e39] [cursor=pointer]:
            - /url: /#portfolio
        - listitem [ref=e40]:
          - button [ref=e41] [cursor=pointer]:
            - paragraph [ref=e44]: EN
  - main [ref=e45]:
    - generic [ref=e47]:
      - heading "FRONTEND DEVELOPER" [level=1] [ref=e48]
      - paragraph [ref=e58]: SADOVNIKOVVLAD
    - generic [ref=e62]:
      - generic [ref=e64]:
        - generic [ref=e65]:
          - paragraph [ref=e66]: FRONTEND
          - paragraph [ref=e79]: 9/10
        - generic [ref=e80]:
          - paragraph [ref=e81]: BACKEND
          - paragraph [ref=e94]: 8/10
        - generic [ref=e95]:
          - paragraph [ref=e96]: WEB DESIGN
          - paragraph [ref=e109]: 6/10
        - generic [ref=e110]:
          - paragraph [ref=e111]: VIDEO EDITING
          - paragraph [ref=e124]: 5/10
      - paragraph [ref=e138]: This is how I evaluate my skills...
    - generic [ref=e140]:
      - heading "MY STACK" [level=2] [ref=e141]
      - generic [ref=e144]:
        - generic [ref=e145]: Django
        - generic [ref=e146]: JavaScript
        - generic [ref=e147]: React
        - generic [ref=e148]: Python
        - generic [ref=e149]: SASS
        - generic [ref=e150]: PostgreSQL
        - generic [ref=e151]: MySQL
        - generic [ref=e152]: TypeScript
        - generic [ref=e153]: PHP
    - generic [ref=e155]:
      - heading "ABOUT ME" [level=2] [ref=e156]
      - generic [ref=e157]:
        - generic [ref=e158]:
          - img "Uzbekistan" [ref=e160]
          - generic [ref=e161]:
            - paragraph [ref=e162]: "Year of birth: 2004"
            - paragraph [ref=e163]: "Place of birth: Uzbekistan"
        - generic [ref=e164]:
          - img "Moscow" [ref=e166]
          - paragraph [ref=e167]: "Location: Moscow, Russia"
        - generic [ref=e168]:
          - img "kollege" [ref=e170]
          - paragraph [ref=e171]: "Education: Konakovo Energy College, 2025"
      - generic [ref=e172]:
        - heading "WORK EXPERIENCE" [level=3] [ref=e173]
        - generic [ref=e174]:
          - generic [ref=e175]:
            - heading "Spetstechnologiya (Moscow) | Server Maintenance Engineer | July 2025 - Now" [level=4] [ref=e176]
            - paragraph [ref=e177]: Ensuring 24/7 uptime for development environments; configuring servers and CI/CD; assisting with frontend deployments through Nginx; reviewing Docker and Nginx configurations.
          - generic [ref=e178]:
            - heading "Freelance / Konakovo Energy College | Full-stack Developer | July 2025 - Now" [level=4] [ref=e179]
            - paragraph [ref=e180]: Full-cycle web development with Python, Django, React, JavaScript/TypeScript, SQL, and REST APIs. Built a college portal and a system for the local Education Department.
          - generic [ref=e181]:
            - heading "InfoTech (Moscow) | Assistant Engineer | July 2025 - Now" [level=4] [ref=e182]
            - paragraph [ref=e183]: Configuring MikroTik networks, troubleshooting IP cameras, and diagnosing network traffic with Wireshark.
      - generic [ref=e184]:
        - heading "SHORT BIO" [level=3] [ref=e185]
        - paragraph [ref=e186]: A proactive Frontend Developer with a full-stack background. I specialize in React and TypeScript, have more than three years of freelance experience, and work with server infrastructure, which helps me build more reliable web applications. I value clean code and am open to new opportunities in Moscow or remotely.
      - link [ref=e187] [cursor=pointer]:
        - /url: /pageInDev
        - button [ref=e188]:
          - paragraph [ref=e191]: MY LONG STORY, VERY VERY LONG, IF YOU INTERESTED
          - paragraph [ref=e192]: (click)
    - generic [ref=e194]:
      - heading "PORTFOLIO" [level=2] [ref=e195]
      - generic [ref=e197]:
        - paragraph [ref=e199]: PROJECTS NOT FOUND
        - generic: 100%
        - generic [ref=e200]:
          - generic [ref=e201]:
            - generic [ref=e202]: CTRL
            - generic [ref=e203]: +
            - generic [ref=e204]: Wheel
            - generic [ref=e205]: "- scaling"
          - generic [ref=e206]:
            - generic [ref=e207]: Space
            - generic [ref=e208]: +
            - generic [ref=e209]: Drag
            - generic [ref=e210]: "- moving across the canvas"
          - generic [ref=e211] [cursor=pointer]: ×
    - generic [ref=e213]:
      - heading "CONTACTS" [level=2] [ref=e214]
      - generic [ref=e216]:
        - textbox "Name..." [ref=e218]
        - textbox "Email..." [ref=e220]
        - textbox "Message..." [ref=e223]
        - button "Send" [disabled]:
          - paragraph: Send
      - generic:
        - generic:
          - generic:
            - paragraph: I'm waiting for your messages
  - contentinfo [ref=e224]:
    - generic [ref=e225]:
      - paragraph [ref=e230] [cursor=pointer]: vlad.sad28@yandex.ru
      - link [ref=e231] [cursor=pointer]:
        - /url: https://t.me/VlassaDassa
        - paragraph [ref=e235]: "@VlassaDassa"
      - paragraph [ref=e240] [cursor=pointer]: +7 (900) 015-81-16
  - complementary "Development status notice":
    - generic [ref=e241]:
      - generic [ref=e242]: WIP
      - generic [ref=e243]:
        - strong [ref=e244]: This website is still in development
        - paragraph [ref=e245]: Some projects, descriptions, metrics and other content are temporary demonstration data and should not be treated as factual.
      - link [ref=e246] [cursor=pointer]:
        - /url: https://github.com/VlassaDassa/Sadovnikov
        - button [ref=e247]:
          - paragraph [ref=e248]: View source on GitHub
      - button [ref=e249] [cursor=pointer]:
        - paragraph [ref=e250]: ×
  - alert [ref=e251]
```

# Test source

```ts
  1  | import { expect, test } from "@playwright/test";
  2  | 
  3  | for (const [route, language] of [
  4  |     ["/", "en"],
  5  |     ["/ru", "ru"],
  6  | ] as const) {
  7  |     test(`renders ${route}`, async ({ page }) => {
  8  |         const consoleErrors: string[] = [];
  9  |         const pageErrors: string[] = [];
  10 |         const failedRequests: string[] = [];
  11 | 
  12 |         page.on("console", (message) => {
  13 |             if (message.type() === "error") {
  14 |                 consoleErrors.push(message.text());
  15 |             }
  16 |         });
  17 | 
  18 |         page.on("pageerror", (error) => {
  19 |             pageErrors.push(error.message);
  20 |         });
  21 | 
  22 |         page.on("requestfailed", (request) => {
  23 |             const url = request.url();
  24 |             const errorText = request.failure()?.errorText ?? "";
  25 | 
  26 |             if (url.startsWith("https://hdrc.yandex.net/")) {
  27 |                 return;
  28 |             }
  29 | 
  30 |             if (url.includes("_rsc=") && errorText.includes("ERR_ABORTED")) {
  31 |                 return;
  32 |             }
  33 | 
  34 |             failedRequests.push(url);
  35 |         });
  36 | 
  37 |         const response = await page.goto(route, {
  38 |             waitUntil: "networkidle",
  39 |         });
  40 | 
  41 |         expect(response?.status()).toBe(200);
  42 | 
  43 |         await expect(page.locator("html")).toHaveAttribute("lang", language);
  44 | 
  45 |         await expect(page.locator("body")).toBeVisible();
  46 | 
  47 |         await expect(page.locator("#contacts")).toBeVisible();
  48 | 
> 49 |         expect(consoleErrors).toEqual([]);
     |                               ^ Error: expect(received).toEqual(expected) // deep equality
  50 |         expect(pageErrors).toEqual([]);
  51 |         expect(failedRequests).toEqual([]);
  52 |     });
  53 | }
  54 | 
  55 | test("has no horizontal overflow on mobile", async ({ page }) => {
  56 |     await page.setViewportSize({
  57 |         width: 390,
  58 |         height: 844,
  59 |     });
  60 | 
  61 |     await page.goto("/");
  62 | 
  63 |     const overflow = await page.evaluate(() => {
  64 |         return (
  65 |             document.documentElement.scrollWidth -
  66 |             document.documentElement.clientWidth
  67 |         );
  68 |     });
  69 | 
  70 |     expect(overflow).toBeLessThanOrEqual(1);
  71 | });
  72 | 
  73 | test("returns a not found response for an unknown project", async ({
  74 |     page,
  75 | }) => {
  76 |     const response = await page.goto("/project/999999999");
  77 | 
  78 |     expect(response?.status()).toBe(404);
  79 | });
  80 | 
```