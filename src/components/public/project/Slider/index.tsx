'use client'

import React, { useMemo, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import AdaptiveImage from '@/components/shared/AdaptiveImage';
import PaginationSlider from '@/components/shared/paginationSlider';
import Button from '@/components/shared/button/Button';

import type { IImages } from '@/interfaces/general';

import styles from './index.module.scss';

interface SliderProps {
    images: IImages[];
}

const Slider: React.FC<SliderProps> = ({ images }) => {
    const sortedImages = useMemo(() => {
        return [...images].sort((a, b) => {
            if (a.main && !b.main) return -1;
            if (!a.main && b.main) return 1;

            return 0;
        });
    }, [images]);

    const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
    const [curIndex, setCurIndex] = useState<number>(1);
    const [isBeginning, setIsBeginning] = useState<boolean>(true);
    const [isEnd, setIsEnd] = useState<boolean>(sortedImages.length <= 1);

    const updateSliderState = (swiper: SwiperType) => {
        setCurIndex(swiper.realIndex + 1);
        setIsBeginning(swiper.isBeginning);
        setIsEnd(swiper.isEnd);
    };

    const handlePrevSlide = () => {
        if (!swiperInstance || swiperInstance.isBeginning) return;

        swiperInstance.slidePrev();
    };

    const handleNextSlide = () => {
        if (!swiperInstance || swiperInstance.isEnd) return;

        swiperInstance.slideNext();
    };

    const hasNavigation = sortedImages.length > 1;

    return (
        <div className={styles.photoContainer}>
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                onSwiper={(swiper) => {
                    setSwiperInstance(swiper);
                    updateSliderState(swiper);
                }}
                onSlideChange={updateSliderState}
                className={styles.swiper}
            >
                {sortedImages.map((item) => (
                    <SwiperSlide key={item.id}>
                        <AdaptiveImage
                            src={item.image}
                            alt="Project"
                            loading="eager"
                            ariaHidden={false}
                            wrapClass={styles.projectWrapPhoto}
                            imgClass={styles.projectPhoto}
                            ariaLabel="Project photo"
                        />
                    </SwiperSlide>
                ))}

                {hasNavigation && (
                    <PaginationSlider
                        className={styles.pagination}
                        totalCountItems={sortedImages.length}
                        curIndex={curIndex}
                    />
                )}
            </Swiper>

            {hasNavigation && (
                <>
                    <div
                        className={`${styles.sliderButtonWrapper} ${styles.sliderButtonWrapperLeft}`}
                    >
                        <Button
                            behavior={isBeginning ? 'disabled' : 'default'}
                            iconPosition="only"
                            variant="dark"
                            additionalClass={`${styles.sliderButton} ${styles.sliderButtonLeft}`}
                            onClick={handlePrevSlide}
                            icon="arrow"
                        />
                    </div>

                    <div
                        className={`${styles.sliderButtonWrapper} ${styles.sliderButtonWrapperRight}`}
                    >
                        <Button
                            behavior={isEnd ? 'disabled' : 'default'}
                            iconPosition="only"
                            variant="dark"
                            additionalClass={`${styles.sliderButton} ${styles.sliderButtonRight}`}
                            onClick={handleNextSlide}
                            icon="arrow"
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default Slider;