'use client'

import React from 'react';
import { useLocale, useTranslations } from 'next-intl';

import EmptySection from '@/components/shared/EmptySection';
import type { AboutMe as AboutMeData } from '@/interfaces/general';
import { displayDate } from '@/lib/dates';

import style from './index.module.scss';

interface AboutMeProps {
    aboutMe: AboutMeData | null;
}

const FactIcon = ({ type }: { type: 'location' | 'education' | 'birth' }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {type === 'location' && <><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2.5" /></>}
        {type === 'education' && <><path d="m2 9 10-5 10 5-10 5-10-5Z M6 11v6c4 3 8 3 12 0v-6 M22 9v7" /></>}
        {type === 'birth' && <><circle cx="12" cy="7" r="4" /><path d="M4 21v-2a8 8 0 0 1 16 0v2H4Z" /></>}
    </svg>
);

const AboutMe: React.FC<AboutMeProps> = ({ aboutMe }) => {
    const t = useTranslations('AboutMe');
    const locale = useLocale() === 'en' ? 'en' : 'ru';

    // Elevate the existing opening sentence without introducing new biography data.
    const bio = aboutMe?.shortBio.trim() ?? '';
    const opening = bio.match(/^(.{1,160}?[.!?])(?:\s+|$)/u)?.[1];
    const body = opening ? bio.slice(opening.length).trim() : bio;
    const technologies = ['React', 'TypeScript'].filter(name => new RegExp('\\b' + name + '\\b', 'i').test(bio));

    return (
        <section id="about" className={`${style.aboutMe} container`}>
            <h2 className={`sectionTitle ${style.aboutMeTitle}`}>{t('title')}</h2>
            {!aboutMe ? <EmptySection text={t('Empty')} /> : <>
                <div className={style.introduction}>
                    <div className={style.biography}>
                        <h3 className={style.bioHeading}>{opening || t('ShortBio')}</h3>
                        {body && <div className={style.bioBody}>
                            {body.split(/\n\s*\n/).filter(Boolean).map((paragraph, index) => <p key={index}>{paragraph}</p>)}
                        </div>}
                        {technologies.length > 0 && <ul className={style.specialties} aria-label={t('Technologies')}>
                            {technologies.map(name => <li key={name}>
                                <img src={`/images/mockImages/${name}.svg`} alt="" width="24" height="24" />
                                {name}
                            </li>)}
                        </ul>}
                    </div>
                    <dl className={style.facts}>
                        <div className={style.fact}>
                            <span className={style.factIcon}><FactIcon type="location" /></span>
                            <div><dt>{t('BasedIn')}</dt><dd>{aboutMe.location}</dd></div>
                        </div>
                        <div className={style.fact}>
                            <span className={style.factIcon}><FactIcon type="education" /></span>
                            <div><dt>{t('Education').replace(/:$/, '')}</dt><dd>{aboutMe.education}</dd></div>
                        </div>
                        <div className={style.fact}>
                            <span className={style.factIcon}><FactIcon type="birth" /></span>
                            <div><dt>{t('Born')}</dt><dd className={style.born}><span className={style.birthValue}>{aboutMe.birth}</span> <span aria-hidden="true">·</span> {aboutMe.placeBirth}</dd></div>
                        </div>
                    </dl>
                </div>
                {aboutMe.workExperience.length > 0 && <div className={style.workExperience}>
                    <h3 className={style.experienceHeading}>{t('WorkExperience')}</h3>
                    <div className={style.experienceList}>
                        {aboutMe.workExperience.map(item => {
                            const details = item.description.split(/(?:;\s*|\n+)/).map(part => part.trim()).filter(Boolean);
                            const start = displayDate(item.workingPeriod.startDate, false, locale);
                            const end = displayDate(item.workingPeriod.endDate, false, locale);
                            return <article key={item.id} className={style.experienceCard}>
                                <header className={style.experienceHeader}>
                                    <span className={style.experienceMarker} aria-hidden="true" />
                                    <div className={style.experienceRole}>
                                        <h4>{item.position}</h4>
                                        <p>{item.organization}</p>
                                    </div>
                                    {(start || end) && <p className={style.experiencePeriod}>{[start, end].filter(Boolean).join(' — ')}</p>}
                                </header>
                                {details.length > 1 ? <ul className={style.experienceDetails}>
                                    {details.map((detail, index) => <li key={index}>{detail}</li>)}
                                </ul> : item.description && <p className={style.experienceDescription}>{item.description}</p>}
                            </article>;
                        })}
                    </div>
                </div>}
            </>}
        </section>
    );
};

export default AboutMe;
