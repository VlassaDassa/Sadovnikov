'use client'

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

import Icon from '@/components/shared/icons/Icon';

import type { IProjectDescription } from '@/interfaces/general';

import styles from './index.module.scss';
import { cssVars } from '@/styles/cssVariables';





interface AccordionProps {
    items: IProjectDescription[];
    allowMultiple?: boolean;
}



const Accordion: React.FC<AccordionProps> = ({ items, allowMultiple=true }) => {
    const [openIndexes, setOpenIndexes] = useState<number[]>([]);
    const breakpoint = useSelector((state: RootState) => state.breakpoint.value)
    const iconSize = breakpoint === 'mobile' ?  25 : 44 
    

    const toggleItem = (index: number) => {
        if (allowMultiple) {
            setOpenIndexes(prev =>
                prev.includes(index)
                    ? prev.filter(i => i !== index)
                    : [...prev, index]
            );
        } else {
            setOpenIndexes(prev =>
                prev.includes(index) ? [] : [index]
            );
        }
    };

    return (
        <div className={styles.accordion}>
            {items.map((item, index) => (
                <div key={index} className={`${styles.accordionItem}`}>
                    <button
                        className={`${styles.accordionHeader} ${openIndexes.includes(index) ? styles.open : ''}`}
                        onClick={() => toggleItem(index)}
                        aria-expanded={openIndexes.includes(index)}
                    >
                        <div className={styles.header}>
                            <div className={styles.headerWrapper}>
                                <div className={styles.iconWrapper}>
                                    <Icon 
                                        name={item.icon}
                                        size={iconSize}
                                        strokeColor={cssVars.white}
                                        fillColor='none'
                                    />
                                </div>
                                <h3 className={styles.itemTitle}>{item.title}</h3>
                            </div>
                            
                            <Icon 
                                name={'arrow'}
                                strokeColor={cssVars.white}
                                iconClass={openIndexes.includes(index) ? styles.iconOpen : styles.iconClose}
                            />
                        </div>
                    </button>
                    <div
                        className={`${styles.accordionContent} ${openIndexes.includes(index) ? styles.open : ''}`}
                    >
                        <p className={styles.accordionInner}>
                            {
                                item.content === '' ? 'No content...' : item.content
                            }
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};


interface ProjectDescriptionProps {
    data: IProjectDescription[]
}

const ProjectDescription: React.FC<ProjectDescriptionProps> = ({ data }) => {
    
    return (
        <section className={`${styles.description} container`}>
            <h2 className={`${styles.title} sectionTitle`}>DESCRIPTION</h2>

            <Accordion items={data} />
        </section>
    )
}

export default ProjectDescription;