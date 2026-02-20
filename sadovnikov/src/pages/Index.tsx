import React from 'react';


import Preview from '../components/Preview';
import Skills from '../components/Skills';
import Stack from '../components/Stack';
import About from '../components/About';

import './index.scss';


const Index: React.FC = () => {
    return (
        <main className="main">
            <Preview />
            <Skills />
            <Stack />
            <About />
        </main>
)
} 

export default Index;