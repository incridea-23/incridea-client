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
            className="absolute px-5 py-8 min-w-[80vw] md:min-w-[350px] h-max bg-gradient-to-t from-primary-700 to-primary-500 backdrop-blur-sm rounded-md top-2/4 left-2/4 origin-bottom transition-all ease-swap-card bg-[#] text-slate-200"
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
