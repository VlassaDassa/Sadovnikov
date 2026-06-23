'use client'

import React from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

import DashboardTitle from "../../general/dashboardTitle";
import SectionBackground from "../../general/sectionBackground";
import AdaptiveImage from "@/components/shared/AdaptiveImage";
import Icon from "@/components/shared/icons/Icon";
import Button from "@/components/shared/button/Button";

import { IImages } from "@/interfaces/general";
import { projects } from "@/mockData/projects";

import { cssVars } from "@/styles/cssVariables";
import styles from './index.module.scss';



interface EditProjectProps {
    id: number,
    name: string,
    img: IImages,
    shortDescrition: string,
    date: string,
}

const EditProject: React.FC<EditProjectProps> = ({ id, name, img, shortDescrition, date }) => {
    const breakpoint = useSelector((state: RootState) => state.breakpoint.value)
    const iconSize = breakpoint === 'mobile' ? 12 : 20

    return (
        <SectionBackground className={styles.projectBg}>
            <div className={styles.imageWrapper}>
                <AdaptiveImage 
                    src={img.image}
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
                        size={iconSize}
                    />
                    <p className={styles.date}>{date}</p>
                </div>

                <div className={styles.titleWrapper}>
                    <h3 className={styles.title}>{name}</h3>
                    <p className={styles.shortDescription}>{shortDescrition}</p>
                </div>

                {
                    breakpoint === 'mobile' ?
                        <Link className={styles.btnText} href={`editProject/${id}`}>
                            EDIT
                        </Link>
                    :
                        <Link className={styles.btnLink} href={`editProject/${id}`}>
                            <Button
                                behavior="default"
                                variant="dark"
                                iconPosition="only"
                                icon="pen"
                                additionalClass={styles.btn}
                            />
                        </Link>
                    }
                
            </div>
        </SectionBackground>
    )
}




const RecentProjects: React.FC = () => {
    const breakpoint = useSelector((state: RootState) => state.breakpoint.value)
    const countProjectView = {
        mobile: 3,
        desktop: 3,
        tablet: 2,
    }
    
    return (
        <section className={`${styles.section} container`}>
            <SectionBackground>
                <div className={styles.title}>
                    <DashboardTitle text='RECENT PROJECTS' additionalClass={styles.titleText} /> 
                    <p className={styles.subtitle}>Quick access to your projects management</p>
                </div>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={10}  
                    className={styles.swiper}   
                >
                    {Array.from({ length: Math.ceil(projects.length / countProjectView[breakpoint]) }).map((_, i) => {
                        const start = i * countProjectView[breakpoint];
                        const end = start + countProjectView[breakpoint];
                        const projectsForSlide = projects.slice(start, end);
                        
                        return (
                            <SwiperSlide key={i}>
                                <div className={styles.projectWrapper}>
                                    {projectsForSlide.map(project => (
                                        <EditProject 
                                            key={project.id}
                                            id={project.id}
                                            name={project.name}
                                            img={project.images.find((item) => item.main)!} // !!! 
                                            shortDescrition={project.shortDescrition}
                                            date={project.date}
                                        />
                                    ))}
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
                
                <Button 
                    behavior="default"
                    iconPosition="leftIcon"
                    variant="black"
                    text="Add New Project"
                    icon="plus"
                    additionalClass={styles.addButton}
                />
            </SectionBackground>
        </section>
    )
}

export default RecentProjects;