import 'server-only'

import { unstable_cache} from 'next/cache'

import { IAnalyticsDashboard } from '@/interfaces/analytics'
import { getAnalyticsDashboard } from './umami'

const EMPTY_ANALYTICS: IAnalyticsDashboard = {
    visits: [],
    devices: [
        {
            name: 'desktop',
            count: 0,
            percentage: 0,
        },
        {
            name: 'tablet',
            count: 0,
            percentage: 0,
        },
        {
            name: 'mobile',
            count: 0,
            percentage: 0,
        },
    ],
    sources: [],
    summary: {
        pageviews: 0,
        visitors: 0,
        visits: 0,
        bounceRate: 0,
        averageVisitTime: 0,
    },
};

const getCachedAnalyticsDasboad = unstable_cache(
    async (days: number): Promise<IAnalyticsDashboard> => {
        return getAnalyticsDashboard(days)
    },
    ['umami-analytics-dashboard'],
    {
        revalidate: 300,
        tags: ['umami-analytics-dashboard']
    }
)


export async function getAnalyticsDashboardSafe(
    days: number,
): Promise<IAnalyticsDashboard> {
    try {
        return await getCachedAnalyticsDasboad(days)
    } catch(error) {
        console.error('Failed to load Umami analytics', error)
    }

    return EMPTY_ANALYTICS
}