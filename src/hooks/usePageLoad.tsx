'use client'

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "@/store/slices/loaderSlice";



export const usePageLoad = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        
        const checkLoaded = () => {
            const images = document.querySelectorAll('img');
            const promises = Array.from(images).map(img => {
                if (img.complete) return Promise.resolve();
                return new Promise((resolve) => {
                    img.onload = resolve;
                    img.onerror = resolve;
                });
            });
            
            Promise.all(promises).then(() => {
                timeout = setTimeout(() => {
                    dispatch(setLoading(false));
                }, 500);
            });
        };
        
        if (document.readyState === 'complete') {
            checkLoaded();
        } else {
            window.addEventListener('load', checkLoaded);
            return () => window.removeEventListener('load', checkLoaded);
        }
        
        return () => clearTimeout(timeout);
    }, [dispatch]);
};
