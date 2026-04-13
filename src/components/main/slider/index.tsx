import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper/modules';

import ProjectItem from '../projectItem';

import { projects } from '../../../mockData/projects';

import 'swiper/css/effect-coverflow';
import 'swiper/css';
import './index.scss';


const Slider: React.FC = () => {
    const [curIndex, setCurIndex] = useState<number>(1)
    const totalCountItems = projects.length


    return (
        <Swiper
            spaceBetween={-20}
            slidesPerView={1.5}
            centeredSlides={true}
            className="slider"

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
                <SwiperSlide key={project.id} className={`sliderItem radius-12`}>
                    <ProjectItem project={project} />
                </SwiperSlide>
            ))}

            <div className="sliderPgnWrapper">
                {
                    Array.from({ length: totalCountItems }).map((item, index) => (
                        <div 
                            className={`
                                sliderPgnItem 
                                radius-full 
                                ${index+1 === curIndex ? 'sliderPgnItem-current' : ''} 
                            `}>

                        </div>
                    ))
                }
            </div>  

            
        </Swiper>

        

    )
}

export default Slider;