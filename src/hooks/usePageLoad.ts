'use client';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/store/slices/loaderSlice';

export const usePageLoad = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        
        // Проверяем загрузку всех next/image компонентов
        const checkNextImages = () => {
            // Next.js добавляет атрибут data-nimg="1" к своим изображениям
            const images = document.querySelectorAll<HTMLImageElement>('img[data-nimg="1"]');
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
            checkNextImages();
        } else {
            window.addEventListener('load', checkNextImages);
            return () => window.removeEventListener('load', checkNextImages);
        }
        
        return () => clearTimeout(timeout);
    }, [dispatch]);
};