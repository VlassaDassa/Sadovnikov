import React, { useRef, useEffect } from 'react';

interface AutoResizeTextareaProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    maxHeight?: number;
}

const AutoResizeTextarea: React.FC<AutoResizeTextareaProps> = ({
    value,
    onChange,
    placeholder,
    maxHeight = 300
}) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(e.target.value);
    };

    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            const newHeight = Math.min(textarea.scrollHeight, maxHeight);
            textarea.style.height = `${newHeight}px`;
            
            textarea.style.overflowY = textarea.scrollHeight > maxHeight ? 'auto' : 'hidden';
        }
    }, [value, maxHeight]);

    return (
        <textarea
            ref={textareaRef}
            value={value}
            className="contactsField"
            onChange={handleChange}
            placeholder={placeholder}
        />
    );
};

export default AutoResizeTextarea;