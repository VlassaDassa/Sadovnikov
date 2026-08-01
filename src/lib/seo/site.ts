import type { AppLocale } from '@/i18n/routing';

export const siteConfig = {
    name: 'Vladislav Sadovnikov',
    shortName: 'Sadovnikov',
    description: 'Frontend developer portfolio featuring web applications, technologies and development experience.',
    url: new URL ('https://vlassadassa.ru'),
    github: 'https://github.com/VlassaDassa/Sadovnikov',
    defaultLocale: 'en' as const,
    locales: ['en', 'ru'] as const,
    indexingEnabled: true
}

function normalizePath(path: string): string {
    if (path === '/') {
        return ''
    }

    return `/${path
        .replace(/^\/+/, '')
        .replace(/\/+$/, '')}`
}

export function getLocalizedPath(path: string, locale: AppLocale): string {
    const normalizedPath = normalizePath(path)

    if (locale === 'ru') {
        return `/ru${normalizedPath}`
    }

    return normalizedPath || '/'
}

export function getAbsoluteUrl(path: string, locale: AppLocale): string {
    return new URL(getLocalizedPath(path, locale), siteConfig.url).toString()
}

export function getLanguageAlternates(path: string) {
    return {
        en: getAbsoluteUrl(path, 'en'),
        ru: getAbsoluteUrl(path, 'ru'),
        'x-default': getAbsoluteUrl(path, 'en')
    }
}

export function getOpenGraphLocale(locale: AppLocale): string {
    return locale === 'ru' ? 'ru_RU' : 'en_US'
}