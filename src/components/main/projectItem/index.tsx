import React from 'react';

import type { Project } from '../../../interfaces/general';

import './index.scss';


interface ProjectItemProps {
    project: Project,
}



const ProjectItem: React.FC<ProjectItemProps> = ({ project }) => {
  

    return (
        <div className={`shadow-xl projectItem radius-12`}>
            <img src={project.img} alt={project.name} className={'projectImg radius-12'} />
            <p className="whiteText projectCategory glass radius-6">{project.category}</p>

            <div className="projectContentContainer">
                <div className="projectText">
                    <p className="projectName whiteText">{project.name}</p>
                    <p className="projectDescription lightText">{project.shortDescrition}</p>
                </div>

                <div className="projectStack">
                    {
                        project.stack.map((item, index) => (
                            <p key={item} className="projectStackItem whiteText radius-4">
                                {item}
                            </p>
                        ))
                    }
                    
                </div>
            </div>

            
        </div>
    )
} 
// Статус бар пагинации по слайдеру;
// Canvas
// 

export default ProjectItem;