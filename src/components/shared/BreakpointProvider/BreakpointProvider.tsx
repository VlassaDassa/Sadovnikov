'use client'

import React, { useEffect } from "react"
import { useDispatch } from 'react-redux'
import { setBreakpoint, setWindowWidth } from "@/store/slices/breakpointSlice"
import type { Breakpoint } from "@/interfaces/general"

interface BreakpointProviderProps {
    children: React.ReactNode;
}

export const BreakpointProvider = ({ children }: BreakpointProviderProps ) => {
    const dispatch = useDispatch()

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        const updateBreakpoint = () => {
            const width = window.innerWidth
            let breakpoint: Breakpoint

            if (width >= 1280) {
                breakpoint = 'desktop'
            } else if (width >= 768) {
                breakpoint = 'tablet'
            } else {
                breakpoint = 'mobile'
            }

            dispatch(setBreakpoint(breakpoint))
            dispatch(setWindowWidth(width))
        }

        const debouncedUpdate = () => {
            clearTimeout(timeout)
            timeout = setTimeout(updateBreakpoint, 150)
        }

        // Запускаем сразу при монтировании
        updateBreakpoint()

        window.addEventListener('resize', debouncedUpdate)
        return () => {
            window.removeEventListener('resize', debouncedUpdate)
            clearTimeout(timeout)
        }
    }, [dispatch])

    return <>{children}</>
}