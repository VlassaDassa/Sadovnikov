import React from 'react';
import { useInView } from '../../hooks/useInView';

import './index.scss';

import skillList from '../../mockData/skills';

import cursor from './../../assets/images/cursor.png';
import jawPhoto from './../../assets/images/jawPhoto.png';
import jaw from './../../assets/images/jaw.png';
import indexFinger from './../../assets/images/indexFinger.png';
import cloud from './../../assets/images/cloud.png';
import hand from './../../assets/images/hand.png';


const Skills: React.FC = () => {
    const { ref, isInView } = useInView({ threshold: 0.3 });

    return (
        <section className="container skills">
            <div ref={ref} className={`${'skillsContainer'} ${isInView ? 'animate' : ''}`}>
                <div className="angleSquare angleSquare--lt"></div>
                <div className="angleSquare angleSquare--selected angleSquare--rt"></div>
                <div className="angleSquare angleSquare--lb"></div>
                <div className="angleSquare angleSquare--rb"></div>

                <img className="cursor" src={cursor} alt="cursor" />

                {
                    skillList.map((skill, index) => {
                        return (
                            <div className="skill" key={'skill' + skill.id}>
                                <div className="skillContaiiner">
                                    <h3 className="skillLabel">{skill.name}</h3>
                                    <div className="progressBar">
                                        {
                                            Array.from({ length: 10 }, (_, index) => index + 1).map((el, index) => {
                                                return (
                                                    <React.Fragment key={'prEl' + el}>
                                                    {
                                                        el <= skill.score ?                                                    
                                                            <div 
                                                                className="progressBarElement progressBarElement--fill" 
                                                            ></div>
                                                        :
                                                            <div 
                                                                className="progressBarElement progressBarElement" 
                                                            >

                                                            </div>
                                                    }
                                                    </React.Fragment>
                                                )
                                            })
                                        }
                                    </div>
                                </div>

                                <p className="skillScore">{skill.score}/10</p>
                            </div>
                        )
                    })
                }
            </div>

            <div className="characterContainer">
                <img className="skillCharacter" src={jawPhoto} alt="character" />
                <img className="skillJaw" src={jaw} alt="character" />
                <img className="skillIndexFinger" src={indexFinger} alt="character" />
                <img className="skillHand" src={hand} alt="character" />

                <div className="skillDialog">
                    <img className="skillCloud" src={cloud} alt="character" />
                    <p className="skillTextCloud">This is how I evaluate my skills...</p>
                </div>
                
            </div>
        </section>
    )
}

export default Skills;