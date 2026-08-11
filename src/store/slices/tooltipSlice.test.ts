import { describe, expect, it } from 'vitest';

import reducer, {
    hideTooltip,
    showTooltip,
    updatePosition
} from './tooltipSlice'



describe('tooltipSlice', () => {
    it('shows a tooltip with complete data', () => {
        const state = reducer(
            undefined,
            showTooltip({
                text: 'Text',
                title: 'Title',
                date: '2026',
                type: 'lvl2',
                position: {
                    top: 10,
                    left: 20
                },
                targetId: 'target'
            })
        )

        expect(state).toMatchObject({
            isVisible: true,
            text: 'Text',
            title: 'Title',
            date: '2026',
            type: 'lvl2',
            targetId: 'target'
        })
    })

    it('clears omitted optional strings', () => {
        const state = reducer(
            undefined,
            showTooltip({
                text: 'Text',
                type: 'lvl1',
                position: {
                    top: 0,
                    left: 0
                }
            })
        )

        expect(state.title).toBe('')
        expect(state.date).toBe('')
    })

    it('updates the position', () => {
        const state = reducer(
            undefined,
            updatePosition({
                top: 30,
                left: 40
            })
        )

        expect(state.position).toEqual({
            top: 30,
            left: 40
        })
    })

    it('hides the tooltip', () => {
        const shown = reducer(
            undefined,
            showTooltip({
                text: 'Text',
                type: 'lvl1',
                position: {
                    top: 0,
                    left: 0
                }
            })
        )

        expect(reducer(shown, hideTooltip()).isVisible).toBe(false)
    })
})