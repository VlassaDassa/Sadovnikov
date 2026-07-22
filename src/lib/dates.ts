export const parseDate = (dateString: string | undefined): Date | null => {
        if (!dateString) return null;
        
        let date = new Date(dateString);
        if (!isNaN(date.getTime())) return date;
        
        const parts = dateString.split(' ');
        if (parts.length === 2) {
            const month = parts[0];
            const year = parseInt(parts[1], 10);
            if (!isNaN(year)) {
                return new Date(`${month} 1, ${year}`);
            }
        }
        
        return null;
    };


export const displayDate = (dateString: string | undefined, day?: boolean, lang?: string): string => {
        const curLang = lang === "en" ? "en-US" : "ru-RU"

        if (!dateString) return '';
        if (dateString.toUpperCase() === 'PRESENT') return 'Present';
        
        const date = parseDate(dateString);
        if (!date) return '';
        
        if (day) {
            return date.toLocaleDateString(curLang, { month: 'long', day: 'numeric', year: 'numeric' });

        }
        
        return date.toLocaleDateString(curLang, { month: 'long', year: 'numeric' });
    };