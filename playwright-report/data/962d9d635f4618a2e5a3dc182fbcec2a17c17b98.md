# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: public.spec.ts >> renders /ru
- Location: tests\e2e\public.spec.ts:7:5

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 4

- Array []
+ Array [
+   "Failed to load resource: SSL peer certificate or SSH remote key was not OK",
+   "Failed to load resource: Timeout was reached",
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
            - /url: /ru#contacts
            - paragraph [ref=e11]: контакты
        - listitem [ref=e14]:
          - link [ref=e15] [cursor=pointer]:
            - /url: /ru#about
            - paragraph [ref=e16]: обо мне
        - listitem [ref=e19]:
          - link [ref=e20] [cursor=pointer]:
            - /url: /ru#portfolio
            - paragraph [ref=e21]: портфолио
    - generic [ref=e24] [cursor=pointer]:
      - generic [ref=e25]: RU
      - generic [ref=e26]: EN
  - banner [ref=e28]:
    - link "Логотип" [ref=e29]:
      - /url: /ru
      - img "Logo" [ref=e30]
      - paragraph [ref=e31]: SADOVNIKOV
    - navigation "Primary navigation" [ref=e32]:
      - list [ref=e33]:
        - listitem [ref=e34]:
          - link "контакты" [ref=e35]:
            - /url: /ru#contacts
        - listitem [ref=e36]:
          - link "обо мне" [ref=e37]:
            - /url: /ru#about
        - listitem [ref=e38]:
          - link "портфолио" [ref=e39]:
            - /url: /ru#portfolio
        - listitem [ref=e40]:
          - button [ref=e41] [cursor=pointer]:
            - paragraph [ref=e44]: RU
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
      - paragraph [ref=e138]: Как я оцениваю свои навыки...
    - generic [ref=e140]:
      - heading "STACK" [level=2] [ref=e141]
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
      - heading "Обо мне" [level=2] [ref=e156]
      - generic [ref=e157]:
        - generic [ref=e158]:
          - img "Uzbekistan" [ref=e160]
          - generic [ref=e161]:
            - paragraph [ref=e162]: "Год рождения: 2004"
            - paragraph [ref=e163]: "Место рождения: Узбекистан"
        - generic [ref=e164]:
          - img "Moscow" [ref=e166]
          - paragraph [ref=e167]: "Местоположение: Москва, Россия"
        - generic [ref=e168]:
          - img "kollege" [ref=e170]
          - paragraph [ref=e171]: "Образование: Конаковский энергетический колледж, 2025"
      - generic [ref=e172]:
        - heading "Опыт работы" [level=3] [ref=e173]
        - generic [ref=e174]:
          - generic [ref=e175]:
            - heading "Спецтехнология (Москва) | Инженер по обслуживанию серверов | Июль 2025 г. - Настоящее время" [level=4] [ref=e176]
            - paragraph [ref=e177]: Обеспечение круглосуточной доступности сред разработки; настройка серверов и CI/CD; помощь с развёртыванием frontend-приложений через Nginx; проверка конфигураций Docker и Nginx.
          - generic [ref=e178]:
            - heading "Фриланс / Конаковский энергетический колледж | Full-stack разработчик | Июль 2025 г. - Настоящее время" [level=4] [ref=e179]
            - paragraph [ref=e180]: Полный цикл веб-разработки на Python, Django, React, JavaScript/TypeScript, SQL и REST API. Разработал портал для колледжа и систему для местного управления образования.
          - generic [ref=e181]:
            - heading "ИнфоТех (Москва) | Помощник инженера | Июль 2025 г. - Настоящее время" [level=4] [ref=e182]
            - paragraph [ref=e183]: Настройка сетей на MikroTik, устранение неисправностей IP-камер и диагностика сетевого трафика с помощью Wireshark.
      - generic [ref=e184]:
        - heading "Коротко обо мне" [level=3] [ref=e185]
        - paragraph [ref=e186]: Инициативный Frontend-разработчик с full-stack опытом. Специализируюсь на React и TypeScript, более трёх лет занимаюсь фриланс-разработкой и работаю с серверной инфраструктурой, что помогает создавать более надёжные веб-приложения. Ценю чистый код и открыт к новым задачам в Москве или удалённо.
      - link [ref=e187]:
        - /url: /ru/pageInDev
        - button [ref=e188] [cursor=pointer]:
          - paragraph [ref=e191]: МОЯ ОЧЕНЬ ДЛИННАЯ ИСТОРИЯ, ЕСЛИ ВАМ ИНТЕРЕСНО
          - paragraph [ref=e192]: (клик)
    - generic [ref=e194]:
      - heading "ПОРТФОЛИО" [level=2] [ref=e195]
      - generic [ref=e197]:
        - paragraph [ref=e199]: ПРОЕКТЫ НЕ НАЙДЕНЫ
        - generic: 100%
        - generic [ref=e200]:
          - generic [ref=e201]:
            - generic [ref=e202]: CTRL
            - generic [ref=e203]: +
            - generic [ref=e204]: Wheel
            - generic [ref=e205]: "- масштабирование"
          - generic [ref=e206]:
            - generic [ref=e207]: Space
            - generic [ref=e208]: +
            - generic [ref=e209]: Drag
            - generic [ref=e210]: "- перемещение по холсту"
          - generic [ref=e211] [cursor=pointer]: ×
    - generic [ref=e213]:
      - heading "КОНТАКТЫ" [level=2] [ref=e214]
      - generic [ref=e216]:
        - textbox "Имя..." [ref=e218]
        - textbox "Почта..." [ref=e220]
        - textbox "Сообщение..." [ref=e223]
        - button "Отправить" [disabled]:
          - paragraph: Отправить
      - generic:
        - generic:
          - generic:
            - paragraph: Я жду ваших сообщений
  - contentinfo [ref=e224]:
    - generic [ref=e225]:
      - paragraph [ref=e230] [cursor=pointer]: vlad.sad28@yandex.ru
      - link [ref=e231] [cursor=pointer]:
        - /url: https://t.me/VlassaDassa
        - paragraph [ref=e235]: "@VlassaDassa"
      - paragraph [ref=e240] [cursor=pointer]: +7 (900) 015-81-16
  - complementary "Уведомление о состоянии разработки":
    - generic [ref=e241]:
      - generic [ref=e242]: WIP
      - generic [ref=e243]:
        - strong [ref=e244]: Сайт ещё находится в разработке
        - paragraph [ref=e245]: Некоторые проекты, описания, метрики и другие материалы являются временными демонстрационными данными и не отражают реальные факты.
      - link [ref=e246]:
        - /url: https://github.com/VlassaDassa/Sadovnikov
        - button [ref=e247] [cursor=pointer]:
          - paragraph [ref=e248]: Исходный код на GitHub
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