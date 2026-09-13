'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

import type { IProject } from '@/interfaces/general';
import style from './index.module.scss';

interface ProjectItemProps {
    project: IProject;
    index?: number;
    layout?: 'canvas' | 'slider';
}

const ProjectItem: React.FC<ProjectItemProps> = ({ project, index = 0, layout = 'canvas' }) => {
    const t = useTranslations('Portfolio');
    const image = project.images.find(item => item.main)?.image;

    return (
        <Link href={`/project/${project.id}`} className={style.projectLink}>
            <article
                className={`${style.projectItem} ${layout === 'slider' ? style.projectItemSlider : ''}`}
                style={layout === 'canvas' ? { top: '200px', left: `${760 * index}px` } : undefined}
            >
                {image ? (
                    <img src={image} alt={project.name} className={style.projectImg} />
                ) : (
                    <div className={style.noPreview}>{t('NoPreview')}</div>
                )}
                <div className={style.projectShade} />
                <div className={style.projectContentContainer}>
                    <div className={style.projectText}>
                        <h3 className={style.projectName}>{project.name}</h3>
                        <p className={style.projectDescription}>{project.shortDescription}</p>
                    </div>
                    <div className={style.projectFooter}>
                        <div className={style.projectStack} aria-label={t('Technologies')}>
                            {project.stack.slice(0, 6).map(item => (
                                <span key={`${item.id}-${project.id}`} className={style.projectStackItem}>{item.name}</span>
                            ))}
                        </div>
                        <span className={style.explore}>{project.category || t('Explore')} <span aria-hidden="true">↗</span></span>
                    </div>
                </div>
            </article>
        </Link>
    );
};

export default ProjectItem;
