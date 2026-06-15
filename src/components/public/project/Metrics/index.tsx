import React from 'react';

import Icon from '@/components/shared/icons/Icon';
import ProgressBar from '@/components/shared/ProgressBar';

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
                        <div key={item.id} className={styles.metricItem}>
                            <div className={styles.iconWrapper}>
                                <Icon 
                                    name={item.icon}
                                    size={40}
                                    strokeColor={cssVars.white}
                                />
                            </div>

                            <div className={styles.contentWrapper}>
                                <div className={styles.textWrapper}>
                                    <h3 className={styles.metricTitle}>{item.title}</h3>
                                    <p className={styles.metricText}>{item.text}</p>
                                </div>

                                <ProgressBar 
                                    type={item.type} 
                                    current={item.current}
                                    max={item.max}
                                />
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}

export default Metrics;