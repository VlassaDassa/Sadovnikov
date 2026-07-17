import React from 'react';
import { Tooltip } from 'recharts';

import styles from './index.module.scss';

interface ChartTooltipProps {
    type: 'visits' | 'devices';
}

interface TooltipDataPoint {
    day?: string;
    device?: string;
    percentage?: number;
}

interface TooltipPayloadItem {
    dataKey?: string | number;
    name?: string | number;
    value?: string | number;
    color?: string;
    payload?: TooltipDataPoint;
}

interface CustomTooltipProps {
    active?: boolean;
    payload?: TooltipPayloadItem[];
    label?: string | number;
}

const visitMetricLabels: Record<string, string> = {
    pageviews: 'Pageviews',
    visits: 'Visits',
};

const visitMetricOrder: Record<string, number> = {
    pageviews: 0,
    visits: 1,
};

function formatMetricValue(
    value: string | number | undefined,
): string {
    const numericValue = Number(value);

    if (!Number.isFinite(numericValue)) {
        return '0';
    }

    if (numericValue >= 1_000_000) {
        return `${Number(
            (numericValue / 1_000_000).toFixed(1),
        )}m`;
    }

    if (numericValue >= 1000) {
        return `${Number(
            (numericValue / 1000).toFixed(1),
        )}k`;
    }

    return numericValue.toString();
}

const ChartTooltip: React.FC<ChartTooltipProps> = ({
    type,
}) => {
    const CustomTooltip: React.FC<
        CustomTooltipProps
    > = ({
        active,
        payload,
        label,
    }) => {
        if (!active || !payload?.length) {
            return null;
        }

        if (type === 'visits') {
            const metrics = payload
                .filter((item) => {
                    return (
                        typeof item.dataKey === 'string' &&
                        item.dataKey in visitMetricLabels
                    );
                })
                .sort((firstItem, secondItem) => {
                    const firstKey = String(
                        firstItem.dataKey,
                    );

                    const secondKey = String(
                        secondItem.dataKey,
                    );

                    return (
                        visitMetricOrder[firstKey] -
                        visitMetricOrder[secondKey]
                    );
                });

            const day =
                payload.find((item) => {
                    return Boolean(item.payload?.day);
                })?.payload?.day ??
                String(label ?? '');

            return (
                <div className={styles.customTooltip}>
                    <p className={styles.tooltipLabel}>
                        {day}
                    </p>

                    <div className={styles.tooltipList}>
                        {metrics.map((item) => {
                            const dataKey = String(
                                item.dataKey,
                            );

                            return (
                                <div
                                    key={dataKey}
                                    className={
                                        styles.tooltipItem
                                    }
                                >
                                    <span
                                        className={
                                            styles.tooltipMarker
                                        }
                                        style={{
                                            backgroundColor:
                                                item.color,
                                        }}
                                    />

                                    <span
                                        className={
                                            styles.tooltipName
                                        }
                                    >
                                        {
                                            visitMetricLabels[
                                                dataKey
                                            ]
                                        }
                                    </span>

                                    <span
                                        className={
                                            styles.tooltipValue
                                        }
                                    >
                                        {formatMetricValue(
                                            item.value,
                                        )}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
        }

        if (type === 'devices') {
            const item = payload[0];

            return (
                <div className={styles.customTooltip}>
                    <p className={styles.tooltipLabel}>
                        {item.payload?.device ?? 'Unknown'}
                    </p>

                    <p className={styles.tooltipValue}>
                        {item.payload?.percentage ?? 0}%
                    </p>
                </div>
            );
        }

        return null;
    };

    return (
        <Tooltip
            shared
            cursor={false}
            content={<CustomTooltip />}
        />
    );
};

export default ChartTooltip;