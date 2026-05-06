'use client'

import React from 'react';

import { useTooltip } from '@/hooks/useTooltip';

import styles from './index.module.scss';


interface ICommit {
    id: number,
    name: string,
    date: string,
    text: string
}


const commits: ICommit[] = [
    {
        id: 1,
        name: 'First commit',
        date: '22.04.2026',
        text: 'First initialization commit, start development project'
    },
    {
        id: 2,
        name: 'Added “Header”',
        date: '22.04.2026',
        text: 'First initialization commit, start development project'
    },
    {
        id: 3,
        name: 'Fix “Preview”',
        date: '22.04.2026',
        text: 'First initialization commit, start development project'
    },
    {
        id: 4,
        name: 'Added “Contacts”, fix errors, animations',
        date: '22.04.2026',
        text: 'First initialization commit, start development project'
    },
]

interface CommitProps {
    item: ICommit
}


const Commit: React.FC<CommitProps> = ({ item }) => {
    const tooltipRef = useTooltip<HTMLDivElement>({
            text: item.text,
            title: item.name,
            date: item.date,
            type: 'lvl3',
            placement: 'bottom',
            fakeWidth: 400,
            delay: 400,
        });

    return (
        <div ref={tooltipRef} key={item.name} className={styles.commitItem}>
            <div className={styles.node}></div>
            <p className={styles.commitText}>- {item.name}</p>
        </div>
    )
}


const Evolution: React.FC = () => {
    return (
        <section className={`${styles.evolution} container`}>
            <h2 className={`${styles.title} sectionTitle`}>EVOLUTION</h2>

            <div className={styles.evolWrapper}>
                <div className={styles.timeline}>
                    {commits.map((item) => (
                        <Commit key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Evolution;

