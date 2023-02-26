import { TeamsByRoundDocument } from "@/src/generated/generated";
import { useQuery } from "@apollo/client/react";
function Teams({ roundNo, eventId }: { roundNo: number; eventId: string }) {
  const { data, loading, error } = useQuery(TeamsByRoundDocument, {
    variables: {
      roundNo,
      eventId,
    },
  });
  if (loading) return <div>Loading...</div>;
  if (!data || data.teamsByRound.length == 0) return <div>No teams</div>;
  return (
    <div>
      {data.teamsByRound.map((team) => (
        <div
          className="bg-gray-600/40 p-3  items-center rounded-lg flex justify-between flex-wrap gap-2"
          key={team.id}>
          <h2 className="text-xl font-semibold"> {team.name}</h2>
          <button className="bg-blue-800/60 p-2 rounded-md ">View</button>
        </div>
      ))}
    </div>
  );
}

export default Teams;
