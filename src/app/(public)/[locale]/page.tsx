import React from 'react';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getLocale } from 'next-intl/server';
import { hasLocale } from 'next-intl';

import Preview from '@/components/public/main/preview';
import Skills from '@/components/public/main/skills';
import MyStack from '@/components/public/main/myStack';
import AboutMe from '@/components/public/main/aboutMe';
import Portfolio from '@/components/public/main/portfolio';
import Contacts from '@/components/public/main/contacts';
import AnimatedSection from '@/components/shared/AnimatedScroll';
import ErrorPage from '@/components/shared/ErrorPage';

import { transformProject } from '@/lib/transformers/project';
import { transformAboutMe } from '@/lib/transformers/aboutMe';
import { routing } from '@/i18n/routing';
import type { AppLocale } from '@/i18n/routing';
import prisma from '@/lib/prisma';
import { getAbsoluteUrl, getLanguageAlternates, getOpenGraphLocale, siteConfig } from '@/lib/seo/site';
import { IProject, Skill, Stack } from '@/interfaces/general';



interface MainPageProps {
    params: Promise<{
        locale: string
    }>
}


export async function generateMetadata({ params }: MainPageProps): Promise<Metadata> {
    const { locale: requestedLocale } = await params
    
    const locale: AppLocale = requestedLocale === 'ru' ? 'ru' : 'en'
    const t = await getTranslations({locale, namespace: 'SEO'})
    const title = t('HomeTitle')
    const description = t('HomeDescription')
    const canonical = getAbsoluteUrl('/', locale)
    return {
        title: {absolute: title},
        description,
        alternates: {
            canonical,
            languages: getLanguageAlternates('/opengraph-image.png')
        },
        openGraph: {
            title,
            description,
            type: 'website',
            url: canonical,
            siteName: siteConfig.name,
            locale: getOpenGraphLocale(locale),
            alternateLocale: [
                locale === 'ru' ? 'en_US' : 'ru_RU'
            ],
            images: [
                {
                    url: '/',
                    width: 1200,
                    height: 630,
                    alt: title
                }
            ]
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: ['/opengraph-image.png']
        }
    }

}



const Main = async ({ params }: MainPageProps) => {
    let projects: IProject[] = [];
    let aboutMe: AboutMe | null = null;
    let skills: Skill[] = [];
    let stack: Stack[] = [];
    
    const { locale: requestedLocale } = await params
    const locale: AppLocale = requestedLocale === 'ru' ? 'ru' : 'en'
    
    try {
        const rawProjects = await prisma.project.findMany({
        include: {
            images: true,
            stack: true,
            description: true,
            metrics: true,
            commits: true,
            keyFeatures: true,
        },
        });

        const rawAboutMe = await prisma.aboutMe.findFirst({
            include: {
                workExperience: true
            }
        })

        projects = rawProjects.map((proj) => transformProject(proj));
        aboutMe = rawAboutMe ? transformAboutMe(rawAboutMe, locale) : null;
        skills = await prisma.skill.findMany();
        stack = await prisma.stack.findMany();
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return <ErrorPage error={errorMessage} />
    }
    
    return (
        <main>
            <AnimatedSection animation='fade-down'>
                <Preview />
            </AnimatedSection>

            <AnimatedSection animation='fade-left'>
                <Skills skills={skills} />
            </AnimatedSection>

            <AnimatedSection animation='fade-right'>
                <MyStack stack={stack} />
            </AnimatedSection>

            <AnimatedSection animation='fade-up'>
                <AboutMe aboutMe={aboutMe} />
            </AnimatedSection>

            <AnimatedSection animation='fade-down'>
                <Portfolio projects={projects} />
            </AnimatedSection>

            <AnimatedSection animation='zoom'>
                <Contacts />
            </AnimatedSection>
        </main>
    )
}


export default Main;