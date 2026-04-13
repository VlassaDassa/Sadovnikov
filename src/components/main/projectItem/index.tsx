import React from 'react';

import type { Project } from '../../../interfaces/general';

import './index.scss';


interface ProjectItemProps {
    project: Project,
    index?: number,
}



const ProjectItem: React.FC<ProjectItemProps> = ({ project, index=1 }) => {

    return (
        <div className={`shadow-xl projectItem`} style={{top: '200px', left: `${600 * index}px` }}>
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
                            <p key={item} className="projectStackItem whiteText">
                                {item}
                            </p>
                        ))
                    }
                    
                </div>
            </div>


        </div>
    )
} 


export default ProjectItem;