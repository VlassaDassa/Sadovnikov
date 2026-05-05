'use client'

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import { useSelector } from 'react-redux';

import { RootState } from '@/store';

import PaginationSlider from '@/components/general/paginationSlider';
import ProjectItem from '../projectItem';
import type { Project } from '@/interfaces/general';

import 'swiper/css/effect-coverflow';
import 'swiper/css';
import style from './index.module.scss';



interface SliderProps {
    projects: Project[]
}


const Slider: React.FC<SliderProps> = ({ projects }) => {
    const [curIndex, setCurIndex] = useState<number>(1)
    const totalCountItems = projects.length
    const breakpoint = useSelector((state: RootState) => state.breakpoint.value)


    return (
        <Swiper
            spaceBetween={-20}
            slidesPerView={
                breakpoint === 'tablet' ? 'auto' : 1.5
            } 
            centeredSlides={true}
            className={style.slider}
            effect={'coverflow'}
            grabCursor={true}
            coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
            }}
            style={{ overflow: 'visible' }} 
            speed={700} 
            
            onRealIndexChange={(swiper) => setCurIndex(swiper.activeIndex + 1)}
            pagination={true}
            modules={[EffectCoverflow, Pagination]}
            
            
        >
            {projects.map(project => (
                <SwiperSlide key={project.id} className={style.sliderItem}>
                    <ProjectItem project={project} />
                </SwiperSlide>
            ))}

            <PaginationSlider totalCountItems={totalCountItems} curIndex={curIndex} /> 
        </Swiper>
    )
}

export default Slider;