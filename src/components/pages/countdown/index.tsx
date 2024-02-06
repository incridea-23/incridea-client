import GlitchAnimation from "../../animation/glitchAnimation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useAuth } from "@/src/hooks/useAuth";
import { useQuery } from "@apollo/client";
import { GetUserXpDocument } from "@/src/generated/generated";
import { VikingHell } from "@/src/pages/_app";
import Link from "next/link";
import { baseImageUrl } from "@/src/utils/url";
export default function CountDown() {
  const { user, loading, status } = useAuth();
  const [userId, setUserId] = useState<string>("");
  const [userAuthStatus, setUserAuthStatus] = useState<boolean>(false);
  const { data: userXp, loading: userXpLoading } = useQuery(
    GetUserXpDocument,
    {}
  );

  useEffect(() => {
    console.log("user", user);
    if (user && user.role !== "USER") {
      setUserId(user.id);
      setUserAuthStatus(true);
    } else {
      setUserAuthStatus(false);
    }
  }, [user]);

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
  const [time, setTime] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  function getRemaingTime() {
    const eventDate = new Date("2024-02-22T09:00:00").getTime();
    const currentDate = new Date().getTime();
    const remainingTime = eventDate - currentDate;

    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    setTime({ days, hours, minutes, seconds });
  }

  useEffect(() => {
    getRemaingTime();
    const interval = setInterval(() => {
      getRemaingTime();
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="flex fixed w-full z-50 justify-between md:p-4 p-2 items-start">
      {userAuthStatus ? (
        <div>
          <Link href="/leaderboard">
            <h3
              className={` text-lg md:text-2xl text-white tracking-widest z-10`}
            >
              <div className="flex flex-row space-x-2 items-center titleFont">
                <Image
                  src={`${baseImageUrl}/assets/png/XP.png`}
                  width={100}
                  height={100}
                  alt="map"
                  className="sm:h-12 sm:w-10 h-10 w-8"
                />

                <p className="font-sans relative">{xp}</p>
              </div>
            </h3>
          </Link>
        </div>
      ) : (
        <div></div>
      )}

      <div className="flex flex-col text-white justify-center items-center">
        <GlitchAnimation
          text={`${time.days < 10 ? `0${time.days}` : time.days} :${" "}
            ${time.hours < 10 ? `0${time.hours}` : time.hours} :${" "}
            ${time.minutes < 10 ? `0${time.minutes}` : time.minutes} :${" "}
            ${time.seconds < 10 ? `0${time.seconds}` : time.seconds}`}
        />
      </div>
    </div>
  );
}
