'use client'

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import PaginationSlider from '@/components/general/paginationSlider';
import AdaptiveImage from '@/components/general/AdaptiveImage';

import styles from './index.module.scss';


const featureIcon = '/images/mockImages/featureIcon.svg';


const KeyFeatures: React.FC = () => {
    const [curIndex, setCurIndex] = useState<number>(1)


    return (
        <section className={`${styles.keyFeatures} container`}>
            <h2 className={`${styles.title} sectionTitle`}>KEY FEATURES</h2>

            <Swiper
                slidesPerView={1}
                spaceBetween={20}  
                onRealIndexChange={(swiper) => setCurIndex(swiper.activeIndex + 1)}
                pagination={true}   
                className={styles.slider}   
            >
                <SwiperSlide className={styles.slide}>
                    <div className={styles.feature}>
                        <div className={styles.featureHeader}>
                            <div className={styles.featureIconWrapper}>
                                <AdaptiveImage 
                                    src={featureIcon}
                                    alt={''}
                                    ariaHidden={true}
                                    wrapClass={styles.projectWrapPhoto}
                                />
                            </div>

                            <h3 className={styles.featureTitle}>Full responsive design</h3>
                        </div>

                        <p className={styles.featureText}>
                            Initially, 3 versions were made for each project page
                            (desktop, tablet, mobile). And each page looks great on any screen
                            resolution. The Mobile First approach was used during
                            development for easy adaptation 
                        </p>
                    </div>
                </SwiperSlide>
                <SwiperSlide className={styles.slide}>
                    <div className={styles.feature}>
                        <div className={styles.featureHeader}>
                            <div className={styles.featureIconWrapper}>
                                <AdaptiveImage 
                                    src={featureIcon}
                                    alt={''}
                                    ariaHidden={true}
                                    wrapClass={styles.projectWrapPhoto}
                                />
                            </div>

                            <h3 className={styles.featureTitle}>Full responsive design</h3>
                        </div>

                        <p className={styles.featureText}>
                            Initially, 3 versions were made for each project page
                            (desktop, tablet, mobile). And each page looks great on any screen
                            resolution. The Mobile First approach was used during
                            development for easy adaptation 
                        </p>
                    </div>
                </SwiperSlide>
                <SwiperSlide className={styles.slide}>
                    <div className={styles.feature}>
                        <div className={styles.featureHeader}>
                            <div className={styles.featureIconWrapper}>
                                <AdaptiveImage 
                                    src={featureIcon}
                                    alt={''}
                                    ariaHidden={true}
                                    wrapClass={styles.projectWrapPhoto}
                                />
                            </div>

                            <h3 className={styles.featureTitle}>Full responsive design</h3>
                        </div>

                        <p className={styles.featureText}>
                            Initially, 3 versions were made for each project page
                            (desktop, tablet, mobile). And each page looks great on any screen
                            resolution. The Mobile First approach was used during
                            development for easy adaptation 
                        </p>
                    </div>
                </SwiperSlide>
            </Swiper>

            <PaginationSlider totalCountItems={3} curIndex={curIndex} />
    </section>
    )
}

export default KeyFeatures;