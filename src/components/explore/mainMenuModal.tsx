import Modal from "@/src/components/modal";
import Link from "next/link";
import Button from "@/src/components/button";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useAuth, AuthStatus } from "@/src/hooks/useAuth";
import Image from "next/image";
import { useLayoutEffect, useEffect, useState, useRef } from "react";
import { BsFillSuitHeartFill } from "react-icons/bs";
import { VikingHell } from "../../pages/_app";
import { NextRouter, useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import GlitchAnimation from "../../components/animation/glitchAnimation";

type Props = {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
};

const MainMenuModal: React.FunctionComponent<Props> = ({
  showModal,
  setShowModal,
}) => {
  const { user } = useAuth();
  const navItems = [
    { href: "/profile", target: "Profile" },
    { href: "/events", target: "Events" },
    { href: "/pronites", target: "Pronite" },
    { href: "/", target: "Quit" },
  ];
  return (
    <Modal
      showModal={showModal}
      onClose={() => setShowModal(false)}
      title={""}
      size="small"
    >
      <div className="flex w-full rounded-lg items-center justify-center">
        <div className="flex flex-col w-full items-stretch gap-5 justify-center px-8 pb-8">
          {navItems.map((e, i) => (
            <>
              {e.target !== "Profile" ? (
                <Link key={i} href={e.href}>
                  <Button
                    className=" w-full items-center justify-center"
                    size={"xlarge"}
                    intent={"primary"}
                    fullWidth
                  >
                    {e.target}
                  </Button>
                </Link>
              ) : user ? (
                <Link key={i} href={e.href}>
                  <Button
                    className=" w-full items-center justify-center"
                    size={"xlarge"}
                    intent={"primary"}
                    fullWidth
                  >
                    {e.target}
                  </Button>
                </Link>
              ) : null}
            </>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default MainMenuModal;
