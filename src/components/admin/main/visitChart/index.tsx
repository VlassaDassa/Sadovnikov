'use client';

import React, { useMemo } from 'react';
import {
    Area,
    AreaChart,
    Brush,
    Legend,
    ResponsiveContainer,
    XAxis,
    YAxis,
} from 'recharts';
import { useSelector } from 'react-redux';

import { RootState } from '@/store';
import { IVisitPoint } from '@/interfaces/analytics';

import SectionBackground from '@/components/admin/general/sectionBackground';
import DashboardTitle from '@/components/admin/general/dashboardTitle';
import ChartTooltip from '@/components/admin/general/chartTooltip';

import { cssVars } from '@/styles/cssVariables';
import styles from './index.module.scss';

interface VisitChartProps {
    data: IVisitPoint[];
}

interface YAxisConfig {
    max: number;
    ticks: number[];
}

function createYAxisConfig(data: IVisitPoint[]): YAxisConfig {
    const maximumValue = Math.max(
        0,
        ...data.flatMap((item) => [
            item.pageviews,
            item.visits,
        ]),
    );

    if (maximumValue === 0) {
        return {
            max: 10,
            ticks: [0, 2, 4, 6, 8, 10],
        };
    }

    const approximateStep = maximumValue / 5;
    const magnitude = 10 ** Math.floor(
        Math.log10(approximateStep),
    );

    const normalizedStep = approximateStep / magnitude;

    let multiplier: number;

    if (normalizedStep <= 1) {
        multiplier = 1;
    } else if (normalizedStep <= 2) {
        multiplier = 2;
    } else if (normalizedStep <= 5) {
        multiplier = 5;
    } else {
        multiplier = 10;
    }

    const step = multiplier * magnitude;
    const max = Math.ceil(maximumValue / step) * step;

    return {
        max,
        ticks: Array.from(
            { length: 6 },
            (_, index) => index * step,
        ),
    };
}

const VisitChart: React.FC<VisitChartProps> = ({ data }) => {
    const windowWidth = useSelector(
        (state: RootState) => state.breakpoint.windowWidth,
    );

    const pageviewsGradientId = React.useId().replaceAll(':', '');
    const visitsGradientId = React.useId().replaceAll(':', '');

    const fontSize = useMemo(() => {
        if (windowWidth < 550) {
            return 10;
        }

        if (windowWidth < 900) {
            return 14;
        }

        return 16;
    }, [windowWidth]);

    const filteredXTicks = useMemo(() => {
        if (data.length === 0) {
            return [];
        }

        const desiredTicksCount = windowWidth < 550 ? 4 : 7;
        const step = Math.max(
            1,
            Math.ceil(data.length / desiredTicksCount),
        );

        return data
            .filter((_, index) => {
                return (
                    index % step === 0 ||
                    index === data.length - 1
                );
            })
            .map((item) => item.day);
    }, [data, windowWidth]);

    const yAxisConfig = useMemo(
        () => createYAxisConfig(data),
        [data],
    );

    const formatYAxis = (value: number): string => {
        if (value === 0) {
            return '0';
        }

        if (value >= 1_000_000) {
            return `${Number((value / 1_000_000).toFixed(1))}m`;
        }

        if (value >= 1000) {
            return `${Number((value / 1000).toFixed(1))}k`;
        }

        return value.toString();
    };

    const brushEndIndex = Math.min(
        Math.max(data.length - 1, 0),
        7,
    );

    return (
        <section className={`${styles.section} container`}>
            <SectionBackground>
                <DashboardTitle text="VISITS" />

                {data.length === 0 ? (
                    <div className={styles.empty}>
                        No analytics data yet
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height={350}>
                        <AreaChart
                            data={data}
                            tabIndex={-1}
                            margin={{
                                top: 16,
                                right: 8,
                                bottom: 0,
                                left: 0,
                            }}
                        >
                            <defs>
                                <linearGradient
                                    id={pageviewsGradientId}
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="5%"
                                        stopColor={cssVars.brand_900}
                                        stopOpacity={0.8}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor={cssVars.brand_900}
                                        stopOpacity={0}
                                    />
                                </linearGradient>

                                <linearGradient
                                    id={visitsGradientId}
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="5%"
                                        stopColor={cssVars.brand_700}
                                        stopOpacity={0.55}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor={cssVars.brand_700}
                                        stopOpacity={0}
                                    />
                                </linearGradient>
                            </defs>

                            <XAxis
                                className={styles.axisX}
                                dataKey="day"
                                ticks={filteredXTicks}
                                interval={0}
                                tick={{
                                    fill: cssVars.neutral_600,
                                    fontSize,
                                    fontFamily: 'Montserrat, sans-serif',
                                    fontWeight: cssVars.semi_bold,
                                }}
                                tabIndex={-1}
                            />

                            <YAxis
                                className={styles.axisY}
                                domain={[0, yAxisConfig.max]}
                                ticks={yAxisConfig.ticks}
                                tickFormatter={formatYAxis}
                                allowDecimals={false}
                                tick={{
                                    fill: cssVars.neutral_600,
                                    fontSize,
                                    fontFamily: 'Montserrat, sans-serif',
                                    fontWeight: cssVars.semi_bold,
                                }}
                                tabIndex={-1}
                            />

                            <ChartTooltip type="visits" />

                            <Legend
                                verticalAlign="top"
                                align="right"
                                height={36}
                            />

                            <Area
                                tabIndex={-1}
                                type="monotone"
                                dataKey="pageviews"
                                name="Pageviews"
                                stroke={cssVars.brand_900}
                                strokeWidth={2}
                                fill={`url(#${pageviewsGradientId})`}
                                activeDot={{ r: 5 }}
                            />

                            <Area
                                tabIndex={-1}
                                type="monotone"
                                dataKey="visits"
                                name="Visits"
                                stroke={cssVars.brand_700}
                                strokeWidth={2}
                                fill={`url(#${visitsGradientId})`}
                                activeDot={{ r: 5 }}
                            />

                            <Brush
                                dataKey="day"
                                height={30}
                                stroke={cssVars.neutral_950}
                                fill={cssVars.neutral_1000}
                                travellerWidth={10}
                                startIndex={0}
                                endIndex={brushEndIndex}
                                tabIndex={-1}
                            >
                                <AreaChart data={data} tabIndex={-1}>
                                    <Area
                                        tabIndex={-1}
                                        type="monotone"
                                        dataKey="pageviews"
                                        stroke={cssVars.brand_900}
                                        fill={cssVars.brand_900}
                                        fillOpacity={0.6}
                                    />

                                    <Area
                                        tabIndex={-1}
                                        type="monotone"
                                        dataKey="visits"
                                        stroke={cssVars.brand_700}
                                        fill={cssVars.brand_700}
                                        fillOpacity={0.35}
                                    />
                                </AreaChart>
                            </Brush>
                        </AreaChart>
                    </ResponsiveContainer>
                )}
            </SectionBackground>
        </section>
    );
};

export default VisitChart;