import LoginCard from "../components/login/card";
import LoginPortal from "@/src/components/login/portal";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import Image from "next/image";

type CardStyle = {
  top: string;
  transitionDuration: string;
  opacity?: string;
  pointerEvents?: React.CSSProperties["pointerEvents"];
  transform: string;
};

const CARD_SWITCH_DURATION: number = 1000;
const CARD_TOP_STYLE: CardStyle = {
    top: "-50%",
    transitionDuration: "0s",
    opacity: "0%",
    pointerEvents: "none",
    transform: `translate(-50%, -50%) rotateX(45deg) scaleX(-0.2)`,
  },
  CARD_NEUTRAL_STYLE: CardStyle = {
    top: "50%",
    transitionDuration: `${CARD_SWITCH_DURATION}ms`,
    opacity: "100%",
    pointerEvents: "auto",
    transform: `translate(-50%, -50%) rotateX(0deg) scaleX(1)`,
  },
  CARD_BOTTOM_STYLE: CardStyle = {
    top: "150%",
    transitionDuration: `${CARD_SWITCH_DURATION}ms`,
    transform: `translate(-50%, -50%) rotateX(-45deg) scaleX(-0.2)`,
  };

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

  const [cardStyle, setCardStyle] = useState<{
    signIn: CardStyle;
    signUp: CardStyle;
    resetPassword: CardStyle;
    resendEmail: CardStyle;
  }>({
    signIn: CARD_TOP_STYLE,
    resetPassword: CARD_TOP_STYLE,
    signUp: CARD_TOP_STYLE,
    resendEmail: CARD_TOP_STYLE,
    [whichForm]: CARD_NEUTRAL_STYLE,
  });

  const changeCard: (
    newForm: "signIn" | "resetPassword" | "signUp" | "resendEmail"
  ) => void = (newForm) => {
    if (whichForm === newForm) return;

    setCardStyle((prev) => ({
      ...prev,
      [whichForm]: CARD_BOTTOM_STYLE,
      [newForm]: CARD_NEUTRAL_STYLE,
    }));

    setTimeout(() => {
      setCardStyle((prev) => ({
        ...prev,
        [whichForm]: CARD_TOP_STYLE,
      }));
    }, CARD_SWITCH_DURATION * 0.9);

    setWhichForm(newForm);
  };

  return (
    <>
      <div className="h-16 bg-[#6a5fd7]"></div>
      <Image
        fill={true}
        className="object-cover mt-16"
        src={"/assets/svg/loginBG.svg"}
        alt={"loginBG"}
        quality={100}
        priority
      />
      <div
        className={`relative min-h-[93vh] min-w-screen flex flex-col justify-between [transform-style:preserve-3d] [perspective:500px] overflow-hidden`}>
        <LoginPortal isTop={true} />

        <LoginCard
          whichForm="signIn"
          cardStyle={cardStyle.signIn}
          setWhichForm={changeCard}
          redirectUrl={query.redirectUrl}
        />
        <LoginCard
          whichForm="resetPassword"
          cardStyle={cardStyle.resetPassword}
          setWhichForm={changeCard}
        />
        <LoginCard
          whichForm="signUp"
          cardStyle={cardStyle.signUp}
          setWhichForm={changeCard}
        />
        <LoginCard
          whichForm="resendEmail"
          cardStyle={cardStyle.resendEmail}
          setWhichForm={changeCard}
        />

        <LoginPortal isTop={false} />
      </div>
    </>
  );
};

export type { CardStyle };
export default SignIn;
