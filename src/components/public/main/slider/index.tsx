'use client'

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import { useTranslations } from 'next-intl';
import { useSelector } from 'react-redux';

import { RootState } from '@/store';

import PaginationSlider from '@/components/shared/paginationSlider';
import ProjectItem from '../projectItem';
import type { IProject } from '@/interfaces/general';

import 'swiper/css/effect-coverflow';
import 'swiper/css';
import style from './index.module.scss';



interface SliderProps {
    projects: IProject[]
}


const Slider: React.FC<SliderProps> = ({ projects }) => {
    const [curIndex, setCurIndex] = useState<number>(1)
    const totalCountItems = projects.length
    const breakpoint = useSelector((state: RootState) => state.breakpoint.value)
    const windowWidth = useSelector((state: RootState) => state.breakpoint.windowWidth)
    const t = useTranslations('Portfolio');
    const compactLayout = breakpoint === 'mobile' || (windowWidth > 0 && windowWidth < 900)

    return (
        <Swiper
            spaceBetween={compactLayout ? 0 : -20}
            slidesPerView={compactLayout ? 1 : (breakpoint === 'tablet' ? 'auto' : 1.5)}
            autoHeight={true}
            centeredSlides={true}
            className={style.slider}
            effect={compactLayout ? 'slide' : 'coverflow'}
            grabCursor={true}
            coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
            }}
            style={{ overflow: compactLayout ? 'hidden' : 'visible' }}
            speed={700} 
            onRealIndexChange={(swiper) => setCurIndex(swiper.realIndex + 1)}
            pagination={true}
            modules={[EffectCoverflow, Pagination]}
        >
            {
                projects.length === 0 ?
                    <p className={style.notFound}>{t('Empty')}</p>
                :
                    projects.map(project => (
                        <SwiperSlide key={project.id} className={style.sliderItem}>
                            <ProjectItem project={project} layout="slider" />
                        </SwiperSlide>
                    ))
            }

            <PaginationSlider totalCountItems={totalCountItems} curIndex={curIndex} /> 
        </Swiper>
    )
}

export default Slider;
