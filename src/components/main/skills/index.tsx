'use client'

import React from 'react';

import TalkingAvatar from './../../main/talkingAvatar';
import { skills } from '@/mockData/skills';
import type { Skill } from '@/mockData/skills';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';

import style from './index.module.scss';

const vertex = '/images/main/vertex.svg';
const vertexSelected = '/images/main/vertex_selected.svg';
const cursor = '/images/main/cursor.svg';


const SkillItem: React.FC<Skill> = ({ name, score }) => {
    return (
        <div className={style.skillItem}>
            <p className={style.skillItemName}>{name}</p>
            <div className={style.skillLevel}>
                <div className={style.skillLevelWrapper}>
                    {
                        Array.from({ length: 10 }).map((_, index) => {
                            if (index < score) {
                                return <div key={index} className={`${style.skillLevelItem} ${style['skillLevelItem--filled']}`}></div>
                            }
                            else {
                                return <div key={index} className={style.skillLevelItem}></div>
                            }
                        })
                    }
                </div>
                <p className={style.skillScore}>{score}/10</p>
            </div>
        </div>
    )
}


const Skills: React.FC = () => {
    const { isVisible, elementRef } = useScrollAnimation<HTMLDivElement>({
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    })

    return (
        <section className={`${style.skills} container`}>
            <div ref={elementRef} className={`${style.skillsWrapper} ${isVisible ? style['skillsWrapper-anim'] : ''}`}>
                {
                    Array.from({ length: 3 }).map((_, index) => (
                        <img key={index} className={`${style.vertex} ${style[`vertex-${index+1}`]}`} src={vertex} alt="" aria-hidden="true" />
                    ))
                }
                <img className={`${style.vertex} ${style.vertexSelected}`} src={vertexSelected} alt="" aria-hidden="true" />
                <img className={style.cursor} src={cursor} alt="" aria-hidden="true" />
                {
                    skills.map((skill, index) => (
                        <SkillItem key={index} {...skill} />
                    ))
                }
            </div>

            <div className={style.avatarWrapper}>
                <TalkingAvatar
                    additionalClass={style.avatarWrapper}
                    hand={true} 
                    indexFinger={true} 
                    text="This is how I evaluate my skills..." 
                />
            </div>
        </section>
    )
}


export default Skills;