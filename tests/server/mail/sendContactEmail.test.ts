import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const sendMailMock = vi.hoisted(() => vi.fn());

const createTransportMock = vi.hoisted(() =>
    vi.fn(() => ({
        sendMail: sendMailMock,
    })),
);

vi.mock("nodemailer", () => ({
    default: {
        createTransport: createTransportMock,
    },
}));

import { sendContactEmail } from "@/lib/mail/sendContactEmail";

const originalEnvironment = {
    YANDEX_SMTP_USER: process.env.YANDEX_SMTP_USER,
    YANDEX_SMTP_PASSWORD: process.env.YANDEX_SMTP_PASSWORD,
    CONTACT_EMAIL_TO: process.env.CONTACT_EMAIL_TO,
};

describe("sendContactEmail", () => {
    beforeEach(() => {
        process.env.YANDEX_SMTP_USER = "sender@example.com";
        process.env.YANDEX_SMTP_PASSWORD = "password";
        process.env.CONTACT_EMAIL_TO = "owner@example.com";

        sendMailMock.mockResolvedValue({
            messageId: "message-id",
        });
    });

    afterEach(() => {
        for (const [key, value] of Object.entries(originalEnvironment)) {
            if (value === undefined) {
                delete process.env[key];
            } else {
                process.env[key] = value;
            }
        }
    });

    it("creates a secure Yandex transport", async () => {
        await sendContactEmail({
            name: "John Doe",
            email: "john@example.com",
            message: "This is a valid message.",
        });

        expect(createTransportMock).toHaveBeenCalledWith({
            host: "smtp.yandex.com",
            port: 465,
            secure: true,
            auth: {
                user: "sender@example.com",
                pass: "password",
            },
        });
    });

    it("sends a plain text message with safe options", async () => {
        await sendContactEmail({
            name: "John Doe",
            email: "john@example.com",
            message: "This is a valid message.",
        });

        expect(sendMailMock).toHaveBeenCalledWith({
            from: '"Portfolio contact" <sender@example.com>',
            to: "owner@example.com",
            replyTo: "john@example.com",
            subject: "Portfolio message from John Doe",
            text: [
                "Name: John Doe",
                "Email: john@example.com",
                "",
                "This is a valid message.",
            ].join("\n"),
            disableFileAccess: true,
            disableUrlAccess: true,
        });
    });

    it.each(["YANDEX_SMTP_USER", "YANDEX_SMTP_PASSWORD", "CONTACT_EMAIL_TO"])(
        "rejects missing environment variable %s",
        async (name) => {
            delete process.env[name];

            await expect(
                sendContactEmail({
                    name: "John Doe",
                    email: "john@example.com",
                    message: "This is a valid message.",
                }),
            ).rejects.toThrow(name);

            expect(createTransportMock).not.toHaveBeenCalled();
        },
    );
});
