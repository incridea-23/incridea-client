import Button from "../button";
import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import MainMenuModal from "./mainMenuModal";
import { useAuth } from "@/src/hooks/useAuth";
import { GetUserXpDocument } from "../../generated/generated";
import Image from "next/image";
import { VikingHell } from "../../pages/_app";
export default function ExploreNav() {
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth();
  const { data: userXp, loading: userXpLoading } = useQuery(
    GetUserXpDocument,
    {}
  );
  const [xp, setXp] = useState<number>(0);
  useEffect(() => {
    if (userXp?.getUserXp.__typename === "QueryGetUserXpSuccess") {
      setXp(
        userXp.getUserXp.data.reduce((acc, curr) => acc + curr.level.point, 0)
      );
    } else {
      setXp(0);
    }
  }, [userXpLoading]);

  return (
    <>
      <div className="fixed w-full flex justify-between items-center z-[1000] p-4">
        {user ? (
          <div className="flex flex-row space-x-1 items-center titleFont text-white">
            <Image
              src={"/assets/png/XP.png"}
              width={100}
              height={100}
              alt="map"
              className="sm:h-10 sm:w-10 h-8 w-8"
            />

            <div className="text-lg flex flex-col items-center justify-center">
              <p className={`${VikingHell.className}`}>XP</p>
              <p className="font-sans relative bottom-2">{xp}</p>
            </div>
          </div>
        ) : (
          <div></div>
        )}
        <Button
          intent={"primary"}
          size={"medium"}
          onClick={() => {
            setShowModal(true);
          }}
        >
          Menu
        </Button>
      </div>
      <MainMenuModal showModal={showModal} setShowModal={setShowModal} />
    </>
  );
}
