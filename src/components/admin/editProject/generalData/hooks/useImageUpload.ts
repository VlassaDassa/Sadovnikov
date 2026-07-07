import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { showMessage } from '@/lib/showMessage';

import { IImages, IProject } from '@/interfaces/general';


export const useImageUpload = (
    setData: React.Dispatch<React.SetStateAction<IProject>>
) => {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()

    const validateImage = (file: File): Promise<{valid: boolean, ratio?: number}> => {
        return new Promise((resolve) => {
            const img = new Image()
            img.onload = () => {
                const ratio = img.naturalWidth / img.naturalHeight
                const isValid = ratio >= 0.8 && ratio <= 2.0
                resolve({ valid: isValid, ratio })
            }
            img.src = URL.createObjectURL(file)
        })
    }

    const compressImage = (file: File, maxWidth = 1200, quality = 0.7): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target?.result as string;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    let width = img.width;
                    let height = img.height;

                    if (width > maxWidth) {
                        height = (height * maxWidth) / width;
                        width = maxWidth;
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx?.drawImage(img, 0, 0, width, height);
                    resolve(canvas.toDataURL('image/jpeg', quality));
                };
                img.onerror = reject;
            };
            reader.onerror = reject;
        });
    };


    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setIsLoading(true);
        const newImages: IImages[] = [];
        const validFiles: File[] = [];

        for (const file of Array.from(files)) {
            const { valid } = await validateImage(file);
            if (valid) {
                validFiles.push(file);
            } else {
                showMessage('error', 'Photo must be 1:1, 4:3 or 16:9', dispatch);
            }
        }

        if (validFiles.length === 0) {
            setIsLoading(false);
            return;
        }


        for (let i = 0; i < validFiles.length; i++) {
            const file = validFiles[i];
            try {
                const compressed = await compressImage(file, 1200, 0.7);
                newImages.push({
                    id: Date.now() + i,
                    image: compressed,
                    main: false,
                });
            } catch (error) {
                console.error('Error compressing image:', error);
            }
        }

        setData((prev: IProject) => {
            const hasMain = prev.images.some(img => img.main);
            return {
                ...prev,
                images: [
                    ...prev.images,
                    ...newImages.map((img, index) => ({
                        ...img,
                        main: !hasMain && index === 0,
                    })),
                ],
            };
        });

        if (fileInputRef.current) fileInputRef.current.value = '';
        setIsLoading(false);
    };

    const openFilePicker = () => fileInputRef.current?.click()
    return { fileInputRef, handleFileUpload, openFilePicker, isLoading }
}
