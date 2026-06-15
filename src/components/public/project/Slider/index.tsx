'use client'

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import AdaptiveImage from '@/components/shared/AdaptiveImage';
import PaginationSlider from '@/components/shared/paginationSlider';

import styles from './index.module.scss';

const projectImg1 = '/images/mockImages/specTecno.png'
const testPhoto = '/images/mockImages/testPhoto.png'

interface SliderProps {
    images: string[]
}

const Slider: React.FC<SliderProps> = ({ images }) => {
    const [curIndex, setCurIndex] = useState<number>(1)

    return (
        <div className={styles.photoContainer}>
            <Swiper
                slidesPerView={1}
                spaceBetween={30}  
                onRealIndexChange={(swiper) => setCurIndex(swiper.activeIndex + 1)}
                pagination={true}   
                className={styles.swiper}   
            >
                {images.map((item) => (
                    <SwiperSlide>
                        <AdaptiveImage 
                            src={item}
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