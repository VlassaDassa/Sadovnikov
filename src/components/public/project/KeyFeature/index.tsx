'use client'

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import PaginationSlider from '@/components/shared/paginationSlider';
import AdaptiveImage from '@/components/shared/AdaptiveImage';

import type { IFeatureItem } from '@/interfaces/general';

import styles from './index.module.scss';




interface KeyFeaturesProps {
    data: IFeatureItem[],
}


const KeyFeatures: React.FC<KeyFeaturesProps> = ({ data }) => {
    const [curIndex, setCurIndex] = useState<number>(1)


    return (
        <section className={`${styles.keyFeatures} container`}>
            <h2 className={`${styles.title} sectionTitle`}>KEY FEATURES</h2>

            <Swiper
                slidesPerView={1}
                spaceBetween={30}  
                onRealIndexChange={(swiper) => setCurIndex(swiper.activeIndex + 1)}
                pagination={true}   
                className={styles.slider}   
            >
                {data.map((item) => (
                    <SwiperSlide key={item.id} className={styles.slide}>
                        <div className={styles.feature}>
                            <div className={styles.featureWrapper}>
                                <div className={styles.featureHeader}>
                                    <div className={styles.featureIconWrapper}>
                                        <AdaptiveImage 
                                            src={item.icon}
                                            alt={''}
                                            ariaHidden={true}
                                            wrapClass={styles.projectWrapPhoto}
                                        />
                                    </div>

                                    <h3 className={styles.featureTitle}>{item.title}</h3>
                                </div>

                                <p className={styles.featureText}>{item.text}</p>
                            </div>

                            <div className={styles.photoWrapper}>
                                <AdaptiveImage
                                    src={item.photo}
                                    alt={item.title}
                                    imgClass={styles.featurePhoto}
                                    wrapClass={styles.featurePhotoWrapper}
                                />
                            </div>
                            
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <PaginationSlider totalCountItems={3} curIndex={curIndex} />
    </section>
    )
}

export default KeyFeatures;