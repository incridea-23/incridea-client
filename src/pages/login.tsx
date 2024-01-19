import ResetPasswordForm from "@/src/components/form/login/resetPasswordForm";
import SignInForm from "@/src/components/form/login/signInForm";
import SignUpForm from "@/src/components/form/signUp";
import LoginPortal from "@/src/components/loginPortal";
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
        // 101 vh as there was some footer in viewport
        <div
            className={`${customFont.className} min-h-[101vh] min-w-screen pt-16 bg-pink-700 flex flex-col justify-between`}>
            <LoginPortal isTop={true} />
            <div className="w-screen py-3 bg-blue-600 absolute hidden">
                {/* card starts here */}
                <div
                    className={`bg-[#f3e9d1] text-[#6f5925] px-4 py-6 w-72 rounded-3xl`}>
                    {whichForm === "signIn" ? (
                        <SignInForm
                            redirectUrl={query.redirectUrl}
                            setWhichForm={setWhichForm}
                        />
                    ) : whichForm === "resetPassword" ? (
                        <ResetPasswordForm setWhichForm={setWhichForm} />
                    ) : whichForm === "signUp" ? (
                        <SignUpForm setWhichForm={setWhichForm} />
                    ) : (
                        <ResendEmail setWhichForm={setWhichForm} />
                    )}
                </div>
            </div>
            <LoginPortal isTop={false} />
        </div>
    );
};

export default SignIn;
