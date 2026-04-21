import React from 'react';

import Canvas from '../canvas';
import Slider from '../slider';
import ProjectItem from '../projectItem';

import type { Breakpoint } from '@/interfaces/general';

import { projects } from '@/mockData/projects';

import style from './index.module.scss';

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
                        <ProjectItem key={project.id} project={project} index={index} />
                    ))
                }
            </Canvas>
    )

    return (
        <section className={style.portfolio}>
            <h2 className={`sectionTitle ${style.portfolioTitle}`}>PORTFOLIO</h2>

            {portfolioContent}
        </section>
    )
}


export default Portfolio;