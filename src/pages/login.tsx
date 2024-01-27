import LoginCard from "../components/login/card";
import LoginPortal from "@/src/components/login/portal";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import Image from "next/image";

type CardStyle = {
    top: string;
    transitionDuration: string;
    transform: string;
};

const CARD_SWITCH_DURATION: number = 1000;
const CARD_TOP_STYLE: CardStyle = {
        top: "-50%",
        transitionDuration: "0s",
        transform: `translate(-50%, -50%) rotateX(45deg) scaleX(-0.2)`,
    },
    CARD_NEUTRAL_STYLE: CardStyle = {
        top: "50%",
        transitionDuration: `${CARD_SWITCH_DURATION}ms`,
        transform: `translate(-50%, -50%) rotateX(0deg) scaleX(1)`,
    },
    CARD_BOTTOM_STYLE: CardStyle = {
        top: "150%",
        transitionDuration: `${CARD_SWITCH_DURATION}ms`,
        transform: `translate(-50%, -50%) rotateX(-45deg) scaleX(-0.2)`,
    };

const SignIn: NextPage = () => {
    const {
        query,
    }: {
        query: {
            whichForm?:
                | "signIn"
                | "resetPassword"
                | "signUp"
                | "resendEmail"
                | "accommodation";
            redirectUrl?: string;
        };
    } = useRouter();

    const [whichForm, setWhichForm] = useState<
        "signIn" | "resetPassword" | "signUp" | "resendEmail" | "accommodation"
    >(query.whichForm || "signIn");

    const [cardStyle, setCardStyle] = useState<{
        signIn: CardStyle;
        signUp: CardStyle;
        resetPassword: CardStyle;
        resendEmail: CardStyle;
        accommodation: CardStyle;
    }>({
        signIn: CARD_TOP_STYLE,
        resetPassword: CARD_TOP_STYLE,
        signUp: CARD_TOP_STYLE,
        resendEmail: CARD_TOP_STYLE,
        accommodation: CARD_TOP_STYLE,
        [whichForm]: CARD_NEUTRAL_STYLE,
    });

    const changeCard: (
        newForm:
            | "signIn"
            | "resetPassword"
            | "signUp"
            | "resendEmail"
            | "accommodation"
    ) => void = (newForm) => {
        if (whichForm === newForm) return;

        setCardStyle((prev) => ({
            ...prev,
            [whichForm]: CARD_BOTTOM_STYLE,
            [newForm]: CARD_NEUTRAL_STYLE,
        }));

        setTimeout(() => {
            setCardStyle((prev) => ({
                ...prev,
                [whichForm]: CARD_TOP_STYLE,
            }));
        }, CARD_SWITCH_DURATION * 0.9);

        setWhichForm(newForm);
    };

    return (
        <>
            {/* HACK: remove me */}
            <div className="fixed top-1/2 gap-1 z-50 left-0 flex flex-col">
                <button
                    className="bg-slate-700 text-slate-100"
                    onClick={() => {
                        changeCard("signIn");
                    }}>
                    signIn
                </button>
                <button
                    className="bg-slate-700 text-slate-100"
                    onClick={() => {
                        changeCard("signUp");
                    }}>
                    signUp
                </button>
                <button
                    className="bg-slate-700 text-slate-100"
                    onClick={() => {
                        changeCard("resendEmail");
                    }}>
                    resendEmail
                </button>
                <button
                    className="bg-slate-700 text-slate-100"
                    onClick={() => {
                        changeCard("resetPassword");
                    }}>
                    resetPassword
                </button>
                <button
                    className="bg-slate-700 text-slate-100"
                    onClick={() => {
                        changeCard("accommodation");
                    }}>
                    accommodation
                </button>
            </div>

            <div className="h-16 bg-primary-800"></div>
            <div
                className={`relative min-h-[92vh] bg-gradient-to-b from-primary-700 to-primary-900 min-w-screen flex flex-col justify-between [transform-style:preserve-3d] [perspective:500px] overflow-hidden`}>
                <LoginPortal isTop={true} src={"/assets/png/portalv3"} />
                <LoginCard
                    whichForm="signIn"
                    cardStyle={cardStyle.signIn}
                    setWhichForm={changeCard}
                    redirectUrl={query.redirectUrl}
                />
                <LoginCard
                    whichForm="resetPassword"
                    cardStyle={cardStyle.resetPassword}
                    setWhichForm={changeCard}
                />
                <LoginCard
                    whichForm="signUp"
                    cardStyle={cardStyle.signUp}
                    setWhichForm={changeCard}
                />
                <LoginCard
                    whichForm="resendEmail"
                    cardStyle={cardStyle.resendEmail}
                    setWhichForm={changeCard}
                />
                <LoginCard
                    whichForm="accommodation"
                    cardStyle={cardStyle.accommodation}
                    setWhichForm={changeCard}
                />
                <LoginPortal isTop={false} src={"/assets/png/portalv3"} />
            </div>
        </>
    );
};

export type { CardStyle };
export default SignIn;
