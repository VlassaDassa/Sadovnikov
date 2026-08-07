import { describe, expect, it } from 'vitest';
import { displayDate, parseDate } from './dates';



describe('parseDate', () => {
    it('returns null for missing input', () => {
        expect(parseDate(undefined)).toBeNull()
    })

    it('returns null for invalid input', () => {
        expect(parseDate('not-a-date')).toBeNull()
    })

    it('parses an ISO date', () => {
        const result = parseDate('2026-01-15')

        expect(result).toBeInstanceOf(Date)
        expect(result?.getUTCFullYear()).toBe(2026)
    })

    it('parses a month and yead value', () => {
        const result = parseDate('January 2026')
        
        expect(result).toBeInstanceOf(Date)
        expect(result?.getFullYear()).toBe(2026)
        expect(result?.getMonth()).toBe(0)
    })
})


describe('displayDate', () => {
    it('returns an empty string for missing input', () => {
        expect(displayDate(undefined)).toBe('')
    })

    it('returns an empty string for invalid input', () => {
        expect(displayDate('not-a-date')).toBe('')
    })

    it('returns a localized current marker', () => {
        const result = displayDate('NOW', false, 'ru')

        expect(result).not.toBe('')
        expect(result).not.toBe('Now')
    })

    it('includes a day when requested', () => {
        const result = displayDate('2026-01-15', true, 'en')
        expect(result).toContain('15')
        expect(result).toContain('2026')
    })
})
