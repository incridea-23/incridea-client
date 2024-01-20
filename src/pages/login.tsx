import ResetPasswordForm from "@/src/components/form/login/resetPasswordForm";
import SignInForm from "@/src/components/form/login/signInForm";
import SignUpForm from "@/src/components/form/signUp";
import LoginPortal from "@/src/components/loginPortal";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import ResendEmail from "../components/form/login/resendEmailForm";

// TODO: remove this font as it is for dev purpose
import { Roboto_Mono } from "@next/font/google";
const customFont = Roboto_Mono({ weight: "400", subsets: ["latin"] });

const CARD_SWITCH_DURATION = 1000;
const CSD_IN_STRING = `${CARD_SWITCH_DURATION}ms`;

type CardPosition = {
    first: {
        top: string;
        transitionDuration: string;
    };
    second: {
        top: string;
        transitionDuration: string;
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

    const [cardPosition, setCardPosition] = useState<CardPosition>({
        first: {
            top: "50%",
            transitionDuration: CSD_IN_STRING,
        },
        second: {
            top: "-50%",
            transitionDuration: CSD_IN_STRING,
        },
    });

    const switchCard: () => void = () => {
        setCardPosition((prev) => ({
            first: {
                top: prev.first.top === "50%" ? "150%" : "50%",
                transitionDuration: CSD_IN_STRING,
            },
            second: {
                top: prev.second.top === "50%" ? "150%" : "50%",
                transitionDuration: CSD_IN_STRING,
            },
        }));

        setTimeout(() => {
            setCardPosition((prev) => ({
                first: {
                    top: prev.first.top === "150%" ? "-50%" : prev.first.top,
                    transitionDuration: "0s",
                },
                second: {
                    top: prev.second.top === "150%" ? "-50%" : prev.second.top,
                    transitionDuration: "0s",
                },
            }));
        }, CARD_SWITCH_DURATION);
    };

    return (
        // TODO: font usage
        // 92 vh as there was some footer in viewport
        <>
            <div className="h-16"></div>
            <div
                className={`${customFont.className} min-h-[92vh] min-w-screen bg-pink-700 flex flex-col justify-between relative overflow-hidden`}>
                <LoginPortal isTop={true} />
                <div
                    className="py-3 absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 transition-[top]  duration-1000 ease-in-out z-[1]"
                    style={cardPosition.first}>
                    <div
                        className={`bg-[#f3e9d1] text-[#6f5925] px-4 py-6 w-72 rounded-3xl`}>
                        {whichForm === "signIn" ? (
                            <SignInForm
                                redirectUrl={query.redirectUrl}
                                setWhichForm={setWhichForm}
                                switchCard={switchCard}
                            />
                        ) : whichForm === "resetPassword" ? (
                            <ResetPasswordForm setWhichForm={setWhichForm} />
                        ) : whichForm === "signUp" ? (
                            <SignUpForm
                                setWhichForm={setWhichForm}
                                switchCard={switchCard}
                            />
                        ) : (
                            <ResendEmail setWhichForm={setWhichForm} />
                        )}
                    </div>
                </div>
                <div
                    className="py-3 absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 transition-[top]  duration-1000 ease-in-out z-[1]"
                    style={cardPosition.second}>
                    <div
                        className={`bg-[#f3e9d1] text-[#6f5925] px-4 py-6 w-72 rounded-3xl`}>
                        {whichForm === "signIn" ? (
                            <SignInForm
                                redirectUrl={query.redirectUrl}
                                setWhichForm={setWhichForm}
                                switchCard={switchCard}
                            />
                        ) : whichForm === "resetPassword" ? (
                            <ResetPasswordForm setWhichForm={setWhichForm} />
                        ) : whichForm === "signUp" ? (
                            <SignUpForm
                                setWhichForm={setWhichForm}
                                switchCard={switchCard}
                            />
                        ) : (
                            <ResendEmail setWhichForm={setWhichForm} />
                        )}
                    </div>
                </div>
                <LoginPortal isTop={false} />
            </div>
        </>
    );
};

export default SignIn;
