import Spinner from "@/src/components/spinner";
import { GetXpLeaderboardDocument } from "@/src/generated/generated";
import { useQuery } from "@apollo/client";


const leaderBoard = () => {
    const{
        data: Leaderboard,
        loading: leaderboardLoading,
    }  = useQuery(GetXpLeaderboardDocument, {
        fetchPolicy: "cache-and-network",
    })
    return (
        <div className="overflow-x-hidden" style={{ willChange: "transform" }}>
            <div className=" bg-gradient-to-bl from-black to-slate-900 min-h-screen relative pt-32">
                <h1 className="text-white glitch text-5xl text-center font-bold">
                    XP Leaderboard
                </h1>
                <div className="flex md:mx-36 mt-7 bg-white text-gray-300 bg-opacity-20 backdrop-filter backdrop-blur-lg bg-clip-padding rounded-t-lg p-1 items-center justify-evenly text-lg font-bold h-20">
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
            </div>
        </div>
    )
}

export default leaderBoard;