import React from 'react';
import { getLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
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
import prisma from '@/lib/prisma';
import { IProject, Skill, Stack } from '@/interfaces/general';


const Main: React.FC = async () => {
    let projects: IProject[] = [];
    let aboutMe: AboutMe | null = null;
    let skills: Skill[] = [];
    let stack: Stack[] = [];
    
    const requestedLocale = await getLocale();
    const locale =
        hasLocale(
            routing.locales,
            requestedLocale,
        )
            ? requestedLocale
            : routing.defaultLocale;
    
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