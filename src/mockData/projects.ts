import type { IProject } from '@/interfaces/general'

const specTechno = '/images/mockImages/specTecno.png'
const mongoDBImg = '/images/mockImages/MongoDB.svg'
const typeScriptImg = '/images/mockImages/TypeScript.svg'
const reactImg = '/images/mockImages/React.svg'
const nextJSImg = '/images/mockImages/NextJS.svg'
const reduxImg = '/images/mockImages/Redux.svg'
const sassImg = '/images/mockImages/SASS.svg'
const featureIcon = '/images/mockImages/featureIcon.svg'
const featurePhoto1 = '/images/mockImages/featurePhoto.png'
const featurePhoto2 = '/images/mockImages/featurePhoto_1.png'

export const defaultImage = '/images/general/emptyPhoto16_9.png'
export const defaultImageFeature = '/images/general/emptyPhoto11_9.png'
export const defaultIcon = '/images/general/empty.svg'

const createProject = (id: number): IProject => ({
    id,
    category: 'Site',
    images: [
        {
            id: 1,
            image: specTechno,
            main: true,
        },
        {
            id: 2,
            image: specTechno,
            main: false,
        },
        {
            id: 3,
            image: specTechno,
            main: false,
        },
        {
            id: 4,
            image: specTechno,
            main: false,
        },
    ],
    teamType: 'solo',
    name: `SpecTechnologia${id}`,
    shortDescription: 'Corporate website and admin panel',
    shortDescriptionRu: 'Сайт-визитка + панель администратора',
    previewDescription: 'A modern corporate website for a technology company specializing in security systems and software solutions. The project focuses on performance, accessibility, and a clear user experience.',
    previewDescriptionRu: 'Современный корпоративный сайт для технологической компании, специализирующейся на системах безопасности и программных решениях. При разработке особое внимание уделено производительности, доступности и удобству использования.',
    stack: [
        {
            id: 1,
            name: 'MongoDB',
            icon: mongoDBImg,
            tooltip: {
                id: 1,
                title: 'Why was this technology chosen?',
                titleRu: 'Почему была выбрана эта технология?',
                text: 'MongoDB provides a flexible document model that is convenient for evolving content and rapid changes to the data structure.',
                textRu: 'MongoDB предоставляет гибкую документную модель, которая удобна для хранения изменяемого контента и быстрого развития структуры данных.',
            },
        },
        {
            id: 2,
            name: 'TypeScript',
            icon: typeScriptImg,
            tooltip: {
                id: 2,
                title: 'Why was this technology chosen?',
                titleRu: 'Почему была выбрана эта технология?',
                text: 'TypeScript adds static typing, catches errors earlier, and makes large components and server logic safer to refactor.',
                textRu: 'TypeScript добавляет статическую типизацию, помогает раньше находить ошибки и делает крупные компоненты и серверную логику безопаснее при рефакторинге.',
            },
        },
        {
            id: 3,
            name: 'React',
            icon: reactImg,
            tooltip: {
                id: 3,
                title: 'Why was this technology chosen?',
                titleRu: 'Почему была выбрана эта технология?',
                text: 'React makes it possible to build the interface from reusable components and manage reactive state in complex user flows.',
                textRu: 'React позволяет строить интерфейс из переиспользуемых компонентов и удобно управлять реактивными состояниями в сложных пользовательских сценариях.',
            },
        },
        {
            id: 4,
            name: 'Next.js',
            icon: nextJSImg,
            tooltip: {
                id: 4,
                title: 'Why was this technology chosen?',
                titleRu: 'Почему была выбрана эта технология?',
                text: 'Next.js combines routing, server rendering, and server-side logic in one application, improving performance and project organization.',
                textRu: 'Next.js объединяет маршрутизацию, серверный рендеринг и серверную логику в одном приложении, улучшая производительность и организацию проекта.',
            },
        },
        {
            id: 5,
            name: 'Redux Toolkit',
            icon: reduxImg,
            tooltip: {
                id: 5,
                title: 'Why was this technology chosen?',
                titleRu: 'Почему была выбрана эта технология?',
                text: 'Redux Toolkit provides predictable shared state management while reducing boilerplate compared with classic Redux.',
                textRu: 'Redux Toolkit используется для предсказуемого управления общим состоянием и уменьшает объём шаблонного кода по сравнению с классическим Redux.',
            },
        },
        {
            id: 6,
            name: 'SASS',
            icon: sassImg,
            tooltip: {
                id: 6,
                title: 'Why was this technology chosen?',
                titleRu: 'Почему была выбрана эта технология?',
                text: 'SASS simplifies modular style organization and provides nesting and reusable constructs for maintaining a large interface.',
                textRu: 'SASS упрощает организацию модульных стилей, позволяет использовать вложенность и переиспользуемые конструкции для поддержки большого интерфейса.',
            },
        },
    ],
    keyFeatures: [
        {
            id: 1,
            title: 'Fully responsive interface',
            titleRu: 'Полностью адаптивный интерфейс',
            text: 'The interface is adapted for desktop, tablet, and mobile devices. Components remain readable and convenient across different screen sizes.',
            textRu: 'Интерфейс адаптирован для настольных компьютеров, планшетов и мобильных устройств. Компоненты сохраняют читаемость и удобство при разных разрешениях экрана.',
            icon: featureIcon,
            photo: featurePhoto1,
        },
        {
            id: 2,
            title: 'Content management panel',
            titleRu: 'Панель управления контентом',
            text: 'The admin panel manages projects, images, technologies, descriptions, metrics, and evolution milestones without direct database editing.',
            textRu: 'Административная панель позволяет редактировать проекты, изображения, стек, описания, метрики и этапы развития без ручного изменения данных в базе.',
            icon: featureIcon,
            photo: specTechno,
        },
        {
            id: 3,
            title: 'Production-ready infrastructure',
            titleRu: 'Готовность к production',
            text: 'The project includes server rendering, database integration, authentication, analytics, and automated deployment through CI/CD.',
            textRu: 'Проект включает серверный рендеринг, работу с базой данных, авторизацию, аналитику и автоматизированное развёртывание через CI/CD.',
            icon: featureIcon,
            photo: featurePhoto2,
        },
    ],
    description: [
        {
            id: 1,
            title: 'PROJECT',
            titleRu: 'ПРОЕКТ',
            icon: 'text',
            content: 'The project is built with React, Next.js, TypeScript, SCSS, and Redux Toolkit. It combines a public portfolio, an admin panel, server-side logic, and PostgreSQL data.',
            contentRu: 'Проект создан на React, Next.js, TypeScript, SCSS и Redux Toolkit. Он объединяет публичное портфолио, административную панель, серверную логику и данные PostgreSQL.',
        },
        {
            id: 2,
            title: 'WHY I STARTED',
            titleRu: 'ПОЧЕМУ Я НАЧАЛ',
            icon: 'rocket',
            content: 'The goal was to build a production application rather than a training landing page and demonstrate frontend development, server logic, database work, and deployment.',
            contentRu: 'Целью было создать не учебный лендинг, а полноценное production-приложение, которое демонстрирует frontend-разработку, работу с сервером, базой данных и развёртыванием.',
        },
        {
            id: 3,
            title: 'CHALLENGES AND SOLUTIONS',
            titleRu: 'СЛОЖНОСТИ И РЕШЕНИЯ',
            icon: 'puzzle',
            content: 'The main challenges were responsive interface architecture, admin data synchronization, external service failure handling, and localization of database content.',
            contentRu: 'Основными задачами стали проектирование адаптивного интерфейса, синхронизация данных административной панели, обработка ошибок внешних сервисов и локализация контента из базы данных.',
        },
        {
            id: 4,
            title: 'CONCLUSION',
            titleRu: 'ЗАКЛЮЧЕНИЕ',
            icon: 'flag',
            content: 'The result is an independent full-stack application with managed content, analytics, localization, authentication, and production infrastructure.',
            contentRu: 'В результате получено самостоятельное full-stack приложение с управляемым контентом, аналитикой, локализацией, авторизацией и production-инфраструктурой.',
        },
        {
            id: 5,
            title: 'FUTURE PLANS',
            titleRu: 'ПЛАНЫ НА БУДУЩЕЕ',
            icon: 'time',
            content: 'Further development includes broader test coverage, accessibility improvements, performance optimization, and stronger automated checks before deployment.',
            contentRu: 'Дальнейшее развитие включает расширение тестового покрытия, улучшение доступности, оптимизацию производительности и постепенное усиление автоматических проверок перед развёртыванием.',
        },
    ],
    metrics: [
        {
            id: 1,
            icon: 'speed',
            title: 'Performance',
            titleRu: 'Производительность',
            text: 'Speed and performance',
            textRu: 'Скорость и производительность',
            current: 95,
            max: 100,
            type: 'score',
        },
        {
            id: 2,
            icon: 'loadTime',
            title: 'Load time',
            titleRu: 'Время загрузки',
            text: 'Average loading time',
            textRu: 'Среднее время загрузки',
            current: 1.2,
            max: 10,
            type: 'time',
        },
        {
            id: 3,
            icon: 'search',
            title: 'SEO',
            titleRu: 'SEO',
            text: 'Search engine optimization',
            textRu: 'Оптимизация для поисковых систем',
            current: 85,
            max: 100,
            type: 'score',
        },
        {
            id: 4,
            icon: 'accessibility',
            title: 'Accessibility',
            titleRu: 'Доступность',
            text: 'Lighthouse and A11y practices',
            textRu: 'Lighthouse и практики A11y',
            current: 85,
            max: 100,
            type: 'score',
        },
    ],
    commits: [
        {
            id: 1,
            name: 'First commit',
            nameRu: 'Первый коммит',
            date: 'June 28, 2026',
            dateRu: '28 июня 2026 г.',
            text: 'Initial repository setup and start of project development.',
            textRu: 'Первичная настройка репозитория и начало разработки проекта.',
            order: 1,
        },
        {
            id: 2,
            name: 'Added Header',
            nameRu: 'Добавлен Header',
            date: 'June 23, 2026',
            dateRu: '23 июня 2026 г.',
            text: 'Implemented the main Header structure and navigation.',
            textRu: 'Реализована основная структура Header и навигации.',
            order: 2,
        },
        {
            id: 3,
            name: 'Fixed Preview',
            nameRu: 'Исправлен Preview',
            date: 'June 22, 2026',
            dateRu: '22 июня 2026 г.',
            text: 'Fixed the Preview section and related visual issues.',
            textRu: 'Исправлена секция Preview и связанные визуальные ошибки.',
            order: 3,
        },
        {
            id: 4,
            name: 'Added Contacts and animations',
            nameRu: 'Добавлены Contacts и анимации',
            date: 'June 21, 2026',
            dateRu: '21 июня 2026 г.',
            text: 'Added the Contacts section, fixed errors, and configured animations.',
            textRu: 'Добавлена секция Contacts, исправлены ошибки и настроены анимации.',
            order: 4,
        },
    ],
    date: 'June 28, 2026',
    developmentTime: '3 weeks',
    developmentTimeRu: '3 недели',
    gitHubLink: 'https://github.com/VlassaDassa/Sadovnikov',
    demoLink: 'https://vk.com/7b5l21ya',
    numberTeam: 1,
})

export const projects: IProject[] = Array.from(
    { length: 7 },
    (_, index) => createProject(index + 1)
)