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
        <div
            className="absolute px-5 py-8 min-w-[80vw] md:min-w-[350px] h-max bg-gradient-to-t from-secondary-950 to-secondary-900 rounded-md top-2/4 left-2/4 origin-bottom transition-all ease-suck-in bg-[#] text-accent-200"
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
