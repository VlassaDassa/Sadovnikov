import React from 'react';

import Preview from '@/components/main/preview';
import Skills from '@/components/main/skills';
import MyStack from '@/components/main/myStack';
import AboutMe from '@/components/main/aboutMe';
import Portfolio from '@/components/main/portfolio';
import Contacts from '@/components/main/contacts';

import AnimatedSection from '@/components/general/AnimatedScroll';


const Main: React.FC = () => {

    return (
        <>
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
        </>
       
    )
}


export default Main;