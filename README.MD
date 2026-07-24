TYPOGRAPHY

Файл: typography.scss
Управление типографикой: шрифт, начертание, размер, высота строки, цвет - через отдельный класс;
Использование: в этом же файле через цикл генерируются классы, для лёгкой комбинации стилей просто через название класса;
Управление размером: в общем файле index.scss в тэге html, поскольку размеры заданы в rem
Исключения: когда необходимо переопределить какой-то параметр класса, нужно не использовать класс напрямую, как в примере. Вместо этого нужно внутри класса testText наследоваться от класса типографики через @extend, тогда через медиазапрос можно будет наследоваться и переопределять без проблем.

Пример: <h1 className="heading-128-ubuntu-bold whiteText testText">FRONTEND DEVELOPER</h1>

-------------------------------------------------------------------------------------------------------------

BUTTON

Папка: Button
В этом проекте для всех кнопок сделано 2 компонента для декоративных кнопок и обычных. Вариаций кнопок большое количество, все вариации можно посмотреть  в
дизайн-системе в Figma: https://www.figma.com/design/qYYGvs1TraAVy6K7T8sjwO/Portfolio?node-id=118-309&t=TDitP6gfY2icaRyS-1

Размеры кнопок
Кнопке изначально задаётся размер. Но он может быть адаптирован с помощью хука useBreakpoint, который отслеживает ширину экрана
и определяет 3 размера: mobile, tablet, desktop. Которые впоследствии переделываются в тип размеров кнопок: big, medium, small. Которые выступают в виде классов, от которых и происходит изменение размеров.

Почему так?
Это можно было сделать и в SCSS, но из-за 
текущей уже настроенной системы в виде генерации классов, наследования, пришлось делать так. Потому что @extend не работает внутри медиа-запроса. Делать миксины в генерации классов - тоже не очень, всё пришлось бы перекапывать. А хук в виде useBreakpoint может пригодиться и в будущем, для других компонентов или страниц
UPD: useBreakpoint - удалён. Из-за Next.js, где сам по себе компонент серверный, но из-за useBreakpoint он становился серверным. Пришлось сделать просто хардкод через SCSS. Т.е наследоваться @extend в медиа-запрсое нельзя, но просто написать font-size - можно, можно было сделать это через хотя бы переменные, но я поленился. Также useBreakpoint - это постоянное вычисление. А из-за частого использования это вычисление в во многих местах одновременно.
UPD: breakpoint добавлен в RTK. Без breakpoint сложно из-за специфики архитектуры, было решено вычислять 1 раз. В одном месте и передавать через контекст/хранилище Redux.

Поведение
hover - сделан через SCSS, а default, loading, disabled через параметры

Исключения
По дизайну нужен длинный текст, который просто не вмещается в кнопку, когда она самого маленького размера. Поэтому был добавлен параметр decorativeBtnText, с полями, где пишется основной текст и запасной(для мобильной версии). И там же внутри кнопки определяется какой текст должен быть отрендерен. Если не указать, то отобразится обычный текст переданный в параметр "text"

-------------------------------------------------------------------------------------------------------------


ICONS

Папка: Icons
Использование: есть общий универсальный компонент Icon, в параметрах есть всё необходимое: какую иконку отобразить, размеры, цвет. 
Для каждой иконки отдельно создаётся компонент. Icon[Название]. Впоследствии это заносится в const icons в
главном универсальном компоненте Icon
 
---------------------------------------------------------------------------------------------

Image
Почти все изображения вставляются через компонент AdaptiveImage. Он является обёрткой, для управления размером Image от Next
через SCSS

--------------------------------------------------------------------------------------

import
Некоторые импорты в layout и mainPage - к примеру, осуществляются через отдельный компонент начинающийся с DynImport[page]
Т.к в серверных компонентах нельзя использовать напрямую такой импорт

-------------------------------------------------------------------------------------------------------


Tooltip
Вызов через кастомный хук useTooltip. В него вносятся настройки, а он возвращает ref, к которому привязывается конкретный тултип.
В layout есть глобальный Tooltip, а в нём есть обычный tooltip, там идёт настройка внешнего вида и отображения. 
Есть 3 варианта тултип. lvl1 - просто текст, lvl2 - заголовок с текстом, lvl3 - заголовок с датой и текстом.
Смысл такого замудрения и кучи кода в том, чтобы отображать tooltip правильно. Рядом с элементом, чтобы он никуда не вылезал и не перекрывал. Есть настройка placement, указывающая где показывать tooltip (bottom, right, left, top).

Также есть параметр: fakeWidth - предположительная ширина, для верного позиционирования.
Чтобы динамически точно рассчитывать ширину tooltip "на бегу", придётся перестраивать всю архитектуру, это сложно и долго и не очень выгодно. Достаточно задавать примерный размер, там где очевидно, что текст будет огромным или очень маленьким. 100 - обычная мелкая подсказка, 400 - для текста в stackItems или в секции evolution на странице Project. 


