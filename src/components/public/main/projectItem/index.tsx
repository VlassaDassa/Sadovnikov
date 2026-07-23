import React from 'react';
import Link from 'next/link';

import type { IProject } from '@/interfaces/general';

import style from './index.module.scss';


interface ProjectItemProps {
    project: IProject,
    index?: number,
}



const ProjectItem: React.FC<ProjectItemProps> = ({ project, index=1 }) => {

    return (
        <Link href={`/project/${project.id}`}>
            <div className={style.projectItem} style={{top: '200px', left: `${700 * index}px` }}>
                <img src={project.images.find((item) => item.main)?.image} alt={project.name} className={style.projectImg} />
                <p className={style.projectCategory}>{project.category}</p>

                <div className={style.projectContentContainer}>
                    <div className={style.projectText}>
                        <p className={style.projectName}>{project.name}</p>
                        <p className={style.projectDescription}>{project.shortDescription}</p>
                    </div>

                    <div className={style.projectStack}>
                        {
                            project.stack.map((item, index) => (
                                <p key={item.id + ' ' + project.id} className={style.projectStackItem}>
                                    {item.name}
                                </p>
                            ))
                        }
                    </div>
                </div>
            </div>
        </Link>
    )
} 


export default ProjectItem;