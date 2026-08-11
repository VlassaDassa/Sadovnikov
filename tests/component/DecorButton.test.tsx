import { fireEvent, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { renderWithStore } from "../helpers/renderWithStore";

vi.mock("@/components/shared/AdaptiveImage", () => ({
    default: () => <span data-testid="image" />,
}));

vi.mock("@/components/shared/icons/Icon", () => ({
    default: ({ name }: { name: string }) => (
        <span data-testid={`icon-${name}`} />
    ),
}));

vi.mock("next-intl", () => ({
    useTranslations: () => (key: string) => key,
}));

import DecorButton from "@/components/shared/button/DecorButton";

describe("DecorButton", () => {
    it("exposes a button role and accessible name", () => {
        renderWithStore(
            <DecorButton
                behavior="default"
                variant="medium"
                text={{
                    default: "Send",
                    alter: "Send",
                }}
            />,
        );

        expect(
            screen.getByRole("button", {
                name: "Send",
            }),
        ).toBeInTheDocument();
    });

    it("calls onClick for the default state", () => {
        const onClick = vi.fn();

        renderWithStore(
            <DecorButton
                behavior="default"
                variant="medium"
                text={{
                    default: "Send",
                    alter: "Send",
                }}
                onClick={onClick}
            />,
        );

        fireEvent.click(screen.getByRole("button"));

        expect(onClick).toHaveBeenCalledOnce();
    });

    it("does not call onClick for the disabled state", () => {
        const onClick = vi.fn();

        renderWithStore(
            <DecorButton
                behavior="disabled"
                variant="medium"
                text={{
                    default: "Send",
                    alter: "Send",
                }}
                onClick={onClick}
            />,
        );

        const button = screen.getByRole("button");

        expect(button).toHaveAttribute("aria-disabled", "true");

        fireEvent.click(button);

        expect(onClick).not.toHaveBeenCalled();
    });

    it("supports keyboard activation", () => {
        const onClick = vi.fn();

        renderWithStore(
            <DecorButton
                behavior="default"
                variant="medium"
                text={{
                    default: "Send",
                    alter: "Send",
                }}
                onClick={onClick}
            />,
        );

        fireEvent.keyDown(screen.getByRole("button"), {
            key: "Enter",
        });

        expect(onClick).toHaveBeenCalledOnce();
    });
});
