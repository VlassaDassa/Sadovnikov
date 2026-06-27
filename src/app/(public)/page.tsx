import React from 'react';

import Preview from '@/components/public/main/preview';
import Skills from '@/components/public/main/skills';
import MyStack from '@/components/public/main/myStack';
import AboutMe from '@/components/public/main/aboutMe';
import Portfolio from '@/components/public/main/portfolio';
import Contacts from '@/components/public/main/contacts';

import AnimatedSection from '@/components/shared/AnimatedScroll';


const Main: React.FC = () => {
    return (
        <main>
            <AnimatedSection animation='fade-down'>
                <Preview />
            </AnimatedSection>
            <AnimatedSection animation='fade-left'>
                <Skills />
            </AnimatedSection>
            <AnimatedSection animation='fade-right'>
                <MyStack />
            </AnimatedSection>
            <AnimatedSection animation='fade-up'>
                <AboutMe />
            </AnimatedSection>
            <AnimatedSection animation='fade-down'>
                <Portfolio />
            </AnimatedSection>
            <AnimatedSection animation='zoom'>
                <Contacts />
            </AnimatedSection>
        </main>
    )
}


export default Main;