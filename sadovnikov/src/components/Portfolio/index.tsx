import React, { useState } from "react";

import Canvas from "../Canvas";
import PortfolioItem from "../PortfolioItem";

import { projectsData } from "../../mockData/portfolio";
import type { IProject } from "../../mockData/portfolio";

import "./index.scss";




const Portfolio: React.FC = () => {
    const [projects, setProjects] = useState<IProject[]>(projectsData);
   
    const [canvasSize, setCanvasSize] = useState<{
        width: number;
        height: number;
    }>({ width: 3000, height: 1000 });

    

    return (
        <section className="portfolio">
			<h2 className="title portfolioTitle">PORTFOLIO</h2>
			<div className="canvasBox">
				<div className="canvasSection">
					<Canvas width={canvasSize.width} height={canvasSize.height}>
						{projects.map((project) => (
							<PortfolioItem
								key={project.id}
								id={project.id}
								defaultPosition={{ x: project.x, y: project.y }}

                                type={project.type}
                                name={project.name}
                                description={project.description}
                                stack={project.stack}
                                img={project.img}
							/>
								
							
						))}
					</Canvas>
				</div>
			</div>
        </section>
    );
};

export default Portfolio;
