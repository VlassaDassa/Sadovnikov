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


    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files

        if (!files || files.length === 0) return

        setIsLoading(true)

        const newImages: IImages[] = []
        const validFiles: File[] = []

        for (const file of Array.from(files)) {
            const { valid } = await validateImage(file)
            if (valid) {
                validFiles.push(file)
            }
            else {
                showMessage('error', 'Photo must be 1:1, 4:3 or 16:9', dispatch)
            }
        }

        if (validFiles.length === 0) {
            setIsLoading(false)
            return
        }

        validFiles.forEach((file, index) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const imageUrl = event.target?.result as string
                newImages.push({
                    id: Date.now() + index,
                    image: imageUrl,
                    main: false // !
                })

                if (newImages.length === validFiles.length) {
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
                                    }

                showMessage('info', 'Success!', dispatch)
                if (fileInputRef.current) fileInputRef.current.value = ''
                setIsLoading(false)
            }

            reader.readAsDataURL(file)
        })
    }

    const openFilePicker = () => fileInputRef.current?.click()
    return { fileInputRef, handleFileUpload, openFilePicker, isLoading }
}
