import React, { useState, useEffect } from "react";
import type { IProject } from "@/interfaces/general";



export const useImageManagement = (
    projectId: number,
    projects: IProject[],
    setData: React.Dispatch<React.SetStateAction<IProject[]>>
) => {
    const project = projects.find(p => p.id === projectId)
    const [curImage, setCurImage] = useState<number>(
        project?.images.find(img => img.main)?.id || 1
    )

    useEffect(() => {
        const project = projects.find(p => p.id === projectId)
        if (project) {
            const imageExists = project.images.some(img => img.id === curImage)
            if (!imageExists && project.images.length > 0) {
                setCurImage(project.images[0].id)
            }
        }
    }, [projects, projectId, curImage])


    const handleMainClick = (id: number) => {
        setData(prev => 
            prev.map(project => {
                if (project.id !== projectId) return project
                return {
                    ...project,
                    images: project.images.map(img => ({
                        ...img,
                        main: img.id === id
                    }))
                }
            })
        )
    }

    const handleDeleteImage = (id: number) => {
        setData(prev => 
            prev.map(project => {
                if (projectId !== projectId) return project
                if (project.images.length <= 1) return project

                const updatedImages = project.images.filter(img => img.id !== id)
                const wasMainDeleted = project.images.find(img => img.id === id)?.main

                const finalImages = wasMainDeleted && updatedImages.length > 0
                    ? updatedImages.map((img, index) => ({
                        ...img,
                        main: index === 0
                    })) 
                    : updatedImages

                return {...project, images: finalImages}
            })
        )
    }

    const currentImage = project?.images.find(img => img.id === curImage)

    return {
        curImage,
        setCurImage,
        currentImage,
        handleMainClick,
        handleDeleteImage
    }
}