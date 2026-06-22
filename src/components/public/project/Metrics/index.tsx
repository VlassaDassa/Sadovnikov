import React from 'react';

import Icon from '@/components/shared/icons/Icon';
import ProgressBar from '@/components/shared/ProgressBar';
import MetricItem from '@/components/shared/MetricItem';

import type { IMertics } from '@/interfaces/general';

import { cssVars } from '@/styles/cssVariables';
import styles from './index.module.scss';



interface MetricsProps {
    data: IMertics[]
}


const Metrics: React.FC<MetricsProps> = ({ data }) => {
    return ( 
        <section className={`${styles.metrics}`}>
            <h2 className={`${styles.title} sectionTitle`}>METRICS</h2>

            <div className={styles.metricsWrapper}>
                {
                    data.map((item) => (
                        <MetricItem 
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