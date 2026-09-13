'use client';

import React, { useId, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import type { Swiper as SwiperType } from 'swiper';
import { A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import EmptySection from '@/components/shared/EmptySection';
import Icon from '@/components/shared/icons/Icon';
import { useTooltip } from '@/hooks/useTooltip';
import type { ICommit } from '@/interfaces/general';
import { capitalize } from '@/lib/textFormat';

import styles from './index.module.scss';

interface CommitProps {
    item: ICommit;
    index: number;
    active: boolean;
}

const formatStep = (index: number) => String(index + 1).padStart(2, '0');

const Commit: React.FC<CommitProps> = ({ item, index, active }) => {
    const locale = useLocale() === 'en' ? 'en' : 'ru';
    const date = capitalize(locale === 'ru' ? item.dateRu || '' : item.date);
    const tooltipRef = useTooltip<HTMLDivElement>({
        text: item.text,
        title: item.name,
        date,
        type: 'lvl3',
        placement: 'bottom',
        fakeWidth: 400,
        delay: 400,
    });

    return (
        <article className={`${styles.commit} ${active ? styles.active : ''}`}>
            <div className={styles.milestone}>
                <span className={styles.node} aria-hidden="true" />
                <p className={styles.commitDate}>{date}</p>
            </div>

            <div ref={tooltipRef} className={styles.commitItem}>
                <div className={styles.cardHeader} aria-hidden="true">
                    <span className={styles.step}>{formatStep(index)}</span>
                    <span className={styles.cardLine} />
                    <Icon name="flag" size={24} strokeColor="currentColor" />
                </div>
                <h3 className={styles.commitText}>{item.name}</h3>
                <p className={styles.commitBody}>{item.text}</p>
            </div>
        </article>
    );
};

interface EvolutionProps {
    data: ICommit[];
}

const Evolution: React.FC<EvolutionProps> = ({ data }) => {
    const t = useTranslations('Evolution');
    const id = useId();
    const swiperRef = useRef<SwiperType | null>(null);
    const progressRef = useRef<HTMLDivElement | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const hasMultiple = data.length > 1;
    const currentIndex = Math.min(activeIndex, Math.max(0, data.length - 1));

    const goToSlide = (index: number) => {
        swiperRef.current?.slideTo(index);
    };

    const updateSliderState = (swiper: SwiperType) => {
        const index = swiper.realIndex;
        setActiveIndex(index);

        // Keep the selected step visible even on projects with a long history.
        const progress = progressRef.current;
        const step = progress?.children[index] as HTMLElement | undefined;
        if (progress && step) {
            const left = step.offsetLeft - progress.offsetLeft;
            if (left < progress.scrollLeft) {
                progress.scrollLeft = left;
            } else if (left + step.offsetWidth > progress.scrollLeft + progress.clientWidth) {
                progress.scrollLeft = left + step.offsetWidth - progress.clientWidth;
            }
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.altKey || event.ctrlKey || event.metaKey) return;

        const swiper = swiperRef.current;
        if (!swiper || !hasMultiple) return;

        switch (event.key) {
            case 'ArrowLeft':
                event.preventDefault();
                swiper.slidePrev();
                break;
            case 'ArrowRight':
                event.preventDefault();
                swiper.slideNext();
                break;
            case 'Home':
                event.preventDefault();
                goToSlide(0);
                break;
            case 'End':
                event.preventDefault();
                goToSlide(data.length - 1);
                break;
        }
    };

    return (
        <section className={styles.evolution} aria-labelledby={`${id}-title`}>
            <div className={styles.header}>
                <div>
                    <h2 id={`${id}-title`} className={`${styles.title} sectionTitle`}>
                        {t('Title')}
                    </h2>
                    {hasMultiple && <p className={styles.hint}>{t('Hint')}</p>}
                </div>

                {hasMultiple && (
                    <div className={styles.controls}>
                        <span className={styles.counter} aria-live="polite" aria-atomic="true">
                            <strong>{formatStep(currentIndex)}</strong>
                            <span aria-hidden="true"> / </span>
                            {String(data.length).padStart(2, '0')}
                        </span>
                        <button
                            className={styles.arrow}
                            type="button"
                            aria-label={t('Previous')}
                            aria-controls={`${id}-timeline`}
                            disabled={currentIndex === 0}
                            onClick={() => swiperRef.current?.slidePrev()}
                        >
                            <Icon name="arrow" size={20} strokeColor="currentColor" />
                        </button>
                        <button
                            className={`${styles.arrow} ${styles.arrowNext}`}
                            type="button"
                            aria-label={t('Next')}
                            aria-controls={`${id}-timeline`}
                            disabled={currentIndex === data.length - 1}
                            onClick={() => swiperRef.current?.slideNext()}
                        >
                            <Icon name="arrow" size={20} strokeColor="currentColor" />
                        </button>
                    </div>
                )}
            </div>

            {data.length === 0 ? (
                <EmptySection text={t('Empty')} />
            ) : (
                <>
                    <div
                        id={`${id}-timeline`}
                        className={styles.timeline}
                        role="group"
                        aria-label={t('Carousel')}
                        tabIndex={hasMultiple ? 0 : undefined}
                        onKeyDown={handleKeyDown}
                    >
                        <Swiper
                            modules={[A11y]}
                            slidesPerView="auto"
                            spaceBetween={20}
                            centeredSlides
                            slideToClickedSlide
                            grabCursor={hasMultiple}
                            speed={700}
                            a11y={{ slideRole: 'group', itemRoleDescriptionMessage: t('Carousel') }}
                            onSwiper={(swiper) => {
                                swiperRef.current = swiper;
                                updateSliderState(swiper);
                            }}
                            onSlideChange={updateSliderState}
                            onResize={updateSliderState}
                            className={`${styles.slider} ${!hasMultiple ? styles.single : ''}`}
                        >
                            {data.map((item, index) => (
                                <SwiperSlide key={item.id} className={styles.slide}>
                                    {({ isActive }) => (
                                        <Commit item={item} index={index} active={isActive} />
                                    )}
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    {hasMultiple && (
                        <div ref={progressRef} className={styles.progress} role="group" aria-label={t('Navigate')}>
                            {data.map((item, index) => (
                                <button
                                    key={item.id}
                                    type="button"
                                    className={`${styles.progressStep} ${index === currentIndex ? styles.currentStep : ''} ${index < currentIndex ? styles.pastStep : ''}`}
                                    aria-label={`${t('Navigate')} ${formatStep(index)}: ${item.name}`}
                                    aria-current={index === currentIndex ? 'step' : undefined}
                                    aria-controls={`${id}-timeline`}
                                    onClick={() => goToSlide(index)}
                                >
                                    <span>{formatStep(index)}</span>
                                </button>
                            ))}
                        </div>
                    )}
                </>
            )}
        </section>
    );
};

export default Evolution;

