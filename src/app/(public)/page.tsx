import React from 'react';


import Preview from '@/components/public/main/preview';
import Skills from '@/components/public/main/skills';
import MyStack from '@/components/public/main/myStack';
import AboutMe from '@/components/public/main/aboutMe';
import Portfolio from '@/components/public/main/portfolio';
import Contacts from '@/components/public/main/contacts';
import AnimatedSection from '@/components/shared/AnimatedScroll';

import { transformProject } from '@/lib/transformers/project';
import { transformAboutMe } from '@/lib/transformers/aboutMe';
import prisma from '@/lib/prisma';


const Main: React.FC = async () => {
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
    const projects = rawProjects.map(transformProject);

    const rawAboutMe = await prisma.aboutMe.findFirst({
        include: {
            workExperience: true
        }
    })

    if (!rawAboutMe) {
        return <div>Данные об авторе не найдены</div>;
    }
    
    const aboutMe = transformAboutMe(rawAboutMe);


    const skills = await prisma.skill.findMany();
    const stack = await prisma.stack.findMany();
    
    

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