'use client'

import React from 'react';
import { Prisma } from '@prisma/client';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';

const Canvas = dynamic(() => import('../canvas'), { ssr: false })
const Slider = dynamic(() => import('../slider'), { ssr: false })
const ProjectItem = dynamic(() => import('../projectItem'), { ssr: false })

import { RootState } from '@/store';

import style from './index.module.scss';


export type Project = Prisma.ProjectGetPayload<{
    include: {
        images: true;
        stack: true;
        description: true;
    };
}>;

// Теперь в компоненте
interface PortfolioProps {
    projects: Project[];
}


const Portfolio: React.FC<PortfolioProps> = ({ projects }) => {
    const breakpoint = useSelector((state: RootState) => state.breakpoint.value)


    const portfolioContent = (
        breakpoint === 'mobile' || breakpoint === 'tablet' ? 
            <Slider projects={projects} /> 
            :
            <Canvas>
                {
                    projects.length === 0 ? 
                        <p className={style.notFound}>PROJECTS NOT FOUND</p>
                    :
                    projects.map((project, index) => (
                        <ProjectItem key={project.id} project={project} index={index} />
                    ))
                    
                }
            </Canvas>
    )

    return (
        <section id="portfolio" className={style.portfolio}>
            <h2 className={`sectionTitle ${style.portfolioTitle}`}>PORTFOLIO</h2>

            {portfolioContent}
        </section>
    )
}


export default Portfolio;