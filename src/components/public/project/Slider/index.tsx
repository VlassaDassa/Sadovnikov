'use client'

import React, {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { createPortal } from 'react-dom';
import type { Swiper as SwiperType } from 'swiper';
import { Keyboard, Zoom } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/zoom';

import AdaptiveImage from '@/components/shared/AdaptiveImage';
import PaginationSlider from '@/components/shared/paginationSlider';
import Button from '@/components/shared/button/Button';

import type { IImages } from '@/interfaces/general';

import styles from './index.module.scss';

interface SliderProps {
    images: IImages[];
}

const MIN_ZOOM = 1;
const MAX_ZOOM = 4;
const ZOOM_STEP = 0.5;

const Slider: React.FC<SliderProps> = ({ images }) => {
    const sortedImages = useMemo(() => {
        return [...images].sort((a, b) => {
            if (a.main && !b.main) return -1;
            if (!a.main && b.main) return 1;

            return 0;
        });
    }, [images]);

    const [swiperInstance, setSwiperInstance] =
        useState<SwiperType | null>(null);

    const [curIndex, setCurIndex] = useState<number>(1);
    const [isBeginning, setIsBeginning] = useState<boolean>(true);
    const [isEnd, setIsEnd] = useState<boolean>(
        sortedImages.length <= 1
    );

    const [isLightboxOpen, setIsLightboxOpen] =
        useState<boolean>(false);

    const [lightboxSwiper, setLightboxSwiper] =
        useState<SwiperType | null>(null);

    const [lightboxIndex, setLightboxIndex] =
        useState<number>(0);

    const [lightboxScale, setLightboxScale] =
        useState<number>(MIN_ZOOM);

    const [lightboxIsBeginning, setLightboxIsBeginning] =
        useState<boolean>(true);

    const [lightboxIsEnd, setLightboxIsEnd] =
        useState<boolean>(sortedImages.length <= 1);

    const updateSliderState = (swiper: SwiperType) => {
        setCurIndex(swiper.realIndex + 1);
        setIsBeginning(swiper.isBeginning);
        setIsEnd(swiper.isEnd);
    };

    const updateLightboxState = (swiper: SwiperType) => {
        setLightboxIndex(swiper.realIndex);
        setLightboxIsBeginning(swiper.isBeginning);
        setLightboxIsEnd(swiper.isEnd);
        setLightboxScale(MIN_ZOOM);
    };

    const handlePrevSlide = () => {
        if (!swiperInstance || swiperInstance.isBeginning) return;

        swiperInstance.slidePrev();
    };

    const handleNextSlide = () => {
        if (!swiperInstance || swiperInstance.isEnd) return;

        swiperInstance.slideNext();
    };

    const openLightbox = (index: number) => {
        setLightboxIndex(index);
        setLightboxScale(MIN_ZOOM);
        setLightboxIsBeginning(index === 0);
        setLightboxIsEnd(index === sortedImages.length - 1);
        setIsLightboxOpen(true);
    };

    const closeLightbox = useCallback(() => {
        setIsLightboxOpen(false);
        setLightboxSwiper(null);
        setLightboxScale(MIN_ZOOM);
    }, []);

    const handleLightboxPrev = () => {
        if (!lightboxSwiper || lightboxSwiper.isBeginning) return;

        lightboxSwiper.zoom.out();
        lightboxSwiper.slidePrev();
    };

    const handleLightboxNext = () => {
        if (!lightboxSwiper || lightboxSwiper.isEnd) return;

        lightboxSwiper.zoom.out();
        lightboxSwiper.slideNext();
    };

    const handleZoomIn = () => {
        if (!lightboxSwiper) return;

        const currentScale = lightboxSwiper.zoom.scale;
        const nextScale = Math.min(
            currentScale + ZOOM_STEP,
            MAX_ZOOM
        );

        lightboxSwiper.zoom.in(nextScale);
    };

    const handleZoomOut = () => {
        if (!lightboxSwiper) return;

        const currentScale = lightboxSwiper.zoom.scale;
        const nextScale = Math.max(
            currentScale - ZOOM_STEP,
            MIN_ZOOM
        );

        if (nextScale === MIN_ZOOM) {
            lightboxSwiper.zoom.out();
            return;
        }

        lightboxSwiper.zoom.in(nextScale);
    };

    const handleZoomReset = () => {
        lightboxSwiper?.zoom.out();
    };

    const handleLightboxWheel = (
        event: React.WheelEvent<HTMLDivElement>
    ) => {
        if (!lightboxSwiper) return;

        event.preventDefault();

        const currentScale = lightboxSwiper.zoom.scale;
        const direction = event.deltaY < 0 ? 1 : -1;

        const nextScale = Math.min(
            Math.max(
                currentScale + direction * ZOOM_STEP,
                MIN_ZOOM
            ),
            MAX_ZOOM
        );

        if (nextScale === currentScale) return;

        if (nextScale === MIN_ZOOM) {
            lightboxSwiper.zoom.out();
            return;
        }

        lightboxSwiper.zoom.in(nextScale);
    };

    useEffect(() => {
        if (!isLightboxOpen) return;

        const previousOverflow = document.body.style.overflow;

        document.body.style.overflow = 'hidden';

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                closeLightbox();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isLightboxOpen, closeLightbox]);

    const hasNavigation = sortedImages.length > 1;

    return (
        <>
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
                    {sortedImages.map((item, index) => (
                        <SwiperSlide key={item.id}>
                            <button
                                type="button"
                                className={styles.previewButton}
                                onClick={() => openLightbox(index)}
                                aria-label={`Open project image ${index + 1}`}
                            >
                                <AdaptiveImage
                                    src={item.image}
                                    alt={`Project image ${index + 1}`}
                                    loading="eager"
                                    ariaHidden={false}
                                    wrapClass={styles.projectWrapPhoto}
                                    imgClass={styles.projectPhoto}
                                    ariaLabel={`Project image ${index + 1}`}
                                />
                            </button>
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
                                behavior={
                                    isBeginning
                                        ? 'disabled'
                                        : 'default'
                                }
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
                                behavior={
                                    isEnd
                                        ? 'disabled'
                                        : 'default'
                                }
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

            {isLightboxOpen &&
                typeof document !== 'undefined' &&
                createPortal(
                    <div
                        className={styles.lightbox}
                        role="dialog"
                        aria-modal="true"
                        aria-label="Image viewer"
                        onMouseDown={(event) => {
                            if (event.target === event.currentTarget) {
                                closeLightbox();
                            }
                        }}
                    >
                        <button
                            type="button"
                            className={styles.lightboxClose}
                            onClick={closeLightbox}
                            aria-label="Close image viewer"
                            autoFocus
                        >
                            ×
                        </button>

                        <div className={styles.lightboxCounter}>
                            {lightboxIndex + 1} / {sortedImages.length}
                        </div>

                        <div
                            className={styles.lightboxViewport}
                            onWheel={handleLightboxWheel}
                        >
                            <Swiper
                                modules={[Zoom, Keyboard]}
                                initialSlide={lightboxIndex}
                                slidesPerView={1}
                                spaceBetween={30}
                                speed={300}
                                zoom={{
                                    minRatio: MIN_ZOOM,
                                    maxRatio: MAX_ZOOM,
                                    toggle: true,
                                }}
                                keyboard={{
                                    enabled: true,
                                    onlyInViewport: false,
                                }}
                                onSwiper={(swiper) => {
                                    setLightboxSwiper(swiper);
                                    setLightboxIsBeginning(
                                        swiper.isBeginning
                                    );
                                    setLightboxIsEnd(swiper.isEnd);
                                }}
                                onSlideChange={updateLightboxState}
                                onZoomChange={(_, scale) => {
                                    setLightboxScale(scale);
                                }}
                                className={styles.lightboxSwiper}
                            >
                                {sortedImages.map((item, index) => (
                                    <SwiperSlide
                                        key={item.id}
                                        className={styles.lightboxSlide}
                                    >
                                        <div
                                            className={`swiper-zoom-container ${styles.zoomContainer}`}
                                            data-swiper-zoom={MAX_ZOOM}
                                        >
                                            <AdaptiveImage
                                                src={item.image}
                                                alt={`Project image ${index + 1}`}
                                                loading="eager"
                                                ariaHidden={false}
                                                wrapClass={
                                                    styles.lightboxImageWrapper
                                                }
                                                imgClass={`${styles.lightboxImage} swiper-zoom-target`}
                                                ariaLabel={`Project image ${index + 1}`}
                                            />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>

                        {hasNavigation && (
                            <>
                                <div
                                    className={`${styles.sliderButtonWrapper} ${styles.sliderButtonWrapperLeft} ${styles.lightboxArrowWrapper}`}
                                >
                                    <Button
                                        behavior={
                                            lightboxIsBeginning
                                                ? 'disabled'
                                                : 'default'
                                        }
                                        iconPosition="only"
                                        variant="dark"
                                        additionalClass={`${styles.sliderButton} ${styles.sliderButtonLeft}`}
                                        onClick={handleLightboxPrev}
                                        icon="arrow"
                                    />
                                </div>

                                <div
                                    className={`${styles.sliderButtonWrapper} ${styles.sliderButtonWrapperRight} ${styles.lightboxArrowWrapper}`}
                                >
                                    <Button
                                        behavior={
                                            lightboxIsEnd
                                                ? 'disabled'
                                                : 'default'
                                        }
                                        iconPosition="only"
                                        variant="dark"
                                        additionalClass={`${styles.sliderButton} ${styles.sliderButtonRight}`}
                                        onClick={handleLightboxNext}
                                        icon="arrow"
                                    />
                                </div>
                            </>
                        )}

                        <div className={styles.zoomControls}>
                            <button
                                type="button"
                                className={styles.zoomButton}
                                onClick={handleZoomOut}
                                disabled={lightboxScale <= MIN_ZOOM}
                                aria-label="Zoom out"
                            >
                                −
                            </button>

                            <button
                                type="button"
                                className={styles.zoomValue}
                                onClick={handleZoomReset}
                                aria-label="Reset zoom"
                            >
                                {Math.round(lightboxScale * 100)}%
                            </button>

                            <button
                                type="button"
                                className={styles.zoomButton}
                                onClick={handleZoomIn}
                                disabled={lightboxScale >= MAX_ZOOM}
                                aria-label="Zoom in"
                            >
                                +
                            </button>
                        </div>
                    </div>,
                    document.body
                )}
        </>
    );
};

export default Slider; 