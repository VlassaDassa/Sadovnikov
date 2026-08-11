import { describe, expect, it } from 'vitest';

import reducer, { setLoading } from './loaderSlice';



describe('loaderSlice', () => {
    it('starts in the loadins state', () => {
        expect(reducer(undefined, {
            type: 'unknown'
        })).toEqual({ isLoading: true })
    })

    it('sets loading to false', () => {
        expect(reducer(undefined, setLoading(false)).isLoading).toBe(false)
    })
})