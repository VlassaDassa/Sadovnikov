'use client'

import React from 'react';
import { useSelector } from 'react-redux';

import Canvas from '../canvas';
import Slider from '../slider';
import ProjectItem from '../projectItem';

import { RootState } from '@/store';
import { projects } from '@/mockData/projects';

import style from './index.module.scss';



const Portfolio: React.FC= () => {
    const breakpoint = useSelector((state: RootState) => state.breakpoint.value)


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