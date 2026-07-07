'use client'

import React, { useRef, useEffect, useState } from 'react';

import EmptySection from '@/components/shared/EmptySection';

import type { IProjectStack } from '@/interfaces/general';
import { useTooltip } from '@/hooks/useTooltip';

import styles from './index.module.scss';




interface StackItemProps {
    item: IProjectStack;
    index: number;
    customTop?: number;
    customLeft?: number;
}

const StackItem: React.FC<StackItemProps> = ({ item, index, customLeft, customTop }) => {
    const tooltipRef = useTooltip<HTMLDivElement>({
        text: item.tooltip?.text ,
        title: item.tooltip?.title,
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


interface ProjectStackProps {
    data: IProjectStack[],
}

const ProjectStack: React.FC<ProjectStackProps> = ({ data }) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [positions, setPositions] = useState<Array<{ top: number; left: number }>>([]);
    const [renderTrigger, setRenderTrigger] = useState(0);

    const linesRef = useRef<HTMLDivElement[]>([]);

    const createLines = () => {
        if (!wrapperRef.current) return;

        const items = wrapperRef.current.querySelectorAll('.stack-item-wrapper');
        if (items.length < 2) return;

        linesRef.current.forEach(line => line.remove());
        linesRef.current = [];

        for (let i = 0; i < items.length - 1; i++) {
            const line = document.createElement('div');
            line.className = `${styles.dynamicLine} dynamic-line`;
            line.style.position = 'absolute';
            line.style.height = '1px';
            line.style.backgroundColor = 'white';
            line.style.opacity = '0.25';
            line.style.pointerEvents = 'none';
            line.style.zIndex = '-1';
            wrapperRef.current.appendChild(line);
            linesRef.current.push(line);
        }
    };

    const updateLinesPosition = () => {
        if (!wrapperRef.current || linesRef.current.length === 0) return;

        const items = wrapperRef.current.querySelectorAll('.stack-item-wrapper');
        if (items.length < 2) return;

        const containerRect = wrapperRef.current.getBoundingClientRect();

        for (let i = 0; i < items.length - 1; i++) {
            const line = linesRef.current[i];
            if (!line) continue;

            const from = items[i].getBoundingClientRect();
            const to = items[i + 1].getBoundingClientRect();

            const startX = from.left + from.width / 2 - containerRect.left;
            const startY = from.top + from.height / 2 - containerRect.top;
            const endX = to.left + to.width / 2 - containerRect.left;
            const endY = to.top + to.height / 2 - containerRect.top;

            const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
            const angle = Math.atan2(endY - startY, endX - startX) * 180 / Math.PI;

            line.style.left = `${startX}px`;
            line.style.top = `${startY}px`;
            line.style.width = `${length}px`;
            line.style.transformOrigin = '0 0';
            line.style.transform = `rotate(${angle}deg)`;
        }
    };

    useEffect(() => {
        const init = () => {
            createLines();
            updateLinesPosition();
        };

        const timer = setTimeout(init, 100);

        const handleResize = () => {
            updateLinesPosition();
        };

        window.addEventListener('resize', handleResize);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', handleResize);
        };
    }, [positions]);

    useEffect(() => {
        let rafId: number;

        const animate = () => {
            updateLinesPosition();
            rafId = requestAnimationFrame(animate);
        };

        rafId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(rafId);
    }, []);


    const generatePositions = () => {
        const newPositions = data.map((_, index) => {
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
   

    useEffect(() => {
        generatePositions();
    }, []);

  
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

            {
                data.length === 0 &&  <EmptySection text='No stack' />
            }
           

            <div ref={wrapperRef} className={styles.stackWrapper}>
                {data.map((item, index) => (
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
