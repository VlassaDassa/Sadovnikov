import React from 'react';

import Canvas from '../canvas';
import Slider from '../slider';

import type { Breakpoint } from '../../../interfaces/general';

import './index.scss';

interface PortfolioProps {
    breakpoint: Breakpoint;
}


const Portfolio: React.FC<PortfolioProps> = ({ breakpoint }) => {

    const portfolioContent = (
        breakpoint === 'mobile' ? 
            <Slider /> 
            :
            <Canvas />
    )

    return (
        <section className="container portfolio">
            <h2 className="heading-32-magra-bold whiteText sectionTitle">PORTFOLIO</h2>

            {portfolioContent}

        </section>
    )
}

export default Portfolio;