import React, { useState } from "react";

import type { IProject } from "@/interfaces/general";

export const useImageManagement = (
    project: IProject,
    setData: React.Dispatch<React.SetStateAction<IProject>>,
) => {
    const [selectedImageId, setSelectedImageId] = useState<number>(() => {
        return (
            project.images.find((image) => image.main)?.id ??
            project.images[0]?.id ??
            1
        );
    });

    const selectedImageExists = project.images.some(
        (image) => image.id === selectedImageId,
    );

    const curImage = selectedImageExists
        ? selectedImageId
        : (project.images[0]?.id ?? selectedImageId);

    const currentImage = project.images.find((image) => image.id === curImage);

    const setCurImage: React.Dispatch<React.SetStateAction<number>> =
        setSelectedImageId;

    const handleMainClick = (id: number) => {
        setData((previous) => ({
            ...previous,
            images: previous.images.map((image) => ({
                ...image,
                main: image.id === id,
            })),
        }));
    };

    const handleDeleteImage = (id: number) => {
        setData((previous) => {
            if (previous.images.length <= 1) {
                return previous;
            }

            const updatedImages = previous.images.filter(
                (image) => image.id !== id,
            );

            const wasMainDeleted = previous.images.find(
                (image) => image.id === id,
            )?.main;

            const finalImages =
                wasMainDeleted && updatedImages.length > 0
                    ? updatedImages.map((image, index) => ({
                          ...image,
                          main: index === 0,
                      }))
                    : updatedImages;

            return {
                ...previous,
                images: finalImages,
            };
        });
    };

    return {
        curImage,
        setCurImage,
        currentImage,
        handleMainClick,
        handleDeleteImage,
    };
};
