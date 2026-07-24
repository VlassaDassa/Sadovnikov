import { useState } from 'react';

export const useCopy = () => {
    const [copied, setCopied] = useState(false);

    const copy = async (text: string) => {
        if (navigator.clipboard && window.isSecureContext) {
            try {
                await navigator.clipboard.writeText(text);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
                return true;
            } catch (err) {
                console.warn('Clipboard API failed:', err);
            }
        }

        try {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            textarea.style.top = '-9999px';
            textarea.style.left = '-9999px';
            document.body.appendChild(textarea);
            textarea.focus();
            textarea.select();
            
            const success = document.execCommand('copy');
            document.body.removeChild(textarea);
            
            if (success) {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
                return true;
            }
        } catch (err) {
            console.warn('execCommand failed:', err);
        }

        console.warn('copy error');
        return false;
    };

    return { copy, copied };
};;