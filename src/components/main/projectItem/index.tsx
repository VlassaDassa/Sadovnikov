import React from 'react';

import type { Project } from '@/interfaces/general';

import style from './index.module.scss';


interface ProjectItemProps {
    project: Project,
    index?: number,
}



const ProjectItem: React.FC<ProjectItemProps> = ({ project, index=1 }) => {

    return (
        <div className={style.projectItem} style={{top: '200px', left: `${600 * index}px` }}>
            <img src={project.img} alt={project.name} className={style.projectImg} />
            <p className={style.projectCategory}>{project.category}</p>

            <div className={style.projectContentContainer}>
                <div className={style.projectText}>
                    <p className={style.projectName}>{project.name}</p>
                    <p className={style.projectDescription}>{project.shortDescrition}</p>
                </div>

                <div className={style.projectStack}>
                    {
                        project.stack.map((item, index) => (
                            <p key={item} className={style.projectStackItem}>
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