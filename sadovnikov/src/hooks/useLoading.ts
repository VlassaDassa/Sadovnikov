import { useState, useEffect } from 'react';

export const useLoading = () => {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let mounted = true;
        let progressInterval: number | undefined;
        let timeoutId: number | undefined;

        const checkResources = () => {
            const images = Array.from(document.images);
            const totalImages = images.length;
            let loadedImages = 0;

            if (totalImages === 0) {
                simulateProgress();
                return;
            }

            images.forEach(img => {
                if (img.complete) {
                    loadedImages++;
                    if (mounted) {
                        setProgress(Math.floor((loadedImages / totalImages) * 100));
                    }
                } else {
                    img.onload = () => {
                        if (mounted) {
                            loadedImages++;
                            setProgress(Math.floor((loadedImages / totalImages) * 100));
                        }
                    };
                    img.onerror = () => {
                        if (mounted) {
                            loadedImages++;
                            setProgress(Math.floor((loadedImages / totalImages) * 100));
                        }
                    };
                }
            });

            if (loadedImages === totalImages) {
                simulateProgress();
            }
        };

        const simulateProgress = () => {
            let fakeProgress = 0;
            
            progressInterval = window.setInterval(() => {
                if (!mounted) return;
                
                fakeProgress += Math.random() * 5;
                if (fakeProgress < 95) {
                    setProgress(Math.min(95, Math.floor(fakeProgress)));
                }
            }, 100);

            timeoutId = window.setTimeout(() => {
                if (mounted) {
                    window.clearInterval(progressInterval);
                    setProgress(100);
                    
                    timeoutId = window.setTimeout(() => {
                        if (mounted) {
                            setLoading(false);
                        }
                    }, 500);
                }
            }, 2000);
        };

        checkResources();

        // Очистка
        return () => {
            mounted = false;
            if (progressInterval) window.clearInterval(progressInterval);
            if (timeoutId) window.clearTimeout(timeoutId);
        };
    }, []);

    return { loading, progress };
};