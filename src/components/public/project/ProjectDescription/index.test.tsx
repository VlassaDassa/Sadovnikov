import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NextIntlClientProvider } from 'next-intl';
import { describe, expect, it } from 'vitest';

import type { IProjectDescription } from '@/interfaces/general';
import ProjectDescription from './index';

const items: IProjectDescription[] = [
    { id: 10, title: 'Проект', icon: '', content: 'Первый абзац.\n\nВторой абзац.' },
    { id: 20, title: 'Почему я начал', icon: '', content: 'Причины создания проекта.' },
    { id: 30, title: 'Заключение', icon: '', content: 'Итоги работы.' },
];

const description = (data = items) => (
    <NextIntlClientProvider
        locale="ru"
        messages={{ ProjectDescription: {
            Title: 'Описание',
            NoContent: 'Контент не найден...',
            Previous: 'Предыдущая глава',
            Next: 'Следующая глава',
        } }}
    >
        <ProjectDescription data={data} />
    </NextIntlClientProvider>
);

describe('ProjectDescription tabs', () => {
    it('opens the first chapter and changes the visible, correctly labelled panel on selection', async () => {
        const user = userEvent.setup();
        render(description());

        const firstTab = screen.getByRole('tab', { name: 'Проект' });
        const firstPanel = screen.getByRole('tabpanel', { name: 'Проект' });
        expect(firstTab).toHaveAttribute('aria-selected', 'true');
        expect(firstTab).toHaveAttribute('aria-controls', firstPanel.id);
        expect(within(firstPanel).getByText('Первый абзац.')).toBeVisible();
        expect(within(firstPanel).getByText('Второй абзац.')).toBeVisible();

        await user.click(screen.getByRole('tab', { name: 'Почему я начал' }));

        expect(screen.getAllByRole('tabpanel')).toHaveLength(1);
        expect(screen.getByRole('tabpanel', { name: 'Почему я начал' })).toHaveTextContent('Причины создания проекта.');
        expect(firstPanel).not.toBeVisible();
        expect(firstTab).toHaveAttribute('tabindex', '-1');
    });

    it('supports arrow keys with wrapping, Home, End and Tab into the selected panel', async () => {
        const user = userEvent.setup();
        render(description());

        await user.tab();
        expect(screen.getByRole('tab', { name: 'Проект' })).toHaveFocus();

        await user.keyboard('{ArrowLeft}');
        expect(screen.getByRole('tab', { name: 'Заключение' })).toHaveFocus();
        expect(screen.getByRole('tabpanel', { name: 'Заключение' })).toBeVisible();

        await user.keyboard('{ArrowRight}');
        expect(screen.getByRole('tab', { name: 'Проект' })).toHaveFocus();

        await user.keyboard('{End}');
        expect(screen.getByRole('tab', { name: 'Заключение' })).toHaveFocus();

        await user.keyboard('{Home}{ArrowRight}{Tab}');
        expect(screen.getByRole('tabpanel', { name: 'Почему я начал' })).toHaveFocus();
    });

    it('falls back to available content if chapters change, and handles empty chapters and lists', () => {
        const { rerender } = render(description());
        fireEvent.click(screen.getByRole('tab', { name: 'Заключение' }));

        rerender(description([{ ...items[0], content: ' \n ' }]));
        expect(screen.getByRole('tabpanel', { name: 'Проект' })).toHaveTextContent('Контент не найден...');
        expect(screen.getByRole('tab', { name: 'Проект' })).toHaveAttribute('tabindex', '0');

        rerender(description([]));
        expect(screen.queryByRole('tablist')).not.toBeInTheDocument();
        expect(screen.getByText('Контент не найден...')).toBeVisible();
    });
});
