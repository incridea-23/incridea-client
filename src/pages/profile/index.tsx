import { useAuth } from "@/src/hooks/useAuth";
import { NextPage } from "next";
import "locomotive-scroll/dist/locomotive-scroll.css";
import { useRef, useState } from "react";
import ProfileInfo from "@/src/components/pages/profile/profileInfo";
import UserEvents from "@/src/components/pages/profile/registeredEvents";
import toast from "react-hot-toast";
import Link from "next/link";
import Button from "@/src/components/button";
import Image from "next/image";
import Loader from "@/src/components/Loader";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { AddXpDocument, GetUserXpDocument } from "@/src/generated/generated";

const Profile: NextPage = () => {
  const { error, user, loading } = useAuth();
  const containerRef = useRef(null);
  const router = useRouter();
  const [bombXp, setBombXp] = useState<Boolean>(false);
  const [addXp] = useMutation(AddXpDocument, {
    variables: {
      levelId: "2",
    },
    refetchQueries: [GetUserXpDocument],
    awaitRefetchQueries: true,
  });

  useEffect(() => {
    if (router.isReady) {
      setBombXp(localStorage.getItem("easterBombClicked") === "true");
    }
  }, [router.isReady]);

  useEffect(() => {
    if (bombXp) {
      addXp().then((res) => {
        if (res.data?.addXP.__typename === "MutationAddXPSuccess") {
          toast.success(
            `Added ${res.data?.addXP.data.level.point} Easter Bomb XP`,
            {
              position: "bottom-center",
              style: {
                backgroundColor: "#7628D0",
                color: "white",
              },
            }
          );
          localStorage.removeItem("easterBombClicked");
        }
      });
    }
  }, [bombXp]);

  if (loading) return <Loader />; // Todo: Loading page here

  if (!user)
    return (
      <div className="flex flex-col text-center space-y-3 items-center justify-center h-screen bg-gradient-to-b from-primary-300 to-primary-500">
        {/* Todo: Any graphic to fill space */}
        <div className="flex z-10 justify-center items-center h-96 mt-8">
          <Image
            src={"/assets/png/gamer.png"}
            alt="404"
            width={400}
            height={400}
          />
        </div>
        <h1 className="bodyFont lg:text-xl text-lg text-white -translate-y-10">
          Hey there! You need to login to view your profile page.
        </h1>
        <Link href="/login" className="-translate-y-5">
          <Button intent={"primary"}>Login / Register</Button>
        </Link>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-b from-primary-300 to-primary-500">
        <h1 className="text-2xl font-bold text-white">
          Something went wrong. Please try again later.
        </h1>
      </div>
    ); // Error page here

  return (
    <main
      ref={containerRef}
      className="bodyFont bg-gradient-to-b from-primary-300 to-primary-500 px-5 sm:px-7 lg:px-10"
    >
      <div className="flex lg:flex-row flex-col-reverse py-[5rem] lg:pt-[6rem] min-h-screen gap-5">
        <div className="lg:w-[66.66%] w-full overflow-auto border border-primary-200/80 rounded-xl h-screen">
          <UserEvents userId={user?.id!} />
        </div>

        <div className="col-span-1 rounded-xl h-screen">
          <ProfileInfo user={user} />
        </div>
      </div>
    </main>
  );
};

export default Profile;
