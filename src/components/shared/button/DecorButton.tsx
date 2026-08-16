"use client";

import React from "react";
import { useSelector } from "react-redux";
import { useTranslations } from "next-intl";

import AdaptiveImage from "../AdaptiveImage";
import Icon from "../icons/Icon";

import { RootState } from "@/store";
import { cssVars } from "@/styles/cssVariables";

import style from "./decorButton.module.scss";

const bigBgBtn = "/images/button/bg_big_btn.png";

const mediumBgBtn = "/images/button/bg_medium_btn.png";

const smallBgBtn = "/images/button/bg_small_btn.png";

const indexFinger = "/images/main/index_finger.png";

interface DecorativeText {
    default: string;
    alter: string;
}

interface DecorButtonProps {
    behavior: "default" | "loading" | "disabled";

    variant: "big" | "medium" | "small";

    text: DecorativeText;

    additionalClass?: string;

    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const DecorButton: React.FC<DecorButtonProps> = ({
    behavior = "default",
    variant = "medium",
    text = {
        default: "Button",
        alter: "btn",
    },
    additionalClass = "",
    onClick,
}) => {
    const breakpoint = useSelector(
        (state: RootState) => state.breakpoint.value,
    );

    const t = useTranslations("DecorBtn");

    const isDisabled = behavior !== "default";

    const size =
        breakpoint === "desktop"
            ? "big"
            : breakpoint === "tablet"
              ? "medium"
              : "small";

    const curText = breakpoint === "mobile" ? text.alter : text.default;

    const bgBtn =
        variant === "big"
            ? bigBgBtn
            : variant === "medium"
              ? mediumBgBtn
              : smallBgBtn;

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (isDisabled) {
            return;
        }

        onClick?.(event);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (isDisabled) {
            return;
        }

        if (event.key !== "Enter" && event.key !== " ") {
            return;
        }

        event.preventDefault();

        event.currentTarget.click();
    };

    const defineSizeLoader = () => {
        if (variant === "big") {
            if (size === "big") {
                return 64;
            }

            if (size === "medium") {
                return 44;
            }

            return 24;
        }

        if (variant === "medium") {
            if (size === "big") {
                return 44;
            }

            return 24;
        }

        return 24;
    };

    const buttonContent =
        behavior === "loading" ? (
            <Icon
                name="loader"
                strokeColor={cssVars.white}
                iconClass={style.btnLoader}
                size={defineSizeLoader()}
            />
        ) : (
            <p
                className={`${style.textDecorBtn} ${style[`textDecorBtn-${variant}`]} ${style[`textDecorBtn-${variant}-${size}`]}`}
            >
                {curText}
            </p>
        );

    const variantElements =
        variant === "big" ? (
            <>
                <AdaptiveImage
                    src={indexFinger}
                    wrapClass={`${style.decorBtnIcon} ${style[`decorBtnIconPosition_${behavior}`]} ${style[`decorBtnIcon_${size}`]}`}
                />

                <p
                    className={`${style.decorBtnLabel} ${style[`decorBtnLabel_${size}`]}`}
                >
                    ({t("Click")})
                </p>
            </>
        ) : null;

    return (
        <div
            tabIndex={isDisabled ? -1 : 0}
            role="button"
            className={`${style.decorBtn} ${additionalClass} ${style[`decorBtn_${behavior}`]} ${style[`decorBtn_${variant}`]}`}
            aria-disabled={isDisabled}
            aria-busy={behavior === "loading"}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
        >
            <AdaptiveImage
                src={bgBtn}
                wrapClass={`${style.decorBgBtnBig} ${style[`decorBgBtn-${variant}-${size}`]} ${style[`decorBgBtn-${variant}-${behavior}`]}`}
            />

            {buttonContent}

            {variantElements}
        </div>
    );
};

export default DecorButton;
