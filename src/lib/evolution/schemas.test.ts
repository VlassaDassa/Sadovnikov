import { describe, expect, it } from 'vitest';

import { evolutionDraftItemSchema, evolutionDraftSchema, gigaChatMilestoneResponseSchema } from './schemas';



const validItem = {
    id: 'milestone-1',
    name: 'Initial release', 
    nameRu: 'Initial release ru',
    date: 'January 2026',
    dateRu: 'January 2026 ru',
    text: 'A sufficiently long milestone text.',
    textRu: 'A sufficiently long milestone text ru.',
    sourceShas: [
        'abcdef1'
    ]
}

describe('evolution schemas', () => {
    it('accepts a valid draft item', () => {
        expect(evolutionDraftItemSchema.parse(
            validItem
        )).toEqual(validItem)
    })

    it('trims string values', () => {
        const parsed = evolutionDraftItemSchema.parse({
            ...validItem,
            name: ' Initial release ',
        })

        expect(parsed.name).toBe('Initial release')
    })

    it.each([
        {
            ...validItem,
            name: 'ab'
        },

        {
            ...validItem,
            text: 'short'
        },

        {
            ...validItem,
            sourceShas: [ 'abc' ]
        },

        {
            ...validItem,
            extra: true
        }
    ])(
        'rejects an invalid draft item',
        (value) => {
            expect(evolutionDraftItemSchema.safeParse(value).success).toBe(false)
        }
    )

    it('requires at least one draft item', () => {
        const draft = Array.from(
            {
                length: 21
            },
            (_, index) => ({
                ...validItem,
                id: `milestone-${index}`
            })
        )

        expect(evolutionDraftItemSchema.safeParse(draft).success).toBe(false)
    })

    it('requires source commits in a generated milestone', () => {
        const result = gigaChatMilestoneResponseSchema.safeParse({
            mileStones: [
                {
                    name: 'Initial release',
                    nameRu: 'Initial release ru',
                    text: 'A sufficiently long milestone text.',
                    textRu: 'A sufficiently long milestone text ru.',
                    sourceShas: []
                }
            ]
        })

        expect(result.success).toBe(false)
    })
})

