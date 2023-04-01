import ResetPasswordForm from "@/src/components/form/login/resetPasswordForm";
import SignInForm from "@/src/components/form/login/signInForm";
import SignUpForm from "@/src/components/form/signUp";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { titleFont } from "../utils/fonts";

const SignIn: NextPage = () => {
  const { query }: { query: { whichForm?: "signIn" | "resetPassword" | "signUp" } } =
    useRouter();
  const [whichForm, setWhichForm] = useState<"signIn" | "resetPassword" | "signUp">(
    query.whichForm || "signIn"
  );

  return (
    <div className="min-h-screen min-w-screen bg-cover bg-gradient-to-bl from-[#46aacf]  via-[#075985] to-[#2d6aa6]">
      <div className={`hidden md:block fixed top-1/2 -translate-y-1/2 transition-transform duration-500 -rotate-90 right-1/4 ${whichForm === 'signUp' && '-translate-x-3/4'}`}>
        <img src={"/wave.svg"} className="w-[100vh]" />
      </div>
      <div className={`hidden md:block fixed top-1/2 -translate-y-1/2 transition-transform duration-500 rotate-90 left-1/4 ${whichForm !== 'signUp' && 'translate-x-3/4'}`}>
        <img src={"/wave.svg"} className="w-[100vh]" />
      </div>
      <div className="flex w-screen h-screen">
        <div
          className={`hidden basis-1/2 p-6 pr-12 md:flex items-center transition-transform duration-500 justify-center text-white font-bold text-2xl ${
            whichForm === "signUp" && "md:translate-x-full"
          }`}>
          {whichForm === "signUp" ? (
            <div className={`${titleFont.className}`}>Signup text/mascot</div>
          ) : (
            <div className={`${titleFont.className}`}>Signin text/mascot</div>
          )}
        </div>
        <div
          className={`md:basis-1/2 basis-full flex items-center justify-center overflow-auto md:bg-white text-white md:text-black p-6 transition-transform duration-500 ${
            whichForm === "signUp" && "md:-translate-x-full"
          }`}>
          <div className="max-w-sm ">
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
    </div>
  );
};

export default SignIn;
