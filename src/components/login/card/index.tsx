import { CardStyle } from "@/src/pages/login";
import React, { FunctionComponent, useEffect, useState } from "react";
import SignInForm from "../../form/login/signInForm";
import ResetPasswordForm from "../../form/login/resetPasswordForm";
import SignUpForm from "../../form/signUp";
import ResendEmail from "../../form/login/resendEmailForm";
import { useRouter } from "next/router";

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
  const [gotDialogBox, setGotDialogBox] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    if (cardStyle.top === "-50%" && gotDialogBox) {
      // Work around to remove error and success dialog box from card when card is re-bought into viewport
      // % 10 is to control overflow [which will never happen]
      setCount((prev) => (prev + 1) % 10);
      setGotDialogBox(false);
    }
  }, [cardStyle.top, gotDialogBox]);

  const router = useRouter();
  const { verify } = router.query;

  useEffect(() => {
    if (verify) {
      setWhichForm("signIn");
    }
  }, [verify]);

  return (
    // HACK: Please update anything here or in children also in auth/reset-password.tsx
    <div
      className="absolute px-3 py-3 overflow-y-auto min-w-[80vw] max-w-[80vw] sm:min-w-[350px] sm:max-w-[350px] max-h-[75vh] lg:max-h-[76vh] bg-gradient-to-b from-[#1f2e97] to-[#090d4b] rounded-md top-2/4 left-2/4 origin-bottom transition-all ease-suck-in shadow-[0_0_18px_1px_#141e73] md:shadow-[0_0_20px_2px_#141e73] text-accent-200"
      style={cardStyle}
    >
      {whichForm === "signIn" ? (
        <SignInForm
          redirectUrl={redirectUrl}
          setWhichForm={setWhichForm}
          setGotDialogBox={setGotDialogBox}
          key={count}
        />
      ) : whichForm === "resetPassword" ? (
        <ResetPasswordForm
          setWhichForm={setWhichForm}
          setGotDialogBox={setGotDialogBox}
          key={count}
        />
      ) : whichForm === "signUp" ? (
        <SignUpForm
          setWhichForm={setWhichForm}
          setGotDialogBox={setGotDialogBox}
          key={count}
        />
      ) : (
        <ResendEmail
          setWhichForm={setWhichForm}
          setGotDialogBox={setGotDialogBox}
          key={count}
        />
      )}
    </div>
  );
};

export default LoginCard;
