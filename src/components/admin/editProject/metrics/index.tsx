import React from 'react';

import SectionTitle from '../../general/sectionTitle';
import SectionBackground from '../../general/sectionBackground';

import styles from './index.module.scss';



const Metrics: React.FC = () => {
    return (
        <section className={styles.section}>
            <SectionTitle 
                title='METRICS'
                text='Update project metrics and performances values'
            />

            <SectionBackground className={styles.itemWrapper}>
                
            </SectionBackground>
        </section>
    )
}

export default Metrics;