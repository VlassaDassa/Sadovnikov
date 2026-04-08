import React from 'react';

import Button from '../../general/button';

import { aboutMe } from '../../../mockData/aboutMe';

import type { Breakpoint } from '../../../interfaces/general';

import './index.scss';



const AboutMe: React.FC<Breakpoint> = ({ breakpoint }) => {

    return (
        <section className="aboutMe container">
            <h2 className="heading-24-magra-bold whiteText sectionTitle">AboutMe</h2>
            <div className="aboutMeData">
                <p className="body-16-magra-bold lightText line-height-1_5x">Year of birth: {aboutMe['birth']}</p>
                <p className="body-16-magra-bold lightText line-height-1_5x">Place of birth: {aboutMe['placeBirth']}</p>
                <p className="body-16-magra-bold lightText line-height-1_5x">Education: {aboutMe['education']}</p>
                <p className="body-16-magra-bold lightText line-height-1_5x">Location: {aboutMe['location']}</p>
            </div>

            <div className="workExperience">
                <h3 className="heading-20-magra-bold whiteText">WORK EXPERIENCE</h3>

                <div className="workExperienceWrapper">
                    {
                        aboutMe['workExperience'].map((item, index) => (
                            <div key={item.id} className="workExperienceItem">
                                <h4 className="body-16-magra-bold lightText line-height-1_5x">{item['workingPeriod']}</h4>
                                <p className="body-16-magra-bold whiteText line-height-1_5x">{item['description']}</p>
                            </div>
                        ))
                    }
                </div>
               
            </div>

            <div className="shortBio">
                <h3 className="heading-20-magra-bold whiteText">SHORT BIO</h3>
                <p className="body-16-magra-bold whiteText line-height-1_5x">{aboutMe['shortBio']}</p>
            </div>

            <Button 
                decorativeVariant='big' 
                behaivor='default'
                iconPosition='withIcon'
                breakpoint={{ breakpoint }}
                decorativeBtnText={{
                    default: 'MY LONG STORY, VERY VERY LONG, IF YOU INTERESTED',
                    alter: 'MY LONG STORY, IF YOU INTERESTED'
                }}

            />

        </section>
    )
}

export default AboutMe