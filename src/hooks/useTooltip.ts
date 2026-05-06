'use client'

import { useRef, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { showTooltip, hideTooltip } from '@/store/slices/tooltipSlice';
import type { TooltipConfig } from '@/interfaces/general';




export const useTooltip = <T extends HTMLElement = HTMLDivElement>(config: TooltipConfig): React.RefObject<T | null> => {
    const dispatch = useDispatch()
    const ref = useRef<T>(null);
    const timeoutRef = useRef<NodeJS.Timeout>(null);
    const { delay=300, offset=10, placement='right', text, title, date, type='lvl1', fakeWidth } = config

    const calculatePosition = useCallback((target: HTMLElement): { top: number, left: number } => {
        const rect = target.getBoundingClientRect()
        let top = 0;
        let left = 0;

        const tooltipWidth = fakeWidth || 200;
        const tooltipHeight = 60;

        switch (placement) {
            case 'top':
                top = rect.top - tooltipHeight - offset
                left = rect.left + (rect.width / 2) - (tooltipWidth / 2)
                break;
            case 'bottom':
                top = rect.bottom + offset
                left = rect.left + (rect.width / 2) - (tooltipWidth / 2)
                break
            case 'left':
                top = rect.top + (rect.height / 2) - (tooltipHeight / 2)
                left = rect.left - tooltipWidth - offset
                break
            case 'right':
            default:
                top = rect.top + (rect.height / 2) - (tooltipHeight / 2)
                left = rect.right + offset
                break
        }

        if (left < 10) left = 10;
        if (left + tooltipWidth > window.innerWidth) left = window.innerWidth - tooltipWidth - 10
        if (top < 10) top = 10
        if (top + tooltipHeight > window.innerHeight) top = window.innerHeight - tooltipHeight - 10

        return { top, left }
}, [placement, offset]);

    const handleMouseEnter = useCallback(() => {
        if (!ref.current) return

        timeoutRef.current = setTimeout(() => {
            if (!ref.current) return; 
            const target = ref.current
            const position = calculatePosition(target)
            dispatch(showTooltip({
                text,
                title,
                date,
                type,
                position,
                targetId: Math.random().toString()
            }))
        }, delay)

    }, [dispatch, text, title, date, type, delay, calculatePosition])

    const handleMouseLeave = useCallback(() => {
        if (!timeoutRef.current) return

        clearTimeout(timeoutRef.current);
        dispatch(hideTooltip())
    }, [dispatch])

    useEffect(() => {
        const element = ref.current
        if (!element) return

        element.addEventListener('mouseenter', handleMouseEnter)
        element.addEventListener('mouseleave', handleMouseLeave)

        return () => {
            element.removeEventListener('mouseenter', handleMouseEnter)
            element.removeEventListener('mouseleave', handleMouseLeave)
            if (timeoutRef.current) clearTimeout(timeoutRef.current)
        }
    }, [handleMouseEnter, handleMouseLeave])

    return ref;
}