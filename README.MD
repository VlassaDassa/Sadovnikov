TYPOGRAPHY

Файл: typography.scss
Управление типографикой: шрифт, начертание, размер, высота строки, цвет - через отдельный класс;
Использование: в этом же файле через цикл генерируются классы, для лёгкой комбинации стилей просто через название класса;
Управление размером: в общем файле index.scss в тэге html, поскольку размеры заданы в rem
Исключения: когда необходимо переопределить какой-то параметр класса, нужно не использовать класс напрямую, как в примере. Вместо этого нужно внутри класса testText наследоваться от класса типографики через @extend, тогда через медиазапрос можно будет наследоваться и переопределять без проблем.

Пример: <h1 className="heading-128-magra-bold whiteText testText">FRONTEND DEVELOPER</h1>

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
│     ├─ general
│     │  └─ noize.jpg
│     ├─ icons
│     │  ├─ close.svg
│     │  ├─ email.svg
│     │  ├─ home.svg
│     │  ├─ link_arrow.svg
│     │  ├─ loader.svg
│     │  ├─ menu_burger.svg
│     │  ├─ phone.svg
│     │  └─ telegram.svg
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
│     │  ├─ vertex.svg
│     │  └─ vertex_selected.svg
│     └─ mockImages
│        └─ specTecno.png
├─ README.MD
├─ src
│  ├─ app
│  │  ├─ globals.scss
│  │  ├─ layout.tsx
│  │  ├─ page.tsx
│  │  ├─ testPage
│  │  │  └─ page.tsx
│  │  └─ __reset.scss
│  ├─ App.tsx
│  ├─ components
│  │  ├─ general
│  │  │  ├─ BreakpointProvider
│  │  │  │  └─ BreakpointProvider.tsx
│  │  │  ├─ button
│  │  │  │  ├─ button.module.scss
│  │  │  │  ├─ Button.tsx
│  │  │  │  ├─ decorButton.module.scss
│  │  │  │  └─ DecorButton.tsx
│  │  │  ├─ footer
│  │  │  │  ├─ index.module.scss
│  │  │  │  └─ index.tsx
│  │  │  ├─ header
│  │  │  │  ├─ index.module.scss
│  │  │  │  └─ index.tsx
│  │  │  ├─ input
│  │  │  │  ├─ index.module.scss
│  │  │  │  └─ index.tsx
│  │  │  └─ statusMessage
│  │  │     ├─ index.module.scss
│  │  │     └─ index.tsx
│  │  ├─ icons
│  │  │  ├─ Icon.tsx
│  │  │  ├─ IconBell.tsx
│  │  │  ├─ IconEmail.tsx
│  │  │  ├─ IconLoader.tsx
│  │  │  ├─ IconPhone.tsx
│  │  │  ├─ IconTelegram.tsx
│  │  │  └─ IconTrash.tsx
│  │  └─ main
│  │     ├─ aboutMe
│  │     │  ├─ index.module.scss
│  │     │  └─ index.tsx
│  │     ├─ canvas
│  │     │  ├─ index.module.scss
│  │     │  └─ index.tsx
│  │     ├─ contacts
│  │     │  ├─ index.module.scss
│  │     │  └─ index.tsx
│  │     ├─ myStack
│  │     │  ├─ index.module.scss
│  │     │  └─ index.tsx
│  │     ├─ portfolio
│  │     │  ├─ index.module.scss
│  │     │  └─ index.tsx
│  │     ├─ preview
│  │     │  ├─ index.module.scss
│  │     │  └─ index.tsx
│  │     ├─ projectItem
│  │     │  ├─ index.module.scss
│  │     │  └─ index.tsx
│  │     ├─ skills
│  │     │  ├─ index.module.scss
│  │     │  └─ index.tsx
│  │     ├─ slider
│  │     │  ├─ index.module.scss
│  │     │  └─ index.tsx
│  │     └─ talkingAvatar
│  │        ├─ index.module.scss
│  │        └─ index.tsx
│  ├─ interfaces
│  │  └─ general.ts
│  ├─ mockData
│  │  ├─ aboutMe.ts
│  │  ├─ projects.ts
│  │  ├─ skills.ts
│  │  └─ stack.ts
│  ├─ next.config.mjs
│  ├─ services
│  │  └─ stack.ts
│  ├─ store
│  │  ├─ index.ts
│  │  ├─ Providers.tsx
│  │  └─ slices
│  │     └─ breakpointSlice.ts
│  └─ styles
│     ├─ cssVariables.ts
│     └─ tokens
│        ├─ _breakpoints.scss
│        ├─ _colors.scss
│        ├─ _effects.scss
│        └─ _typography.scss
└─ tsconfig.json

```