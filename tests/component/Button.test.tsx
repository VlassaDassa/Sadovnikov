import { fireEvent, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { renderWithStore } from 'tests/helpers/renderWithStore'



vi.mock(
    "@/components/shared/icons/Icon",
    () => ({
        default: ({
            name,
        }: {
            name: string
        }) => (
            <span data-testid={`icon-${name}`} />
        ),
    }),
)

vi.mock(
    '@/components/shared/Noize',
    () => ({
        default: () => (
            <span data-testid='noise'></span>
        )
    })
)

vi.mock('@/hooks/useTooltip', () => ({
    useTooltip: () => ({
        current: null
    })
}))


import Button from '@/components/shared/button/Button'

describe('Button', () => {
    it('renders text and calls onClick', () => {
        const onClick = vi.fn()

        renderWithStore(
            <Button 
                behavior='default'
                iconPosition='noIcon'
                variant='primary'
                text='Save'
                onClick={onClick}
            />
        )

        const button = screen.getByRole(
            'button',
            { name: 'Save' }
        )

        fireEvent.click(button)

        expect(onClick).toHaveBeenCalledOnce()
    })

    it('disables the disabled behavior', () => {
        const onClick = vi.fn()

        renderWithStore(
            <Button 
                behavior='disabled'
                iconPosition='noIcon'
                variant='primary'
                text='Save'
                onClick={onClick}
            />
        )

        const button = screen.getByRole('button', { name: 'Save' })
        expect(button).toBeDisabled()
        fireEvent.click(button)
        expect(onClick).not.toHaveBeenCalled()
    })

    it('blocks interaction while loading', () => {
        const onClick = vi.fn()

        renderWithStore(
            <Button 
                behavior='loading'
                iconPosition='noIcon'
                variant='primary'
                text='Save'
                onClick={onClick}
            />
        )

        const button = screen.getByRole('button')
        expect(button).toBeDisabled()
        expect(screen.getByTestId('icon-loader')).toBeInTheDocument()

        fireEvent.click(button)

        expect(onClick).not.toHaveBeenCalled()
    })

    it('renders a requested icon', () => {
        renderWithStore(
            <Button 
                behavior='default'
                iconPosition='leftIcon'
                variant='secondary'
                text='Open'
                icon='arrow'
            />
        )

        expect(screen.getByTestId('icon-arrow')).toBeInTheDocument()
    })

    it('reenders noise when requested', () => {
        renderWithStore(
            <Button
                behavior="default"
                iconPosition="noIcon"
                variant="dark"
                text="Open"
                noize
            />,
        )

        expect(screen.getByTestId("noise")).toBeInTheDocument()
    })

    it("uses the submit type", () => {
        renderWithStore(
            <Button
                behavior="default"
                iconPosition="noIcon"
                variant="primary"
                text="Submit"
                type="submit"
            />,
        )

        expect(
            screen.getByRole("button"),
        ).toHaveAttribute(
            "type",
            "submit",
        )
    })

    
})