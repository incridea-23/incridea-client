import ResetPasswordForm from "@/src/components/form/login/resetPasswordForm";
import SignInForm from "@/src/components/form/login/signInForm";
import SignUpForm from "@/src/components/form/signUp";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { titleFont } from "../utils/fonts";

const SignIn: NextPage = () => {
  const {
    query,
  }: { query: { whichForm?: "signIn" | "resetPassword" | "signUp" } } =
    useRouter();
  const [whichForm, setWhichForm] = useState<
    "signIn" | "resetPassword" | "signUp"
  >(query.whichForm || "signIn");

  return (
    <div className="min-h-screen pt-20 md:pt-0 overflow-x-hidden min-w-screen bg-[#f3e9d1]">
      <div
        className={`w-screen transition-transform duration-500 flex ${
          whichForm === "signUp" ? "md:translate-x-0" : "md:-translate-x-[50vw]"
        }`}>
        <div className="hidden md:flex h-full grow">
          <div
            className={`${titleFont.className} text-center w-[50vw] items-center justify-center text-white/70 flex bg-gradient-to-r to-[#3baee7] from-[#144f6d] `}>
            <p className="text-2xl -rotate-90">The adventure ahead awaits!</p>
          </div>
          <img src={"/login-wave.png"} className="h-screen" />
        </div>
        <div
          className={`shrink-0 md:w-[50vw] w-screen flex items-center justify-center bg-[#f3e9d1] text-[#6f5925] `}>
          <div className="md:max-w-md flex flex-col h-full min-h-screen">
            <div className="p-6 md:py-10 grow">
              {whichForm === "signIn" ? (
                <SignInForm setWhichForm={setWhichForm} />
              ) : whichForm === "resetPassword" ? (
                <ResetPasswordForm setWhichForm={setWhichForm} />
              ) : (
                <SignUpForm setWhichForm={setWhichForm} />
              )}
            </div>
            <img src={"/login-wave.svg"} className="md:hidden block" />
          </div>
        </div>
        <div className="hidden md:flex grow">
          <img src={"/login-wave.png"} className="rotate-180 h-screen -m-1" />
          <div
            className={`${titleFont.className} text-center text-white/70 w-[50vw] items-center justify-center flex bg-gradient-to-l to-[#3baee7] from-[#144f6d]`}>
            <p className="text-2xl rotate-90">Conquer the depths of the ocean!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
