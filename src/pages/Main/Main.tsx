import React from 'react';

import { useBreakpoint } from '../../hooks/useBreakpoint';

import Header from '../../components/general/header';
import Preview from '../../components/preview';
import Skills from '../../components/skills';
import MyStack from '../../components/main/myStack';
import AboutMe from '../../components/main/aboutMe';

import './index.scss'




const Main: React.FC = () => {
    const breakpoint = useBreakpoint()

    return (
        <>
            <Header />
            <Preview />
            <Skills />
            <MyStack />
            <AboutMe breakpoint={breakpoint} />
        </>
       
    )
}


export default Main;