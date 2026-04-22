'use client'

import React, { useEffect } from "react"
import { useDispatch } from 'react-redux'
import { setBreakpoint } from "@/store/slices/breakpointSlice"
import type { Breakpoint } from "@/interfaces/general"



interface BreakpointProviderProps {
    children: React.ReactNode;
}

export const BreakpointProvider = ({ children }: BreakpointProviderProps ) => {
    const dispatch = useDispatch()

    useEffect(() => {
        const updateBreakpoint = () => {
            const width = window.innerWidth
            let breakpoint: Breakpoint

            if (width >= 1280) {
                breakpoint='desktop'
            }
            else if (width >= 768) {
                breakpoint='tablet'
            }
            else {
                breakpoint='mobile'
            }

            dispatch(setBreakpoint(breakpoint))
        }
        
        updateBreakpoint()
        window.addEventListener('resize', updateBreakpoint)
        return () => window.removeEventListener('resize', updateBreakpoint)
    }, [dispatch])

    return <>{children}</>
}