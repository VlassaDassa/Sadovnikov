import React from 'react';
import { useLocale, useTranslations } from 'next-intl';

import Icon from '@/components/shared/icons/Icon';
import Slider from '../Slider';
import type { IProjectPreviewData } from '@/interfaces/general';
import { displayDate } from '@/lib/dates';
import { cssVars } from '@/styles/cssVariables';
import styles from './index.module.scss';

interface ProjectPreviewProps {
    data: IProjectPreviewData;
}

const ProjectPreview: React.FC<ProjectPreviewProps> = ({ data }) => {
    const t = useTranslations('ProjectPreview');
    const team = useTranslations('TeamType');
    const locale = useLocale() === 'en' ? 'en' : 'ru';
    const teamIcon = data.teamType === 'solo' ? 'person' : data.teamType === 'duo' ? 'twoPerson' : 'manyPerson';
    const metadata = [
        { label: t('Start'), value: displayDate(data.date, true, locale), icon: 'calendar' },
        { label: t('Duration'), value: data.developmentTime, icon: 'time' },
        { label: t('Team'), value: team(data.teamType), icon: teamIcon },
    ];

    return (
        <section className={`${styles.projectPreview} container`}>
            <div className={styles.overview}>
                <div className={styles.preview} aria-label={t('Gallery')}>
                    <Slider images={data.images} />
                </div>

                <div className={styles.summary}>
                    <div className={styles.heading}>
                        <p className={styles.category}>{data.category}</p>
                        <h1 className={styles.name}>{data.name}</h1>
                    </div>
                    <p className={styles.description}>{data.previewDescription}</p>
                    <div className={styles.actions}>
                        <a
                            className={`${styles.action} ${styles.primary}`}
                            href={data.demoLink || undefined}
                            aria-disabled={!data.demoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Icon name="internet" size={20} strokeColor={cssVars.white} />
                            Live Demo
                        </a>
                        <a
                            className={styles.action}
                            href={data.gitHubLink || undefined}
                            aria-disabled={!data.gitHubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Icon name="github" size={20} strokeColor={cssVars.white} />
                            GitHub
                        </a>
                    </div>
                </div>
            </div>

            <dl className={styles.metadata}>
                {metadata.map((item) => (
                    <div className={styles.metadataItem} key={item.label}>
                        <Icon name={item.icon} size={22} strokeColor={cssVars.brand_600} fillColor="none" />
                        <div className={styles.metadataContent}>
                            <dt>{item.label}</dt>
                            <dd>{item.value}</dd>
                        </div>
                    </div>
                ))}
            </dl>
        </section>
    );
};

export default ProjectPreview;
