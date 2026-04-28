import { configureStore } from '@reduxjs/toolkit';
import breakpointReducer from './slices/breakpointSlice';
import uiReducer from './slices/uiSlice';
import loaderReducer from './slices/loaderSlice';


export const store = configureStore({
    reducer: {
        breakpoint: breakpointReducer,
        uiState: uiReducer,
        loader: loaderReducer
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch