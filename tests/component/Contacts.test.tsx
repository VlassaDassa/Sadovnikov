import { fireEvent, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { renderWithStore } from "../helpers/renderWithStore";

const mocks = vi.hoisted(() => ({
    sendContactMessage: vi.fn(),
    showMessage: vi.fn(),
}));

vi.mock("next/navigation", () => ({
    usePathname: () => "/",
}));

vi.mock("next-intl", () => ({
    useTranslations: () => (key: string) => {
        const messages: Record<string, string> = {
            Title: "Contacts",
            Name: "Name",
            Email: "Email",
            Message: "Message",
            Send: "Send",
            ErrorName: "Invalid name",
            ErrorEmail: "Invalid email",
            ErrorMessage: "Invalid message",
            ErrorSend: "Send failed",
            SuccessSend: "Message sent",
            Avatar: "Avatar",
        };

        return messages[key] ?? key;
    },
}));

vi.mock("@/hooks/useScrollAnimation", () => ({
    useScrollAnimation: () => ({
        isVisible: true,
        elementRef: {
            current: null,
        },
    }),
}));

vi.mock("@/app/actions/contact/sendContactMessage", () => ({
    sendContactMessage: mocks.sendContactMessage,
}));

vi.mock("@/lib/showMessage", () => ({
    showMessage: mocks.showMessage,
}));

vi.mock("@/components/shared/input", () => ({
    default: ({
        name,
        placeholder,
        type,
        value,
        error,
        onChange,
    }: {
        name: string;
        placeholder?: string;
        type?: string;
        value?: string | number;
        error?: string;
        onChange?: (
            event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        ) => void;
    }) => (
        <label>
            {name}
            {type === "textarea" ? (
                <textarea
                    name={name}
                    aria-label={placeholder}
                    value={value}
                    onChange={onChange}
                />
            ) : (
                <input
                    name={name}
                    type={type}
                    aria-label={placeholder}
                    value={value}
                    onChange={onChange}
                />
            )}
            {error ? <span>{error}</span> : null}
        </label>
    ),
}));

vi.mock("@/components/shared/button/DecorButton", () => ({
    default: ({
        behavior,
        text,
        onClick,
    }: {
        behavior: string;
        text: {
            default: string;
            alter: string;
        };
        onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
    }) => (
        <button
            type="button"
            disabled={behavior !== "default"}
            onClick={onClick as never}
        >
            {text.default}
        </button>
    ),
}));

vi.mock("@/components/public/main/talkingAvatar", () => ({
    default: () => <div data-testid="avatar" />,
}));

import Contacts from "@/components/public/main/contacts";

async function fillValidForm(name = "John Doe") {
    fireEvent.change(screen.getByLabelText("Name..."), {
        target: {
            value: name,
        },
    });

    fireEvent.change(screen.getByLabelText("Email..."), {
        target: {
            value: "john@example.com",
        },
    });

    fireEvent.change(screen.getByLabelText("Message..."), {
        target: {
            value: "A valid message body.",
        },
    });

    await waitFor(() => {
        expect(
            screen.getByRole("button", {
                name: "Send",
            }),
        ).toBeEnabled();
    });
}

describe("Contacts", () => {
    beforeEach(() => {
        sessionStorage.clear();
        mocks.sendContactMessage.mockResolvedValue({
            success: true,
        });
    });

    it("keeps the send action disabled for invalid data", async () => {
        renderWithStore(<Contacts />);

        fireEvent.change(screen.getByLabelText("Name..."), {
            target: {
                value: "J",
            },
        });

        await waitFor(() => {
            expect(screen.getByText("Invalid name")).toBeInTheDocument();
        });

        expect(
            screen.getByRole("button", {
                name: "Send",
            }),
        ).toBeDisabled();
    });

    it("submits normalized user input", async () => {
        renderWithStore(<Contacts />);

        await fillValidForm();

        fireEvent.click(
            screen.getByRole("button", {
                name: "Send",
            }),
        );

        await waitFor(() => {
            expect(mocks.sendContactMessage).toHaveBeenCalledWith({
                name: "John Doe",
                email: "john@example.com",
                message: "A valid message body.",
            });
        });
    });

    it("clears fields after success", async () => {
        renderWithStore(<Contacts />);

        await fillValidForm();

        fireEvent.click(
            screen.getByRole("button", {
                name: "Send",
            }),
        );

        await waitFor(() => {
            expect(screen.getByLabelText("Name...")).toHaveValue("");
        });

        expect(mocks.showMessage).toHaveBeenCalledWith(
            "info",
            "Message sent",
            expect.anything(),
        );
    });

    it("preserves fields after a server failure", async () => {
        mocks.sendContactMessage.mockResolvedValue({
            success: false,
            error: "Failed to send message",
        });

        renderWithStore(<Contacts />);

        await fillValidForm();

        fireEvent.click(
            screen.getByRole("button", {
                name: "Send",
            }),
        );

        await waitFor(() => {
            expect(mocks.showMessage).toHaveBeenCalledWith(
                "error",
                "Send failed",
                expect.anything(),
            );
        });

        expect(screen.getByLabelText("Name...")).toHaveValue("John Doe");
        expect(screen.getByLabelText("Email...")).toHaveValue(
            "john@example.com",
        );
        expect(screen.getByLabelText("Message...")).toHaveValue(
            "A valid message body.",
        );
    });

    it("does not accept a name that the server rejects", async () => {
        renderWithStore(<Contacts />);

        await fillValidForm("John");

        expect(
            screen.getByRole("button", {
                name: "Send",
            }),
        ).toBeDisabled();
    });
});
