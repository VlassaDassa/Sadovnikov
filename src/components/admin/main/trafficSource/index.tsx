import React, { useMemo } from 'react';

import SectionBackground from '@/components/admin/general/sectionBackground';
import DashboardTitle from '@/components/admin/general/dashboardTitle';
import ProgressBar from '@/components/shared/ProgressBar';

import { IAnalyticsMetric } from '@/interfaces/analytics';

import styles from './index.module.scss';

interface TrafficSourceProps {
    data: IAnalyticsMetric[];
}

type SourceKey =
    | 'direct'
    | 'engines'
    | 'social'
    | 'referrals';

interface TrafficSourceItem {
    key: SourceKey;
    source: string;
    count: number;
    percentage: number;
}

const sourceConfig: Array<{
    key: SourceKey;
    source: string;
}> = [
    {
        key: 'direct',
        source: 'Direct',
    },
    {
        key: 'engines',
        source: 'Engines',
    },
    {
        key: 'social',
        source: 'Social Media',
    },
    {
        key: 'referrals',
        source: 'Referrals',
    },
];

const sourceAliases: Record<string, SourceKey> = {
    direct: 'direct',
    none: 'direct',

    search: 'engines',
    engine: 'engines',
    engines: 'engines',
    organicsearch: 'engines',
    paidsearch: 'engines',

    social: 'social',
    socialmedia: 'social',
    organicsocial: 'social',
    paidsocial: 'social',

    referral: 'referrals',
    referrals: 'referrals',
};

function normalizeSourceName(value: string): string {
    return value
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '');
}

const TrafficSource: React.FC<TrafficSourceProps> = ({
    data,
}) => {
    const sources = useMemo<TrafficSourceItem[]>(() => {
        const counts: Record<SourceKey, number> = {
            direct: 0,
            engines: 0,
            social: 0,
            referrals: 0,
        };

        data.forEach((item) => {
            const normalizedName = normalizeSourceName(
                item.name,
            );

            const sourceKey =
                sourceAliases[normalizedName];

            if (!sourceKey) {
                return;
            }

            counts[sourceKey] += Math.max(
                0,
                item.count,
            );
        });

        const totalCount = Object.values(counts).reduce(
            (sum, count) => sum + count,
            0,
        );

        return sourceConfig.map((item) => {
            const count = counts[item.key];

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
                key: item.key,
                source: item.source,
                count,
                percentage,
            };
        });
    }, [data]);

    return (
        <section className={`${styles.section} container`}>
            <SectionBackground>
                <DashboardTitle text="TRAFFIC SOURCE" />

                <div className={styles.wrapper}>
                    {sources.map((item) => (
                        <div
                            key={item.key}
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
            </SectionBackground>
        </section>
    );
};

export default TrafficSource;