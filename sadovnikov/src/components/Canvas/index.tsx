// Canvas.jsx
import React, { useState, useRef, useEffect, useCallback } from "react";
import "./index.css";

interface CanvasProps {
    children?: React.ReactNode,
    width: string,
    height: string,
    className: string,
} 

const Canvas: React.FC<CanvasProps> = ({
    children,
    width = "100%",
    height = "100%",
    className = "",
}) => {
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [spacePressed, setSpacePressed] = useState(false);

    const canvasRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        const preventDefaultZoom = (e: WheelEvent) => {
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
            }
        };

        window.addEventListener("wheel", preventDefaultZoom, {
            passive: false,
        });

        return () => {
            window.removeEventListener("wheel", preventDefaultZoom);
        };
    }, []);

    // Обработка нажатия пробела
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === "Space" && !e.repeat) {
                e.preventDefault();
                setSpacePressed(true);
                canvasRef.current.style.cursor = "grab";
            }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.code === "Space") {
                e.preventDefault();
                setSpacePressed(false);
                canvasRef.current.style.cursor = "default";
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

    // Перемещение по канвасу
    const handleMouseDown = (e) => {
        // Проверяем, не кликнули ли на перетаскиваемый элемент
        if (e.target.closest(".canvas-element")) {
            return;
        }

        if (spacePressed || e.button === 1) {
            e.preventDefault();
            setIsDragging(true);
            setDragStart({
                x: e.clientX - position.x,
                y: e.clientY - position.y,
            });
            canvasRef.current.style.cursor = "grabbing";
        }
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;

        e.preventDefault();

        setPosition({
            x: e.clientX - dragStart.x,
            y: e.clientY - dragStart.y,
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        canvasRef.current.style.cursor = spacePressed ? "grab" : "default";
    };

    // Собственная реализация масштабирования
    const handleWheel = useCallback(
        (e) => {
            e.preventDefault();

            if (e.ctrlKey || e.metaKey) {
                // Масштабирование с Ctrl
                const delta = e.deltaY > 0 ? 0.9 : 1.1;
                const newScale = Math.min(Math.max(scale * delta, 0.1), 5);

                // Получаем координаты мыши относительно канваса
                const rect = canvasRef.current.getBoundingClientRect();
                const mouseX = e.clientX - rect.left;
                const mouseY = e.clientY - rect.top;

                // Вычисляем новую позицию для масштабирования относительно курсора
                const newPosition = {
                    x: mouseX - (mouseX - position.x) * (newScale / scale),
                    y: mouseY - (mouseY - position.y) * (newScale / scale),
                };

                setPosition(newPosition);
                setScale(newScale);
            } else {
                // Перемещение по канвасу колесиком
                const moveX = e.shiftKey ? e.deltaY * 2 : e.deltaX * 2;
                const moveY = e.shiftKey ? 0 : e.deltaY * 2;

                setPosition({
                    x: position.x - moveX,
                    y: position.y - moveY,
                });
            }
        },
        [scale, position],
    );

    // Предотвращаем контекстное меню
    const handleContextMenu = (e) => {
        if (isDragging || spacePressed) {
            e.preventDefault();
        }
    };

    return (
        <div
            className={`canvas-wrapper ${className}`}
            style={{ width, height }}
        >
            <div
                ref={canvasRef}
                className="canvas-container"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onWheel={handleWheel}
                onContextMenu={handleContextMenu}
            >
                <div
                    ref={contentRef}
                    className="canvas-content"
                    style={{
                        transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                        transformOrigin: "0 0",
                    }}
                >
                    {children}
                </div>

                <div className="zoom-info">{Math.round(scale * 100)}%</div>
            </div>
        </div>
    );
};

export default Canvas;
