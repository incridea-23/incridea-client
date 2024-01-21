import { CardStyle } from "@/src/pages/login";
import React, { FunctionComponent } from "react";
import SignInForm from "../../form/login/signInForm";
import ResetPasswordForm from "../../form/login/resetPasswordForm";
import SignUpForm from "../../form/signUp";
import ResendEmail from "../../form/login/resendEmailForm";

type LoginCardProps = {
    cardStyle: CardStyle;
    whichForm: "signIn" | "resetPassword" | "signUp" | "resendEmail";
    setWhichForm: (
        whichForm: "signIn" | "resetPassword" | "signUp" | "resendEmail"
    ) => void;
    redirectUrl?: string;
};

const LoginCard: FunctionComponent<LoginCardProps> = ({
    cardStyle,
    whichForm,
    setWhichForm,
    redirectUrl,
}) => {
    return (
        <div
            className="py-3 absolute top-2/4 left-2/4 origin-center transition-all duration-1000 ease-[cubic-bezier(0.85, 0, 0.15, 1)]"
            style={cardStyle}>
            <div
                className={`bg-[#f3e9d1] text-[#6f5925] px-4 py-6 w-72 rounded-3xl`}>
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
        </div>
    );
};

export default LoginCard;
