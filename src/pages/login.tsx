import ResetPasswordForm from "@/src/components/form/login/resetPasswordForm";
import SignInForm from "@/src/components/form/login/signInForm";
import SignUpForm from "@/src/components/form/signUp";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import ResendEmail from "../components/form/login/resendEmailForm";
import Image from "next/image";

const SignIn: NextPage = () => {
  const {
    query,
  }: {
    query: {
      whichForm?: 'signIn' | 'resetPassword' | 'signUp' | 'resendEmail';
      redirectUrl?: string;
    };
  } = useRouter();
  const [whichForm, setWhichForm] = useState<
    'signIn' | 'resetPassword' | 'signUp' | 'resendEmail'
  >(query.whichForm || 'signIn');

  return (
    <div className="min-h-screen pt-20 md:pt-0 overflow-x-hidden min-w-screen bg-[#f3e9d1]">
      <div
        className={`w-screen transition-transform duration-500 flex ${
          whichForm === 'signUp' ? 'md:translate-x-0' : 'md:-translate-x-[50vw]'
        }`}
      >
        <div className="hidden md:flex h-full grow">
          <div
            className={`titleFont text-center w-[50vw] items-center justify-center text-white/70 flex bg-gradient-to-r to-[#3baee7] from-[#144f6d] `}
          >
            <p className="text-3xl -rotate-90">The adventure ahead awaits!</p>
          </div>
          <Image height={1080} width={200} alt="login-wave" src={"/login-wave.png"} className="h-screen" />
        </div>
        <div
          className={`shrink-0 md:w-[50vw] w-screen flex md:h-screen md:overflow-y-auto items-center justify-center bg-[#f3e9d1] text-[#6f5925] `}
        >
          <div className="md:max-w-md flex md:py-10 flex-col h-full min-h-screen">
            <div className="p-6 md:py-10 grow">
              {whichForm === 'signIn' ? (
                <SignInForm redirectUrl={query.redirectUrl} setWhichForm={setWhichForm} />
              ) : whichForm === 'resetPassword' ? (
                <ResetPasswordForm setWhichForm={setWhichForm} />
              ) : whichForm === 'signUp' ? (
                <SignUpForm setWhichForm={setWhichForm} />
              ) : (
                <ResendEmail setWhichForm={setWhichForm} />
              )}
            </div>
            <Image src={'/login-wave.svg'} alt="Wave" width={500} height={200} className="md:hidden block w-full h-auto" />
          </div>
        </div>
        <div className="hidden md:flex grow">
          <Image height={1080} width={200} alt="login-wave" src={"/login-wave.png"} className="rotate-180 h-screen" />
          <div
            className={`titleFont text-center text-white/70 w-[50vw] items-center justify-center flex bg-gradient-to-l to-[#3baee7] from-[#144f6d]`}
          >
            <p className="text-3xl rotate-90">
              Conquer the depths of the ocean!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
