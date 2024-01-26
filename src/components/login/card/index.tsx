import { CardStyle } from "@/src/pages/login";
import React, { FunctionComponent } from "react";
import SignInForm from "../../form/login/signInForm";
import ResetPasswordForm from "../../form/login/resetPasswordForm";
import SignUpForm from "../../form/signUp";
import ResendEmail from "../../form/login/resendEmailForm";

type LoginCardProps = {
    whichForm: "signIn" | "resetPassword" | "signUp" | "resendEmail";
    cardStyle: CardStyle;
    setWhichForm: (
        whichForm: "signIn" | "resetPassword" | "signUp" | "resendEmail"
    ) => void;
    redirectUrl?: string;
};

const LoginCard: FunctionComponent<LoginCardProps> = ({
    whichForm,
    cardStyle,
    setWhichForm,
    redirectUrl,
}) => {
    return (
        <div
            className="absolute max-w-[75vw] max-h-[60vh] w-[75vw] h-max px-5 py-8 rounded-2xl top-2/4 left-2/4 transition-all ease-swap-card bg-[#f3e9d1] text-[#6f5925]"
            style={cardStyle}>
            {whichForm === "signIn" ? (
                <SignInForm
                    redirectUrl={redirectUrl}
                    setWhichForm={setWhichForm}
                />
            ) : whichForm === "resetPassword" ? (
                <ResetPasswordForm setWhichForm={setWhichForm} />
            ) : whichForm === "signUp" ? (
                <SignUpForm setWhichForm={setWhichForm} />
            ) : (
                <ResendEmail setWhichForm={setWhichForm} />
            )}
        </div>
    );
};

export default LoginCard;
