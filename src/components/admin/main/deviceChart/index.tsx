'use client';

import React, { useMemo } from 'react';
import {
    Cell,
    Pie,
    PieChart,
} from 'recharts';

import SectionBackground from '../../general/sectionBackground';
import DashboardTitle from '../../general/dashboardTitle';
import ChartTooltip from '../../general/chartTooltip';

import { IAnalyticsMetric } from '@/interfaces/analytics';

import styles from './index.module.scss';
import { cssVars } from '@/styles/cssVariables';




interface DeviceChartProps {
    data: IAnalyticsMetric[];
}

type DeviceKey = 'desktop' | 'tablet' | 'mobile';

interface DeviceChartItem extends IAnalyticsMetric {
    name: DeviceKey;
    device: string;
    color: string;
}

interface DeviceConfig {
    name: DeviceKey;
    device: string;
    color: string;
}

const deviceConfig: DeviceConfig[] = [
    {
        name: 'desktop',
        device: 'Desktop',
        color: cssVars.brand_900
    },
    {
        name: 'tablet',
        device: 'Tablet',
        color: cssVars.brand_700
    },
    {
        name: 'mobile',
        device: 'Mobile',
        color: cssVars.brand_600
    },
];

const DeviceChart: React.FC<DeviceChartProps> = ({
    data,
}) => {
    const devices = useMemo<DeviceChartItem[]>(() => {
        const counts: Record<DeviceKey, number> = {
            desktop: 0,
            tablet: 0,
            mobile: 0,
        };

        data.forEach((item) => {
            const normalizedName = item.name
                .trim()
                .toLowerCase();

            if (
                normalizedName !== 'desktop' &&
                normalizedName !== 'tablet' &&
                normalizedName !== 'mobile'
            ) {
                return;
            }

            counts[normalizedName] += Math.max(
                0,
                item.count,
            );
        });

        const totalCount = Object.values(counts).reduce(
            (sum, count) => sum + count,
            0,
        );

        return deviceConfig.map((device) => {
            const count = counts[device.name];

            const percentage =
                totalCount === 0
                    ? 0
                    : Number(
                          (
                              (count / totalCount) *
                              100
                          ).toFixed(1),
                      );

            return {
                name: device.name,
                device: device.device,
                color: device.color,
                count,
                percentage,
            };
        });
    }, [data]);

    const chartDevices = useMemo(() => {
        return devices.filter((item) => item.count > 0);
    }, [devices]);

    return (
        <section className={`${styles.section} container`}>
            <SectionBackground>
                <DashboardTitle text="DEVICES" />

                <div className={styles.wrapper}>
                    <div className={styles.chartWrapper}>
                        <div className={styles.chartWrapper}>
                            <PieChart
                                width={160}
                                height={160}
                            >
                                <Pie
                                    data={chartDevices}
                                    dataKey="count"
                                    nameKey="device"
                                    cx={80}
                                    cy={80}
                                    innerRadius={48}
                                    outerRadius={70}
                                    paddingAngle={
                                        chartDevices.length > 1
                                            ? 2
                                            : 0
                                    }
                                    tabIndex={-1}
                                    stroke="none"
                                    isAnimationActive
                                >
                                    {chartDevices.map((item) => (
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
                        </div>
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
                                        backgroundColor:
                                            item.color,
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
            </SectionBackground>
        </section>
    );
};

export default DeviceChart;