import { useState, useEffect } from 'react';

import type { Breakpoint } from '../interfaces/general';



export const useBreakpoint = (): Breakpoint => {
    const [breakpoint, setBreakpoint] = useState<Breakpoint>('mobile');

    useEffect(() => {
        const updateBreakpoint = () => {
            if (window.innerWidth >= 1280) {
                setBreakpoint('desktop')
            }
            else if (window.innerWidth >= 768) {
                setBreakpoint('tablet')
            }
            else {
                setBreakpoint('mobile')
            }
        }
        
        updateBreakpoint()
        window.addEventListener('resize', updateBreakpoint)
        return () => window.removeEventListener('resize', updateBreakpoint)
    }, [])

    return breakpoint
}
