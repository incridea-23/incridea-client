import {
  AccommodationRequestsByUserDocument,
  GetUserXpDocument,
  GetXpLeaderboardDocument,
  User,
} from "@/src/generated/generated";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import { FC, useEffect, useState } from "react";
import { FaSignOutAlt, FaAward } from "react-icons/fa";
import { MdAddAPhoto, MdOutlineEmail, MdPhone } from "react-icons/md";
import { idToPid } from "@/src/utils/id";
import Button from "../../button";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import Spinner from "../../spinner";
import ViewUserAccommodation from "./viewUserAccommodation";
import AvatarModal from "./avatarModal";
import { RiHotelBedLine } from "react-icons/ri";

const ProfileInfo: FC<{
  user: User | null | undefined;
}> = ({ user }) => {
  const router = useRouter();
  let {
    data: dataAccommodation,
    loading: loadingAccommodation,
    error: errorAccommodation,
  } = useQuery(AccommodationRequestsByUserDocument);

  const [showModal, setShowModal] = useState(false);
  const [avatarModal, setAvatarModal] = useState(false);

  if (user?.role === "USER") {
    router.push("/register");
  }

  const [level, setLevel] = useState(0);
  const [xp, setXp] = useState(0);
  const [userId, setUser] = useState("");
  const [rank, setRank] = useState(0);
  const [progress, setProgress] = useState(0);
  const [needMore, setNeedMore] = useState(0);

  const userXp = useQuery(GetUserXpDocument, {});

  useEffect(() => {
    if (
      userXp?.data &&
      userXp.data.getUserXp.__typename === "QueryGetUserXpSuccess"
    ) {
      const totalXp = userXp.data.getUserXp?.data?.reduce(
        (acc, curr) => acc + curr.level.point,
        0
      );

      // Calculate the level thresholds dynamically
      const levels = userXp.data.getUserXp?.data?.length || 0;
      const newLevelThresholds = Array.from(
        { length: levels + 1 },
        (_, i) => (i + 1) * 10
      );

      // Calculate the user's current level based on the thresholds
      let level = 0;
      let totalPoints = 0;
      for (let i = 0; i < newLevelThresholds.length; i++) {
        if (totalXp >= totalPoints + newLevelThresholds[i]) {
          level++;
          totalPoints += newLevelThresholds[i];
        } else {
          break;
        }
      }

      setLevel(level);
      setXp(totalXp);
      setUser(userXp.data.getUserXp?.data[0]?.user.id);
      const xpNext = newLevelThresholds.reduce((acc, curr) => acc + curr, 0);
      setNeedMore(xpNext - totalXp);
      setProgress(100 - ((xpNext - totalXp) / xpNext) * 100);
    }
  }, [userXp.data]);

  interface UserTotalPoints {
    [userId: string]: {
      levelPoints: number;
      name: string;
      count: number;
    };
  }
  const { data: Leaderboard, loading: leaderboardLoading } = useQuery(
    GetXpLeaderboardDocument,
    {}
  );

  const [sortedLeaderboard, setSortedLeaderboard] = useState<
    {
      levelPoints: number;
      name: string;
      userId: string;
      count: number;
    }[]
  >([]);

  useEffect(() => {
    if (
      Leaderboard?.getXpLeaderboard.__typename ===
      "QueryGetXpLeaderboardSuccess"
    ) {
      const userTotalPoints: UserTotalPoints = {};

      Leaderboard?.getXpLeaderboard.data.forEach((item) => {
        const userId: string = item.user.id;
        const levelPoints: number = item.level.point;
        const userName: string = item.user.name;
        const levelCount: number = 1;

        // Check if the user ID is already in the userTotalPoints object
        if (userTotalPoints[userId]) {
          // If yes, add the level points to the existing total
          userTotalPoints[userId].levelPoints += levelPoints;
          userTotalPoints[userId].count += levelCount;
        } else {
          // If no, create a new entry for the user ID
          userTotalPoints[userId] = {
            levelPoints,
            name: userName,
            count: 1,
          };
        }
      });
      // Convert userTotalPoints to an array of objects
      const userTotalPointsArray = Object.entries(userTotalPoints).map(
        ([userId, data]) => ({
          userId,
          ...data,
        })
      );

      // Sort the array in descending order based on total points
      userTotalPointsArray.sort((a, b) => b.levelPoints - a.levelPoints);
      console.log(userTotalPointsArray);
      // get current user's rank
      const currentUserRank = userTotalPointsArray.findIndex(
        (user) => user.userId === userId
      );
      console.log(currentUserRank);
      setRank(currentUserRank + 1);
    }
  }, [Leaderboard, userId]);

  return (
    <div className="bg-primary-500 text-white flex flex-col justify-between items-center h-full px-4 md:px-8 py-4 md:py-8 border border-primary-200/80 rounded-xl">
      <div className="flex gap-5 flex-col">
        <div
          className="justify-center items-start flex"
          onClick={() => setAvatarModal(true)}
        >
          <AvatarModal showModal={avatarModal} setShowModal={setAvatarModal} />
          <div className="relative group">
            <Image
              src={user?.profileImage || ""}
              width={180}
              height={180}
              alt="avatar"
              className="p-3 rounded-xl border hover:border-4 transition-all duration-300 cursor-pointer hover:border-primary-100/50 border-primary-100/30"
            />
            <div className="absolute bottom-3 right-3 p-2 bg-secondary-700 rounded-full scale-0 group-hover:scale-100 transition-all duration-300">
              <MdAddAPhoto />
            </div>
          </div>
        </div>
        <div className="flex flex-col text-center h-full items-center justify-center space-y-1">
          <span className="text-2xl lg:text-3xl font-bold">{user?.name}</span>
          <span className="bodyFont">{user?.college?.name || "-"}</span>
        </div>
        <div className="relative mb-5 pt-1">
          <div className="mb-4 flex rounded-full bg-gray-100 text-xs h-3">
            <div
              style={{ width: `${progress}%` }}
              className="bg-secondary-700 border border-white rounded-full"
            ></div>
          </div>
          <div className="flex justify-between items-center text-lg">
            <div className="flex flex-row space-x-2 items-center ">
              <Image
                src={"/assets/png/XP.webp"}
                width={20}
                height={20}
                alt="map"
              />
              <p>{xp} XP</p>
            </div>

            <div className="flex flex-row space-x-1 items-center">
              <p>Level {level}</p>
              <Image
                src={"/assets/png/level.png"}
                width={25}
                height={25}
                alt="map"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="text-xs md:text-lg flex flex-row items-center justify-between space-x-2 border border-primary-200/30 rounded-full w-full px-5 py-1">
        <div className="flex items-center gap-2">
          <Image
            src={"/assets/png/trophy.png"}
            width={100}
            height={100}
            alt="map"
            className="sm:h-16 sm:w-16 h-12 w-12"
          />

          <div>
            <p className="">Leaderboard</p>
            <p className="text-secondary-600 font-bold">Rank {rank}</p>
          </div>
        </div>

        <p className="text-center">
          You need <br />
          <span className="text-secondary-600 font-bold">{needMore} XP</span> to
          level up!
        </p>
      </div>

      <div className="flex sm:flex-row flex-col-reverse gap-5 justify-between w-full items-center border rounded-xl p-3 mt-3 border-primary-200/30">
        <section className="flex flex-col gap-y-4 sm:items-start items-center justify-center w-full">
          <div className="flex w-full justify-between h-full items-center ">
            <QRCodeSVG
              value={idToPid(user?.id!)}
              size={100}
              bgColor="transparent"
              color="#ffffff"
              fgColor="#ffffff"
            />
            <div>
              <span className={`text-[#fff] sm:text-xl text-md`}>
                {idToPid(user?.id!)}
              </span>
              <span className="flex gap-x-2 items-center">
                <MdOutlineEmail />
                {user?.email}
              </span>
              <span className="flex gap-x-2 items-center justify-center sm:justify-start">
                <MdPhone />
                {user?.phoneNumber}
              </span>
            </div>
          </div>

          <div className="space-y-2 w-full">
            <div className="flex items-center justify-between">
              <ViewUserAccommodation
                showModal={showModal}
                setShowModal={setShowModal}
              />
              {loadingAccommodation ? (
                <Button
                  size={"large"}
                  onClick={() => setShowModal(true)}
                  className="w-max !rounded-full bodyFont !tracking-normal !text-sm justify-center"
                >
                  <Spinner size={"small"} className="text-[#dd5c6e]" />
                </Button>
              ) : dataAccommodation?.accommodationRequestsByUser[0]?.status ? (
                <Button
                  intent={"info"}
                  size={"large"}
                  onClick={() => setShowModal(true)}
                  className="w-max !rounded-full bodyFont !tracking-normal !text-sm justify-center"
                >
                  <RiHotelBedLine className="inline-block mr-1" />
                  View Request
                </Button>
              ) : (
                <Button
                  intent={"success"}
                  size={"large"}
                  onClick={() => router.push("/accommodation")}
                  className="!rounded-full bodyFont !tracking-normal !text-sm justify-center"
                >
                  <RiHotelBedLine className="inline-block mr-1" />
                  Accommodation
                </Button>
              )}
              <Button
                onClick={() => router.push("/leaderboard")}
                className="!rounded-full bodyFont !tracking-normal !text-sm justify-center"
                intent={"info"}
                size={"large"}
              >
                <FaAward className="inline-block mr-1" />
                Leaderboard
              </Button>
            </div>
            <Button
              onClick={() => signOut()}
              className="w-full !rounded-full bodyFont !tracking-normal !text-sm justify-center"
              intent={"danger"}
              size={"large"}
            >
              <FaSignOutAlt className="inline-block mr-1" />
              Sign Out
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProfileInfo;
