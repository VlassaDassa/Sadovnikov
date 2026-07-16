'use client';

import React, { useMemo } from 'react';
import {
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
} from 'recharts';

import SectionBackground from '../../general/sectionBackground';
import DashboardTitle from '../../general/dashboardTitle';
import ChartTooltip from '../../general/chartTooltip';

import { IAnalyticsMetric } from '@/interfaces/analytics';

import { cssVars } from '@/styles/cssVariables';
import styles from './index.module.scss';






interface DeviceChartProps {
    data: IAnalyticsMetric[];
}

interface DeviceChartItem extends IAnalyticsMetric {
    device: string;
    color: string;
}

const deviceColors: Record<string, string> = {
    desktop: cssVars.brand_700,
    mobile: cssVars.brand_900,
    tablet: cssVars.brand_500,
};

const fallbackColors = [
    cssVars.brand_700,
    cssVars.brand_900,
    cssVars.brand_500,
];

function formatDeviceName(value: string): string {
    if (!value) {
        return 'Unknown';
    }

    return value
        .split(/[-_\s]+/)
        .map((part) => {
            return part.charAt(0).toUpperCase() + part.slice(1);
        })
        .join(' ');
}

const DeviceChart: React.FC<DeviceChartProps> = ({ data }) => {
    const devices = useMemo<DeviceChartItem[]>(() => {
        return data
            .filter((item) => item.count > 0)
            .map((item, index) => {
                const normalizedName = item.name
                    .trim()
                    .toLowerCase();

                return {
                    ...item,
                    device: formatDeviceName(item.name),
                    color:
                        deviceColors[normalizedName] ??
                        fallbackColors[index % fallbackColors.length],
                };
            });
    }, [data]);

    return (
        <section className={`${styles.section} container`}>
            <SectionBackground>
                <DashboardTitle text="DEVICES" />

                {devices.length === 0 ? (
                    <p className={styles.label}>
                        No analytics data yet
                    </p>
                ) : (
                    <div className={styles.wrapper}>
                        <div
                            style={{
                                width: '100%',
                                maxWidth: '160px',
                                height: '160px',
                            }}
                        >
                            <ResponsiveContainer
                                width="100%"
                                height="100%"
                            >
                                <PieChart>
                                    <Pie
                                        data={devices}
                                        dataKey="count"
                                        nameKey="device"
                                        innerRadius="65%"
                                        outerRadius="100%"
                                        paddingAngle={2}
                                        tabIndex={-1}
                                        stroke="none"
                                    >
                                        {devices.map((item) => (
                                            <Cell
                                                key={item.name}
                                                fill={item.color}
                                                stroke="none"
                                                style={{
                                                    filter:
                                                        'drop-shadow(0 0 6px rgba(63, 28, 223, 0.9))',
                                                }}
                                            />
                                        ))}
                                    </Pie>

                                    <ChartTooltip type="devices" />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        <div className={styles.labelWrapper}>
                            {devices.map((item) => (
                                <div
                                    key={item.name}
                                    className={styles.itemWrapper}
                                >
                                    <div
                                        className={styles.rectangle}
                                        style={{
                                            background: item.color,
                                        }}
                                    />

                                    <p className={styles.label}>
                                        {item.percentage}%
                                        {' '}
                                        <span className={styles.name}>
                                            {item.device}
                                        </span>
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </SectionBackground>
        </section>
    );
};

export default DeviceChart;