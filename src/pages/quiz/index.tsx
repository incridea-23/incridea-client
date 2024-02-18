import AttemptQuiz from "@/src/components/pages/event/AttemptQuiz2";
import Page404 from "../404";
import { useRouter } from "next/router";

export default function Quiz() {
  const params = useRouter();

  const { eventId, teamId, roundId } = params.query;
  if (eventId && teamId && roundId) {
    return (
      <div className="min-h-screen overflow-x-hidden overflow-y-auto bg-gradient-to-b from-primary-600 to-primary-500 text-gray-100  pt-24 sm:p-10 sm:pt-20 bodyFont px-4">
        <AttemptQuiz
          eventId={Number(eventId)}
          teamId={teamId as string}
          roundId={Number(roundId)}
        />
      </div>
    );
  } else {
    return (
      <div className="min-h-screen overflow-x-hidden overflow-y-auto bg-gradient-to-b from-primary-600 to-primary-500 text-gray-100  pt-24 sm:p-10 sm:pt-20 bodyFont px-4">
        <Page404 />
      </div>
    );
  }
}
