'use client'

import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import DashboardTitle from "../general/dashboardTitle";
import SectionBackground from "../general/sectionBackground";
import AdaptiveImage from "@/components/shared/AdaptiveImage";
import Icon from "@/components/shared/icons/Icon";

import { projects } from "@/mockData/projects";

import { cssVars } from "@/styles/cssVariables";
import styles from './index.module.scss';



interface EditProjectProps {
    name: string,
    img: string,
    shortDescrition: string,
    date: string,
}

const EditProject: React.FC<EditProjectProps> = ({ name, img, shortDescrition, date }) => {
    return (
        <SectionBackground className={styles.projectBg}>
            <div className={styles.imageWrapper}>
                <AdaptiveImage 
                    src={img}
                    alt="SpecTechno"
                    wrapClass={styles.projectImg}
                />
                <div className={styles.innerShadow}></div>
            </div>
            

            <div className={styles.projectContent}>
                <div className={styles.dateWrapper}>
                    <Icon 
                        name='calendar'
                        fillColor={cssVars.neutral_600}
                        strokeColor={'none'}
                        size={12}
                    />
                    <p className={styles.date}>{date}</p>
                </div>

                <div className={styles.titleWrapper}>
                    <h3 className={styles.title}>{name}</h3>
                    <p className={styles.shortDescription}>{shortDescrition}</p>
                </div>

                <p className={styles.btnText}>EDIT</p>
            </div>
        </SectionBackground>
    )
}




const RecentProjects: React.FC = () => {
    return (
        <section className={`${styles.section} container`}>
            <SectionBackground>
                <div className={styles.title}>
                    <DashboardTitle text='RECENT PROJECTS' additionalClass={styles.titleText} /> 
                    <p className={styles.subtitle}>Quick access to your projects management</p>
                </div>
                <Swiper
                    slidesPerView={1.005}
                    spaceBetween={10}  
                    className={styles.swiper}   
                >
                    {Array.from({ length: Math.ceil(projects.length / 3) }).map((_, i) => {
                        const start = i * 3;
                        const end = start + 3;
                        const projectsForSlide = projects.slice(start, end);
                        
                        return (
                            <SwiperSlide key={i}>
                                <div className={styles.projectWrapper}>
                                    {projectsForSlide.map(project => (
                                        <EditProject 
                                            key={project.id}
                                            name={project.name}
                                            img={project.img}
                                            shortDescrition={project.shortDescrition}
                                            date={project.date}
                                        />
                                    ))}
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
                
                
            </SectionBackground>
        </section>
    )
}

export default RecentProjects;