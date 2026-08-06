import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { render } from "@testing-library/react"
import type { ReactElement } from "react"
import { Provider } from "react-redux"

import breakpointReducer from "@/store/slices/breakpointSlice"
import loaderReducer from "@/store/slices/loaderSlice"
import messageReducer from "@/store/slices/messageSlice"
import tooltipReducer from "@/store/slices/tooltipSlice"
import uiReducer from "@/store/slices/uiSlice"

const rootReducer = combineReducers({
    breakpoint: breakpointReducer,
    uiState: uiReducer,
    loader: loaderReducer,
    message: messageReducer,
    tooltip: tooltipReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export type PreloadedState = Parameters<typeof rootReducer>[0]

export function setupStore(
    preloadedState?: PreloadedState,
) {
    return configureStore({
        reducer: rootReducer,
        preloadedState,
    })
}

export type AppStore = ReturnType<typeof setupStore>

export type AppDispatch = AppStore["dispatch"]

export function renderWithStore(
    ui: ReactElement,
    preloadedState?: PreloadedState,
) {
    const store = setupStore(preloadedState)

    return {
        store,
        ...render(
            <Provider store={store}>
                {ui}
            </Provider>,
        ),
    }
}