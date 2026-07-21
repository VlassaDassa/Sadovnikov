'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useTranslations } from 'next-intl';

import TalkingAvatar from '../talkingAvatar';
import AdaptiveImage from '@/components/shared/AdaptiveImage';
import SkillLevel from '@/components/shared/SkillLevel';
import EmptySection from '@/components/shared/EmptySection';


import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import type { Skill } from '@/interfaces/general';
import { RootState } from '@/store';
import styles from './index.module.scss';

const vertex = '/images/main/vertex.svg';
const vertexSelected = '/images/main/vertex_selected.svg';
const cursor = '/images/main/cursor.svg';

const drawMs = 1200;
const cursorMoveMs = 350;
const clickMs = 180;
const itemPauseMs = 100;

const boxEndX = 320;
const boxEndY = 310;

const itemX = 24;
const itemY = 46;
const itemStep = 70;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

interface SkillsProps {
    skills: Skill[];
}

const Skills: React.FC<SkillsProps> = ({ skills }) => {
    const { isVisible, elementRef } = useScrollAnimation<HTMLDivElement>({
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px',
    });

    const [boxVisible, setBoxVisible] = useState(false);
    const [boxOpen, setBoxOpen] = useState(false);
    const [visibleCount, setVisibleCount] = useState(0);
    const [cursorVisible, setCursorVisible] = useState(false);
    const [cursorClicking, setCursorClicking] = useState(false);
    const [cursorDuration, setCursorDuration] = useState(cursorMoveMs);
    const [clickFx, setClickFx] = useState<{ x: number; y: number; id: number } | null>(null);
    const [activeItem, setActiveItem] = useState<number | null>(null);
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

    const containerRef = useRef<HTMLDivElement>(null);
    const windowWidth = useSelector((state: RootState) => state.breakpoint.windowWidth);

    const t = useTranslations('SkillsMain');

    useEffect(() => {
        let active = true;

        const reset = () => {
            setBoxVisible(false);
            setBoxOpen(false);
            setVisibleCount(0);
            setCursorVisible(false);
            setCursorClicking(false);
            setCursorDuration(cursorMoveMs);
            setCursorPos({ x: 0, y: 0 });
            setClickFx(null);
            setActiveItem(null);
        };

        const run = async () => {
            reset();

            if (!isVisible) return;

            if (windowWidth < 768) {
                setBoxVisible(true);
                setBoxOpen(true);
                setVisibleCount(skills.length);
                return;
            }

            await sleep(300);
            if (!active) return;

            setBoxVisible(true);
            setCursorVisible(true);
            setCursorDuration(cursorMoveMs);
            setCursorPos({ x: 0, y: 0 });

            await sleep(40);
            if (!active) return;

            setCursorDuration(drawMs);
            setBoxOpen(true);
            setCursorPos({ x: boxEndX, y: boxEndY });

            await sleep(drawMs);
            if (!active) return;

            setCursorDuration(cursorMoveMs);

            for (let index = 0; index < skills.length; index++) {
                const clickX = itemX + 108;
                const clickY = itemY + index * itemStep + 8;

                setCursorClicking(false);
                setActiveItem(null);
                setCursorPos({
                    x: itemX + 100,
                    y: itemY + index * itemStep,
                });

                await sleep(cursorMoveMs);
                if (!active) return;

                setCursorClicking(true);
                setClickFx({
                    x: clickX,
                    y: clickY,
                    id: Date.now() + index,
                });

                await sleep(clickMs);
                if (!active) return;

                setVisibleCount(index + 1);
                setActiveItem(index);

                await sleep(clickMs);
                if (!active) return;

                setCursorClicking(false);

                await sleep(itemPauseMs + 220);
                if (!active) return;

                setActiveItem(null);
            }

            setCursorPos({ x: 3000, y: 0 });
        };

        run();

        return () => {
            active = false;
        };
    }, [isVisible, skills.length, windowWidth]);

    if (skills.length === 0) {
        return (
            <section className={`${styles.skills} container`}>
                <EmptySection text={t('Empty')} />
            </section>
        );
    }

    return (
        <section className={`${styles.skills} container`}>
            <div
                ref={(el) => {
                    if (el) elementRef.current = el;
                    containerRef.current = el;
                }}
                className={styles.skillsWrapper}
            >
                <div
                    className={`${styles.selectionBox} ${boxVisible ? styles.selectionBoxVisible : ''} ${boxOpen ? styles.selectionBoxOpen : ''}`}
                    style={{ '--draw-ms': `${drawMs}ms` } as React.CSSProperties}
                >
                    <AdaptiveImage src={vertex} wrapClass={`${styles.vertex} ${styles['vertex-1']}`} />
                    <AdaptiveImage src={vertex} wrapClass={`${styles.vertex} ${styles['vertex-2']}`} />
                    <AdaptiveImage src={vertex} wrapClass={`${styles.vertex} ${styles['vertex-3']}`} />
                    <AdaptiveImage
                        src={vertexSelected}
                        wrapClass={`${styles.vertex} ${styles.vertexSelected}`}
                    />
                </div>

                {clickFx && (
                    <span
                        key={clickFx.id}
                        className={styles.clickFx}
                        style={{
                            left: `${clickFx.x}px`,
                            top: `${clickFx.y}px`,
                        }}
                    />
                )}

                <img
                    src={cursor}
                    className={`${styles.cursor} ${cursorVisible ? styles.cursorVisible : ''}`}
                    alt=""
                    style={{
                        transform: `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0) scale(${cursorClicking ? 0.9 : 1})`,
                        transitionDuration: cursorClicking ? `${clickMs}ms` : `${cursorDuration}ms`,
                    }}
                />

                <div className={styles.skillsItems}>
                    {skills.map((skill, index) => (
                        <div
                            key={index}
                            className={[
                                styles.skillItem,
                                index < visibleCount ? styles.skillItemVisible : '',
                                index === activeItem ? styles.skillItemActive : '',
                            ].join(' ')}
                        >
                            <p className={styles.skillItemName}>{skill.name}</p>
                            <div className={styles.skillLevel}>
                                <SkillLevel score={skill.score} />
                                <p className={styles.skillScore}>{skill.score}/10</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.avatarWrapper}>
                <TalkingAvatar
                    additionalClass={styles.avatarWrapper}
                    hand={true}
                    indexFinger={true}
                    text={t('AvatarText')}
                />
            </div>
        </section>
    );
};

export default Skills;