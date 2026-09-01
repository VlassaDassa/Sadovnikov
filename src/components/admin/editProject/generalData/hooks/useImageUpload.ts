import React, { useRef, useState } from "react";

import { useDispatch } from "react-redux";

import { showMessage } from "@/lib/showMessage";

import { uploadProjectImage } from "@/lib/uploads/uploadProjectImage";

import type { IImages, IProject } from "@/interfaces/general";

export const useImageUpload = (
    project: IProject,
    setData: React.Dispatch<React.SetStateAction<IProject>>,
) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const validateImage = (file: File): Promise<boolean> => {
        return new Promise((resolve) => {
            const image = new Image();

            const objectUrl = URL.createObjectURL(file);

            image.onload = () => {
                const ratio = image.naturalWidth / image.naturalHeight;

                URL.revokeObjectURL(objectUrl);

                resolve(ratio >= 0.8 && ratio <= 2);
            };

            image.onerror = () => {
                URL.revokeObjectURL(objectUrl);

                resolve(false);
            };

            image.src = objectUrl;
        });
    };

    const handleFileUpload = async (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const files = event.target.files;

        if (!files || files.length === 0) {
            return;
        }

        const availableSlots = Math.max(0, 4 - project.images.length);

        const selectedFiles = Array.from(files).slice(0, availableSlots);

        if (selectedFiles.length === 0) {
            return;
        }

        setIsLoading(true);

        const newImages: IImages[] = [];
        const usedIds = new Set(project.images.map((image) => image.id));

        try {
            for (const file of selectedFiles) {

                const valid = await validateImage(file);

                if (!valid) {
                    showMessage(
                        "error",
                        "Photo must be 1:1, 4:3 or 16:9",
                        dispatch,
                    );

                    continue;
                }

                const uploaded = await uploadProjectImage({
                    file,
                    projectId: project.id,
                    category: "gallery",
                });

                const temporaryId = Array.from(
                    { length: 99 },
                    (_, offset) => -(project.id * 100 + offset + 1),
                ).find((id) => !usedIds.has(id));

                if (temporaryId === undefined) {
                    throw new Error("No temporary image id is available");
                }

                usedIds.add(temporaryId);

                newImages.push({
                    id: temporaryId,

                    image: uploaded.url,

                    main: false,
                });
            }

            if (newImages.length > 0) {
                setData((previous) => {
                    const hasMain = previous.images.some((image) => image.main);

                    return {
                        ...previous,

                        images: [
                            ...previous.images,

                            ...newImages.map((image, index) => ({
                                ...image,

                                main: !hasMain && index === 0,
                            })),
                        ],
                    };
                });
            }
        } catch (error) {
            console.error("Image upload failed:", error);

            showMessage("error", "Image upload failed", dispatch);
        } finally {
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }

            setIsLoading(false);
        }
    };

    const openFilePicker = () => {
        fileInputRef.current?.click();
    };

    return {
        fileInputRef,
        handleFileUpload,
        openFilePicker,
        isLoading,
    };
};
