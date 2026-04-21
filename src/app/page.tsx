import React from 'react';

import { useBreakpoint } from '@/hooks/useBreakpoint';

import Header from '@/components/general/header';
import Preview from '@/components/main/preview';
import Skills from '@/components/main/skills';
import MyStack from '@/components/main/myStack';
import AboutMe from '@/components/main/aboutMe';
import Portfolio from '@/components/main/portfolio';
import Contacts from '@/components/main/contacts';
import Footer from '@/components/general/footer';


const Main: React.FC = () => {
    const breakpoint = useBreakpoint()

    return (
        <>
            <Header breakpoint={breakpoint} />
            <Preview />
            <Skills />
            <MyStack />
            <AboutMe breakpoint={breakpoint} />
            <Portfolio breakpoint={breakpoint} />
            <Contacts breakpoint={breakpoint} />
            <Footer breakpoint={breakpoint} />
        </>
       
    )
}


export default Main;