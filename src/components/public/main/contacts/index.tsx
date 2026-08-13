"use client";

import React, { useState, useSyncExternalStore } from "react";
import { useDispatch } from "react-redux";
import { useTranslations } from "next-intl";

import Input from "../../../shared/input";
import DecorButton from "../../../shared/button/DecorButton";

import TalkingAvatar from "../talkingAvatar";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { sendContactMessage } from "@/app/actions/contact/sendContactMessage";
import { showMessage } from "@/lib/showMessage";

import styles from "./index.module.scss";

interface Errors {
    name: string;
    email: string;
    message: string;
}

type AvatarState = "checking" | "visible" | "leaving" | "hidden";
type AvatarTransitionState = | 'idle' | 'leaving' | 'hidden'
const AVATAR_DISMISSED_KEY = "contacts-avatar-dismissed";
const AVATAR_DISMISSED_EVENT = 'contacts-avatar-dismissed-change'


const subscribeAvatarDismissed = (callback: () => void) => {
    window.addEventListener(AVATAR_DISMISSED_EVENT, callback)

    return () => {
        window.removeEventListener(AVATAR_DISMISSED_KEY, callback)
    }
}

const getAvatarDismissedSnapshot = (): AvatarState => {
    return sessionStorage.getItem(AVATAR_DISMISSED_KEY) === 'true' ? 'hidden' : 'visible'
}

const getAvatarDismissedServerSnapshot = (): AvatarState => {
    return 'checking'
}


const Contacts: React.FC = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const storedAvatarState = useSyncExternalStore(
        subscribeAvatarDismissed,
        getAvatarDismissedSnapshot,
        getAvatarDismissedServerSnapshot
    ) 
    const [avatarTransitionState, setAvatarTransitionState] = useState<AvatarTransitionState>('idle')

    const t = useTranslations("Contacts");

    const avatarState: AvatarState = avatarTransitionState === 'leaving' ? 'leaving' : avatarTransitionState === 'hidden' ? 'hidden' : storedAvatarState

    const { isVisible, elementRef } = useScrollAnimation<HTMLDivElement>({
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
    });

    const isFormEmpty =
        name.length === 0 && email.length === 0 && message.length === 0;

    const error: Errors = {
        name: "",
        email: "",
        message: "",
    };

    let isFormValid = true;

    if (!isFormEmpty) {
        const normalizedName = name.trim();

        if (normalizedName.length < 2 || normalizedName.length >= 50) {
            error.name = t("ErrorName");
            isFormValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            error.email = t("ErrorEmail");
            isFormValid = false;
        }

        if (message.length < 10 || message.length > 300) {
            error.message = t("ErrorMessage");
            isFormValid = false;
        }
    } else {
        isFormValid = false;
    }

    const btnBehavior: "default" | "loading" | "disabled" = isSubmitting
        ? "loading"
        : isFormValid
          ? "default"
          : "disabled";

    const dispatch = useDispatch();


    const handleNameChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setName(e.target.value);
    };

    const handleEmailChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setEmail(e.target.value);
    };

    const handleMessageChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setMessage(e.target.value);
    };

    const submitForm = async (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();

        if (!isFormValid || isSubmitting) {
            return;
        }

        setIsSubmitting(true);

        try {
            const result = await sendContactMessage({
                name,
                email,
                message,
            });

            if (!result.success) {
                showMessage("error", t("ErrorSend"), dispatch);

                return;
            }

            showMessage("info", t("SuccessSend"), dispatch);

            setName("");
            setEmail("");
            setMessage("");
        } catch {
            showMessage("error", t("ErrorSend"), dispatch);
        } finally {
            setIsSubmitting(false);
        }
    };

    const dismissAvatar = () => {
        if (
            avatarState === "checking" ||
            avatarState === "leaving" ||
            avatarState === "hidden"
        ) {
            return;
        }

        setAvatarTransitionState("leaving");

        sessionStorage.setItem(AVATAR_DISMISSED_KEY, "true");

        window.dispatchEvent(new Event(AVATAR_DISMISSED_EVENT));
    };

    const handleAvatarAnimationEnd = (
        e: React.AnimationEvent<HTMLDivElement>,
    ) => {
        if (e.target !== e.currentTarget) {
            return;
        }

        if (avatarState === "leaving") {
            setAvatarTransitionState("hidden");
        }
    };

    return (
        <section
            id="contacts"
            className={`container ${styles.contacts}`}
            onPointerDownCapture={dismissAvatar}
            onFocusCapture={dismissAvatar}
        >
            <h2 className={`${styles.contactsTitle} sectionTitle`}>
                {t("Title")}
            </h2>

            <form>
                <div className={styles.formContent}>
                    <Input
                        name="name"
                        placeholder={`${t("Name")}...`}
                        value={name}
                        iconPosition="noIcon"
                        error={error.name}
                        onChange={handleNameChange}
                    />

                    <Input
                        name="email"
                        placeholder={`${t("Email")}...`}
                        type="email"
                        value={email}
                        iconPosition="noIcon"
                        error={error.email}
                        onChange={handleEmailChange}
                    />

                    <Input
                        name="message"
                        placeholder={`${t("Message")}...`}
                        value={message}
                        type="textarea"
                        iconPosition="noIcon"
                        error={error.message}
                        onChange={handleMessageChange}
                        additionalClass={styles.input}
                        maxLen={300}
                    />

                    <DecorButton
                        behavior={btnBehavior}
                        variant="medium"
                        text={{ default: t("Send"), alter: t("Send") }}
                        additionalClass={styles.contactFormBtn}
                        onClick={submitForm}
                    />
                </div>
            </form>

            {avatarState !== "hidden" && (
                <div
                    ref={elementRef}
                    className={[
                        styles.avatar,
                        avatarState === "checking"
                            ? styles["avatar-hidden"]
                            : "",
                        avatarState === "visible" && isVisible
                            ? styles["avatar-anim"]
                            : "",
                        avatarState === "leaving"
                            ? styles["avatar-leaving"]
                            : "",
                    ]
                        .filter(Boolean)
                        .join(" ")}
                    onAnimationEnd={handleAvatarAnimationEnd}
                >
                    <TalkingAvatar
                        hand={false}
                        indexFinger={false}
                        text={t("Avatar")}
                    />
                </div>
            )}
        </section>
    );
};

export default Contacts;
