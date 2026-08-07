import { describe, expect, it } from 'vitest'
import { getLocalizedText } from './getLocalizedText'



describe('getLocalaziedText', () => {
    it('returns the base value for the English locale', () => {
        expect(
            getLocalizedText('en', 'base value', 'localized value')
        ).toBe('base value')
    })

    it('returns the localized value for the Russian locale', () => {
        expect(
            getLocalizedText('ru', 'base value', 'localized value')
        ).toBe('localized value')
    })

    it('falls back when the localized value is null', () => {
        expect(
            getLocalizedText('ru', 'base value', null)
        ).toBe('base value')
    })

    it('falls back when the localized value is blank', () => {
        expect(
            getLocalizedText('ru', 'base value', '   ')
        ).toBe('base value')
    })
})