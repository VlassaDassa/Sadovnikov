"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";

import EmptySection from "@/components/shared/EmptySection";

import type { IProjectStack } from "@/interfaces/general";
import { useTooltip } from "@/hooks/useTooltip";

import styles from "./index.module.scss";

interface StackItemProps {
    item: IProjectStack;
    index: number;
    customTop?: number;
    customLeft?: number;
}

interface ProjectStackProps {
    data: IProjectStack[];
}

interface StackPosition {
    top: number;
    left: number;
}

const getDeterministicInt = (
    seed: number,
    min: number,
    max: number,
): number => {
    const value = Math.sin(seed * 12.9898) * 43758.5453;

    const fraction = value - Math.floor(value);

    return Math.floor(fraction * (max - min + 1)) + min;
};

const generatePositions = (count: number): StackPosition[] => {
    return Array.from(
        {
            length: count,
        },
        (_, index) => {
            const leftRandom = getDeterministicInt(index * 2 + 1, 0, 100);

            const topRandom = getDeterministicInt(
                index * 2 + 2,
                0,
                (index + 1) % 2 === 0 ? 100 : 50,
            );

            let left = (leftRandom + (index + 1) * 130) / 10;

            if (index === 0) {
                left = 10;
            }

            const top = (index + 1) % 2 === 0 ? topRandom + 100 : topRandom;

            return {
                top,
                left,
            };
        },
    );
};

const StackItem: React.FC<StackItemProps> = ({
    item,
    index,
    customLeft,
    customTop,
}) => {
    const tooltipRef = useTooltip<HTMLDivElement>({
        text: item.tooltip?.text,
        title: item.tooltip?.title,
        type: "lvl2",
        placement: "bottom",
        fakeWidth: 400,
        delay: 400,
    });

    const top = customTop ?? 0;
    const left = customLeft ?? 0;

    return (
        <div
            style={{
                top,
                left: `${left}%`,
            }}
            ref={tooltipRef}
            className={`${styles.itemWrapper} stack-item-wrapper`}
            data-index={index}
        >
            <div className={styles.iconWrapper}>
                <img
                    src={item.icon}
                    alt=""
                    aria-hidden="true"
                    className={styles.icon}
                />
            </div>

            <p className={styles.iconName}>{item.name}</p>
        </div>
    );
};

const ProjectStack: React.FC<ProjectStackProps> = ({ data }) => {
    const wrapperRef = useRef<HTMLDivElement>(null);

    const linesRef = useRef<HTMLDivElement[]>([]);

    const t = useTranslations("ProjectStack");

    const positions = generatePositions(data.length);

    const createLines = useCallback(() => {
        if (!wrapperRef.current) {
            return;
        }

        linesRef.current.forEach((line) => {
            line.remove();
        });

        linesRef.current = [];

        const items = wrapperRef.current.querySelectorAll(
            ".stack-item-wrapper",
        );

        if (items.length < 2) {
            return;
        }

        for (let index = 0; index < items.length - 1; index++) {
            const line = document.createElement("div");

            line.className = `${styles.dynamicLine} dynamic-line`;

            line.style.position = "absolute";

            line.style.height = "1px";

            line.style.backgroundColor = "white";

            line.style.opacity = "0.25";

            line.style.pointerEvents = "none";

            line.style.zIndex = "-1";

            wrapperRef.current.appendChild(line);

            linesRef.current.push(line);
        }
    }, []);

    const updateLinesPosition = useCallback(() => {
        if (!wrapperRef.current || linesRef.current.length === 0) {
            return;
        }

        const items = wrapperRef.current.querySelectorAll(
            ".stack-item-wrapper",
        );

        if (items.length < 2) {
            return;
        }

        const containerRect = wrapperRef.current.getBoundingClientRect();

        for (let index = 0; index < items.length - 1; index++) {
            const line = linesRef.current[index];

            if (!line) {
                continue;
            }

            const from = items[index].getBoundingClientRect();

            const to = items[index + 1].getBoundingClientRect();

            const startX = from.left + from.width / 2 - containerRect.left;

            const startY = from.top + from.height / 2 - containerRect.top;

            const endX = to.left + to.width / 2 - containerRect.left;

            const endY = to.top + to.height / 2 - containerRect.top;

            const deltaX = endX - startX;

            const deltaY = endY - startY;

            const length = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));

            const angle = (Math.atan2(deltaY, deltaX) * 180) / Math.PI;

            line.style.left = `${startX}px`;

            line.style.top = `${startY}px`;

            line.style.width = `${length}px`;

            line.style.transformOrigin = "0 0";

            line.style.transform = `rotate(${angle}deg)`;
        }
    }, []);

    useEffect(() => {
        const init = () => {
            createLines();
            updateLinesPosition();
        };

        const timer = window.setTimeout(init, 100);

        const handleResize = () => {
            updateLinesPosition();
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.clearTimeout(timer);

            window.removeEventListener("resize", handleResize);

            linesRef.current.forEach((line) => {
                line.remove();
            });

            linesRef.current = [];
        };
    }, [createLines, updateLinesPosition, data.length]);

    useEffect(() => {
        if (data.length < 2) {
            return;
        }

        let rafId: number;

        const animate = () => {
            updateLinesPosition();

            rafId = requestAnimationFrame(animate);
        };

        rafId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(rafId);
        };
    }, [data.length, updateLinesPosition]);

    return (
        <section className={`${styles.projectStack} container`}>
            <h2 className={`${styles.title} sectionTitle`}>{t("Title")}</h2>

            {data.length === 0 && <EmptySection text={t("Empty")} />}

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
