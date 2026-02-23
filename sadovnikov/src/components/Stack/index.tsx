import React, { useEffect, useState, useRef, useCallback } from "react";
import { useInView } from "../../hooks/useInView";

import hand from "./../../assets/images/hand.png";

import "./index.scss";

import stackList from "../../mockData/stack";




interface Position {
    top: number;
    left: number;
}

const Stack: React.FC = () => {
    const [positions, setPositions] = useState<Position[]>([]);
    const [isAnimating, setIsAnimating] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const { ref, isInView } = useInView({ threshold: 0.3 });

    const generateNewPositions = useCallback(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;

        // Получаем реальные размеры элементов
        const tempDiv = document.createElement("div");
        tempDiv.className = "stackElement";
        tempDiv.style.visibility = "hidden";
        tempDiv.style.position = "absolute";
        document.body.appendChild(tempDiv);

        const elementWidths: number[] = [];
        const elementHeights: number[] = [];

        stackList.forEach((text) => {
            tempDiv.textContent = text;
            elementWidths.push(tempDiv.offsetWidth);
            elementHeights.push(tempDiv.offsetHeight);
        });

        document.body.removeChild(tempDiv);

        // Генерируем новые позиции
        const newPositions: Position[] = [];
        const padding = 20;

        const hasCollision = (
            x: number,
            y: number,
            width: number,
            height: number,
        ) => {
            for (let i = 0; i < newPositions.length; i++) {
                const pos = newPositions[i];
                const existingWidth = elementWidths[i];
                const existingHeight = elementHeights[i];

                if (
                    !(
                        x + width + padding < pos.left ||
                        x > pos.left + existingWidth + padding ||
                        y + height + padding < pos.top ||
                        y > pos.top + existingHeight + padding
                    )
                ) {
                    return true;
                }
            }
            return false;
        };

        stackList.forEach((_, index) => {
            const width = elementWidths[index];
            const height = elementHeights[index];

            let attempts = 0;
            let placed = false;
            const maxAttempts = 2000;

            while (!placed && attempts < maxAttempts) {
                const left = Math.random() * (containerWidth - width);
                const top = Math.random() * (containerHeight - height);

                if (!hasCollision(left, top, width, height)) {
                    newPositions.push({ left, top });
                    placed = true;
                }

                attempts++;
            }

            if (!placed) {
                const cols = Math.ceil(Math.sqrt(stackList.length));
                const col = index % cols;
                const row = Math.floor(index / cols);
                const cellWidth = containerWidth / cols;
                const cellHeight =
                    containerHeight / Math.ceil(stackList.length / cols);

                newPositions.push({
                    left: col * cellWidth + (cellWidth - width) / 2,
                    top: row * cellHeight + (cellHeight - height) / 2,
                });
            }
        });

        setIsAnimating(true);
        setPositions(newPositions);

        setTimeout(() => {
            setIsAnimating(false);
        }, 500);
    }, []);

    useEffect(() => {
        generateNewPositions();

        const intervalId = setInterval(generateNewPositions, 3000);

        return () => clearInterval(intervalId);
    }, [generateNewPositions]);

    return (
        <section className="stack container">
            <h2 className="title">MY STACK</h2>
            <img 
                ref={ref as React.RefObject<HTMLImageElement>} 
                className={`${'stackBg'} ${isInView ? 'animate' : ''}`} 
                src={hand} 
                alt="hand" 
            />

            <div className="stackContainer" ref={containerRef}>
                {stackList.map((el, index) => (
                    <span
                        key={index}
                        className={`title stackElement ${isAnimating ? "stackElement--moving" : ""}`}
                        style={{
                            top: positions[index]
                                ? `${positions[index].top}px`
                                : "0px",
                            left: positions[index]
                                ? `${positions[index].left}px`
                                : "0px",
                        }}
                    >
                        {el}
                    </span>
                ))}
            </div>
        </section>
    );
};

export default Stack;
