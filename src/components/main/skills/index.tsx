import React from 'react';

import vertex from './../../../assets/images/main/vertex.svg';
import vertexSelected from './../../../assets/images/main/vertex_selected.svg';
import cursor from './../../../assets/images/main/cursor.svg';

import './index.scss';

import TalkingAvatar from './../../main/talkingAvatar';
import { skills } from './../.././../mockData/skills';
import type { Skill } from './../../../mockData/skills';




const SkillItem: React.FC<Skill> = ({ name, score }) => {
    
    return (
        <div className="skillItem">
            <p className="lightText skillItemName">{name}</p>
            <div className="skillLevel">
                <div className="skillLevelWrapper">
                    {
                        Array.from({ length: 10 }).map((_, index) => {
                            if (index < score) {
                                return <div key={index} className="skillLevelItem skillLevelItem--filled"></div>
                            }
                            else {
                                return <div key={index} className="skillLevelItem"></div>
                            }
                        })
                    }
                </div>
                <p className="skillScore lightText">{score}/10</p>
            </div>
        </div>
    )
}


const Skills: React.FC = () => {
    return (
        <section className="skills container">
            <div className="skillsWrapper">
                {
                    Array.from({ length: 3 }).map((_, index) => (
                        <img key={index} className={`vertex vertex-${index+1}`} src={vertex} alt="" aria-hidden="true" />
                    ))
                }
                <img className="vertex vertexSelected" src={vertexSelected} alt="" aria-hidden="true" />
                <img className="cursor" src={cursor} alt="" aria-hidden="true" />
                {
                    skills.map((skill, index) => (
                        <SkillItem key={index} {...skill} />
                    ))
                }
            </div>

            <div className="avatarWrapper">
                <TalkingAvatar hand={true} indexFinger={true} text="This is how I evaluate my skills..." />
            </div>
        </section>
    )
}


export default Skills;