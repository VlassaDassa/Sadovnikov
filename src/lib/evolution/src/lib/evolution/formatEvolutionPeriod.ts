export type EvolutionDateLocale =
    | 'en-US'
    | 'ru-RU'

export function formatEvolutionPeriod(
    dates: Date[],
    locale: EvolutionDateLocale
): string {
    const sortedDates = [...dates].sort(
        (first, second) =>
            first.getTime() - second.getTime()
    )

    const first = sortedDates[0]
    const last = sortedDates[sortedDates.length - 1]

    if (!first || !last) {
        throw new Error(
            'Milestone source dates are missing'
        )
    }

    const sameYear =
        first.getUTCFullYear() ===
        last.getUTCFullYear()

    const sameMonth =
        sameYear &&
        first.getUTCMonth() ===
        last.getUTCMonth()

    if (sameMonth) {
        return new Intl.DateTimeFormat(locale, {
            month: 'long',
            year: 'numeric',
            timeZone: 'UTC',
        }).format(first)
    }

    const monthFormatter =
        new Intl.DateTimeFormat(locale, {
            month: 'short',
            timeZone: 'UTC',
        })

    const monthYearFormatter =
        new Intl.DateTimeFormat(locale, {
            month: 'short',
            year: 'numeric',
            timeZone: 'UTC',
        })

    if (sameYear) {
        return [
            monthFormatter.format(first),
            monthYearFormatter.format(last),
        ].join(' - ')
    }

    return [
        monthYearFormatter.format(first),
        monthYearFormatter.format(last),
    ].join(' - ')
}