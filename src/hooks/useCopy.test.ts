import { act, renderHook } from "@testing-library/react"
import {
    beforeEach,
    describe,
    expect,
    it,
    vi,
} from "vitest"

import { useCopy } from "./useCopy"

describe("useCopy", () => {
    beforeEach(() => {
        vi.useFakeTimers()

        Object.defineProperty(
            window,
            "isSecureContext",
            {
                configurable: true,
                value: true,
            },
        )
    })

    it("uses the Clipboard API", async () => {
        const writeText = vi.fn().mockResolvedValue(
            undefined,
        )

        Object.defineProperty(
            navigator,
            "clipboard",
            {
                configurable: true,
                value: {
                    writeText,
                },
            },
        )

        const { result } = renderHook(useCopy)

        let copied = false

        await act(async () => {
            copied = await result.current.copy(
                "value",
            )
        })

        expect(copied).toBe(true)
        expect(writeText).toHaveBeenCalledWith(
            "value",
        )
        expect(result.current.copied).toBe(true)

        act(() => {
            vi.advanceTimersByTime(2000)
        })

        expect(result.current.copied).toBe(false)
    })

    it("uses execCommand when the Clipboard API fails", async () => {
        const writeText = vi.fn().mockRejectedValue(
            new Error("clipboard failed"),
        )

        const execCommand = vi.fn().mockReturnValue(
            true,
        )

        Object.defineProperty(
            navigator,
            "clipboard",
            {
                configurable: true,
                value: {
                    writeText,
                },
            },
        )

        Object.defineProperty(
            document,
            "execCommand",
            {
                configurable: true,
                value: execCommand,
            },
        )

        const { result } = renderHook(useCopy)

        let copied = false

        await act(async () => {
            copied = await result.current.copy(
                "fallback value",
            )
        })

        expect(copied).toBe(true)
        expect(execCommand).toHaveBeenCalledWith(
            "copy",
        )
        expect(
            document.querySelector("textarea"),
        ).toBeNull()
    })

    it("returns false when every copy strategy fails", async () => {
        Object.defineProperty(
            navigator,
            "clipboard",
            {
                configurable: true,
                value: undefined,
            },
        )

        Object.defineProperty(
            document,
            "execCommand",
            {
                configurable: true,
                value: vi.fn().mockReturnValue(false),
            },
        )

        const { result } = renderHook(useCopy)

        let copied = true

        await act(async () => {
            copied = await result.current.copy(
                "value",
            )
        })

        expect(copied).toBe(false)
        expect(result.current.copied).toBe(false)
    })
})