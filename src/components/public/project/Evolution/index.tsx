'use client'

import React from 'react';
import { useTranslations } from 'next-intl';

import EmptySection from '@/components/shared/EmptySection';

import { useTooltip } from '@/hooks/useTooltip';
import { ICommit } from '@/interfaces/general';
import { capitalize } from '@/lib/textFormat';

import styles from './index.module.scss';


interface CommitProps {
    item: ICommit,
}



const Commit: React.FC<CommitProps> = ({ item }) => {

    const tooltipRef = useTooltip<HTMLDivElement>({
            text: item.text,
            title: item.name,
            date: capitalize(item.date),
            type: 'lvl3',
            placement: 'bottom',
            fakeWidth: 400,
            delay: 400,
        });

    return (
        <div ref={tooltipRef} className={styles.commitItem}>
            <div className={styles.node}></div>
            <p className={styles.commitText}>- {item.name}</p>
        </div>
    )
}

interface EvolutionProps {
    data: ICommit[]
}


const Evolution: React.FC<EvolutionProps> = ({ data }) => {
    const t = useTranslations('Evolution')

    return (
        <section className={`${styles.evolution}`}>
            <h2 className={`${styles.title} sectionTitle`}>{t('Title')}</h2>

            {
                data.length === 0 ? <EmptySection text={t('Empty')} /> : 

                    <div className={styles.evolWrapper}>
                        <div className={styles.timeline}>
                            {data.map((item) => (
                                <Commit key={item.id} item={item} />
                            ))}
                        </div>
                    </div>
            }
            
        </section>
    )
}

export default Evolution;

