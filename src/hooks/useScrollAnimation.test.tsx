import {
    act,
    render,
    screen,
} from "@testing-library/react"
import {
    beforeEach,
    describe,
    expect,
    it,
    vi,
} from "vitest"

import { useScrollAnimation } from "./useScrollAnimation"

type ObserverCallback = (
    entries: IntersectionObserverEntry[],
) => void

let callback: ObserverCallback
const observe = vi.fn()
const unobserve = vi.fn()
const disconnect = vi.fn()

class IntersectionObserverMock {
    constructor(
        observerCallback: ObserverCallback,
        public options?: IntersectionObserverInit,
    ) {
        callback = observerCallback
    }

    observe = observe
    unobserve = unobserve
    disconnect = disconnect
}

function Harness({
    threshold,
    rootMargin,
    animationClass,
}: {
    threshold?: number
    rootMargin?: string
    animationClass?: string
}) {
    const {
        elementRef,
        isVisible,
        animationClassm,
    } = useScrollAnimation<HTMLDivElement>({
        threshold,
        rootMargin,
        animationClass,
    })

    return (
        <div
            ref={elementRef}
            data-testid="target"
            data-visible={String(isVisible)}
            className={animationClassm}
        />
    )
}

describe("useScrollAnimation", () => {
    beforeEach(() => {
        observe.mockClear()
        unobserve.mockClear()
        disconnect.mockClear()

        vi.stubGlobal(
            "IntersectionObserver",
            IntersectionObserverMock,
        )
    })

    it("observes the attached element", () => {
        render(<Harness />)

        expect(observe).toHaveBeenCalledWith(
            screen.getByTestId("target"),
        )
    })

    it("shows the element after intersection", () => {
        render(
            <Harness animationClass="visible-now" />,
        )

        const target = screen.getByTestId(
            "target",
        )

        expect(target).toHaveAttribute(
            "data-visible",
            "false",
        )
        expect(target).not.toHaveClass(
            "visible-now",
        )

        act(() => {
            callback([
                {
                    isIntersecting: true,
                } as IntersectionObserverEntry,
            ])
        })

        expect(target).toHaveAttribute(
            "data-visible",
            "true",
        )
        expect(target).toHaveClass(
            "visible-now",
        )
        expect(unobserve).toHaveBeenCalledWith(
            target,
        )
    })

    it("ignores a non-intersecting entry", () => {
        render(<Harness />)

        act(() => {
            callback([
                {
                    isIntersecting: false,
                } as IntersectionObserverEntry,
            ])
        })

        expect(
            screen.getByTestId("target"),
        ).toHaveAttribute(
            "data-visible",
            "false",
        )
    })

    it("unobserves the element during cleanup", () => {
        const { unmount } = render(
            <Harness />,
        )

        const target = screen.getByTestId(
            "target",
        )

        unmount()

        expect(unobserve).toHaveBeenCalledWith(
            target,
        )
    })
})