'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
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

interface SkillsProps {
    skills: Skill[];
}

const Skills: React.FC<SkillsProps> = ({ skills }) => {
    const { isVisible, elementRef } = useScrollAnimation<HTMLDivElement>({
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px',
    });

    const [stage, setStage] = useState(0);
    const [startAnimation, setStartAnimation] = useState(false);
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);
    const windowWidth = useSelector((state: RootState) => state.breakpoint.windowWidth);

    useEffect(() => {
        if (!isVisible) {
            setStage(0);
            setStartAnimation(false);
            setCursorPos({ x: 0, y: 0 });
        }
    }, [isVisible]);

    useEffect(() => {
        if (!isVisible) return;

        const stageDelay = windowWidth >= 768 ? 300 : 0;

        const timer1 = setTimeout(() => {
            setStage(1);
        }, stageDelay);

        const timer2 = setTimeout(() => {
            setStartAnimation(true);

            setCursorPos({ x: -200, y: -250 });

            let index = 0;

            const moveCursor = () => {
                index++;
                if (index < skills.length) {
                    setCursorPos({ x: -200, y: -250 + index * 70 });
                    setTimeout(moveCursor, 400);
                } else {
                    setTimeout(() => {
                        setCursorPos({ x: 3000, y: 0 });
                    }, 500);
                }
            };

            setTimeout(moveCursor, 650);

            return () => {
            };
        }, stageDelay);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, [isVisible, skills.length]);

    if (skills.length === 0) {
        return (
            <section className={`${styles.skills} container`}>
                <EmptySection text="Skills not found" />
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
                className={`${styles.skillsWrapper} ${stage >= 1 ? styles['skillsWrapper-anim'] : ''}`}
            >
                <AdaptiveImage src={vertex} wrapClass={`${styles.vertex} ${styles['vertex-1']}`} />
                <AdaptiveImage src={vertex} wrapClass={`${styles.vertex} ${styles['vertex-2']}`} />
                <AdaptiveImage src={vertex} wrapClass={`${styles.vertex} ${styles['vertex-3']}`} />
                <AdaptiveImage
                    src={vertexSelected}
                    wrapClass={`${styles.vertex} ${styles.vertexSelected}`}
                />

                <img
                    src={cursor}
                    className={styles.cursor}
                    alt=""
                    style={{
                        transform: `translate(${cursorPos.x}px, ${cursorPos.y}px)`,
                        transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    }}
                />

                <div className={`${styles.skillsItems} ${startAnimation ? styles['skillsItems-anim'] : ''}`}>
                    {skills.map((skill, index) => (
                        <div
                            key={index}
                            className={styles.skillItem}
                            style={{
                                animationDelay: `${index * 0.7}s`,
                            }}
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
                    text="This is how I evaluate my skills..."
                />
            </div>
        </section>
    );
};

export default Skills;