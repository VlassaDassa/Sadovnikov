export const parseDate = (dateString: string | undefined): Date | null => {
        if (!dateString) return null;
        
        // 1. Уже ISO
        let date = new Date(dateString);
        if (!isNaN(date.getTime())) return date;
        
        // 2. Формат "Month YYYY" (June 2022)
        const parts = dateString.split(' ');
        if (parts.length === 2) {
            const month = parts[0];
            const year = parseInt(parts[1], 10);
            if (!isNaN(year)) {
                return new Date(`${month} 1, ${year}`);
            }
        }
        
        // 3. Другие форматы при необходимости
        return null;
    };


export const displayDate = (dateString: string | undefined, day?: boolean): string => {
        if (!dateString) return '';
        if (dateString.toUpperCase() === 'PRESENT') return 'Present';
        
        const date = parseDate(dateString);
        if (!date) return '';
        
        if (day) {
            return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

        }
        
        return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    };