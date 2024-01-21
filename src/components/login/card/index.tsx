import { CardForms, CardStyle } from "@/src/pages/login";
import React, { FunctionComponent } from "react";
import SignInForm from "../../form/login/signInForm";
import ResetPasswordForm from "../../form/login/resetPasswordForm";
import SignUpForm from "../../form/signUp";
import ResendEmail from "../../form/login/resendEmailForm";

type LoginCardProps = {
    whichForm: CardForms;
    cardStyle: CardStyle;
    setWhichForm: (whichForm: CardForms) => void;
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
            className="py-3 absolute top-2/4 left-2/4 transition-all ease-swap-card"
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
