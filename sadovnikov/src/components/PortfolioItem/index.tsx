import React, { useState, useRef, useEffect } from "react";
import "./index.scss";

interface PortfolioItemProps {
    id: number | string;
    defaultPosition?: { x: number; y: number };
    onPositionChange?: (
        id: number | string,
        position: { x: number; y: number },
    ) => void;
    onSelect?: (id: number | string) => void;
    isSelected?: boolean;

    type: string;
    name: string;
    description: string;
    stack: string[];
    img: string;
}

const PortfolioItem: React.FC<PortfolioItemProps> = ({
    id,
    defaultPosition = { x: 100, y: 100 },
    onPositionChange,
    onSelect,
    isSelected = false,

    type,
    name,
    description,
    stack,
    img
}) => {
    const [position, setPosition] = useState<{ x: number; y: number }>(
        defaultPosition,
    );
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({
        x: 0,
        y: 0,
    });

    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isDragging) {
            setPosition(defaultPosition);
        }
    }, [defaultPosition, isDragging]);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();

        onSelect?.(id);

        setIsDragging(true);

        const rect = elementRef.current?.getBoundingClientRect();
        if (!rect) return;

        setDragOffset({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });

        if (elementRef.current instanceof HTMLDivElement) {
            elementRef.current.style.cursor = "grabbing";
            elementRef.current.style.zIndex = "1000";
        }
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging) return;

        e.preventDefault();
        e.stopPropagation();

        const newPosition = {
            x: e.clientX - dragOffset.x,
            y: e.clientY - dragOffset.y,
        };

        setPosition(newPosition);
    };

    const handleMouseUp = (e: MouseEvent) => {
        if (isDragging) {
            e.preventDefault();
            e.stopPropagation();

            onPositionChange?.(id, position);

            setIsDragging(false);

            if (elementRef.current instanceof HTMLDivElement) {
                elementRef.current.style.cursor = "grab";
                elementRef.current.style.zIndex = "1";
            }
        }
    };


    useEffect(() => {
        if (isDragging) {
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
        } else {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        }

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging, dragOffset, id, position]);

    return (
        <div
            ref={elementRef}
            className={`projectElement ${isDragging ? "projectDragging" : ""} ${isSelected ? "projectSelected" : ""}`}
            style={{
                position: "absolute",
                left: position.x,
                top: position.y,
                cursor: isDragging ? "grabbing" : "grab",
                transform: "translate(0, 0)", 
                zIndex: isDragging ? 1000 : isSelected ? 10 : 1,
            }}
            onMouseDown={handleMouseDown}
        >
            <div className="projectContainer">
                <h3 className="projectType">
                    {type}
                </h3>

                <div className="projectContent">
                    <div className="projectImgWrapper"> 
                        <img className="projectImg" src={img} alt={name} />
                    </div>

                    <div className="projectText">
                        <h4 className="projectName">{name}</h4>
                        <p className="projectDescription">{description}</p>
                    </div>

                    <div className="projectStack">
                        {
                            stack.map((element, index) => {
                                return (
                                    <div className="projectStackItem">
                                        {element}
                                    </div>
                                )
                            })
                        }
                    </div>


                </div>
            </div>
        </div>
    );
};

export default PortfolioItem;
