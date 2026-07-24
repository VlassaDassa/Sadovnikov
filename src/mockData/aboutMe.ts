import type { AboutMe } from '@/interfaces/general'

export const aboutMe: AboutMe = {
    birth: 2004,
    placeBirth: 'Uzbekistan',
    placeBirthRu: 'Узбекистан',
    education: 'Konakovo Energy College, 2025',
    educationRu: 'Конаковский энергетический колледж, 2025',
    location: 'Moscow, Russia',
    locationRu: 'Москва, Россия',
    workExperience: [
        {
            id: 1,
            organization: 'Spetstechnologiya (Moscow)',
            organizationRu: 'Спецтехнология (Москва)',
            position: 'Server Maintenance Engineer',
            positionRu: 'Инженер по обслуживанию серверов',
            workingPeriod: {
                startDate: 'July 2025',
                endDate: 'Now',
            },
            description: 'Ensuring 24/7 uptime for development environments; configuring servers and CI/CD; assisting with frontend deployments through Nginx; reviewing Docker and Nginx configurations.',
            descriptionRu: 'Обеспечение круглосуточной доступности сред разработки; настройка серверов и CI/CD; помощь с развёртыванием frontend-приложений через Nginx; проверка конфигураций Docker и Nginx.',
        },
        {
            id: 2,
            organization: 'Freelance / Konakovo Energy College',
            organizationRu: 'Фриланс / Конаковский энергетический колледж',
            position: 'Full-stack Developer',
            positionRu: 'Full-stack разработчик',
            workingPeriod: {
                startDate: 'July 2025',
                endDate: 'Now',
            },
            description: 'Full-cycle web development with Python, Django, React, JavaScript/TypeScript, SQL, and REST APIs. Built a college portal and a system for the local Education Department.',
            descriptionRu: 'Полный цикл веб-разработки на Python, Django, React, JavaScript/TypeScript, SQL и REST API. Разработал портал для колледжа и систему для местного управления образования.',
        },
        {
            id: 3,
            organization: 'InfoTech (Moscow)',
            organizationRu: 'ИнфоТех (Москва)',
            position: 'Assistant Engineer',
            positionRu: 'Помощник инженера',
            workingPeriod: {
                startDate: 'July 2025',
                endDate: 'Now',
            },
            description: 'Configuring MikroTik networks, troubleshooting IP cameras, and diagnosing network traffic with Wireshark.',
            descriptionRu: 'Настройка сетей на MikroTik, устранение неисправностей IP-камер и диагностика сетевого трафика с помощью Wireshark.',
        },
    ],
    shortBio: "A proactive Frontend Developer with a full-stack background. I specialize in React and TypeScript, have more than three years of freelance experience, and work with server infrastructure, which helps me build more reliable web applications. I value clean code and am open to new opportunities in Moscow or remotely.",
    shortBioRu: 'Инициативный Frontend-разработчик с full-stack опытом. Специализируюсь на React и TypeScript, более трёх лет занимаюсь фриланс-разработкой и работаю с серверной инфраструктурой, что помогает создавать более надёжные веб-приложения. Ценю чистый код и открыт к новым задачам в Москве или удалённо.',
}