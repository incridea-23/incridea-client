import { WinnersByEventDocument } from "@/src/generated/generated";
import { useQuery } from "@apollo/client";
import ViewTeamModal from "./ViewTeamModal";
import { idToTeamId, teamIdToId } from "@/src/utils/id";

const ViewWinners = ({ eventId }: { eventId: string }) => {
  const { data: winners, loading: winnersLoading } = useQuery(
    WinnersByEventDocument,
    {
      variables: {
        eventId: eventId!,
      },
      skip: !eventId,
    }
  );

  return (
    <div>
      {winnersLoading && <div>Loading...</div>}
      {!winners && <div>No winners yet</div>}
      <>
        <div className={`flex items-center p-2 px-5 bg-white/10 rounded-lg mb-2`}>
          <div className="flex flex-row gap-5 w-full">
            <div className={`basis-1/4 text-white/80`}>Name</div>
            <div className={`basis-1/4 text-white/80`}>ID</div>
            <div className={`basis-1/4 text-white/80`}>Type</div>
            <div className={`basis-1/4 text-white/80`}>View Team</div>
          </div>
        </div>
        <div className="flex gap-2 flex-col">
          {winners?.winnersByEvent.__typename ===
            "QueryWinnersByEventSuccess" &&
            winners?.winnersByEvent.data.map((winner) => {
              return (
                <div
                  key={winner.id}
                  className={`flex items-center p-2 px-5 bg-white/10 rounded-lg`}
                >
                  <div className="flex flex-row gap-5 w-full">
                    <div className={`basis-1/4 text-white/80`}>
                      {winner.team.name}
                    </div>
                    <div className={`basis-1/4 text-white/80`}>
                      {idToTeamId(winner.team.id)}
                    </div>
                    <div className={`basis-1/4 text-white/80`}>
                      {winner.type}
                    </div>
                    <div className={`basis-1/4 text-white/80`}>
                      <ViewTeamModal
                        teamId={winner.team.id}
                        teamName={winner.team.name}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </>
    </div>
  );
};

export default ViewWinners;
