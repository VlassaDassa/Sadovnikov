'use client'

import React, { useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import PaginationSlider from '@/components/shared/paginationSlider';
import AdaptiveImage from '@/components/shared/AdaptiveImage';
import EmptySection from '@/components/shared/EmptySection';
import Button from '@/components/shared/button/Button';

import type { IFeatureItem } from '@/interfaces/general';

import styles from './index.module.scss';

interface KeyFeaturesProps {
    data: IFeatureItem[];
}

const KeyFeatures: React.FC<KeyFeaturesProps> = ({ data }) => {
    const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
    const [curIndex, setCurIndex] = useState<number>(1);
    const [isBeginning, setIsBeginning] = useState<boolean>(true);
    const [isEnd, setIsEnd] = useState<boolean>(data.length <= 1);

    const renderCondition =
        data.length === 0 ||
        (
            data.length === 1 &&
            (data[0].title === '' || data[0].text === '')
        );

    const updateSliderState = (swiper: SwiperType) => {
        setCurIndex(swiper.realIndex + 1);
        setIsBeginning(swiper.isBeginning);
        setIsEnd(swiper.isEnd);
    };

    const handlePrevSlide = () => {
        swiperInstance?.slidePrev();
    };

    const handleNextSlide = () => {
        swiperInstance?.slideNext();
    };

    return (
        <section className={`${styles.keyFeatures} container`}>
            <h2 className={`${styles.title} sectionTitle`}>
                KEY FEATURES
            </h2>

            {renderCondition ? (
                <EmptySection text="No key features" />
            ) : (
                <>
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={30}
                        onSwiper={(swiper) => {
                            setSwiperInstance(swiper);
                            updateSliderState(swiper);
                        }}
                        onSlideChange={updateSliderState}
                        className={styles.slider}
                    >
                        {data.map((item) => (
                            <SwiperSlide
                                key={item.id}
                                className={styles.slide}
                            >
                                <div className={styles.feature}>
                                    <div className={styles.featureWrapper}>
                                        <div className={styles.featureHeader}>
                                            <div className={styles.featureIconWrapper}>
                                                <AdaptiveImage
                                                    src={item.icon}
                                                    alt=""
                                                    ariaHidden={true}
                                                    wrapClass={styles.projectWrapPhoto}
                                                />
                                            </div>

                                            <h3 className={styles.featureTitle}>
                                                {item.title}
                                            </h3>
                                        </div>

                                        <p className={styles.featureText}>
                                            {item.text}
                                        </p>
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

                    <div className={styles.sliderControls}>
                        <Button 
                           behavior={isBeginning ? 'disabled' : 'default'}
                           iconPosition='only'
                           variant='dark'
                           additionalClass={styles.sliderButton}
                           onClick={handlePrevSlide}
                           icon='arrow'
                        />

                        <PaginationSlider
                            totalCountItems={data.length}
                            curIndex={curIndex}
                        />

                        <Button 
                           behavior={isEnd ? 'disabled' : 'default'}
                           iconPosition='only'
                           variant='dark'
                           additionalClass={`${styles.sliderButton} ${styles.sliderButtonRight}`}
                           onClick={handleNextSlide}
                           icon='arrow'
                        />
                    </div>
                </>
            )}
        </section>
    );
};

export default KeyFeatures;