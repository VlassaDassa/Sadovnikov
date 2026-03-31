import React from 'react';

import './index.scss'

import Header from '../../components/general/header';
import Preview from '../../components/preview';
import Skills from '../../components/skills';


const Main: React.FC = () => {
    return (
        <>
            <Header />
            <Preview />
            <Skills />
        </>
       
    )
}


export default Main;