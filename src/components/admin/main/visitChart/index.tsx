'use client';

import React, {
    useEffect,
    useMemo,
    useState,
    useCallback
} from 'react';
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

interface ChartVisitPoint extends IVisitPoint {
    index: number;
}

interface YAxisConfig {
    max: number;
    step: number;
    ticks: number[];
}

function getNiceStep(
    maximumValue: number,
    desiredIntervals: number,
): number {
    const roughStep = maximumValue / desiredIntervals;
    const magnitude =
        10 ** Math.floor(Math.log10(roughStep));

    const normalizedStep = roughStep / magnitude;

    let multiplier: number;

    if (normalizedStep >= Math.sqrt(50)) {
        multiplier = 10;
    } else if (normalizedStep >= Math.sqrt(10)) {
        multiplier = 5;
    } else if (normalizedStep >= Math.sqrt(2)) {
        multiplier = 2;
    } else {
        multiplier = 1;
    }

    return Math.max(1, multiplier * magnitude);
}

function createYAxisConfig(
    data: IVisitPoint[],
): YAxisConfig {
    const maximumValue = Math.max(
        0,
        ...data.flatMap((item) => [
            item.pageviews,
            item.visits,
        ]),
    );

    if (maximumValue === 0) {
        return {
            max: 5,
            step: 1,
            ticks: [0, 1, 2, 3, 4, 5],
        };
    }

    const desiredIntervals = 5;
    const step = getNiceStep(
        maximumValue,
        desiredIntervals,
    );

    const max =
        Math.ceil(maximumValue / step) * step;

    const intervalsCount = Math.round(max / step);

    const ticks = Array.from(
        { length: intervalsCount + 1 },
        (_, index) => index * step,
    );

    return {
        max,
        step,
        ticks,
    };
}

interface BrushRange {
    startIndex: number;
    endIndex: number;
}

function createInitialBrushRange(
    dataLength: number,
): BrushRange {
    return {
        startIndex: 0,
        endIndex: Math.max(dataLength - 1, 0),
    };
}

const VisitChart: React.FC<VisitChartProps> = ({ data }) => {
    const windowWidth = useSelector(
        (state: RootState) => state.breakpoint.windowWidth,
    );

    const [brushRange, setBrushRange] =
        useState<BrushRange>(() => {
            return createInitialBrushRange(data.length);
        });

    useEffect(() => {
        setBrushRange(
            createInitialBrushRange(data.length),
        );
    }, [data.length]);

    const chartData = useMemo<ChartVisitPoint[]>(() => {
        return data.map((item, index) => ({
            ...item,
            index,
        }));
    }, [data]);

    const brushGap = useMemo(() => {
        return Math.max(
            1,
            Math.ceil(data.length / 60),
        );
    }, [data.length]);

    const visibleData = useMemo(() => {
        return data.slice(
            brushRange.startIndex,
            brushRange.endIndex + 1,
        );
    }, [
        data,
        brushRange.startIndex,
        brushRange.endIndex,
    ]);

    const handleBrushChange = useCallback(
        (range: {
            startIndex?: number;
            endIndex?: number;
        }) => {
            const { startIndex, endIndex } = range;

            if (
                typeof startIndex !== 'number' ||
                typeof endIndex !== 'number'
            ) {
                return;
            }

            setBrushRange((currentRange) => {
                if (
                    currentRange.startIndex === startIndex &&
                    currentRange.endIndex === endIndex
                ) {
                    return currentRange;
                }

                return {
                    startIndex,
                    endIndex,
                };
            });
        },
        [],
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

    const maximumXAxisTicks = useMemo(() => {
        if (windowWidth < 550) {
            return 4;
        }

        if (windowWidth < 900) {
            return 6;
        }

        return 8;
    }, [windowWidth]);

    const xAxisTicks = useMemo(() => {
        const { startIndex, endIndex } = brushRange;

        const rangeLength =
            endIndex - startIndex + 1;

        if (rangeLength <= 0) {
            return [];
        }

        if (rangeLength <= maximumXAxisTicks) {
            return Array.from(
                { length: rangeLength },
                (_, index) => startIndex + index,
            );
        }

        const intervalsCount =
            maximumXAxisTicks - 1;

        const step =
            (endIndex - startIndex) /
            intervalsCount;

        const ticks = Array.from(
            { length: maximumXAxisTicks },
            (_, index) => {
                if (index === 0) {
                    return startIndex;
                }

                if (index === intervalsCount) {
                    return endIndex;
                }

                return Math.round(
                    startIndex + index * step,
                );
            },
        );

        return Array.from(new Set(ticks));
    }, [
        brushRange,
        maximumXAxisTicks,
    ]);

    const formatXAxis = (
        index: number,
    ): string => {
        const item = chartData[Math.round(index)];

        return item?.day ?? '';
    };

    const yAxisConfig = useMemo(
        () => createYAxisConfig(visibleData),
        [visibleData],
    );

    const formatYAxis = (value: number): string => {
        if (value === 0) {
            return '0';
        }

        if (value >= 1_000_000) {
            const formattedValue = value / 1_000_000;

            return `${Number(
                formattedValue.toFixed(1),
            )}m`;
        }

        if (value >= 1000) {
            const formattedValue = value / 1000;

            return `${Number(
                formattedValue.toFixed(1),
            )}k`;
        }

        return value.toString();
    };


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
                            data={chartData}
                            tabIndex={-1}
                            margin={{
                                top: 0,
                                right: 12,
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
                                type="number"
                                dataKey="index"
                                domain={[
                                    brushRange.startIndex,
                                    brushRange.endIndex,
                                ]}
                                ticks={xAxisTicks}
                                tickFormatter={formatXAxis}
                                interval={0}
                                allowDecimals={false}
                                tickMargin={10}
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
                                interval={0}
                                tickFormatter={formatYAxis}
                                allowDecimals={false}
                                tickMargin={8}
                                axisLine={{
                                    stroke: cssVars.neutral_600,
                                }}
                                tickLine={{
                                    stroke: cssVars.neutral_600,
                                }}
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
                                height={35}
                                iconType="plainline"
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
                                startIndex={brushRange.startIndex}
                                endIndex={brushRange.endIndex}
                                gap={brushGap}
                                onChange={handleBrushChange}
                                onDragEnd={handleBrushChange}
                                tabIndex={-1}
                            >
                                <AreaChart
                                    data={chartData}
                                    tabIndex={-1}
                                >
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