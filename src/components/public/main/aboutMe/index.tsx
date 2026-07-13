'use client'

import React from 'react';
import Link from 'next/link';

import DecorButton from '../../../shared/button/DecorButton';
import AboutIllustration from '../aboutIllustration';
import EmptySection from '@/components/shared/EmptySection';

import type { AboutMe } from '@/interfaces/general';

import style from './index.module.scss';



interface AboutMeProps {
    aboutMe: AboutMe | null;
}

const AboutMe: React.FC<AboutMeProps> = ({ aboutMe }) => {
    return (
        <section id='about' className={`${style.aboutMe} container`}>
            <h2 className={`${style.aboutMeTitle} sectionTitle`}>AboutMe</h2>

            {
                !aboutMe ? <EmptySection text='Data about me not found' />
                :
                    <>
                        <AboutIllustration aboutMe={aboutMe} />

                        <div className={style.aboutMeData}>
                            <p className={style.text}>Year of birth: {aboutMe['birth']}</p>
                            <p className={style.text}>Place of birth: {aboutMe['placeBirth']}</p>
                            <p className={style.text}>Education: {aboutMe['education']}</p>
                            <p className={style.text}>Location: {aboutMe['location']}</p>
                        </div>

                        <div className={style.workExperience}>
                            <h3 className={style.textTitle}>WORK EXPERIENCE</h3>

                            <div className={style.workExperienceWrapper}>
                                {
                                    aboutMe.workExperience.map((item, index) => (
                                        <div key={item.id} className={style.workExperienceItem}>
                                            <h4 className={`${style.text} ${style.workExperienceItemTitle}`}>
                                                {item['organization']} - {item['position']} {item['workingPeriod']['startDate']} - {item['workingPeriod']['endDate']}
                                            </h4>
                                            <p className={style.description}>{item['description']}</p>
                                        </div>
                                    ))
                                }
                            </div>
                        
                        </div>

                        <div className={style.shortBio}>
                            <h3 className={style.textTitle}>SHORT BIO</h3>
                            <p className={style.text}>{aboutMe['shortBio']}</p>
                        </div>
                        <Link href={'/pageInDev'}>
                            <DecorButton 
                                behavior='default'
                                variant='big'
                                text={{
                                    default: 'MY LONG STORY, VERY VERY LONG, IF YOU INTERESTED',
                                    alter: 'MY LONG STORY, IF YOU INTERESTED',
                                }}
                                additionalClass='aboutMe'
                            />
                        </Link>
                    </>
            }
        </section>
    )
}

export default AboutMe