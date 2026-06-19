'use client'

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import SectionBackground from '@/components/admin/general/sectionBackground';
import SectionTitle from '@/components/admin/general/sectionTitle';
import AdaptiveImage from '@/components/shared/AdaptiveImage';
import Button from '@/components/shared/button/Button';
import PaginationSlider from '@/components/shared/paginationSlider';
import Input from '@/components/shared/input';
import Icon from '@/components/shared/icons/Icon';

import type { IProject } from '@/interfaces/general';

import styles from './index.module.scss';
import { cssVars } from '@/styles/cssVariables';
import 'swiper/css';




interface KeyFeaturesProps {
    projects: IProject[];
    projectId: number;
    setData: React.Dispatch<React.SetStateAction<IProject[]>>;
}

const KeyFeatures: React.FC<KeyFeaturesProps> = ({ projects, projectId, setData }) => {
    const project = projects.find(proj => proj.id === projectId)
    const [curIndex, setCurIndex] = useState<number>(1)
    const totalCountItems = project?.keyFeatures.length || 0

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
                                maxCounter={400}
                            />

                            <div className={styles.imgContainer}>
                                <div className={styles.loadImageWrapper}>
                                    <p className={styles.inputLabel}>Image</p>

                                    <AdaptiveImage 
                                        src={feature.photo}
                                        alt={'Feature photo'}
                                        wrapClass={styles.wrapImage}
                                        imgClass={styles.image}
                                    />

                                    <Icon 
                                        name='pen'
                                        fillColor={cssVars.white}
                                        iconClass={styles.pen}
                                    />

                                    <p className={styles.inputLabel}>11:9 (309x252)</p>
                                </div>

                                <div className={styles.loadImageWrapper}>
                                    <p className={styles.inputLabel}>Icon</p>

                                    <AdaptiveImage 
                                        src={feature.icon}
                                        alt={'Feature photo'}
                                        wrapClass={styles.wrapIcon}
                                        imgClass={styles.icon}
                                    />

                                    <Icon 
                                        name='pen'
                                        fillColor={cssVars.white}
                                        iconClass={styles.pen}
                                    />

                                    <p className={styles.inputLabel}>*.svg</p>
                                </div>
                            </div>
                            
                            <div className={styles.btnWrapper}>
                                <Button 
                                    behavior='default'
                                    iconPosition='leftIcon'
                                    icon='plus'
                                    text='Add New Feature'
                                    variant='black'
                                    additionalClass={styles.addBtn}
                                />

                                <Button 
                                    behavior='default'
                                    iconPosition='leftIcon'
                                    icon='trash'
                                    text='Delete'
                                    variant='black'
                                    additionalClass={styles.deleteBtn}
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