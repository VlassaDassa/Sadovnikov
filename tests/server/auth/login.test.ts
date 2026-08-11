import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
    headers: vi.fn(),
    redirect: vi.fn(() => {
        throw new Error("NEXT_REDIRECT");
    }),
    signInEmail: vi.fn(),
}));

vi.mock("next/headers", () => ({
    headers: mocks.headers,
}));

vi.mock("next/navigation", () => ({
    redirect: mocks.redirect,
}));

vi.mock("@/lib/auth", () => ({
    auth: {
        api: {
            signInEmail: mocks.signInEmail,
        },
    },
}));

import { loginAction } from "@/app/actions/auth/login";

function makeFormData(email: string, password: string): FormData {
    const formData = new FormData();

    formData.set("email", email);
    formData.set("password", password);

    return formData;
}

describe("loginAction", () => {
    beforeEach(() => {
        mocks.headers.mockResolvedValue(new Headers());
        mocks.signInEmail.mockResolvedValue({
            user: {
                id: "admin",
            },
        });
    });

    it.each([
        ["invalid", "password"],
        ["admin@example.com", ""],
        ["", "password"],
    ])("rejects invalid credentials", async (email, password) => {
        const result = await loginAction(
            {
                success: false,
                error: "",
            },
            makeFormData(email, password),
        );

        expect(result).toEqual({
            success: false,
            error: "Invalid credentials",
        });
        expect(mocks.signInEmail).not.toHaveBeenCalled();
    });

    it("returns the same safe error for an authentication failure", async () => {
        mocks.signInEmail.mockRejectedValue(new Error("account not found"));

        const result = await loginAction(
            {
                success: false,
                error: "",
            },
            makeFormData("admin@example.com", "password"),
        );

        expect(result).toEqual({
            success: false,
            error: "Invalid credentials",
        });
    });

    it("signs in and redirects to the admin page", async () => {
        const requestHeaders = new Headers({
            "user-agent": "test",
        });

        mocks.headers.mockResolvedValue(requestHeaders);

        await expect(
            loginAction(
                {
                    success: false,
                    error: "",
                },
                makeFormData("admin@example.com", "password"),
            ),
        ).rejects.toThrow("NEXT_REDIRECT");

        expect(mocks.signInEmail).toHaveBeenCalledWith({
            body: {
                email: "admin@example.com",
                password: "password",
                rememberMe: true,
            },
            headers: requestHeaders,
        });
        expect(mocks.redirect).toHaveBeenCalledWith("/admin");
    });
});
