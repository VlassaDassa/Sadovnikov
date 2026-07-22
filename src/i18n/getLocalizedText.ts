import type { AppLocale } from "@/i18n/routing";

export function getLocalizedText(
    locale: AppLocale,
    englishText: string,
    russianText?: string | null,
) : string {
    if (locale === 'ru' && russianText?.trim()) {
        return russianText
    }

    return englishText
}
