import React from 'react';

import Canvas from '../canvas';
import Slider from '../slider';
import ProjectItem from '../projectItem';

import type { Breakpoint } from '../../../interfaces/general';

import { projects } from '../../../mockData/projects';

import './index.scss';

interface PortfolioProps {
    breakpoint: Breakpoint;
}


const Portfolio: React.FC<PortfolioProps> = ({ breakpoint }) => {

    const portfolioContent = (
        breakpoint === 'mobile' ? 
            <Slider projects={projects} /> 
            :
            <Canvas>
                {
                    projects.map((project, index) => (
                        <ProjectItem key={project.id} project={project} />
                    ))
                }
            </Canvas>
    )

    return (
        <section className="portfolio">
            <h2 className="heading-32-magra-bold whiteText sectionTitle">PORTFOLIO</h2>

            {portfolioContent}

        </section>
    )
}

// Сделать ProjectItem нормальным размеров и нормально их разбросать
// Зарефакторить код, добавив свои токены
// Поработать над адаптацией

export default Portfolio;