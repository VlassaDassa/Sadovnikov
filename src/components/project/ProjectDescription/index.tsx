'use client'

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

import Icon from '@/components/icons/Icon';

import styles from './index.module.scss';
import { cssVars } from '@/styles/cssVariables';



interface AccordionItem {
    title: string;
    icon: string,
    content: string;
}

interface AccordionProps {
    items: AccordionItem[];
    allowMultiple?: boolean;
}

const descItems = [
    {
        title: 'Site',
        icon: 'text',
        content: 'React, Next.js, TypeScript, SCSS, Redux Toolkit, Swiper, and many other modern tools. React, Next.js, TypeScript, SCSS, Redux Toolkit, Swiper, and many other modern tools.React, Next.js, TypeScript, SCSS, Redux Toolkit, Swiper, and many other modern tools.React, Next.js, TypeScript, SCSS, Redux Toolkit, Swiper, and many other modern tools.React, Next.js, TypeScript, SCSS, Redux Toolkit, Swiper, and many other modern tools.React, Next.js, TypeScript, SCSS, Redux Toolkit, Swiper, and many other modern tools.'
    },
    {
        title: 'WHY I STARTED',
        icon: 'rocket',
        content: 'The project was developed over several months, including design, architecture, and optimization.'
    },
    {
        title: 'CHALLENGES & SOLUTIONS',
        icon: 'puzzle',
        content: 'Yes, the website uses Next.js SSR, semantic HTML, meta tags, and structured data for better SEO.'
    },
    {
        title: 'CONCLUSION',
        icon: 'flag',
        content: 'Yes, the website uses Next.js SSR, semantic HTML, meta tags, and structured data for better SEO.'
    },
    {
        title: 'FUTURE PLANS',
        icon: 'time',
        content: 'Yes, the website uses Next.js SSR, semantic HTML, meta tags, and structured data for better SEO.'
    }
];


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
                            {item.content}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};


const ProjectDescription: React.FC = () => {
    
    return (
        <section className={`${styles.description} container`}>
            <h2 className={`${styles.title} sectionTitle`}>DESCRIPTION</h2>

            <Accordion items={descItems} />
        </section>
    )
}

export default ProjectDescription;