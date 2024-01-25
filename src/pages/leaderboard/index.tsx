import Spinner from "@/src/components/spinner";
import { GetXpLeaderboardDocument } from "@/src/generated/generated";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { User,Level,QueryGetXpLeaderboardSuccess,Xp } from "@/src/generated/generated";
import { idToPid } from "@/src/utils/id";


const leaderBoard = () => {
    interface UserTotalPoints {
        [userId: string]: {
            levelPoints: number;
            name: string;
        }
      }
    const{
        data: Leaderboard,
        loading: leaderboardLoading,
    }  = useQuery(GetXpLeaderboardDocument,{})
    useEffect(() => {
        console.log(leaderboardLoading)
        console.log(Leaderboard?.getXpLeaderboard)
    },[leaderboardLoading])

    const [sortedLeaderboard, setSortedLeaderboard] = useState< {
        levelPoints: number;
        name: string;
        userId: string;
    }[]>([]);

    useEffect(() => {
        if(Leaderboard?.getXpLeaderboard.__typename === "QueryGetXpLeaderboardSuccess"){
          const userTotalPoints: UserTotalPoints = {};
          
          Leaderboard?.getXpLeaderboard.data.forEach((item) => {
            const userId: string = item.user.id;
            const levelPoints: number = item.level.point;
            const userName: string = item.user.name;
          
            // Check if the user ID is already in the userTotalPoints object
            if (userTotalPoints[userId]) {
              // If yes, add the level points to the existing total
                userTotalPoints[userId].levelPoints += levelPoints;
            } else {
              // If no, create a new entry for the user ID
                userTotalPoints[userId] = {
                    levelPoints,
                    name: userName
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
        const top100Users = userTotalPointsArray.slice(0, 100);
        console.log(top100Users)
                setSortedLeaderboard(userTotalPointsArray);
            }
          
    }, [Leaderboard]);

    return (
        <div className="overflow-x-hidden" style={{ willChange: "transform" }}>
            <div className=" bg-gradient-to-bl from-black to-slate-900 min-h-screen relative pt-32">
                <h1 className="text-white glitch text-4xl md:text-5xl text-center font-bold">
                    XP Leaderboard
                </h1>
                <div className="flex md:mx-36 mx-5 mt-10 md:mt-7 bg-white text-gray-300 bg-opacity-20 backdrop-filter backdrop-blur-lg bg-clip-padding rounded-t-lg p-1 items-center justify-evenly text-sm md:text-lg font-bold h-20">
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
                <div className='md:mx-36 mx-5 text-white text-center'>
                    {sortedLeaderboard.map((user,i) => (
                        <div key={user.userId}
                        className={`bg-white/10 md:rounded-none rounded-lg flex flex-row items-center justify-center h-16 border-b-[1px] border-b-red-50 `}>
                            <h1 className="basis-1/4 flex justify-center text-center text-sm md:text-lg">{i+1}</h1>
                            <h1 className="basis-1/4 flex justify-center text-center text-sm md:text-lg">{idToPid(user.userId)}</h1>
                            <h1 className="basis-1/4 flex justify-center text-center text-sm md:text-lg">{user.name}</h1>
                            <h1 className="basis-1/4 flex justify-center text-center text-sm md:text-lg">{user.levelPoints}</h1>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default leaderBoard;