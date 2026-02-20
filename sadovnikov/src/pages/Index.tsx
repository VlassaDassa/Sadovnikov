import React from 'react';


import Preview from '../components/Preview';
import Skills from '../components/Skills';
import Stack from '../components/Stack';
import About from '../components/About';
import Portfolio from '../components/Portfolio';

import './index.scss';


const Index: React.FC = () => {
    return (
        <main className="main">
            <Preview />
            <Skills />
            <Stack />
            <About />
            <Portfolio />
        </main>
)
} 

export default Index;