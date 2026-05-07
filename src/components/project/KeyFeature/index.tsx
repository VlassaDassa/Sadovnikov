'use client'

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import PaginationSlider from '@/components/general/paginationSlider';
import AdaptiveImage from '@/components/general/AdaptiveImage';

import styles from './index.module.scss';


const featureIcon = '/images/mockImages/featureIcon.svg';
const featurePhoto = '/images/mockImages/featurePhoto.png';



interface IFeatureItem {
    id: number,
    title: string,
    text: string,
    icon: string,
    photo: string
}

const featureItems: IFeatureItem[] = [
    {
        id: 1,
        title: 'Full responsive design',
        text: 'Initially, 3 versions were made for each project page \
                            (desktop, tablet, mobile). And each page looks great on any screen \
                            resolution. The Mobile First approach was used during \
                            development for easy adaptation',
        icon: featureIcon,
        photo: featurePhoto
    },
    {
        id: 2,
        title: 'Full responsive design',
        text: 'Initially, 3 versions were made for each project page \
                            (desktop, tablet, mobile). And each page looks great on any screen \
                            resolution. The Mobile First approach was used during \
                            development for easy adaptation',
        icon: featureIcon,
        photo: featurePhoto
    },
    {
        id: 3,
        title: 'Full responsive design',
        text: 'Initially, 3 versions were made for each project page \
                            (desktop, tablet, mobile). And each page looks great on any screen \
                            resolution. The Mobile First approach was used during \
                            development for easy adaptation',
        icon: featureIcon,
        photo: featurePhoto
    }
]


const KeyFeatures: React.FC = () => {
    const [curIndex, setCurIndex] = useState<number>(1)


    return (
        <section className={`${styles.keyFeatures} container`}>
            <h2 className={`${styles.title} sectionTitle`}>KEY FEATURES</h2>

            <Swiper
                slidesPerView={1}
                spaceBetween={30}  
                onRealIndexChange={(swiper) => setCurIndex(swiper.activeIndex + 1)}
                pagination={true}   
                className={styles.slider}   
            >
                {featureItems.map((item) => (
                    <SwiperSlide key={item.id} className={styles.slide}>
                        <div className={styles.feature}>
                            <div className={styles.featureWrapper}>
                                <div className={styles.featureHeader}>
                                    <div className={styles.featureIconWrapper}>
                                        <AdaptiveImage 
                                            src={item.icon}
                                            alt={''}
                                            ariaHidden={true}
                                            wrapClass={styles.projectWrapPhoto}
                                        />
                                    </div>

                                    <h3 className={styles.featureTitle}>{item.title}</h3>
                                </div>

                                <p className={styles.featureText}>{item.text}</p>
                            </div>

                            <AdaptiveImage
                                src={item.photo}
                                alt={item.title}
                                imgClass={styles.featurePhoto}
                                wrapClass={styles.featurePhotoWrapper}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <PaginationSlider totalCountItems={3} curIndex={curIndex} />
    </section>
    )
}

export default KeyFeatures;