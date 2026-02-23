import React, { useState, useRef } from "react";

import "./index.scss";



interface PortfolioItemProps {
    id: number | string;
    defaultPosition?: { x: number; y: number };
   
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
    type,
    name,
    description,
    stack,
    img
}) => {
    const [position, setPosition] = useState<{ x: number; y: number }>(
        defaultPosition,
    );

    const elementRef = useRef<HTMLDivElement>(null);


    return (
        <div
            ref={elementRef}
            className="projectElement"
            style={{
                position: "absolute",
                left: position.x,
                top: position.y,
                transform: "translate(0, 0)", 
            }}
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
                                    <div className="projectStackItem" key={element}>
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
