import type { IVisitPoint } from '@/interfaces/analytics';

function createRandom(seed: number): () => number {
    let value = seed >>> 0;

    return () => {
        value = (value * 1664525 + 1013904223) >>> 0;

        return value / 4294967296;
    };
}

export function createMockVisits(days = 60): IVisitPoint[] {
    const random = createRandom(42);
    const today = new Date();

    return Array.from({ length: days }, (_, index) => {
        const date = new Date(today);

        date.setDate(today.getDate() - (days - index - 1));

        const weekdayFactor = [
            0.65,
            0.9,
            1,
            1.1,
            1.25,
            1.05,
            0.75,
        ][date.getDay()];

        const growthFactor = 1 + index / days;
        const spikeFactor = index % 13 === 0 ? 2.5 : 1;

        const visits = Math.max(
            1,
            Math.round(
                (40 + random() * 240) *
                    weekdayFactor *
                    growthFactor *
                    spikeFactor,
            ),
        );

        const pageviews = Math.round(
            visits * (1.5 + random() * 2.5),
        );

        return {
            day: new Intl.DateTimeFormat('en-GB', {
                day: 'numeric',
                month: 'short',
            }).format(date),
            visits,
            pageviews,
        };
    });
}