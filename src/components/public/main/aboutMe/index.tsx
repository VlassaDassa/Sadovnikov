'use client'

import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import DecorButton from '../../../shared/button/DecorButton';
import AboutIllustration from '../aboutIllustration';
import EmptySection from '@/components/shared/EmptySection';

import type { AboutMe } from '@/interfaces/general';

import style from './index.module.scss';



interface AboutMeProps {
    aboutMe: AboutMe | null;
}

const AboutMe: React.FC<AboutMeProps> = ({ aboutMe }) => {
    const t = useTranslations('AboutMe');

    return (
        <section id='about' className={`${style.aboutMe} container`}>
            <h2 className={`${style.aboutMeTitle} sectionTitle`}>{t('title')}</h2>

            {
                !aboutMe ? <EmptySection text='Data about me not found' />
                :
                    <>
                        <AboutIllustration aboutMe={aboutMe} />

                        <div className={style.aboutMeData}>
                            <p className={style.text}>{t('YearOfBirth')} {aboutMe['birth']}</p>
                            <p className={style.text}>{t('PlaceOfBirth')} {aboutMe['placeBirth']}</p>
                            <p className={style.text}>{t('Education')} {aboutMe['education']}</p>
                            <p className={style.text}>{t('Location')} {aboutMe['location']}</p>
                        </div>

                        <div className={style.workExperience}>
                            <h3 className={style.textTitle}>{t('WorkExperience')}</h3>

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
                            <h3 className={style.textTitle}>{t('ShortBio')} </h3>
                            <p className={style.text}>{aboutMe['shortBio']}</p>
                        </div>
                        <Link href={'/pageInDev'}>
                            <DecorButton 
                                behavior='default'
                                variant='big'
                                text={{
                                    default: t('DecorBtnLong'),
                                    alter: t('DecorBtn'),
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