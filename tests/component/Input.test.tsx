import { fireEvent, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { renderWithStore } from "../helpers/renderWithStore";

vi.mock("@/components/shared/icons/Icon", () => ({
    default: ({ name }: { name: string }) => (
        <span data-testid={`icon-${name}`} />
    ),
}));

vi.mock("@/components/shared/Noize", () => ({
    default: () => <span data-testid="noise" />,
}));

import Input from "@/components/shared/input";

describe("Input", () => {
    it("renders a labeled admin input", () => {
        renderWithStore(
            <Input
                name="project-name"
                iconPosition="noIcon"
                variant="admin"
                adminLabel="withLabel"
                label="Project name"
                value=""
            />,
        );

        expect(screen.getByLabelText("Project name")).toBeInTheDocument();
    });

    it("calls onChange for text input", () => {
        const onChange = vi.fn();

        renderWithStore(
            <Input
                name="email"
                placeholder="Email"
                iconPosition="noIcon"
                type="email"
                value=""
                onChange={onChange}
            />,
        );

        fireEvent.change(
            screen.getByRole("textbox", {
                name: "Email",
            }),
            {
                target: {
                    value: "person@example.com",
                },
            },
        );

        expect(onChange).toHaveBeenCalledOnce();
    });

    it("applies the maximum length", () => {
        renderWithStore(
            <Input
                name="name"
                placeholder="Name"
                iconPosition="noIcon"
                value=""
                maxLen={10}
            />,
        );

        expect(screen.getByRole("textbox")).toHaveAttribute("maxlength", "10");
    });

    it("renders an error message", () => {
        renderWithStore(
            <Input
                name="email"
                placeholder="Email"
                iconPosition="noIcon"
                value=""
                error="Invalid email"
            />,
        );

        expect(screen.getByText(/Invalid email/)).toBeInTheDocument();
    });

    it("renders a textarea counter", () => {
        renderWithStore(
            <Input
                name="message"
                placeholder="Message"
                iconPosition="noIcon"
                type="textarea"
                value="hello"
                counter
                maxCounter={300}
            />,
        );

        expect(screen.getByText("5/300")).toBeInTheDocument();
    });

    it("sets readOnly on a normal input", () => {
        renderWithStore(
            <Input
                name="name"
                placeholder="Name"
                iconPosition="noIcon"
                value="value"
                readonly
            />,
        );

        expect(screen.getByRole("textbox")).toHaveAttribute("readonly");
    });

    it("sets disabled on a normal input", () => {
        renderWithStore(
            <Input
                name="name"
                placeholder="Name"
                iconPosition="noIcon"
                value="value"
                disabled
            />,
        );

        expect(screen.getByRole("textbox")).toBeDisabled();
    });

    it("sets disabled on a textarea", () => {
        renderWithStore(
            <Input
                name="message"
                placeholder="Message"
                iconPosition="noIcon"
                type="textarea"
                value="value"
                disabled
            />,
        );

        expect(screen.getByRole("textbox")).toBeDisabled();
    });
});
