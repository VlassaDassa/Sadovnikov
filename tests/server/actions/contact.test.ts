import { beforeEach, describe, expect, it, vi } from "vitest";

const sendContactEmailMock = vi.hoisted(() => vi.fn());

vi.mock("@/lib/mail/sendContactEmail", () => ({
    sendContactEmail: sendContactEmailMock,
}));

import { sendContactMessage } from "@/app/actions/contact/sendContactMessage";

describe("sendContactMessage", () => {
    beforeEach(() => {
        sendContactEmailMock.mockResolvedValue(undefined);
    });

    it.each([
        {
            name: "John",
            email: "john@example.com",
            message: "A valid message",
        },
        {
            name: "VeryLongName",
            email: "john@example.com",
            message: "A valid message",
        },
        {
            name: "John Doe",
            email: "invalid",
            message: "A valid message",
        },
        {
            name: "John Doe",
            email: "john@example.com",
            message: "short",
        },
        {
            name: "John Doe",
            email: "john@example.com",
            message: "x".repeat(301),
        },
        {
            name: "John\nDoe",
            email: "john@example.com",
            message: "A valid message",
        },
    ])("rejects invalid form data", async (input) => {
        const result = await sendContactMessage(input);

        expect(result).toEqual({
            success: false,
            error: "Invalid form data",
        });
        expect(sendContactEmailMock).not.toHaveBeenCalled();
    });

    it("trims valid form data", async () => {
        const result = await sendContactMessage({
            name: "  John Doe  ",
            email: "  john@example.com  ",
            message: "  This is a valid message.  ",
        });

        expect(result).toEqual({
            success: true,
        });
        expect(sendContactEmailMock).toHaveBeenCalledWith({
            name: "John Doe",
            email: "john@example.com",
            message: "This is a valid message.",
        });
    });

    it("accepts boundary lengths", async () => {
        const result = await sendContactMessage({
            name: "12345",
            email: "a@example.com",
            message: "1234567890",
        });

        expect(result.success).toBe(true);
    });

    it("returns a safe error when mail delivery fails", async () => {
        sendContactEmailMock.mockRejectedValue(new Error("smtp secret"));

        const result = await sendContactMessage({
            name: "John Doe",
            email: "john@example.com",
            message: "This is a valid message.",
        });

        expect(result).toEqual({
            success: false,
            error: "Failed to send message",
        });
        expect(JSON.stringify(result)).not.toContain("smtp secret");
    });
});
