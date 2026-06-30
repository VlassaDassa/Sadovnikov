'use client'

import React, { useState, useRef } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

import DashboardTitle from "../../general/dashboardTitle";
import SectionBackground from "../../general/sectionBackground";
import AdaptiveImage from "@/components/shared/AdaptiveImage";
import Icon from "@/components/shared/icons/Icon";
import Button from "@/components/shared/button/Button";

import { IImages, IProject } from "@/interfaces/general";
import { defaultImage } from "@/mockData/projects";

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
                        strokeColor={cssVars.neutral_600}
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


interface RecentProjectsProps {
    projects: IProject[]
}

const RecentProjects: React.FC<RecentProjectsProps> = ({ projects }) => {
    const breakpoint = useSelector((state: RootState) => state.breakpoint.value)
    const [data, setData] = useState<IProject[]>(projects)
    const [curIndex, setCurIndex] = useState<number>(1)
    const swiperRef = useRef<SwiperType | null>(null);
    const countProjectView = {
        mobile: 3,
        desktop: 3,
        tablet: 2,
    }


    const addProject = () => {
        const newProject: IProject = {
            id: Date.now(),
            category: 'Site',
            images: [{id: Date.now(), image: defaultImage, main: true}],
            teamType: 'solo',
            name: 'Новый проект',
            shortDescrition: 'Краткое описание',
            previewDescription: 'Описание для превью',
            stack: [],
            keyFeatures: [],
            description: [],
            metrics: [],
            commits: [],
            date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
            developmentTime: '1 week',
            gitHubLink: '',
            demoLink: '',
            numberTeam: 1,
        };
        
        setData(prev => [...prev, newProject]);

        const newLength = data.length + 1;
        setTimeout(() => {
            if (swiperRef.current) {
                swiperRef.current.slideTo(newLength - 1);
            }
            setCurIndex(newLength);
        }, 50);
        
        // TODO Переход на страницу редактирования нового проекта
    };

    
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
                    onSwiper={(swiper) => { swiperRef.current = swiper; }} 
                >
                    {Array.from({ length: Math.ceil(data.length / countProjectView[breakpoint]) }).map((_, i) => {
                        const start = i * countProjectView[breakpoint];
                        const end = start + countProjectView[breakpoint];
                        const projectsForSlide = data.slice(start, end);
                        
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
                    onClick={addProject}
                />
            </SectionBackground>
        </section>
    )
}

export default RecentProjects;