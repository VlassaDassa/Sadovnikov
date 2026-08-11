import { describe, expect, it } from 'vitest';

import reducer, { setBreakpoint, setWindowWidth } from './breakpointSlice';




describe('breakpointSlice', () => {
    it('returns the initial state', () => {
        expect(reducer(undefined, {
            type: 'unknow'
        })).toEqual({
            value: 'mobile',
            windowWidth: 0
        })
    })

    it('sets the breakpoint', () => {
        const state = reducer(undefined, setBreakpoint('desktop'))
        expect(state.value).toBe('desktop')
    })

    it('sets the window width', () => {
        const state = reducer(undefined, setWindowWidth(1440))
    
        expect(state.windowWidth).toBe(1440)
    })
})