import ResetPasswordForm from "@/src/components/form/login/resetPasswordForm";
import SignInForm from "@/src/components/form/login/signInForm";
import SignUpForm from "@/src/components/form/signUp";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

const SignIn: NextPage = () => {
  const { query }: { query: { whichForm?: "signIn" | "resetPassword" | "signUp" } } =
    useRouter();
  const [whichForm, setWhichForm] = useState<"signIn" | "resetPassword" | "signUp">(
    query.whichForm || "signIn"
  );

  return (
    <div className="min-h-screen min-w-screen bg-cover bg-gradient-to-bl from-sky-300 to-sky-700">
      <div className="flex w-screen h-screen  backdrop-blur-sm">
        <div
          className={`hidden basis-1/2 md:flex items-center transition-transform duration-500 justify-center text-white font-bold text-2xl ${
            whichForm === "signUp" && "md:translate-x-full"
          }`}>
          {whichForm === "signUp" ? (
            <div>Signup text/mascot</div>
          ) : (
            <div>Signin text/mascot</div>
          )}
        </div>
        <div
          className={`md:basis-1/2 basis-full overflow-auto bg-white shadow-2xl md:px-44 md:p-20 p-6 md:w-full w-[90vw] transition-transform duration-500 ${
            whichForm === "signUp" && "md:-translate-x-full"
          }`}>
          {whichForm === "signIn" ? (
            <SignInForm setWhichForm={setWhichForm} />
          ) : whichForm === "resetPassword" ? (
            <ResetPasswordForm setWhichForm={setWhichForm} />
          ) : (
            <SignUpForm setWhichForm={setWhichForm} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
