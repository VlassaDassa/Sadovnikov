'use client'

import React from 'react';

import Button from '@/components/general/button/Button';

import type { TooltipConfig } from '@/interfaces/general';

import { useTooltip } from '@/hooks/useTooltip';

import styles from './index.module.scss';


const reactIcon = '/images/mockImages/React.svg';
const mongoDbIcon = '/images/mockImages/MongoDB.svg';
const nextJSIcon = '/images/mockImages/NextJS.svg';
const reduxIcon = '/images/mockImages/Redux.svg';
const sassIcon = '/images/mockImages/SASS.svg';
const typeScriptIcon = '/images/mockImages/TypeScript.svg';


interface StackItem {
    id: number,
    name: string,
    icon: string,
    tooltip: TooltipConfig
}

interface StackItemProps {
    item: StackItem
}

const stackItems: StackItem[] = [
    {
        id: 1,
        name: 'React',
        icon: reactIcon,
        tooltip: {
            title: 'Why was this technology chosen?',
            text: 'For building SPAs and convenient reactive  interactions. \
                    I was tired of writing multi-line JavaScript and wanted to learn something more\
                    in demand in the market. I decided to try React first, but it turned out that I liked \
                    it for its reactivity, ease, and interesting component approach ',
        }
    },
    {
        id: 2,
        name: 'MongoDB',
        icon: mongoDbIcon,
        tooltip: {
            title: 'Why was this technology chosen?',
            text: 'For building SPAs and convenient reactive  interactions. \
                    I was tired of writing multi-line JavaScript and wanted to learn something more\
                    in demand in the market. I decided to try React first, but it turned out that I liked \
                    it for its reactivity, ease, and interesting component approach ',
        }
    },
    {
        id: 3,
        name: 'NextJS',
        icon: nextJSIcon,
        tooltip: {
            title: 'Why was this technology chosen?',
            text: 'For building SPAs and convenient reactive  interactions. \
                    I was tired of writing multi-line JavaScript and wanted to learn something more\
                    in demand in the market. I decided to try React first, but it turned out that I liked \
                    it for its reactivity, ease, and interesting component approach ',
        }
    },
    {
        id: 4,
        name: 'Redux',
        icon: reduxIcon,
        tooltip: {
            title: 'Why was this technology chosen?',
            text: 'For building SPAs and convenient reactive  interactions. \
                    I was tired of writing multi-line JavaScript and wanted to learn something more\
                    in demand in the market. I decided to try React first, but it turned out that I liked \
                    it for its reactivity, ease, and interesting component approach ',
        }
    },
    {
        id: 5,
        name: 'SASS',
        icon: sassIcon,
        tooltip: {
            title: 'Why was this technology chosen?',
            text: 'For building SPAs and convenient reactive  interactions. \
                    I was tired of writing multi-line JavaScript and wanted to learn something more\
                    in demand in the market. I decided to try React first, but it turned out that I liked \
                    it for its reactivity, ease, and interesting component approach ',
        }
    },
    {
        id: 6,
        name: 'TypeScript',
        icon: typeScriptIcon,
        tooltip: {
            title: 'Why was this technology chosen?',
            text: 'For building SPAs and convenient reactive  interactions. \
                    I was tired of writing multi-line JavaScript and wanted to learn something more\
                    in demand in the market. I decided to try React first, but it turned out that I liked \
                    it for its reactivity, ease, and interesting component approach ',
        }
    },
]


const StackItem: React.FC<StackItemProps> = ({ item }) => {
    const tooltipRef = useTooltip<HTMLDivElement>({
                text: item.tooltip.text,
                title: item.tooltip.title,
                type: 'lvl2',
                placement: 'bottom',
                fakeWidth: 400,
                delay: 400,
            });

    return (
        <div ref={tooltipRef} className={styles.itemWrapper}>
            <div className={styles.iconWrapper}>
                <img src={item.icon} alt="" aria-hidden='true' />
            </div>

            <p className={styles.iconName}>{item.name}</p>
        </div>
    )
}


const ProjectStack: React.FC = () => {
    
    return (
        <section className={`${styles.projectStack} container`}>
            <h2 className={`${styles.title} sectionTitle`}>STACK</h2>

            <Button 
                iconPosition='only'
                behavior='default'
                icon='bell'
                variant='dark'
                tooltip={{
                    text: 'Кнопка',
                    placement: 'bottom'
                }}
            />


            <div className={styles.stackWrapper}>
                {stackItems.map((item) => (
                    <StackItem key={item.id} item={item} />
                ))}
            </div>
        </section>
    )
}

export default ProjectStack