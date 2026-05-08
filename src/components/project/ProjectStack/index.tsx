'use client'

import React, { useRef, useEffect, useState } from 'react';

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

interface StackItemProps {
    item: StackItem;
    index: number;
    customTop?: number;
    customLeft?: number;
}

const StackItem: React.FC<StackItemProps> = ({ item, index, customTop, customLeft }) => {
    const tooltipRef = useTooltip<HTMLDivElement>({
        text: item.tooltip.text,
        title: item.tooltip.title,
        type: 'lvl2',
        placement: 'bottom',
        fakeWidth: 400,
        delay: 400,
    });

    const top = customTop ?? 0;
    const left = customLeft ?? 0;

    return (
        <div
            style={{ top: top, left: left + '%' }}
            ref={tooltipRef}
            className={`${styles.itemWrapper} stack-item-wrapper`}
            data-index={index}
        >
            <div className={styles.iconWrapper}>
                <img src={item.icon} alt="" aria-hidden='true' />
            </div>
            <p className={styles.iconName}>{item.name}</p>
        </div>
    );
};

const ProjectStack: React.FC = () => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [positions, setPositions] = useState<Array<{ top: number; left: number }>>([]);
    const [renderTrigger, setRenderTrigger] = useState(0);

    const generatePositions = () => {
        const newPositions = stackItems.map((_, index) => {
            const getRandomInt = (min: number, max: number) => {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            };


            let left = (getRandomInt(0, 100) + (index + 1) * 130) / 10;
            let top = 0;

            if (index === 0) {
                left = 10
            }

            if ((index + 1) % 2 === 0) {
                top += getRandomInt(0, 100) + 100;
            } else {
                top += getRandomInt(0, 50);
            }

            return { top, left };
        });
        
        setPositions(newPositions);
    };

    const drawLines = () => {
        if (!wrapperRef.current) return;

        const oldLines = wrapperRef.current.querySelectorAll('.dynamic-line');
        oldLines.forEach(line => line.remove());

        const items = wrapperRef.current.querySelectorAll('.stack-item-wrapper');
        if (items.length < 2) return;

        const containerRect = wrapperRef.current.getBoundingClientRect();

        for (let i = 0; i < items.length - 1; i++) {
            const from = items[i].getBoundingClientRect();
            const to = items[i + 1].getBoundingClientRect();

            const startX = from.left + from.width / 2 - containerRect.left;
            const startY = from.top + from.height / 2 - containerRect.top;
            const endX = to.left + to.width / 2 - containerRect.left;
            const endY = to.top + to.height / 2 - containerRect.top;

            const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
            const angle = Math.atan2(endY - startY, endX - startX) * 180 / Math.PI;

            const line = document.createElement('div');
            line.className = `${styles.dynamicLine} dynamic-line`;
            line.style.position = 'absolute';
            line.style.left = `${startX}px`;
            line.style.top = `${startY}px`;
            line.style.width = `${length}px`;
            line.style.height = '1px';
            line.style.transformOrigin = '0 0';
            line.style.transform = `rotate(${angle}deg)`;
            line.style.pointerEvents = 'none';
            line.style.zIndex = '-1';

            wrapperRef.current.appendChild(line);
        }
    };

    useEffect(() => {
        generatePositions();
    }, []);

    useEffect(() => {
        if (positions.length === 0) return;
        
        const timer = setTimeout(() => {
            drawLines();
        }, 50);

        return () => clearTimeout(timer);
    }, [positions, renderTrigger]);

    useEffect(() => {
        const handleResize = () => {
            setRenderTrigger(prev => prev + 1);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <section className={`${styles.projectStack} container`}>
            <h2 className={`${styles.title} sectionTitle`}>STACK</h2>

            <div ref={wrapperRef} className={styles.stackWrapper}>
                {stackItems.map((item, index) => (
                    <StackItem 
                        key={item.id} 
                        item={item} 
                        index={index + 1}
                        customTop={positions[index]?.top}
                        customLeft={positions[index]?.left}
                    />
                ))}
            </div>
        </section>
    );
};

export default ProjectStack;
