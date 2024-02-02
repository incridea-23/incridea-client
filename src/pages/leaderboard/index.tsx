"use client";
import Spinner from "@/src/components/spinner";
import { GetXpLeaderboardDocument } from "@/src/generated/generated";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { idToPid } from "@/src/utils/id";
import Image from "next/image";
import { NextPage } from "next";
import styles from "@/src/components/event/styles.module.css"


const LeaderBoard : NextPage = () => {
    interface UserTotalPoints {
        [userId: string]: {
            levelPoints: number;
            name: string;
            count: number;
        }
      }
    const{
        data: Leaderboard,
        loading: leaderboardLoading,
    }  = useQuery(GetXpLeaderboardDocument,{})

    const [sortedLeaderboard, setSortedLeaderboard] = useState< {
        levelPoints: number;
        name: string;
        userId: string;
        count: number;
    }[]>([]);

    useEffect(() => {
        if(Leaderboard?.getXpLeaderboard.__typename === "QueryGetXpLeaderboardSuccess"){
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
                    count: 1
                };
            }
          });
        // Convert userTotalPoints to an array of objects
        const userTotalPointsArray = Object.entries(userTotalPoints).map(([userId, data]) => ({
            userId,
            ...data,
        }));
  
        // Sort the array in descending order based on total points
        userTotalPointsArray.sort((a, b) => b.levelPoints - a.levelPoints);
  
        // Limit to the top 100 entries
        const top15Users = userTotalPointsArray.slice(0, 15);
                setSortedLeaderboard(top15Users);
            }
          
    }, [Leaderboard]);

    const getColor = (i: number) => {
        if(i === 1){
            return "bg-gradient-to-b from-amber-400 to-yellow-700"
        }else if(i === 2){
            return "bg-gradient-to-b from-slate-500 to-slate-700"
        }
        else if(i === 3){
            return "bg-gradient-to-b from-amber-700 to-amber-900"
        }
        else{
            return "bg-gradient-to-r from-slate-900 to-slate-700"
        }
    }
    let isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    return (
        <div className={`black-ops`} style={{ willChange: "transform",overflowX:"hidden" }}>
            {sortedLeaderboard.length > 0 && 
            <div className={`${styles.container} overflow-y-hidden`}>
                {Array.from({ length: 30 }).map((_, i) => (
                    <div key={i} className={`${styles.confetti}`}></div>
                ))}
            </div>}
            <div className=" bg-gradient-to-bl from-black to-slate-900 min-h-screen relative">
                <div className=" bg-gradient-to-bl bg-white min-h-screen relative py-32">
                    <h1 className={`text-white text-5xl md:text-5xl text-center black-ops`}>
                        XP Leaderboard
                    </h1>
                    <h3 className="my-6 mx-2 md:mx-0 text-white text-2xl md:text-3xl text-center black-ops">
                        Embark on an XP Quest: Uncover Hidden Easter Eggs and Level Up Your Experience!
                    </h3>
                    <div className="black-ops flex mb-2 md:mx-36 mx-5 mt-10 md:mt-7 rounded-lg bg-white text-gray-300 bg-opacity-20 backdrop-filter backdrop-blur-lg bg-clip-padding rounded-t-lg p-1 items-center justify-evenly text-sm md:text-2xl  h-20">
                        <h1 className="basis-1/4 text-center">Position</h1>
                        <h1 className="basis-1/4 text-center">Player Id</h1>
                        <h1 className="basis-1/4 text-center">Player Name</h1>
                        <h1 className="basis-1/4 text-center">Xp Gained</h1>
                    </div>
                    {leaderboardLoading && (
                    <div className="flex mt-10 justify-center items-center">
                        <Spinner className='text-gray-300' />
                    </div>
                    )}
                    <div className='md:mx-36 mx-5 text-white text-center flex flex-col gap-2 bodyFont'>
                        {sortedLeaderboard.map((user,i) => (
                            <div key={user.userId}
                            className={`${getColor(i+1)} shadow-2xl rounded-lg flex flex-row items-center justify-center h-16 `}>
                                <h1 className="basis-1/4 flex gap-1 justify-center items-center text-center text-base md:text-xl">
                                    {i+1}.
                                    <Image
                                        src={i+1 === 1 ? `/assets/png/level3.png` : i+1 === 2 ? `/assets/png/level2.png` : i+1 === 3 ? `/assets/png/level1.png` : "/assets/png/level4.png"}
                                        width={isMobile ? 25 : 50}
                                        height={isMobile ? 25 : 50}
                                        alt="medal"
                                        className="text-5xl bg-transparent z-30 w-14 md:w-auto"
                                    />
                                    {/* <div className="realtive grow">
                                        <Image
                                            src={`/assets/png/XP.webp`}
                                            width={isMobile ? 15 : 35}
                                            height={isMobile ? 15 : 35}
                                            alt="medal"
                                            className="text-5xl bg-transparent z-30 w-14 md:w-auto"
                                        />
                                        <span className="absolute">{user.count}</span>
                                    </div> */}
                                </h1>
                                <h1 className="basis-1/4 flex justify-center text-center text-base md:text-xl font-semibold">{idToPid(user.userId)}</h1>
                                <h1 className="basis-1/4 flex justify-center text-center text-base md:text-xl font-semibold capitalize">{user.name}</h1>
                                <h1 className="basis-1/4 flex flex-row justify-center items-center text-center font-semibold text-base md:text-xl">
                                    {user.levelPoints}
                                    <Image
                                        src={`/assets/png/trophy.png`}
                                        width={isMobile ? 25 : 50}
                                        height={isMobile ? 25 : 50}
                                        alt="medal"
                                        className="text-5xl bg-transparent w-14 md:w-auto"
                                    />
                                </h1>
                            </div>
                        ))}
                        {
                            sortedLeaderboard.length === 0 && !leaderboardLoading &&
                            <div className="flex justify-center items-center">
                                <span className='text-gray-300 text-xl'>
                                    The XP leaderboard is currently as empty as a blank canvas, waiting for the vibrant colors of your achievements to fill it up! Embark on your journey, complete challenges, and earn XP to climb to the top
                                </span>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeaderBoard;