import ResetPassword from "../../components/form/resetPassword";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

const Reset: NextPage = () => {
  const {
    query,
  }: {
    query: {
      whichForm?: "signIn" | "resetPassword" | "signUp" | "resendEmail";
    };
  } = useRouter();
  const [whichForm, setWhichForm] = useState<
    "signIn" | "resetPassword" | "signUp" | "resendEmail"
  >(query.whichForm || "signIn");

  return (
    <div className="min-h-screen pt-20 md:pt-0 overflow-x-hidden min-w-screen bg-[#f3e9d1]">
      <div
        className={`w-screen transition-transform duration-500 flex ${
          whichForm === "signUp" ? "md:translate-x-0" : "md:-translate-x-[50vw]"
        }`}
      >
        <div className="hidden md:flex h-full grow">
          <div
            className={`titleFont text-center w-[50vw] items-center justify-center text-white/70 flex bg-gradient-to-r to-[#3baee7] from-[#144f6d] `}
          >
            <p className="text-2xl -rotate-90">The adventure ahead awaits!</p>
          </div>
          <Image height={1080} width={200} alt="login-wave" src={"/login-wave.png"} className="h-screen" />
        </div>
        <div
          className={`shrink-0 md:w-[50vw] w-screen flex items-center justify-center bg-[#f3e9d1] text-[#6f5925] `}
        >
          <div className="md:max-w-md flex flex-col h-full min-h-screen">
            <div className="p-6 md:py-10 grow">
              <ResetPassword />
            </div>
            <Image src={'/login-wave.svg'} alt="Wave" width={500} height={200} className="md:hidden block w-full h-auto" />
          </div>
        </div>
        <div className="hidden md:flex grow">
        <Image height={1080} width={200} alt="login-wave" src={"/login-wave.png"} className="rotate-180 h-screen" />
          <div
            className={`titleFont text-center text-white/70 w-[50vw] items-center justify-center flex bg-gradient-to-l to-[#3baee7] from-[#144f6d]`}
          >
            <p className="text-2xl rotate-90">
              Conquer the depths of the ocean!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reset;
