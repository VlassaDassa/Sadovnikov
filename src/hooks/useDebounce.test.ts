import { act, renderHook } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import { useDebounce } from "./useDebounce"

describe("useDebounce", () => {
    it("returns the initial value immediately", () => {
        const { result } = renderHook(() => {
            return useDebounce("first", 300)
        })

        expect(result.current).toBe("first")
    })

    it("returns the new value after the delay", () => {
        vi.useFakeTimers()

        const { result, rerender } = renderHook(
            ({ value }) => {
                return useDebounce(value, 300)
            },
            {
                initialProps: {
                    value: "first",
                },
            },
        )

        rerender({
            value: "second",
        })

        expect(result.current).toBe("first")

        act(() => {
            vi.advanceTimersByTime(299)
        })

        expect(result.current).toBe("first")

        act(() => {
            vi.advanceTimersByTime(1)
        })

        expect(result.current).toBe("second")
    })

    it("cancels the previous timer", () => {
        vi.useFakeTimers()

        const { result, rerender } = renderHook(
            ({ value }) => {
                return useDebounce(value, 300)
            },
            {
                initialProps: {
                    value: "first",
                },
            },
        )

        rerender({
            value: "second",
        })

        act(() => {
            vi.advanceTimersByTime(200)
        })

        rerender({
            value: "third",
        })

        act(() => {
            vi.advanceTimersByTime(100)
        })

        expect(result.current).toBe("first")

        act(() => {
            vi.advanceTimersByTime(200)
        })

        expect(result.current).toBe("third")
    })
})