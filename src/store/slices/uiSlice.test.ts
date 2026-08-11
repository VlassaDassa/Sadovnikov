import { beforeEach, describe, expect, it } from 'vitest';

import reducer, {
    closeMenu,
    closeOverlay,
    setCurrentId,
    showOverlay,
    toggleEditFooterModal,
    toggleEditMyStackModal,
    toggleEditProjectStackModal,
    toggleEditSkillsModal,
    toggleEvolutionReviewModal,
    toggleIsOverlayVisible,
    toggleMenu,
    toggleSelectPeriodModal,
} from "./uiSlice";



describe("uiSlice", () => {
    beforeEach(() => {
        Object.defineProperty(
            document.documentElement,
            "clientWidth",
            {
                configurable: true,
                value: 1400,
            },
        )

        Object.defineProperty(
            window,
            "innerWidth",
            {
                configurable: true,
                value: 1440,
            },
        )
    })

    it("opens the overlay and locks scrolling", () => {
        const state = reducer(
            undefined,
            showOverlay(),
        )

        expect(state.isOverlayVisible).toBe(true)
        expect(state.bodyScroll).toBe(false)
        expect(
            document.documentElement.style.overflow,
        ).toBe("hidden")
        expect(
            document.documentElement.style.paddingRight,
        ).toBe("40px")
    })

    it("closes the overlay and restores state", () => {
        const opened = reducer(
            undefined,
            showOverlay(),
        )

        const closed = reducer(
            opened,
            closeOverlay(),
        )

        expect(closed.isOverlayVisible).toBe(false)
        expect(closed.bodyScroll).toBe(true)
        expect(
            document.documentElement.style.overflow,
        ).toBe("auto")
        expect(
            document.documentElement.style.paddingRight,
        ).toBe("0px")
    })

    it("toggles the overlay twice", () => {
        const opened = reducer(
            undefined,
            toggleIsOverlayVisible(),
        )

        const closed = reducer(
            opened,
            toggleIsOverlayVisible(),
        )

        expect(opened.isOverlayVisible).toBe(true)
        expect(closed.isOverlayVisible).toBe(false)
        expect(closed.bodyScroll).toBe(true)
    })

    it("opens and closes the menu", () => {
        const opened = reducer(
            undefined,
            toggleMenu(),
        )

        const closed = reducer(
            opened,
            closeMenu(),
        )

        expect(opened.isMenuOpen).toBe(true)
        expect(closed.isMenuOpen).toBe(false)
    })

    it.each([
        [
            toggleEditSkillsModal,
            "isEditSkillsModalOpen",
        ],
        [
            toggleEditFooterModal,
            "isEditFooterModalOpen",
        ],
        [
            toggleEditMyStackModal,
            "isEditMyStackModalOpen",
        ],
        [
            toggleSelectPeriodModal,
            "isSelectPeriodModalOpen",
        ],
        [
            toggleEditProjectStackModal,
            "isEditProjectStackModalOpen",
        ],
        [
            toggleEvolutionReviewModal,
            "isEvolutionReviewModal",
        ],
    ])("toggles %s", (actionCreator, key) => {
        const state = reducer(
            undefined,
            actionCreator(),
        )

        expect(state[key as keyof typeof state]).toBe(true)
    })

    it("sets the current entity id", () => {
        const state = reducer(
            undefined,
            setCurrentId(42),
        )

        expect(state.currentId).toBe(42)
    })
})