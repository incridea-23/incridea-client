import ResetPasswordForm from "@/src/components/form/login/resetPasswordForm";
import SignInForm from "@/src/components/form/login/signInForm";
import SignUpForm from "@/src/components/form/signUp";
import LoginPortal from "@/src/components/loginPortal";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ResendEmail from "../components/form/login/resendEmailForm";

// TODO: remove this font as it is for dev purpose
import { Roboto_Mono } from "@next/font/google";
const customFont = Roboto_Mono({ weight: "400", subsets: ["latin"] });

const CARD_SWITCH_DURATION = 1000,
    CSD_IN_STRING = `${CARD_SWITCH_DURATION}ms`;

const cardTopLimit = "-150%",
    cardTopRotateX = "25deg",
    cardNaturalRotateX = "0deg",
    cardBottomLimit = "250%",
    cardBottomRotateX = "335deg";

type cardStyle = {
    first: {
        top: string;
        transitionDuration: string;
        transform: string;
    };
    second: {
        top: string;
        transitionDuration: string;
        transform: string;
    };
};

const SignIn: NextPage = () => {
    const {
        query,
    }: {
        query: {
            whichForm?: "signIn" | "resetPassword" | "signUp" | "resendEmail";
            redirectUrl?: string;
        };
    } = useRouter();

    const [whichForm, setWhichForm] = useState<
        "signIn" | "resetPassword" | "signUp" | "resendEmail"
    >(query.whichForm || "signIn");

    const [cardStyle, setCardStyle] = useState<cardStyle>({
        first: {
            top: "50%",
            transitionDuration: CSD_IN_STRING,
            transform: `translate(-50%, -50%) rotateX(${cardNaturalRotateX})`,
        },
        second: {
            top: cardTopLimit,
            transitionDuration: CSD_IN_STRING,
            transform: `translate(-50%, -50%) rotateX(${cardTopRotateX})`,
        },
    });

    const switchCard: () => void = () => {
        setCardStyle((prev) => ({
            ...prev,
            first: {
                ...prev.first,
                top: prev.first.top === "50%" ? cardBottomLimit : "50%",
                transitionDuration: CSD_IN_STRING,
                transform: `translate(-50%, -50%) rotateX(${
                    prev.first.top === "50%"
                        ? cardBottomRotateX
                        : cardNaturalRotateX
                })`,
            },
            second: {
                ...prev.second,
                top: prev.second.top === "50%" ? cardBottomLimit : "50%",
                transitionDuration: CSD_IN_STRING,
                transform: `translate(-50%, -50%) rotateX(${
                    prev.second.top === "50%"
                        ? cardBottomRotateX
                        : cardNaturalRotateX
                })`,
            },
        }));

        setTimeout(() => {
            setCardStyle((prev) => ({
                ...prev,
                first: {
                    ...prev.first,
                    top:
                        prev.first.top === cardBottomLimit
                            ? cardTopLimit
                            : prev.first.top,
                    transitionDuration: "0s",
                    transform: `translate(-50%, -50%) rotateX(${
                        prev.first.top === cardBottomLimit
                            ? cardTopRotateX
                            : cardNaturalRotateX
                    })`,
                },
                second: {
                    ...prev.second,
                    top:
                        prev.second.top === cardBottomLimit
                            ? cardTopLimit
                            : prev.second.top,
                    transitionDuration: "0s",
                    transform: `translate(-50%, -50%) rotateX(${
                        prev.second.top === cardBottomLimit
                            ? cardTopRotateX
                            : cardNaturalRotateX
                    })`,
                },
            }));
        }, CARD_SWITCH_DURATION);
    };

    // TODO: setWhichFormWithDelay is sent in child components but referred as setWhichForm in child components due to laziness
    const setWhichFormWithDelay: (
        newForm: "signIn" | "resetPassword" | "signUp" | "resendEmail"
    ) => void = (newForm) => {
        setTimeout(
            () => {
                setWhichForm(newForm);
            },
            (whichForm === "signIn" && newForm === "signUp") ||
                (whichForm === "signUp" && newForm === "signIn")
                ? CARD_SWITCH_DURATION / 3
                : 0
        );
    };

    return (
        // TODO: remove font usage
        // 92 vh as there was some footer in viewport
        <>
            <div className="h-16"></div>
            <div
                className={`${customFont.className} min-h-[92vh] min-w-screen bg-gray-600 flex flex-col justify-between relative overflow-hidden [transform-style:preserve-3d] [perspective:500px]`}>
                <LoginPortal isTop={true} />
                <div
                    className="py-3 absolute top-2/4 left-2/4 origin-center transition-all duration-1000 ease-[cubic-bezier(0.85, 0, 0.15, 1)] z-[1]"
                    style={cardStyle.first}>
                    <div
                        className={`bg-[#f3e9d1] text-[#6f5925] px-4 py-6 w-72 rounded-3xl`}>
                        {whichForm === "signIn" ? (
                            <SignInForm
                                redirectUrl={query.redirectUrl}
                                setWhichForm={setWhichFormWithDelay}
                                switchCard={switchCard}
                            />
                        ) : whichForm === "resetPassword" ? (
                            <ResetPasswordForm
                                setWhichForm={setWhichFormWithDelay}
                            />
                        ) : whichForm === "signUp" ? (
                            <SignUpForm
                                setWhichForm={setWhichFormWithDelay}
                                switchCard={switchCard}
                            />
                        ) : (
                            <ResendEmail setWhichForm={setWhichFormWithDelay} />
                        )}
                    </div>
                </div>
                <div
                    className="py-3 absolute top-2/4 left-2/4 origin-center transition-all duration-1000 ease-card z-[1]"
                    style={cardStyle.second}>
                    <div
                        className={`bg-[#f3e9d1] text-[#6f5925] px-4 py-6 w-72 rounded-3xl`}>
                        {whichForm === "signIn" ? (
                            <SignInForm
                                redirectUrl={query.redirectUrl}
                                setWhichForm={setWhichFormWithDelay}
                                switchCard={switchCard}
                            />
                        ) : whichForm === "resetPassword" ? (
                            <ResetPasswordForm
                                setWhichForm={setWhichFormWithDelay}
                            />
                        ) : whichForm === "signUp" ? (
                            <SignUpForm
                                setWhichForm={setWhichFormWithDelay}
                                switchCard={switchCard}
                            />
                        ) : (
                            <ResendEmail setWhichForm={setWhichFormWithDelay} />
                        )}
                    </div>
                </div>
                <LoginPortal isTop={false} />
            </div>
        </>
    );
};

export default SignIn;