В dev-режиме и build из-за разности сред, есть визуальные отличия. К примеру порядок загрузки и инжекта стилей - разный. 
В dev-режиме после перехода на другую страницу через Link стили меняют порядок и могут слетать. В build - всё хорошо.


VISIT ГРАФИК
--------------------------------------------------------------
Если необходимы моковые данные для теста их можно сделать так:
в .env:
ANALYTICS_USE_MOCK=false

В admin/page.tsx:
Вместо:
const analytics = await getAnalyticsDashboard(30)
Это:
const useMockAnalytics =
        process.env.ANALYTICS_USE_MOCK === 'true';

    const realAnalytics = await getAnalyticsDashboard(30);

    const analytics = {
        ...realAnalytics,
        visits: useMockAnalytics
            ? createMockVisits(30)
            : realAnalytics.visits,
    };


```
Sadovnikov
├─ eslint.config.js
├─ next-env.d.ts
├─ package.json
├─ pnpm-lock.yaml
├─ public
│  └─ images
│     ├─ button
│     │  ├─ bg_big_btn.png
│     │  ├─ bg_medium_btn.png
│     │  └─ bg_small_btn.png
│     ├─ main
│     │  ├─ avatar.png
│     │  ├─ avatar_frame.png
│     │  ├─ avatar_without_jaw.png
│     │  ├─ bg_avatar.png
│     │  ├─ cloud.png
│     │  ├─ cursor.svg
│     │  ├─ hand.png
│     │  ├─ index_finger.png
│     │  ├─ jaw.png
│     │  ├─ kolledge_photo.png
│     │  ├─ moscow_photo.png
│     │  ├─ russiaFlag.png
│     │  ├─ uzbFlag.png
│     │  ├─ uzbIsland.png
│     │  ├─ vertex.svg
│     │  └─ vertex_selected.svg
│     └─ mockImages
│        ├─ featureIcon.svg
│        ├─ featurePhoto.png
│        ├─ featurePhoto_1.png
│        ├─ MongoDB.svg
│        ├─ NextJS.svg
│        ├─ React.svg
│        ├─ Redux.svg
│        ├─ SASS.svg
│        ├─ specTecno.png
│        ├─ testPhoto.png
│        └─ TypeScript.svg
├─ README.MD
├─ sadovnikov
├─ src
│  ├─ app
│  │  ├─ (admin)
│  │  │  ├─ editProject
│  │  │  │  └─ page.tsx
│  │  │  ├─ layout.tsx
│  │  │  └─ page.tsx
│  │  ├─ (public)
│  │  │  ├─ layout.tsx
│  │  │  ├─ page.tsx
│  │  │  └─ project
│  │  │     ├─ index.module.scss
│  │  │     └─ page.tsx
│  │  ├─ globals.scss
│  │  └─ __reset.scss
│  ├─ components
│  │  ├─ admin
│  │  ├─ general
│  │  ├─ public
│  │  │  ├─ main
│  │  │  │  ├─ aboutIllustration
│  │  │  │  │  ├─ index.module.scss
│  │  │  │  │  └─ index.tsx
│  │  │  │  ├─ aboutMe
│  │  │  │  │  ├─ index.module.scss
│  │  │  │  │  └─ index.tsx
│  │  │  │  ├─ canvas
│  │  │  │  │  ├─ index.module.scss
│  │  │  │  │  └─ index.tsx
│  │  │  │  ├─ contacts
│  │  │  │  │  ├─ index.module.scss
│  │  │  │  │  └─ index.tsx
│  │  │  │  ├─ myStack
│  │  │  │  │  ├─ index.module.scss
│  │  │  │  │  └─ index.tsx
│  │  │  │  ├─ portfolio
│  │  │  │  │  ├─ index.module.scss
│  │  │  │  │  └─ index.tsx
│  │  │  │  ├─ preview
│  │  │  │  │  ├─ index.module.scss
│  │  │  │  │  └─ index.tsx
│  │  │  │  ├─ projectItem
│  │  │  │  │  ├─ index.module.scss
│  │  │  │  │  └─ index.tsx
│  │  │  │  ├─ skills
│  │  │  │  │  ├─ index.module.scss
│  │  │  │  │  └─ index.tsx
│  │  │  │  ├─ slider
│  │  │  │  │  ├─ index.module.scss
│  │  │  │  │  └─ index.tsx
│  │  │  │  └─ talkingAvatar
│  │  │  │     ├─ index.module.scss
│  │  │  │     └─ index.tsx
│  │  │  └─ project
│  │  │     ├─ Evolution
│  │  │     │  ├─ index.module.scss
│  │  │     │  └─ index.tsx
│  │  │     ├─ KeyFeature
│  │  │     │  ├─ index.module.scss
│  │  │     │  └─ index.tsx
│  │  │     ├─ Metrics
│  │  │     │  ├─ index.module.scss
│  │  │     │  └─ index.tsx
│  │  │     ├─ ProjectDescription
│  │  │     │  ├─ index.module.scss
│  │  │     │  └─ index.tsx
│  │  │     ├─ ProjectPreview
│  │  │     │  ├─ index.module.scss
│  │  │     │  └─ index.tsx
│  │  │     ├─ ProjectStack
│  │  │     │  ├─ index.module.scss
│  │  │     │  └─ index.tsx
│  │  │     └─ Slider
│  │  │        ├─ index.module.scss
│  │  │        └─ index.tsx
│  │  └─ shared
│  │     ├─ AdaptiveImage
│  │     │  ├─ index.module.scss
│  │     │  └─ index.tsx
│  │     ├─ AnimatedScroll
│  │     │  ├─ index.module.scss
│  │     │  └─ index.tsx
│  │     ├─ BreakpointProvider
│  │     │  └─ BreakpointProvider.tsx
│  │     ├─ button
│  │     │  ├─ button.module.scss
│  │     │  ├─ Button.tsx
│  │     │  ├─ decorButton.module.scss
│  │     │  └─ DecorButton.tsx
│  │     ├─ DynImportLayout
│  │     │  └─ index.tsx
│  │     ├─ footer
│  │     │  ├─ index.module.scss
│  │     │  └─ index.tsx
│  │     ├─ GlobalLoader
│  │     │  ├─ index.module.scss
│  │     │  └─ index.tsx
│  │     ├─ GlobalTooltip
│  │     │  ├─ index.module.scss
│  │     │  └─ index.tsx
│  │     ├─ header
│  │     │  ├─ index.module.scss
│  │     │  └─ index.tsx
│  │     ├─ icons
│  │     │  ├─ Icon.tsx
│  │     │  ├─ IconAccessibility.tsx
│  │     │  ├─ IconArrow.tsx
│  │     │  ├─ IconBell.tsx
│  │     │  ├─ IconCalendar.tsx
│  │     │  ├─ IconEmail.tsx
│  │     │  ├─ IconFlag.tsx
│  │     │  ├─ IconGitHub.tsx
│  │     │  ├─ IconHome.tsx
│  │     │  ├─ IconInternet.tsx
│  │     │  ├─ IconLink.tsx
│  │     │  ├─ IconLoader.tsx
│  │     │  ├─ IconLoadTime.tsx
│  │     │  ├─ IconPerson.tsx
│  │     │  ├─ IconPhone.tsx
│  │     │  ├─ IconPuzzle.tsx
│  │     │  ├─ IconRocket.tsx
│  │     │  ├─ IconSearch.tsx
│  │     │  ├─ IconSpeed.tsx
│  │     │  ├─ IconTelegram.tsx
│  │     │  ├─ IconText.tsx
│  │     │  ├─ IconTime.tsx
│  │     │  └─ IconTrash.tsx
│  │     ├─ input
│  │     │  ├─ index.module.scss
│  │     │  └─ index.tsx
│  │     ├─ menu
│  │     │  ├─ index.module.scss
│  │     │  └─ index.tsx
│  │     ├─ NoizeBg
│  │     │  ├─ index.module.scss
│  │     │  └─ index.tsx
│  │     ├─ overlay
│  │     │  ├─ index.module.scss
│  │     │  └─ index.tsx
│  │     ├─ paginationSlider
│  │     │  ├─ index.module.scss
│  │     │  └─ index.tsx
│  │     ├─ ProgressBar
│  │     │  ├─ index.module.scss
│  │     │  └─ index.tsx
│  │     ├─ statusMessage
│  │     │  ├─ index.module.scss
│  │     │  └─ index.tsx
│  │     └─ Tooltip
│  │        ├─ index.module.scss
│  │        └─ index.tsx
│  ├─ hooks
│  │  ├─ useCopy.ts
│  │  ├─ usePageLoad.ts
│  │  ├─ useScrollAnimation.ts
│  │  └─ useTooltip.ts
│  ├─ interfaces
│  │  └─ general.ts
│  ├─ lib
│  │  └─ stack.ts
│  ├─ mockData
│  │  ├─ aboutMe.ts
│  │  ├─ projects.ts
│  │  ├─ skills.ts
│  │  └─ stack.ts
│  ├─ next.config.mjs
│  ├─ store
│  │  ├─ index.ts
│  │  ├─ Providers.tsx
│  │  └─ slices
│  │     ├─ breakpointSlice.ts
│  │     ├─ loaderSlice.tsx
│  │     ├─ messageSlice.ts
│  │     ├─ tooltipSlice.ts
│  │     └─ uiSlice.tsx
│  └─ styles
│     ├─ cssVariables.ts
│     └─ tokens
│        ├─ _breakpoints.scss
│        ├─ _colors.scss
│        ├─ _effects.scss
│        └─ _typography.scss
└─ tsconfig.json
```