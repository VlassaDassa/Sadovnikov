import {createSlice, PayloadAction} from '@reduxjs/toolkit';


interface MessageState {
    type: 'info' | 'warning' | 'error',
    text: string,
    isShow: boolean
}

const initialState: MessageState = {
    type: 'info',
    text: 'Message',
    isShow: false
}

const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        setTextMessage: (state, action: PayloadAction<string>) => {
            state.text = action.payload
        },

        setTypeMessage: (state, action: PayloadAction<'info' | 'warning' | 'error'>) => {
            state.type = action.payload
        },

        toggleMessage: (state) => {
            state.isShow = !state.isShow
        },
    },
})

export const { setTypeMessage, setTextMessage, toggleMessage } = messageSlice.actions;
export default messageSlice.reducer;