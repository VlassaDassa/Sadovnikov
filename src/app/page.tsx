import React from 'react';

import Preview from '@/components/main/preview';
import Skills from '@/components/main/skills';
import MyStack from '@/components/main/myStack';
import AboutMe from '@/components/main/aboutMe';
import Portfolio from '@/components/main/portfolio';
import Contacts from '@/components/main/contacts';


const Main: React.FC = () => {

    return (
        <>
            <Preview />
            <Skills />
            <MyStack />
            <AboutMe />
            <Portfolio />
            <Contacts />
        </>
       
    )
}


export default Main;