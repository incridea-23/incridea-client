import ResetPasswordForm from "@/src/components/form/login/resetPasswordForm";
import SignInForm from "@/src/components/form/login/signInForm";
import SignUpForm from "@/src/components/form/signUp";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import ResendEmail from "../components/form/login/resendEmailForm";
import Image from "next/image";

// TODO: remove this font as it is for dev purpose
import { Roboto_Mono } from "@next/font/google";
const customFont = Roboto_Mono({ weight: "400", subsets: ["latin"] });

const SignIn: NextPage = () => {
    const {
        query,
    }: {
        query: {
            whichForm?: "signIn" | "resetPassword" | "signUp" | "resendEmail";
            redirectUrl?: string;
        };
    } = useRouter();
    const [whichForm, setWhichForm] = useState<
        "signIn" | "resetPassword" | "signUp" | "resendEmail"
    >(query.whichForm || "signUp");

    return (
        // TODO: font usage
        <div
            className={`${customFont.className} min-h-screen min-w-screen pt-16 bg-pink-700`}>
            <div className="flex justify-center items-start flex-col">
                <div className="flex justify-center items-center w-full">
                    <div className="h-12 w-11/12 md:w-3/4 bg-red-300 flex justify-center items-center rounded-[50%]">
                        the portal placeholder
                    </div>
                </div>
                <div className="flex justify-center items-center w-full pt-3">
                    <div
                        className={`w-11/12 h-[600px] flex items-center justify-center bg-[#f3e9d1] text-[#6f5925] rounded-3xl`}>
                        <div className="flex flex-col h-full min-h-screen">
                            <div className="p-5 grow">
                                {whichForm === "signIn" ? (
                                    <SignInForm
                                        redirectUrl={query.redirectUrl}
                                        setWhichForm={setWhichForm}
                                    />
                                ) : whichForm === "resetPassword" ? (
                                    <ResetPasswordForm
                                        setWhichForm={setWhichForm}
                                    />
                                ) : whichForm === "signUp" ? (
                                    <SignUpForm setWhichForm={setWhichForm} />
                                ) : (
                                    <ResendEmail setWhichForm={setWhichForm} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
