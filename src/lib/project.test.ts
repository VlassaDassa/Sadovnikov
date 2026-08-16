import { beforeEach, describe, expect, it, vi } from "vitest";

const { notFoundMock } = vi.hoisted(() => ({
    notFoundMock: vi.fn(() => {
        throw new Error("NEXT_NOT_FOUND");
    }),
}));

vi.mock("next/navigation", () => ({
    notFound: notFoundMock,
}));

vi.mock("@/lib/prisma", () => ({
    default: {
        project: {
            findUnique: vi.fn(),
        },
    },
}));

import { parseEntityId } from "./project";

describe("parseEntityId", () => {
    beforeEach(() => {
        notFoundMock.mockClear();
    });

    it.each([
        ["1", 1],
        ["999", 999],
    ])("parses %s", (value, expected) => {
        expect(parseEntityId(value)).toBe(expected);
    });

    it.each(["", "0", "-1", "1.5", "1abc", " 1", "1 ", "9007199254740992"])(
        "rejects %s",
        (value) => {
            expect(() => parseEntityId(value)).toThrow("NEXT_NOT_FOUND");

            expect(notFoundMock).toHaveBeenCalledOnce();
        },
    );
});
