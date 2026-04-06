import React from 'react';

import './index.scss'

import Header from '../../components/general/header';
import Preview from '../../components/preview';
import Skills from '../../components/skills';
import MyStack from '../../components/main/myStack';
import AboutMe from '../../components/main/aboutMe';


const Main: React.FC = () => {
    return (
        <>
            <Header />
            <Preview />
            <Skills />
            <MyStack />
            <AboutMe />
        </>
       
    )
}


export default Main;