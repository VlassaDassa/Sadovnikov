import React, { useState, useRef, useEffect, useCallback } from "react";

import "./index.scss";

interface CanvasProps {
    children?: React.ReactNode;
    width?: number | string;
    height?: number | string;
    className?: string;
    onElementsChange?: () => void;
}

const Canvas: React.FC<CanvasProps> = ({
    children,
    width = "100%",
    height = "100%",
    className = "",
    onElementsChange,
}) => {
    const [scale, setScale] = useState<number>(1);
    const [position, setPosition] = useState<{ x: number; y: number }>({
        x: 0,
        y: 0,
    });
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [dragStart, setDragStart] = useState<{ x: number; y: number }>({
        x: 0,
        y: 0,
    });
    const [spacePressed, setSpacePressed] = useState<boolean>(false);

    const canvasRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const preventSpaceDefault = (e: KeyboardEvent) => {
            if (e.code === "Space") {
                e.preventDefault();
                
                if (e.type === "keydown" && !e.repeat) {
                    setSpacePressed(true);
                    if (canvasRef.current) {
                        canvasRef.current.style.cursor = "grab";
                    }
                }
                
                if (e.type === "keyup") {
                    setSpacePressed(false);
                    if (canvasRef.current) {
                        canvasRef.current.style.cursor = "default";
                    }
                }
            }
        };

        document.addEventListener("keydown", preventSpaceDefault);
        document.addEventListener("keyup", preventSpaceDefault);

        return () => {
            document.removeEventListener("keydown", preventSpaceDefault);
            document.removeEventListener("keyup", preventSpaceDefault);
        };
    }, []);

    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            const isTargetInsideCanvas = canvasRef.current?.contains(e.target as Node);
            
            if (isTargetInsideCanvas && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
            }
        };

        window.addEventListener("wheel", handleWheel, { passive: false });

        return () => {
            window.removeEventListener("wheel", handleWheel);
        };
    }, []);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target instanceof Element && e.target.closest(".canvasElement")) {
            return;
        }

        if (spacePressed || e.button === 1) {
            e.preventDefault();
            setIsDragging(true);
            setDragStart({
                x: e.clientX - position.x,
                y: e.clientY - position.y,
            });

            if (canvasRef.current) {
                canvasRef.current.style.cursor = "grabbing";
            }
        }
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isDragging) return;

        e.preventDefault();

        setPosition({
            x: e.clientX - dragStart.x,
            y: e.clientY - dragStart.y,
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);

        if (canvasRef.current) {
            canvasRef.current.style.cursor = spacePressed ? "grab" : "default";
        }
    };

    const handleWheel = useCallback(
        (e: React.WheelEvent<HTMLDivElement>) => {
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();

                const delta = e.deltaY > 0 ? 0.9 : 1.1;
                const newScale = Math.min(Math.max(scale * delta, 0.1), 5);

                const rect = canvasRef.current?.getBoundingClientRect();
                if (!rect) return;

                const mouseX = e.clientX - rect.left;
                const mouseY = e.clientY - rect.top;

                const newPosition = {
                    x: mouseX - (mouseX - position.x) * (newScale / scale),
                    y: mouseY - (mouseY - position.y) * (newScale / scale),
                };

                setPosition(newPosition);
                setScale(newScale);
            } else {
            }
        },
        [scale, position],
    );

    const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isDragging || spacePressed) {
            e.preventDefault();
        }
    };

    return (
        <div
            className={`canvasWrapper ${className}`}
            style={{ width, height }}
        >
            <div
                ref={canvasRef}
                className="canvasContainer"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onWheel={handleWheel}
                onContextMenu={handleContextMenu}
            >
                <div
                    ref={contentRef}
                    className="canvasContent"
                    style={{
                        transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                        transformOrigin: "0 0",
                    }}
                >
                    {children}
                </div>

                <div className="zoomInfo">{Math.round(scale * 100)}%</div>

                <div className="canvasManual">
                    <div className="manualElement">
                        <span className="manualKey">CTRL</span>
                        <span className="manualText">+</span>
                        <span className="manualKey">Wheel</span>
                        <span className="manualText">- scaling</span>
                    </div>

                    <div className="manualElement">
                        <span className="manualKey">Space</span>
                        <span className="manualText">+</span>
                        <span className="manualKey">Drad</span>
                        <span className="manualText">- moving across the canvas</span>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Canvas;