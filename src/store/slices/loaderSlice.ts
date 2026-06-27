import {createSlice, PayloadAction} from '@reduxjs/toolkit';


const loaderSlice = createSlice({
    name: 'loader',
    initialState: {
        isLoading: true, 
    },
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
    },
});

export const { setLoading } = loaderSlice.actions;
export default loaderSlice.reducer;