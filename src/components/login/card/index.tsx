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
      className="absolute px-3 py-3 overflow-y-auto min-w-[80vw] max-w-[80vw] sm:min-w-[350px] sm:max-w-[350px] max-h-[75vh] lg:max-h-[76vh] bg-gradient-to-b from-[#1f2e97] to-[#090d4b] rounded-md top-2/4 left-2/4 origin-bottom transition-all ease-suck-in shadow-[0_0_18px_1px_#141e73] md:shadow-[0_0_20px_2px_#141e73] text-accent-200"
      style={cardStyle}>
      {whichForm === "signIn" ? (
        <SignInForm redirectUrl={redirectUrl} setWhichForm={setWhichForm} />
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
