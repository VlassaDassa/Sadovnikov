import { useEffect, useRef, useState } from 'react';

interface UseInViewOptions {
    threshold?: number;
    triggerOnce?: boolean;
}

export const useInView = (options: UseInViewOptions = {}) => {
    const { threshold = 0.3, triggerOnce = true } = options;
    const ref = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting) {
                    setIsInView(true);
                    if (triggerOnce) {
                        observer.unobserve(element);
                    }
                } else if (!triggerOnce) {
                    setIsInView(false);
                }
            },
            { threshold }
        );

        observer.observe(element);

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, [threshold, triggerOnce]);

    return { ref, isInView };
};