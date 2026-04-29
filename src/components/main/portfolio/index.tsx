'use client'

import React from 'react';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';

const Canvas = dynamic(() => import('../canvas'), { ssr: false })
const Slider = dynamic(() => import('../slider'), { ssr: false })
const ProjectItem = dynamic(() => import('../projectItem'), { ssr: false })

import { RootState } from '@/store';
import { projects } from '@/mockData/projects';

import style from './index.module.scss';



const Portfolio: React.FC= () => {
    const breakpoint = useSelector((state: RootState) => state.breakpoint.value)


    const portfolioContent = (
        breakpoint === 'mobile' || breakpoint === 'tablet' ? 
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