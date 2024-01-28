import { CardStyle } from "@/src/pages/login";
import React, { FunctionComponent } from "react";
import SignInForm from "../../form/login/signInForm";
import ResetPasswordForm from "../../form/login/resetPasswordForm";
import SignUpForm from "../../form/signUp";
import ResendEmail from "../../form/login/resendEmailForm";
import AccommodationForm from "../../form/accommodation";

type LoginCardProps = {
    whichForm:
        | "signIn"
        | "resetPassword"
        | "signUp"
        | "resendEmail"
        | "accommodation";
    cardStyle: CardStyle;
    setWhichForm: (
        whichForm:
            | "signIn"
            | "resetPassword"
            | "signUp"
            | "resendEmail"
            | "accommodation"
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
        // bg-gradient-to-b from-secondary-900 to-secondary-950
        //
        <div
            className="absolute px-5 py-8 min-w-[80vw] md:min-w-[350px] h-max bg-gradient-to-b from-[#1f2e97] to-[#090d4b] rounded-md top-2/4 left-2/4 origin-bottom transition-all ease-suck-in shadow-[0_0_18px_1px_#141e73] md:shadow-[0_0_20px_2px_#141e73] text-accent-200"
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
            ) : whichForm === "resendEmail" ? (
                <ResendEmail setWhichForm={setWhichForm} />
            ) : (
                <AccommodationForm setWhichForm={setWhichForm} />
            )}
        </div>
    );
};

export default LoginCard;
