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

interface ICardPosition {
    top: string;
    transition: string;
}

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
    >(query.whichForm || "signIn");

    const [cardPosition, setCardPosition] = useState<ICardPosition>({
        top: "50%",
        transition: "top 1s ease-in-out",
    });

    const cardSwitch = () => {
        setCardPosition((prev) => ({ ...prev, top: "150%" }));
        // setCardPosition((prev) => ({
        //     ...prev,
        //     top: "-50%",
        // }));

        setTimeout(() => {
            setCardPosition((prev) => ({ ...prev, top: "50%" }));
        }, 1000);
    };

    return (
        // TODO: font usage
        // 101 vh as there was some footer in viewport
        <>
            <div className="h-16"></div>
            <div
                className={`${customFont.className} min-h-[92vh] min-w-screen bg-pink-700 flex flex-col justify-between relative overflow-hidden`}>
                <LoginPortal isTop={true} />
                <div
                    className=" py-3 absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 transition-[top] ease-in-out z-[1] duration-1000"
                    style={cardPosition}>
                    {/* card starts here */}
                    <div
                        className={`bg-[#f3e9d1] text-[#6f5925] px-4 py-6 w-72 rounded-3xl`}>
                        <button
                            onClick={() => {
                                cardSwitch();
                            }}>
                            Click Me
                        </button>
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
        </>
    );
};

export default SignIn;
