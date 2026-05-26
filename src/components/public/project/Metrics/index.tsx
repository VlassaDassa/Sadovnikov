import React from 'react';

import Icon from '@/components/shared/icons/Icon';
import ProgressBar from '@/components/shared/ProgressBar';

import { cssVars } from '@/styles/cssVariables';
import styles from './index.module.scss';



interface IMertics {
    icon: string,
    title: string,
    text: string,
    current: number,
    max: number,
    type: 'score' | 'time'
}

const metrics: IMertics[] = [
    {
        icon: 'speed',
        title: 'Performance',
        text: 'Speed and performance',
        current: 95,
        max: 100,
        type: 'score'
    },
    {
        icon: 'loadTime',
        title: 'Load time',
        text: 'Average loading time',
        current: 1.2,
        max: 10,
        type: 'time'
    },
    {
        icon: 'search',
        title: 'SEO',
        text: 'Search engine optimization',
        current: 85,
        max: 100,
        type: 'score'
    },
    {
        icon: 'accessibility',
        title: 'Accessibility',
        text: 'Lighehouse, A11y',
        current: 85,
        max: 100,
        type: 'score'
    }
]


const Metrics: React.FC = () => {
    return ( 
        <section className={`${styles.metrics}`}>
            <h2 className={`${styles.title} sectionTitle`}>METRICS</h2>

            <div className={styles.metricsWrapper}>
                {
                    metrics.map((item) => (
                        <div key={item.title} className={styles.metricItem}>
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