import React, { useState, useEffect } from "react";
import type { IProject } from "@/interfaces/general";



export const useImageManagement = (
    project: IProject,
    setData: React.Dispatch<React.SetStateAction<IProject>>
) => {
    const [curImage, setCurImage] = useState<number>(
        project?.images.find(img => img.main)?.id || 1
    )

    useEffect(() => {
        if (project) {
            const imageExists = project.images.some(img => img.id === curImage)
            if (!imageExists && project.images.length > 0) {
                setCurImage(project.images[0].id)
            }
        }
    }, [project, curImage])


    const handleMainClick = (id: number) => {
        setData((prev: IProject) => ({
            ...prev,
            images: prev.images.map(img => ({
                ...img,
                main: img.id === id
            }))
        }));
    };

    const handleDeleteImage = (id: number) => {
        setData((prev: IProject) => {
            if (prev.images.length <= 1) return prev;

            const updatedImages = prev.images.filter(img => img.id !== id);
            const wasMainDeleted = prev.images.find(img => img.id === id)?.main;

            const finalImages = wasMainDeleted && updatedImages.length > 0
                ? updatedImages.map((img, index) => ({
                    ...img,
                    main: index === 0
                }))
                : updatedImages;

            return {
                ...prev,
                images: finalImages
            };
        });
    };

    const currentImage = project?.images.find(img => img.id === curImage)

    return {
        curImage,
        setCurImage,
        currentImage,
        handleMainClick,
        handleDeleteImage
    }
}