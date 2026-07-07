'use client'

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import AdaptiveImage from '@/components/shared/AdaptiveImage';
import PaginationSlider from '@/components/shared/paginationSlider';

import { IImages } from '@/interfaces/general';

import styles from './index.module.scss';


interface SliderProps {
    images: IImages[]
}

const Slider: React.FC<SliderProps> = ({ images }) => {
    const [curIndex, setCurIndex] = useState<number>(1)

    // Главное изображение в начало
    const sortedImages = [...images].sort((a, b) => {
        if (a.main && !b.main) return -1;
        if (!a.main && b.main) return 1;
        return 0
    })

    return (
        <div className={styles.photoContainer}>
            <Swiper
                slidesPerView={1}
                spaceBetween={30}  
                onRealIndexChange={(swiper) => setCurIndex(swiper.activeIndex + 1)}
                pagination={true}   
                className={styles.swiper}   
            >
                {sortedImages.map((item) => (
                    <SwiperSlide key={item.id}>
                        <AdaptiveImage 
                            src={item.image}
                            alt={'project'}
                            loading='eager'
                            ariaHidden={false}
                            wrapClass={styles.projectWrapPhoto}
                            imgClass={styles.projectPhoto}
                            ariaLabel={'photo'}
                        />
                    </SwiperSlide>
                ))}

                <PaginationSlider className={styles.pagination} totalCountItems={images.length} curIndex={curIndex} />
            </Swiper>
        </div>
    )
}


export default Slider;