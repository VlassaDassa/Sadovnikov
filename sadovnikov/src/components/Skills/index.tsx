import React from 'react';

import skillList from '../../mockData/skills';

import cursor from './../../assets/images/cursor.png';

import './index.scss';

const Skills: React.FC = () => {
    



    return (
        <section className="container skills">
            <div className="skillsContainer">
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
        </section>
    )
}

export default Skills;