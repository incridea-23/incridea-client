import Button from "@/src/components/button";
import Spinner from "@/src/components/spinner";
import createToast from "@/src/components/toast";
import {
  DeleteWinnerDocument,
  JudgeGetTeamsByRoundSubscription,
  PromoteToNextRoundDocument,
  WinnersByEventQuery,
} from "@/src/generated/generated";
import { idToPid, idToTeamId } from "@/src/utils/id";
import { useMutation } from "@apollo/client";
import { toast } from "react-hot-toast";
import { AiOutlineClose } from "react-icons/ai";
import ConfirmRoundModal from "./ConfirmRoundModal";

const SelectedTeamList = ({
  teams,
  roundNo,
  finalRound,
  winners,
  winnersLoading,
  eventId,
  eventType,
}: {
  teams: JudgeGetTeamsByRoundSubscription;
  roundNo: number;
  finalRound: boolean;
  winners: WinnersByEventQuery | undefined;
  winnersLoading: boolean;
  eventId: string;
  eventType: string;
}) => {
  const [promote, { loading: promoteLoading }] = useMutation(
    PromoteToNextRoundDocument
  );

  const [deleteWinner, { loading: deleteLoading }] = useMutation(
    DeleteWinnerDocument,
    {
      refetchQueries: ["WinnersByEvent", "RoundByJUdge"],
      awaitRefetchQueries: true,
    }
  );

  const handlePromote = (teamId: string) => {
    const promise = promote({
      variables: {
        teamId,
        roundNo: roundNo.toString(),
        selected: false,
      },
      refetchQueries: ["GetTotalScores"],
      awaitRefetchQueries: true,
    });
    createToast(promise, "Removing team...");
  };

  const teamOrParticipant =
    eventType === "INDIVIDUAL" || eventType === "INDIVIDUAL_MULTIPLE_ENTRY"
      ? "Participant"
      : "Team";

  return (
    <div className="h-full overflow-y-auto">
      <div className="px-4 shadow-sm py-3 mb-2 rounded-t-lg bg-[#35436F] sticky top-0">
        <h1 className="text-2xl font-semibold">Selected Teams</h1>
      </div>

      {!(
        teams.judgeGetTeamsByRound.filter((team) => team.roundNo > roundNo)
          .length === 0
      ) &&
        !finalRound && (
          <p>
            <span className="ml-5 text-white/60">
              These teams are selected to Round {roundNo + 1}
            </span>
          </p>
        )}
      {finalRound && (
        <p>
          <span className="ml-5 text-white/60">
            These teams are selected as Winners, Runners and Second Runners.
          </span>
        </p>
      )}

      <div className="flex px-3 pb-3 flex-col gap-2 mt-3">
        <div className={`flex items-center p-2 px-5 bg-white/10 rounded-lg`}>
          <div className="flex flex-row gap-5 w-full">
            <div
              className={`${
                finalRound ? "basis-1/4" : "basis-1/3"
              } text-white/80`}>
              Team Name
            </div>
            <div
              className={`${
                finalRound ? "basis-1/4" : "basis-1/3"
              } text-white/80`}>
              {teamOrParticipant === "Participant" ? "PID" : "Team ID"}
            </div>
            {finalRound && (
              <div
                className={`${
                  finalRound ? "basis-1/4" : "basis-1/3"
                } text-white/80`}>
                Position
              </div>
            )}
            <div
              className={`${
                finalRound ? "basis-1/4" : "basis-1/3"
              } text-white/80`}>
              Remove
            </div>
          </div>
        </div>

        {!finalRound &&
          teams.judgeGetTeamsByRound.filter((team) => team.roundNo > roundNo)
            .length === 0 && (
            <p className="my-3 mt-5 text-gray-400/70 italic text-center">
              No participants are selected to next round.
            </p>
          )}

        {!finalRound &&
          teams.judgeGetTeamsByRound
            .filter((team) => team.roundNo > roundNo)
            .map((team, index) => (
              <div
                key={index}
                className="flex items-center p-2 px-5 bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-300">
                <div className="flex flex-row gap-5 w-full">
                  <div className="text-white/80 basis-1/3">{team?.name}</div>
                  <div className="text-white/60 basis-1/3">
                    {teamOrParticipant === "Participant"
                      ? idToPid(team?.leaderId?.toString()!)
                      : idToTeamId(team?.id!)}
                  </div>
                  <div className="basis-1/3">
                    <Button
                      onClick={() => {
                        handlePromote(team?.id!);
                      }}
                      disabled={promoteLoading}>
                      <AiOutlineClose />
                    </Button>
                  </div>
                </div>
              </div>
            ))}

        {finalRound && winnersLoading && <Spinner />}
        {finalRound &&
          !winnersLoading &&
          winners?.winnersByEvent.__typename === "QueryWinnersByEventSuccess" &&
          winners.winnersByEvent.data.length === 0 && (
            <p className="my-3 mt-5 text-gray-400/70 italic text-center">
              No winners are selected.
            </p>
          )}
        {finalRound &&
          winners?.winnersByEvent.__typename === "QueryWinnersByEventSuccess" &&
          winners?.winnersByEvent.data.map((winner, index) => (
            <div
              key={index}
              className="flex items-center p-2 px-5 bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-300">
              <div className="flex flex-row gap-5 w-full">
                <div className="text-white/80 basis-1/4">
                  {winner?.team.name}
                </div>
                <div className="text-white/60 basis-1/4">
                  {teamOrParticipant === "Participant"
                    ? idToPid(winner?.team.leaderId?.toString()!)
                    : idToTeamId(winner?.team.id!)}
                </div>
                <div className="text-white/60 basis-1/4">
                  {winner.type
                    .replace(/_/g, " ")
                    .replace(
                      /\b\w+/g,
                      (match) =>
                        match.charAt(0).toUpperCase() +
                        match.slice(1).toLowerCase()
                    )}
                </div>
                <div className="basis-1/4">
                  <Button
                    onClick={() => {
                      let promise = deleteWinner({
                        variables: {
                          id: winner?.id,
                        },
                        refetchQueries: ["GetTotalScores", "WinnersByEvent"],
                        awaitRefetchQueries: true,
                      }).then((data) => {
                        if (data.data?.deleteWinner.__typename === "Error") {
                          toast.error(data.data?.deleteWinner.message, {
                            position: "bottom-center",
                          });
                        }
                      });
                      createToast(promise, "Removing winner...");
                    }}
                    disabled={deleteLoading}>
                    <AiOutlineClose />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        <ConfirmRoundModal
          winners={winners}
          roundNo={roundNo}
          winnersLoading={winnersLoading}
          eventId={eventId}
          finalRound={finalRound}
          selectedTeams={teams}
          solo={teamOrParticipant === "Participant"}
        />
      </div>
    </div>
  );
};

export default SelectedTeamList;
