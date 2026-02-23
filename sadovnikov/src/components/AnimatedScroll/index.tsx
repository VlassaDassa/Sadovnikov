import React from 'react';

import { useScrollAnimation } from '../../hooks/scrollAnimation';

import './index.scss';

interface AnimatedSectionProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    animation?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom' | 'flip';
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ 
    children, 
    className = '', 
    delay = 0,
    animation = 'fade-up' 
}) => {
    const { elementRef, isVisible } = useScrollAnimation<HTMLDivElement>({
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    return (
        <div
            ref={elementRef}
            className={`animated-section ${animation} ${isVisible ? 'visible' : ''} ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

export default AnimatedSection;