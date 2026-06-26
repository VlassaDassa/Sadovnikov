'use client'

import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

import SectionBackground from '@/components/admin/general/sectionBackground';
import SectionTitle from '@/components/admin/general/sectionTitle';
import Button from '@/components/shared/button/Button';
import PaginationSlider from '@/components/shared/paginationSlider';
import Input from '@/components/shared/input';
import KeyFeatureImageUpload from './KeyFeatureImageUpload';

import { EditProjectProps } from '@/interfaces/general';

import { cssVars } from '@/styles/cssVariables';
import styles from './index.module.scss';
import 'swiper/css';





const KeyFeatures: React.FC<EditProjectProps> = ({ projects, projectId, setData }) => {
    const project = projects.find(proj => proj.id === projectId)
    const [curIndex, setCurIndex] = useState<number>(1)
    const swiperRef = useRef<SwiperType | null>(null);
    const totalCountItems = project?.keyFeatures.length || 0


    if (!project) {
        return <div className={styles.notFound}>Проект не найден</div>;
    }

    const handleChangeFeature = <T extends keyof typeof project.keyFeatures[0]>(
        featureId: number,
        field: T,
        value: string
    ) => {
        setData(prev =>
            prev.map(project =>
                project.id === projectId
                    ? {
                        ...project,
                        keyFeatures: project.keyFeatures.map(feature =>
                            feature.id === featureId
                                ? { ...feature, [field]: value }
                                : feature
                        )
                    }
                    : project
            )
        );
    };

    const handleDeleteKeyFeature = (featureId: number) => {
        setData(prev =>
            prev.map(project => {
                if (project.id !== projectId) return project;
                
                if (project.keyFeatures.length <= 1) {
                    return project;
                }
                
                return {
                    ...project,
                    keyFeatures: project.keyFeatures.filter(
                        feature => feature.id !== featureId
                    ),
                };
            })
        );
    };

    const handleAddKeyFeature = () => {
        if (project.keyFeatures.length >= 6) return;

        setData(prev =>
            prev.map(project => {
                if (project.id !== projectId) return project;
                
                const newFeature = {
                    id: Date.now() + project.keyFeatures.length + 1,
                    title: '',
                    text: '',
                    icon: '/images/mockImages/featureIcon.svg',
                    photo: '/images/mockImages/featureIcon.svg',
                };
                
                const newLength = project.keyFeatures.length + 1;
                setTimeout(() => {
                    if (swiperRef.current) {
                        swiperRef.current.slideTo(newLength - 1);
                    }
                    setCurIndex(newLength);
                }, 50);
                
                return {
                    ...project,
                    keyFeatures: [...project.keyFeatures, newFeature],
                };
            })
        );
    };

    return (
        <section className={`${styles.section}`}>
            <SectionTitle 
                title='KEY FEATURES'
                text='Add and manage key features of the project'
            />

            <Swiper
                spaceBetween={30}
                slidesPerView={1} 
                centeredSlides={true}
                className={`${styles.slider}`}
                grabCursor={true}
                speed={700} 
                onSwiper={(swiper) => { swiperRef.current = swiper; }}
                
                onRealIndexChange={(swiper) => setCurIndex(swiper.activeIndex + 1)}
                pagination={true}
                modules={[Pagination]}
            >
                {project?.keyFeatures.map(feature => (
                    <SwiperSlide key={feature.id} className={styles.sliderItem}>
                        <SectionBackground className={styles.sectionBg}>
                            <Input 
                                placeholder='Text...'
                                name='title'
                                value={feature.title}
                                additionalClass={styles.input}
                                iconPosition='noIcon'
                                maxLen={200}
                                variant='admin'
                                adminLabel='withLabel'
                                label='Title'
                                onChange={(e) => handleChangeFeature(feature.id, 'title', e.target.value)}
                            />

                            <Input 
                                placeholder='Text...'
                                name='description'
                                type='textarea'
                                value={feature.text}
                                additionalClass={styles.textarea}
                                iconPosition='noIcon'
                                maxLen={200}
                                variant='admin'
                                adminLabel='withLabel'
                                label='Description'
                                counter={true}
                                maxCounter={200}
                                onChange={(e) => handleChangeFeature(feature.id, 'text', e.target.value)}
                            />

                            <div className={styles.imgContainer}>
                                <KeyFeatureImageUpload
                                    projectId={projectId}
                                    featureId={feature.id}
                                    field="photo"
                                    src={feature.photo}
                                    label="Image"
                                    sizeInfo="11:9 (309x252)"
                                    setData={setData}
                                />

                                <KeyFeatureImageUpload
                                    projectId={projectId}
                                    featureId={feature.id}
                                    field="icon"
                                    src={feature.icon}
                                    label="Icon"
                                    sizeInfo="*.svg"
                                    setData={setData}
                                />
                            </div>
                            
                            <div className={styles.btnWrapper}>
                                <Button 
                                    behavior={project.keyFeatures.length >= 6 ? 'disabled' : 'default'}
                                    iconPosition='leftIcon'
                                    icon='plus'
                                    text='Add New Feature'
                                    variant='black'
                                    additionalClass={styles.addBtn}
                                    onClick={handleAddKeyFeature}
                                    
                                />

                                <Button 
                                    behavior={project.keyFeatures.length === 1 ? 'disabled' : 'default'}
                                    iconPosition='leftIcon'
                                    icon='trash'
                                    text='Delete'
                                    variant='black'
                                    colorIcon={cssVars.error_600}
                                    additionalClass={styles.deleteBtn}
                                    onClick={() => handleDeleteKeyFeature(feature.id)}
                                />
                            </div>
                        </SectionBackground>
                    </SwiperSlide>
                ))}

                <PaginationSlider totalCountItems={totalCountItems} curIndex={curIndex} /> 
            </Swiper>
        </section>
    )
}

export default KeyFeatures;