'use client'

import { Provider } from "react-redux"
import { store } from "."
import { BreakpointProvider } from "@/components/general/BreakpointProvider/BreakpointProvider"

export function Providers ({ children } : { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <BreakpointProvider>
                {children}
            </BreakpointProvider>
        </Provider>
    )
}