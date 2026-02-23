import { useEffect, useRef, useState } from 'react';

interface UseScrollAnimationProps {
    threshold?: number;
    rootMargin?: string;
    animationClass?: string;
}

export const useScrollAnimation = <T extends HTMLElement>({
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    animationClass = 'animate-in'
}: UseScrollAnimationProps = {}) => {
    const elementRef = useRef<T>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const currentElement = elementRef.current;
        
        if (!currentElement) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(currentElement);
                }
            },
            {
                threshold,
                rootMargin,
            }
        );

        observer.observe(currentElement);

        return () => {
            if (currentElement) {
                observer.unobserve(currentElement);
            }
        };
    }, [threshold, rootMargin]);

    return { elementRef, isVisible, animationClass: isVisible ? animationClass : '' };
};