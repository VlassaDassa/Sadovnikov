'use client'

import { Provider } from "react-redux"
import { store } from "."
import { usePageLoad } from "@/hooks/usePageLoad"
import { BreakpointProvider } from "@/components/general/BreakpointProvider/BreakpointProvider"



export const PageLoadListener = () => {
    usePageLoad();
    return null;
};


export function Providers ({ children } : { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <BreakpointProvider>
                <PageLoadListener />
                {children}
            </BreakpointProvider>
        </Provider>
    )
}