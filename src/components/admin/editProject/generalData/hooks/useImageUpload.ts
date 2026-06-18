import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { setTypeMessage, setTextMessage, toggleMessage } from '@/store/slices/messageSlice';
import { IImages, IProject } from '@/interfaces/general';


export const useImageUpload = (
    projectId: number,
    setData: React.Dispatch<React.SetStateAction<IProject[]>>
) => {
    const dispatch = useDispatch();
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [isLoading, setIsLoading] = useState(false)

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

    const showMessage = (type: 'error' | 'info', text: string) => {
        dispatch(setTypeMessage(type))
        dispatch(setTextMessage(text))
        dispatch(toggleMessage())
        setTimeout(() => {
            dispatch(toggleMessage())
        }, 3000);
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
                showMessage('error', 'Photo must be 1:1, 4:3 or 16:9')
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
                    setData(prev => 
                        prev.map(project => {
                            if (project.id !== projectId) return project;
                            const hasMain = project.images.some(img => img.main)
                            return {
                                ...project,
                                images: [...project.images, ...newImages.map(img => ({
                                    ...img,
                                    main: !hasMain && img === newImages[0],
                                }))]
                            }
                        })
                    )
                }

                showMessage('info', 'Success!')
                if (fileInputRef.current) fileInputRef.current.value = ''
                setIsLoading(false)
            }

            reader.readAsDataURL(file)
        })
    }

    const openFilePicker = () => fileInputRef.current?.click()
    return { fileInputRef, handleFileUpload, openFilePicker, isLoading }
}
