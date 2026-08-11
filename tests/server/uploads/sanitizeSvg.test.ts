import { describe, expect, it } from "vitest"

import { sanitizeSvg } from "@/lib/uploads/sanitizeSvg"

function sanitize(source: string): string {
    return sanitizeSvg(
        Buffer.from(
            source,
            "utf8",
        ),
    ).toString("utf8")
}

describe("sanitizeSvg", () => {
    it("keeps a safe SVG", () => {
        const result = sanitize(
            '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path d="M0 0h20v20H0z"/></svg>',
        )

        expect(result).toContain("<svg")
        expect(result).toContain("<path")
    })

    it("removes script elements", () => {
        const result = sanitize(
            '<svg xmlns="http://www.w3.org/2000/svg"><script>alert(1)</script><path d="M0 0h1v1H0z"/></svg>',
        )

        expect(result.toLowerCase()).not.toContain(
            "<script",
        )
    })

    it("removes event handler attributes", () => {
        const result = sanitize(
            '<svg xmlns="http://www.w3.org/2000/svg" onload="alert(1)"><path onclick="alert(2)" d="M0 0h1v1H0z"/></svg>',
        )

        expect(result.toLowerCase()).not.toContain(
            "onload",
        )
        expect(result.toLowerCase()).not.toContain(
            "onclick",
        )
    })

    it("removes external href values", () => {
        const result = sanitize(
            '<svg xmlns="http://www.w3.org/2000/svg"><use href="https://example.com/icon.svg#x"/></svg>',
        )

        expect(result).not.toContain(
            "https://example.com",
        )
    })

    it("keeps local fragment references", () => {
        const result = sanitize(
            '<svg xmlns="http://www.w3.org/2000/svg"><defs><path id="x" d="M0 0h1v1H0z"/></defs><use href="#x"/></svg>',
        )

        expect(result).toContain('href="#x"')
    })

    it("removes style URL values", () => {
        const result = sanitize(
            '<svg xmlns="http://www.w3.org/2000/svg"><path style="fill:url(https://example.com/a)" d="M0 0h1v1H0z"/></svg>',
        )

        expect(result).not.toContain(
            "style=",
        )
    })

    it.each([
        '<!DOCTYPE svg><svg xmlns="http://www.w3.org/2000/svg"/>',
        '<!ENTITY x "value"><svg xmlns="http://www.w3.org/2000/svg"/>',
    ])("rejects unsafe declarations", (source) => {
        expect(() => sanitize(source)).toThrow(
            "UNSAFE_SVG_DECLARATION",
        )
    })

    it("rejects input without an SVG root", () => {
        expect(() => {
            sanitize("<div>not svg</div>")
        }).toThrow("INVALID_SVG")
    })

    it("rejects an oversized file", () => {
        const source = Buffer.alloc(
            512 * 1024 + 1,
            "a",
        )

        expect(() => sanitizeSvg(source)).toThrow(
            "SVG_FILE_TOO_LARGE",
        )
    })
})