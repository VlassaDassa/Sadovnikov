import React from 'react';

import DecorButton from '../../general/button/DecorButton';

import { aboutMe } from '@/mockData/aboutMe';

import type { Breakpoint } from '@/interfaces/general';

import style from './index.module.scss';


interface AboutMeProps {
    breakpoint: Breakpoint,
}


const AboutMe: React.FC<AboutMeProps> = ({ breakpoint }) => {
    
    return (
        <section className={`${style.aboutMe} container`}>
            <h2 className={`${style.aboutMeTitle} sectionTitle`}>AboutMe</h2>
            <div className={style.aboutMeData}>
                <p className="body-16-magra-bold lightText line-height-1_5x">Year of birth: {aboutMe['birth']}</p>
                <p className="body-16-magra-bold lightText line-height-1_5x">Place of birth: {aboutMe['placeBirth']}</p>
                <p className="body-16-magra-bold lightText line-height-1_5x">Education: {aboutMe['education']}</p>
                <p className="body-16-magra-bold lightText line-height-1_5x">Location: {aboutMe['location']}</p>
            </div>

            <div className={style.workExperience}>
                <h3 className="heading-20-magra-bold whiteText">WORK EXPERIENCE</h3>

                <div className={style.workExperienceWrapper}>
                    {
                        aboutMe.workExperience.map((item, index) => (
                            <div key={item.id} className={style.workExperienceItem}>
                                <h4 className="body-16-magra-bold lightText line-height-1_5x">{item['workingPeriod']}</h4>
                                <p className="body-16-magra-bold whiteText line-height-1_5x">{item['description']}</p>
                            </div>
                        ))
                    }
                </div>
               
            </div>

            <div className={style.shortBio}>
                <h3 className="heading-20-magra-bold whiteText">SHORT BIO</h3>
                <p className="body-16-magra-bold whiteText line-height-1_5x">{aboutMe['shortBio']}</p>
            </div>

            <DecorButton 
                behavior='default'
                variant='big'
                text={{
                    default: 'MY LONG STORY, VERY VERY LONG, IF YOU INTERESTED',
                    alter: 'MY LONG STORY, IF YOU INTERESTED',
                }}
                additionalClass='aboutMe'
                breakpoint={breakpoint}
            />
            
        </section>
    )
}

export default AboutMe