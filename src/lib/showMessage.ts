import { setTypeMessage, setTextMessage, toggleMessage } from '@/store/slices/messageSlice';

import { Dispatch } from '@reduxjs/toolkit';
import { UnknownAction } from '@reduxjs/toolkit';



export const showMessage = (type: 'error' | 'info', text: string, dispatch: Dispatch<UnknownAction>) => {

    dispatch(setTypeMessage(type))
    dispatch(setTextMessage(text))
    dispatch(toggleMessage())
    setTimeout(() => {
        dispatch(toggleMessage())
    }, 3000);
}