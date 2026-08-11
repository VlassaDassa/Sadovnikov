import { act, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { showOverlay } from "@/store/slices/uiSlice";

import { renderWithStore } from "../helpers/renderWithStore";

const closeModalsMock = vi.hoisted(() => vi.fn());

vi.mock("@/lib/modals", () => ({
    closeModals: closeModalsMock,
}));

import Overlay from "@/components/shared/overlay";

describe("Overlay", () => {
    it("closes menus, modals and the overlay", async () => {
        closeModalsMock.mockResolvedValue(undefined);

        const { container, store } = renderWithStore(<Overlay />);

        act(() => {
            store.dispatch(showOverlay());
        });

        expect(store.getState().uiState.isOverlayVisible).toBe(true);
        expect(store.getState().uiState.bodyScroll).toBe(false);

        await act(async () => {
            fireEvent.click(container.firstElementChild as Element);
        });

        expect(closeModalsMock).toHaveBeenCalledTimes(6);
        expect(store.getState().uiState.isOverlayVisible).toBe(false);
        expect(store.getState().uiState.isMenuOpen).toBe(false);
        expect(store.getState().uiState.bodyScroll).toBe(true);
    });
});
