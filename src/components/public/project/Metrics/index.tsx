import React from 'react';
import { useTranslations } from 'next-intl';

import MetricItem from '@/components/shared/MetricItem';

import type { IMertics } from '@/interfaces/general';

import styles from './index.module.scss';



interface MetricsProps {
    data: IMertics[]
}

const Metrics: React.FC<MetricsProps> = ({ data }) => {
    const t = useTranslations('Metrics')

    return ( 
        <section className={`${styles.metrics}`}>
            <h2 className={`${styles.title} sectionTitle`}>{t('Title')}</h2>

            <div className={styles.metricsWrapper}>
                {
                    data.map((item) => (
                        <MetricItem 
                            key={item.id}
                            id={item.id}
                            icon={item.icon}
                            title={item.title}
                            text={item.text}
                            type={item.type}
                            current={item.current}
                            max={item.max}
                        />
                    ))
                }
            </div>
        </section>
    )
}

export default Metrics;