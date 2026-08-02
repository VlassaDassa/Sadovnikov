import { useRef, useState } from 'react';

import { useDispatch } from 'react-redux';
import { setTypeMessage, setTextMessage, toggleMessage } from '@/store/slices/messageSlice';
import { uploadProjectImage } from '@/lib/uploads/uploadProjectImage';

import { IProject } from '@/interfaces/general';


export const useKeyFeatureImageUpload = (
    projectId: number,
    featureId: number,
    field: 'photo' | 'icon',

    setData:
        React.Dispatch<
            React.SetStateAction<IProject>
        >,
) => {
    const dispatch = useDispatch();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState(false);

    const validateFile = async (file: File): Promise<{ valid: boolean; error?: string }> => {
        // Для иконок — только SVG
        if (field === 'icon') {
            const isSvg = file.type === 'image/svg+xml' || file.name.endsWith('.svg');
            if (!isSvg) {
                return { valid: false, error: 'Only SVG files allowed for icons' };
            }
            return { valid: true };
        }

        // Для фото — проверка пропорций
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                const ratio = img.naturalWidth / img.naturalHeight;
                const isValid = ratio >= 1.1 && ratio <= 1.4;
                resolve({ 
                    valid: isValid, 
                    error: isValid ? undefined : 'Photo must be 11:9 (309x252)' 
                });
            };
            img.onerror = () => {
                resolve({ valid: false, error: 'Failed to load image' });
            };
            img.src = URL.createObjectURL(file);
        });
    };

    const showMessage = (type: 'error' | 'info', text: string) => {
        dispatch(setTypeMessage(type));
        dispatch(setTextMessage(text));
        dispatch(toggleMessage());
        setTimeout(() => dispatch(toggleMessage()), 3000);
    };

    const handleFileUpload =
        async (
            event:
                React.ChangeEvent<
                    HTMLInputElement
                >,
        ) => {
            const file =
                event.target.files?.[0]

            if (!file) {
                return
            }

            setIsLoading(true)

            try {
                const validation =
                    await validateFile(
                        file,
                    )

                if (!validation.valid) {
                    showMessage(
                        'error',
                        validation.error ??
                        'Invalid file',
                    )

                    return
                }

                const uploaded =
                    await uploadProjectImage({
                        file,
                        projectId,

                        category:
                            field === 'icon'
                                ? 'feature-icon'
                                : 'feature-photo',
                    })

                setData(
                    (
                        previous,
                    ) => ({
                        ...previous,

                        keyFeatures:
                            previous
                                .keyFeatures
                                .map(
                                    (
                                        feature,
                                    ) =>
                                        feature.id ===
                                        featureId
                                            ? {
                                                ...feature,

                                                [field]:
                                                    uploaded.url,
                                            }
                                            : feature,
                                ),
                    }),
                )

                showMessage(
                    'info',
                    'Success!',
                )
            } catch (error) {
                console.error(
                    'Feature image upload failed:',
                    error,
                )

                showMessage(
                    'error',
                    'Image upload failed',
                )
            } finally {
                setIsLoading(false)

                if (
                    fileInputRef.current
                ) {
                    fileInputRef.current
                        .value = ''
                }
            }
        }

    const openFilePicker = () => fileInputRef.current?.click();

    return { fileInputRef, handleFileUpload, openFilePicker, isLoading };
};