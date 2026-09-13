'use client'

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import type { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import AdaptiveImage from '@/components/shared/AdaptiveImage';
import EmptySection from '@/components/shared/EmptySection';
import Icon from '@/components/shared/icons/Icon';
import { cssVars } from '@/styles/cssVariables';

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

    const t = useTranslations('KeyFeatures')

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
        <section className={`${renderCondition ? `${styles.keyFeaturesNone} ${styles.keyFeatures}` : styles.keyFeatures} container`}>
            <h2 className={`${styles.title} sectionTitle`}>
                {t('Title')}
            </h2>

            {renderCondition ? (
                <EmptySection text={t('Empty')} />
            ) : (
                <>
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={30}
                        speed={750}
                        onSwiper={(swiper) => {
                            setSwiperInstance(swiper);
                            updateSliderState(swiper);
                        }}
                        onSlideChange={updateSliderState}
                        className={styles.slider}
                    >
                        {data.map((item, index) => (
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
                                                    loading={
                                                        index === 0
                                                            ? 'eager'
                                                            : 'lazy'
                                                    }
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
                                            loading={
                                                index === 0
                                                    ? 'eager'
                                                    : 'lazy'
                                            }
                                            imgClass={styles.featurePhoto}
                                            wrapClass={styles.featurePhotoWrapper}
                                        />
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <div className={styles.sliderControls}>
                        <span className={styles.counter} aria-live="polite">
                            <strong>{String(curIndex).padStart(2, '0')}</strong> / {String(data.length).padStart(2, '0')}
                        </span>
                        <button type="button" className={styles.sliderButton} disabled={isBeginning} onClick={handlePrevSlide} aria-label={t('Previous')}>
                            <Icon name="arrow" size={20} strokeColor={cssVars.white} />
                        </button>
                        <button type="button" className={`${styles.sliderButton} ${styles.sliderButtonRight}`} disabled={isEnd} onClick={handleNextSlide} aria-label={t('Next')}>
                            <Icon name="arrow" size={20} strokeColor={cssVars.white} />
                        </button>
                    </div>
                </>
            )}
        </section>
    );
};

export default KeyFeatures;
