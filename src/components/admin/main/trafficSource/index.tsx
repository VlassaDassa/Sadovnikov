import React from 'react';

import SectionBackground from '@/components/admin/general/sectionBackground';
import DashboardTitle from '@/components/admin/general/dashboardTitle';
import ProgressBar from '@/components/shared/ProgressBar';

import { IAnalyticsMetric } from '@/interfaces/analytics';

import styles from './index.module.scss';

interface TrafficSourceProps {
    data: IAnalyticsMetric[];
}

function formatSourceName(value: string): string {
    if (!value) {
        return 'Direct';
    }

    return value
        .split(/[-_\s]+/)
        .map((part) => {
            return part.charAt(0).toUpperCase() + part.slice(1);
        })
        .join(' ');
}

const TrafficSource: React.FC<TrafficSourceProps> = ({ data }) => {
    const sources = data
        .filter((item) => item.count > 0)
        .map((item) => ({
            ...item,
            source: formatSourceName(item.name),
        }))
        .sort((firstItem, secondItem) => {
            return secondItem.count - firstItem.count;
        });

    return (
        <section className={`${styles.section} container`}>
            <SectionBackground>
                <DashboardTitle text="TRAFFIC SOURCE" />

                {sources.length === 0 ? (
                    <p className={styles.itemText}>
                        No analytics data yet
                    </p>
                ) : (
                    <div className={styles.wrapper}>
                        {sources.map((item) => (
                            <div
                                key={item.name}
                                className={styles.item}
                            >
                                <p className={styles.itemText}>
                                    {item.source}
                                </p>

                                <ProgressBar
                                    type="source"
                                    max={100}
                                    current={item.percentage}
                                />

                                <p className={styles.itemText}>
                                    {item.percentage}%
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </SectionBackground>
        </section>
    );
};

export default TrafficSource;