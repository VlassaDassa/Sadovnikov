'use client'

import React, { useState, useRef } from "react";
import { useDispatch } from 'react-redux';
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
import SavingIndicator from "@/components/shared/SavingIndicator";

import { IImages, IProject } from "@/interfaces/general";
import { defaultImage } from "@/mockData/projects";
import { createProject } from "@/app/actions/project";
import { showMessage } from '@/lib/showMessage';
import { featureIcon, featurePhoto1 } from "@/mockData/projects";  

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
    const [isCreating, setIsCreating] = useState<boolean>(false)
    const [curIndex, setCurIndex] = useState<number>(1)
    const swiperRef = useRef<SwiperType | null>(null);
    const dispatch = useDispatch()
    const countProjectView = {
        mobile: 3,
        desktop: 3,
        tablet: 2,
    }


    const addProject = async () => {
        setIsCreating(true)

        const newProject: IProject = {
            id: Date.now(),
            category: 'Site',
            images: [{id: Date.now(), image: defaultImage, main: true}],
            teamType: 'solo',
            name: 'Новый проект',
            shortDescrition: 'Краткое описание',
            previewDescription: 'Описание для превью',
            stack: [],
            keyFeatures: [
                {
                    id: 1,
                    title: '',
                    text: '',
                    icon: featureIcon,
                    photo: featurePhoto1
                },
            ],
            description: [
                {
                    id: 1,
                    title: 'Site',
                    icon: 'text',
                    content: ''
                },
                {
                    id: 2,
                    title: 'WHY I STARTED',
                    icon: 'rocket',
                    content: ''
                },
                {
                    id: 3,
                    title: 'CHALLENGES & SOLUTIONS',
                    icon: 'puzzle',
                    content: ''
                },
                {
                    id: 4,
                    title: 'CONCLUSION',
                    icon: 'flag',
                    content: ''
                },
                {
                    id: 5,
                    title: 'FUTURE PLANS',
                    icon: 'time',
                    content: ''
                }
            ],
            metrics: [
                {
                    id: 1,
                    icon: 'speed',
                    title: 'Performance',
                    text: 'Speed and performance',
                    current: 0,
                    max: 100,
                    type: 'score'
                },
                {
                    id: 2,
                    icon: 'loadTime',
                    title: 'Load time',
                    text: 'Average loading time',
                    current: 0,
                    max: 10,
                    type: 'time'
                },
                {
                    id: 3,
                    icon: 'search',
                    title: 'SEO',
                    text: 'Search engine optimization',
                    current: 0,
                    max: 100,
                    type: 'score'
                },
                {
                    id: 4,
                    icon: 'accessibility',
                    title: 'Accessibility',
                    text: 'Lighehouse, A11y',
                    current: 0,
                    max: 100,
                    type: 'score'
                }
            ],
            commits: [],
            date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
            developmentTime: '1 week',
            gitHubLink: '',
            demoLink: '',
            numberTeam: 1,
        };

        try {
            const result = await createProject(newProject)

            if (result.success && result.project) {
                setData(prev => [...prev, result.project])

                const newLength = data.length + 1;
                setTimeout(() => {
                    if (swiperRef.current) {
                        swiperRef.current.slideTo(newLength - 1);
                    }
                    setCurIndex(newLength);
                }, 50);

                showMessage('info', 'Project has been created', dispatch)
            }
        } catch (error) {
            showMessage('error', 'Error creating project', dispatch)
            console.error('Error creating project', error)
        }
        finally {
            setIsCreating(false)
        }
    };

    
    return (
        <section className={`${styles.section} container`}>
            <SavingIndicator isSaving={isCreating} />

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
                    behavior={isCreating ? 'loading' : 'default'}
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