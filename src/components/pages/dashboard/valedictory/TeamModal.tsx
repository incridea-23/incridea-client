import { FC } from "react";
import { useQuery } from "@apollo/client";
import { TeamDetailsDocument } from "@/src/generated/generated";
import Spinner from "@/src/components/spinner";
import { idToPid } from "@/src/utils/id";

const TeamModal: FC<{
  teamId: string;
}> = ({ teamId }) => {
  const { data: teamDeatils, loading: teamDeatilsLoading } = useQuery(
    TeamDetailsDocument,
    {
      variables: {
        id: teamId,
      },
    }
  );
  return (
    <div className="flex flex-col m-3 justify-center">
      <div className="hidden md:flex flex-row justify-evenly p-2 bg-gray-600 rounded-lg mb-2 w-full">
        <span className="text-lg font-bold basis-1/4 text-center">PID</span>
        <span className="text-lg font-bold basis-1/4 text-center">Name</span>
        <span className="text-lg font-bold basis-1/4 text-center">Email</span>
        <span className="text-lg font-bold basis-1/5 text-center">Phone</span>
        <span className="text-lg font-bold basis-1/5 text-center">College</span>
      </div>
      <div className="md:h-64 md:max-h-72 h-96 overflow-y-auto">
        {teamDeatilsLoading && <Spinner />}
        {teamDeatils?.teamDetails.__typename === "QueryTeamDetailsSuccess"
          ? teamDeatils.teamDetails.data.members?.map((member) => (
              <div
                key={member.user.id}
                className="flex md:flex-row flex-col border md:text-lg text-base border-gray-600 rounded-lg mb-2 p-2 md:justify-center justify-start">
                <span className="md:text-base font-bold w-full md:w-1/5 mb-2 md:mb-0 justify-center text-center">
                  {idToPid(member.user.id)}
                </span>
                <span className="md:text-base font-bold w-full md:w-1/5 mb-2 md:mb-0 justify-center text-center">
                  {member.user.name}
                </span>
                <span
                  className="md:text-base font-bold w-full md:w-1/5 mb-2 md:mb-0 justify-center text-center"
                  style={{ wordBreak: "break-all" }}>
                  {member.user.email}
                </span>
                <span className="md:text-base font-bold w-full md:w-1/5 mb-2 md:mb-0 justify-center text-center">
                  {member.user.phoneNumber}
                </span>
                <span className="md:text-base font-bold w-full md:w-1/5 mb-2 md:mb-0 justify-center text-center">
                  {member.user.college?.name}
                </span>
              </div>
            ))
          : "No members found"}
          {teamDeatils?.teamDetails.__typename === "QueryTeamDetailsSuccess" && teamDeatils.teamDetails.data.members?.length === 0 && <div className="text-center">No members found</div>}
      </div>
    </div>
  );
};

export default TeamModal;
