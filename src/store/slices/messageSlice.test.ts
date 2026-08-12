import { describe, expect, it } from 'vitest';

import reducer, {
    setTextMessage,
    setTypeMessage,
    toggleMessage
} from './messageSlice'


describe('messageSlice', () => {
    it('updates the message text and type', () => {
        let state = reducer(undefined, setTextMessage('Saved'))

        state = reducer(state, setTypeMessage('warning'))

        expect(state.text).toBe('Saved')
        expect(state.type).toBe('warning')
    })

    it('toggles visibility', () => {
        const opened = reducer(
            undefined, toggleMessage()
        )

        reducer(opened, toggleMessage())
    })
})