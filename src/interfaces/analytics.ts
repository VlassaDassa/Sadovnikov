export interface IVisitPoint {
    day: string;
    pageviews: number;
    visits: number;
}

export interface IAnalyticsMetric {
    name: string;
    count: number;
    percentage: number;
}

export interface IAnalyticsSummary {
    pageviews: number;
    visitors: number;
    visits: number;
    bounceRate: number;
    averageVisitTime: number;
}

export interface IAnalyticsDashboard {
    visits: IVisitPoint[];
    devices: IAnalyticsMetric[];
    sources: IAnalyticsMetric[];
    summary: IAnalyticsSummary
}