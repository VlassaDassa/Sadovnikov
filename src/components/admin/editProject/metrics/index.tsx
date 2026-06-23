'use client'

import React from 'react';

import SectionTitle from '../../general/sectionTitle';
import SectionBackground from '../../general/sectionBackground';
import MetricItem from '@/components/shared/MetricItem';
import Input from '@/components/shared/input';

import { EditProjectProps } from '@/interfaces/general';

import styles from './index.module.scss';





const Metrics: React.FC<EditProjectProps> = ({ projects, projectId, setData }) => {
    const project = projects.find(proj => proj.id === projectId)

    const handleChangeMetrics = (
        metricId: number,
        value: string,
        max: number,
    ) => {

        let cleaned = value.replace(',', '.');
        cleaned = cleaned.replace(/[^0-9.]/g, '');
        const parts = cleaned.split('.');
        if (parts.length > 2) {
            cleaned = parts[0] + '.' + parts.slice(1).join('');
        }
        
        let numValue = cleaned;
        if (parseFloat(numValue) > max) numValue = max.toString();
        if (parseFloat(numValue) < 0) numValue = '0';
        
        setData(prev =>
            prev.map(project =>
                project.id === projectId
                    ? {
                        ...project,
                        metrics: project.metrics.map(item =>
                            item.id === metricId
                                ? { ...item, current: numValue }
                                : item
                        )
                    }
                    : project
            )
        );
    };

    return (
        <section className={styles.section}>
            <SectionTitle 
                title='METRICS'
                text='Update project metrics and performances values'
            />

            <SectionBackground className={styles.contentWrapper}>
                {   
                    project?.metrics.map((item) => (
                        <SectionBackground key={item.id} className={styles.itemWrapper}>
                            <Input 
                                placeholder='0'
                                name={item.title}
                                value={String(item.current)}
                                type='text'
                                additionalClass={styles.input}
                                iconPosition={'noIcon'}
                                variant='admin'
                                onChange={(e) => handleChangeMetrics(item.id, e.target.value, item.max)}
                            />

                            <MetricItem
                                id={item.id}
                                icon={item.icon}
                                title={item.title}
                                text={item.text}
                                type={item.type}
                                current={item.current}
                                max={item.max}
                                className={styles.item}
                                contentWrapperClass={styles.itemContentWrapper}
                            />
                        </SectionBackground>
                    ))   
                }
            </SectionBackground>
        </section>
    )
}

export default Metrics;