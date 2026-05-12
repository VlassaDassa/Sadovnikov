'use client'

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import AdaptiveImage from '@/components/general/AdaptiveImage';
import PaginationSlider from '@/components/general/paginationSlider';

import styles from './index.module.scss';

const projectImg1 = '/images/mockImages/specTecno.png'
const testPhoto = '/images/mockImages/testPhoto.png'


const Slider: React.FC = () => {
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

                <PaginationSlider className={styles.pagination} totalCountItems={3} curIndex={curIndex} />
            </Swiper>
        </div>
    )
}


export default Slider;