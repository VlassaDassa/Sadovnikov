import React, { useRef, useState } from 'react';
import AdaptiveImage from '@/components/shared/AdaptiveImage';

import styles from './index.module.scss';

interface IconUploaderProps {
    icon: string;
    additionalClass?: string;
    onIconUpload: (path: string) => void; 
}

const IconUploader: React.FC<IconUploaderProps> = ({ icon, additionalClass, onIconUpload}) => {
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [currentIcon, setCurrentIcon] = useState(icon);

    const handleIconClick = () => {
        fileInputRef.current?.click();
    }

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) return;

        if (file.type !== 'image/svg+xml' && !file.name.endsWith('.svg')) {
            setError('Необходимо выбрать SVG файл');
            setTimeout(() => setError(null), 3000);
            return;
        } 

        setError(null)

        // Загрузка на сервер
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            const dataUrl = event.target?.result as string;
            setCurrentIcon(dataUrl);
            onIconUpload(dataUrl);
        }

        reader.readAsDataURL(file)
        
    }

    return (
        <div className={`${styles.iconUploader} ${additionalClass}`} onClick={handleIconClick}>
            <AdaptiveImage 
                src={currentIcon} 
                alt="Current icon" 
                ariaHidden={false}
                wrapClass={styles.iconImage}
            />

            <input 
                type="file" 
                accept=".svg,image/svg+xml" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                style={{ display: 'none' }} 
            />
        </div>
    )
}

export default IconUploader;
    