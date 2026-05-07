'use client'

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import PaginationSlider from '@/components/general/paginationSlider';
import Button from '@/components/general/button/Button';
import Icon from '@/components/icons/Icon';
import AdaptiveImage from '@/components/general/AdaptiveImage';

import styles from './index.module.scss';
import { cssVars } from '@/styles/cssVariables';


const projectImg1 = '/images/mockImages/specTecno.png'
const testPhoto = '/images/mockImages/testPhoto.png'

const ProjectPreview: React.FC = () => {
    const [curIndex, setCurIndex] = useState<number>(1)

    return (
        <section className={`${styles.projectPreview} container`}>

            <div className={styles.textContent}>
                <div className={styles.metadata}>
                    <div className={styles.metadataItem}>
                        <Icon 
                            name={'calendar'}
                            strokeColor={cssVars.brand_600}
                            fillColor='none'
                            size={20}
                            />
                        <p className={styles.metadataText}>June 24</p>
                    </div>
                    
                    <span className={styles.divider} />

                    <div className={styles.metadataItem}>
                        <Icon
                            name={'time'}
                            strokeColor={cssVars.brand_600}
                            fillColor='none'
                            size={20} 
                            />
                        <p className={styles.metadataText}>3 weeks</p>
                    </div>

                    <span className={styles.divider} />

                    <div className={styles.metadataItem}>
                        <Icon 
                            name={'person'}
                            strokeColor={cssVars.brand_600}
                            fillColor={cssVars.brand_600}
                            size={20}
                        />
                        <p className={styles.metadataText}>Solo project</p>
                    </div>
                </div>

                <div className={styles.textWrapper}>
                    <div className={styles.siteNameWrapper}>
                        <h1 className={styles.name}>SpecTechnologia</h1>
                        <h2 className={styles.subname}>Corporate Website</h2>
                    </div>

                    <p className={styles.shortDescription}>
                        A modern corporate website for a technology company specializing in 
                        security systems and software solutions. Built with performance, 
                        accessibility and a clean user experience in mind
                    </p>
                </div>
                
                <div className={styles.btnWrapper}>
                    <Button
                        behavior='default'
                        iconPosition='leftIcon'
                        variant='dark'
                        text={'GitHub'}
                        icon={'github'}
                    />

                    <Button
                        behavior='default'
                        iconPosition='leftIcon'
                        variant='primary'
                        text={'Live Demo'}
                        icon={'internet'}
                    />
                </div>
            </div>

            <div className={styles.photoContainer}>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={20}  
                    onRealIndexChange={(swiper) => setCurIndex(swiper.activeIndex + 1)}
                    pagination={true}   
                    className={styles.swiper}   
                >
                    <SwiperSlide>
                        <AdaptiveImage 
                            src={projectImg1}
                            alt={'project'}
                            loading='eager'
                            ariaHidden={false}
                            wrapClass={styles.projectWrapPhoto}
                            imgClass={styles.projectPhoto}
                            ariaLabel={'photo'}
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <AdaptiveImage 
                            src={testPhoto}
                            alt={'project'}
                            loading='eager'
                            ariaHidden={false}
                            wrapClass={styles.projectWrapPhoto}
                            imgClass={styles.projectPhoto}
                            ariaLabel={'photo'}
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <AdaptiveImage 
                            src={projectImg1}
                            alt={'project'}
                            loading='eager'
                            ariaHidden={false}
                            wrapClass={styles.projectWrapPhoto}
                            imgClass={styles.projectPhoto}
                            ariaLabel={'photo'}
                        />
                    </SwiperSlide>

                    <PaginationSlider totalCountItems={3} curIndex={curIndex} />
                </Swiper>
            </div>
            
        </section>
    )
}

export default ProjectPreview;

