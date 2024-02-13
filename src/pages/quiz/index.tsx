import Dashboard from "@/src/components/layout/dashboard";
import AttemptQuiz from "@/src/components/pages/event/AttemptQuiz";
import AttemptQuiz2 from "@/src/components/pages/event/AttemptQuiz2";

export default function Quiz() {
  return (
    <div className="min-h-screen overflow-x-hidden overflow-y-auto bg-gradient-to-b from-primary-600 to-primary-500 text-gray-100  pt-24 sm:p-10 sm:pt-20 bodyFont px-4">
        <AttemptQuiz2 id={3} teamId="" />
    </div>
  );
}
