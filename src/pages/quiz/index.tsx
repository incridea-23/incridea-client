import AttemptQuiz from "@/src/components/pages/event/AttemptQuiz";

export default function Quiz() {
  return (
    <>
      <h1>Quiz</h1>
      <div className="flex justify-evenly min-h-screen self-center">
        <AttemptQuiz id={3} teamId="" />
      </div>
    </>
  );
}
