// import 'server-only';

import type { IAnalyticsDashboard, IAnalyticsMetric, IVisitPoint } from '@/interfaces/analytics';


interface IUmamiAuthResponse {
    token: string
}

interface IUmamiPoint {
    x: string;
    y: number;
}

interface IUmamiPageviewsResponse {
    pageviews: IUmamiPoint[];
    sessions: IUmamiPoint[]
}

interface IUmamiStatsResponse {
    pageviews: number;
    visitors: number;
    visits: number;
    bounces: number;
    totaltime: number;
}


function getRequiredEnv(name: string): string {
    const value = process.env[name]

    if (!value) {
        throw new Error(`Enviroment variable ${name} is missing`)
    }
    
    return value
}


async function getUmamiToken(): Promise<string> {
    const url = getRequiredEnv('UMAMI_URL')
    const username = getRequiredEnv('UMAMI_USERNAME')
    const password = getRequiredEnv('UMAMI_PASSWORD')

    const response = await fetch(`${url}/api/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,
            password
        }),
        cache: 'no-store'
    });

    if (!response.ok) {
        throw new Error(`Umami authentication failed: ${response.status}`)
    }

    const data = (await response.json()) as IUmamiAuthResponse

    return data.token
} 

async function umamiFetch<T>(
    path: string,
    token: string,
): Promise<T> {
    const url = getRequiredEnv('UMAMI_URL')

    const response = await fetch(`${url}${path}`, {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        cache: 'no-store'
    })

    if (!response.ok) {
        throw new Error(`Umami request failed: ${response.status}`)
    }

    return response.json() as Promise<T>
}

function calculatePercentage(
    count: number,
    total: number
): number {
    if (total === 0) {
        return 0
    }

    return Math.round((count / total) * 100)
}


function mapMetrics(
    items: IUmamiPoint[]
): IAnalyticsMetric[] {
    const total = items.reduce(
        (sum, item) => sum + item.y,
        0
    )

    return items.map((item) => ({
        name: item.x || 'Direct',
        count: item.y,
        percentage: calculatePercentage(item.y, total)
    }))
}


function mapVisits(
    pageviews: IUmamiPoint[],
    sessions: IUmamiPoint[]
): IVisitPoint[] {
    const sessionsByDate = new Map(
        sessions.map((item) => [item.x, item.y])
    )

    return pageviews.map((item) => ({
        day: new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "long",
        }).format(new Date(item.x)),
        pageviews: item.y,
        visits: sessionsByDate.get(item.x) ?? 0,
    }));
}


function createDateRange(days: number): {
    startAt: number;
    endAt: number;
} {
    const end = new Date()
    const start = new Date()

    start.setDate(start.getDate() - (days - 1))
    start.setHours(0, 0, 0, 0)

    return {
        startAt: start.getTime(),
        endAt: end.getTime()
    }
}


export async function getAnalyticsDashboard(
    days=30,
): Promise<IAnalyticsDashboard> {
    const websiteId = getRequiredEnv('UMAMI_WEBSITE_ID')
    const timezone = process.env.ANALYTICS_TIMEZOME ?? 'Europe/Moscow'

    const token = await getUmamiToken()
    const { startAt, endAt } = createDateRange(days)

    const commonParams = new URLSearchParams({
        startAt: String(startAt),
        endAt: String(endAt)
    })

    const pageviewParams = new URLSearchParams({
        startAt: String(startAt),
        endAt: String(endAt),
        unit: 'day',
        timezone
    })

    const [
        pageviews,
        devices,
        sources,
        stats,
    ] = await Promise.all([
        umamiFetch<IUmamiPageviewsResponse>(
            `/api/websites/${websiteId}/pageviews?${pageviewParams}`,
            token
        ),
        umamiFetch<IUmamiPoint[]>(
            `/api/websites/${websiteId}/metrics?${commonParams}&type=device`,
            token
        ),
        umamiFetch<IUmamiPoint[]>(
            `/api/websites/${websiteId}/metrics?${commonParams}&type=channel`,
            token
        ),
        umamiFetch<IUmamiStatsResponse>(
            `/api/websites/${websiteId}/stats?${commonParams}`,
            token
        ),
    ])

    return {
        visits: mapVisits(
        pageviews.pageviews,
        pageviews.sessions,
        ),
        devices: mapMetrics(devices),
        sources: mapMetrics(sources),
        summary: {
        pageviews: stats.pageviews,
        visitors: stats.visitors,
        visits: stats.visits,
        bounceRate: calculatePercentage(
            stats.bounces,
            stats.visits,
        ),
        averageVisitTime:
            stats.visits === 0
            ? 0
            : Math.round(stats.totaltime / stats.visits),
        },
    };
}