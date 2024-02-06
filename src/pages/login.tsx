import LoginCard from "../components/login/card";
import LoginPortal from "@/src/components/login/portal";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import Image from "next/image";
import FallingItem from "../components/login/fallingItem";
import EasterBomb from "../components/login/easterBomb";
import { baseImageUrl } from "../utils/url";

type CardStyle = {
  top: string;
  transitionDuration: string;
  opacity?: string;
  pointerEvents?: React.CSSProperties["pointerEvents"];
  transform: string;
};

// HACK: If "top" values are changed, please check LoginCard component logic once
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
  >(query.whichForm || "signUp");

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
        src={`${baseImageUrl}/assets/svg/loginBG.svg`}
        alt={"loginBG"}
        quality={100}
        priority
      />
      <div
        className={`relative min-h-[93vh] flex flex-col justify-between [transform-style:preserve-3d] [perspective:500px] overflow-hidden`}
      >
        <LoginPortal isTop={true} />

        {/* TODO: Change the time delay here according to time delay set for free-fall animation in tailwind.config.js */}
        <div className="absolute left-2/4 -translate-x-2/4 -top-[10vh] -z-40 h-0 w-[65vw] md:w-[440px]">
          <FallingItem delay={0} />
          <FallingItem delay={2000} />
          <FallingItem delay={4000} />
          <FallingItem delay={6000} />
          <FallingItem delay={8000} />
        </div>

        <div className="absolute left-2/4 -translate-x-2/4 -top-[10vh] z-30 h-0 w-[65vw] md:w-[440px]">
          <EasterBomb />
        </div>

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
