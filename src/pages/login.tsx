import LoginCard from "../components/login/card";
import LoginPortal from "@/src/components/login/portal";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

type CardForms = "signIn" | "resetPassword" | "signUp" | "resendEmail";
type CardStyle = {
    top: string;
    transitionDuration: string;
    transformOrigin: string;
    transform: string;
};

const CARD_SWITCH_DURATION = 1000;
const CARD_TOP_STYLE: CardStyle = {
        top: "-50%",
        transitionDuration: "0s",
        transformOrigin: "",
        transform: `translate(-50%, -50%) rotateX(50deg) scaleX(0.1)`,
    },
    CARD_NEUTRAL_STYLE: CardStyle = {
        top: "50%",
        transitionDuration: `${CARD_SWITCH_DURATION}ms`,
        transformOrigin: "bottom",
        transform: `translate(-50%, -50%) rotateX(0deg) scaleX(1)`,
    },
    CARD_BOTTOM_STYLE: CardStyle = {
        top: "150%",
        transitionDuration: `${CARD_SWITCH_DURATION}ms`,
        transformOrigin: "top",
        transform: `translate(-50%, -50%) rotateX(-50deg) scaleX(0.1)`,
    };

const SignIn: NextPage = () => {
    const {
        query,
    }: {
        query: {
            whichForm?: CardForms;
            redirectUrl?: string;
        };
    } = useRouter();

    const [whichForm, setWhichForm] = useState<CardForms>(
        query.whichForm || "signIn"
    );

    const [cardStyle, setCardStyle] = useState<{
        signIn: CardStyle;
        signUp: CardStyle;
        resetPassword: CardStyle;
        resendEmail: CardStyle;
    }>({
        signIn: CARD_TOP_STYLE,
        resetPassword: CARD_TOP_STYLE,
        signUp: CARD_TOP_STYLE,
        resendEmail: CARD_TOP_STYLE,
        [whichForm]: CARD_NEUTRAL_STYLE,
    });

    const changeCard: (newForm: CardForms) => void = (newForm) => {
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
        // TODO:92 vh as there was some footer in viewport
        <>
            <div className="h-16"></div>
            <div
                className={`min-h-[92vh] min-w-screen bg-gray-600 flex flex-col justify-between relative overflow-hidden [transform-style:preserve-3d] [perspective:500px]`}>
                <LoginPortal isTop={true} />
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
                <LoginPortal isTop={false} />
            </div>
        </>
    );
};

export default SignIn;
export type { CardForms, CardStyle };
