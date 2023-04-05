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
    <div
    style={{backgroundImage: 'linear-gradient(90deg, rgba(20,79,109,1) 0%, rgba(59,174,231,1) 43%, rgba(59,174,231,1) 57%, rgba(20,79,109,1) 100%)'}}
    
    className="min-h-screen min-w-screen ">
      <div
        className={`hidden md:block fixed top-1/2 z-10 -translate-y-1/2 transition-transform duration-500 rotate-90 right-[25vw] ${
          whichForm === "signUp" && "-translate-x-[50vw]"
        }`}>
          {/* to fully hide wave, translate-x by 110% instead of 50vw */}
        <img src={"/login-wave.svg"} className="w-[100vh]" />
      </div>
      <div
        className={`hidden md:block fixed top-1/2 z-10 -translate-y-1/2 transition-transform duration-500 -rotate-90 left-[25vw] ${
          whichForm !== "signUp" && "translate-x-[50vw]"
        }`}>
        <img src={"/login-wave.svg"} className="w-[100vh]" />
      </div>
      <div className="flex w-screen h-screen">
        <div
          className={`hidden basis-1/2 md:flex items-center   transition-all duration-500 justify-center text-white font-bold text-2xl ${
            whichForm === "signUp" && "md:translate-x-full"
          }`}>
          {whichForm === "signUp" ? (
            <div
              className={`${titleFont.className} `}>
              Signup text/mascot
            </div>
          ) : (
            <div
              className={`${titleFont.className} `}>
              Signin text/mascot
            </div>
          )}
        </div>
        <div
          className={`md:basis-1/2 basis-full flex items-center justify-center overflow-auto bg-[#f3e9d1] text-[#6f5925]  md:p-6 transition-transform duration-500 ${
            whichForm === "signUp" && "md:-translate-x-full"
          }`}>
          <div className="md:max-w-sm flex flex-col items-center h-full">
            <div className="p-6 md:py-10 md:p-0 grow">
              {whichForm === "signIn" ? (
                <SignInForm setWhichForm={setWhichForm} />
              ) : whichForm === "resetPassword" ? (
                <ResetPasswordForm setWhichForm={setWhichForm} />
              ) : (
                <SignUpForm setWhichForm={setWhichForm} />
              )}
            </div>
            <img src={"/login-wave.svg"} className="md:hidden block"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
