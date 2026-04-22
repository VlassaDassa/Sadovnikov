'use client'

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper/modules';

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


    return (
        <Swiper
            spaceBetween={-20}
            slidesPerView={1.5}
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
            speed={700}
            
            onRealIndexChange={(swiper) => setCurIndex(swiper.activeIndex + 1)}
            pagination={true}
            modules={[EffectCoverflow, Pagination]}
            
            
        >
            {projects.map(project => (
                <SwiperSlide key={project.id} className={`${style.sliderItem}`}>
                    <ProjectItem project={project} />
                </SwiperSlide>
            ))}

            <div className={style.sliderPgnWrapper}>
                {
                    Array.from({ length: totalCountItems }).map((item, index) => (
                        <div 
                            key={index}
                            className={`
                                ${style.sliderPgnItem} 
                                ${index+1 === curIndex ? style['sliderPgnItem-current'] : ''} 
                            `}>

                        </div>
                    ))
                }
            </div>  
        </Swiper>
    )
}

export default Slider;