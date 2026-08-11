import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
    headers: vi.fn(),
    getSession: vi.fn(),
}));

vi.mock("next/headers", () => ({
    headers: mocks.headers,
}));

vi.mock("@/lib/auth", () => ({
    auth: {
        api: {
            getSession: mocks.getSession,
        },
    },
}));

import { getAdminSession, requireAdmin } from "@/lib/auth/admin";

describe("admin authorization", () => {
    beforeEach(() => {
        mocks.headers.mockResolvedValue(new Headers());
    });

    it("returns null without a session", async () => {
        mocks.getSession.mockResolvedValue(null);

        await expect(getAdminSession()).resolves.toBeNull();
    });

    it("returns null for a regular user", async () => {
        mocks.getSession.mockResolvedValue({
            user: {
                id: "user",
                role: "USER",
            },
        });

        await expect(getAdminSession()).resolves.toBeNull();
    });

    it("returns an administrator session", async () => {
        const session = {
            user: {
                id: "admin",
                role: "ADMIN",
            },
        };

        mocks.getSession.mockResolvedValue(session);

        await expect(getAdminSession()).resolves.toBe(session);
    });

    it("passes request headers to Better Auth", async () => {
        const requestHeaders = new Headers({
            cookie: "session=value",
        });

        mocks.headers.mockResolvedValue(requestHeaders);
        mocks.getSession.mockResolvedValue(null);

        await getAdminSession();

        expect(mocks.getSession).toHaveBeenCalledWith({
            headers: requestHeaders,
        });
    });

    it("throws for a missing administrator", async () => {
        mocks.getSession.mockResolvedValue(null);

        await expect(requireAdmin()).rejects.toThrow("UNAUTHORIZED");
    });
});
