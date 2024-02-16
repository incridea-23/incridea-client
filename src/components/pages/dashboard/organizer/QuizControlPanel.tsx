import Button from "@/src/components/button";
import Modal from "@/src/components/modal";
import useWindowSize from "@/src/hooks/useWindowSize";
import { useQuery } from "@apollo/client";
import { GetQuizByRoundEventDocument } from "@/src/generated/generated";
import { FC, useState } from "react";
import { MdQuiz } from "react-icons/md";
import createToast from "@/src/components/toast";
import toast from "react-hot-toast";


const QuizControlPanel:FC<{
    // quizId:number
    roundNo: number;
    eventId: number;
  }> = ({
    // quizId,
    roundNo,eventId}) => {

    const [showModal, setShowModal] = useState(false);
    const windowSize = useWindowSize();

    const {data:quizData,loading:quizLoading,error:quizError} = useQuery(GetQuizByRoundEventDocument,{
      variables:{
        eventId: eventId,
      roundNo: roundNo
      }
    })
  

    const toISOStringWithTimezone = (date: Date) => {
        const tzOffset = -date.getTimezoneOffset();
        const diff = tzOffset >= 0 ? "+" : "-";
        const pad = (n: number) => `${Math.floor(Math.abs(n))}`.padStart(2, "0");
        return (
          date.getFullYear() +
          "-" +
          pad(date.getMonth()) +
          "-" +
          pad(date.getDate()) +
          "T" +
          pad(date.getHours()) +
          ":" +
          pad(date.getMinutes()) +
          ":" +
          pad(date.getSeconds()) +
          diff +
          pad(tzOffset / 60) +
          pad(tzOffset % 60)
        );
      };

      const handleCloseModal = () => {
        setShowModal(false);
      };

  return (
    <> <Button
    onClick={() => setShowModal(true)}
    intent="secondary"
    size={"small"}
    className="text-xs"
  >
    <MdQuiz className="text-lg" />
    View Quiz
  </Button>
    <Modal
    title={`Quiz Control Panel`}
    showModal={showModal}
    onClose={handleCloseModal}
    size={windowSize?.width && windowSize?.width < 600 ? "medium" : "md"}
  >
    <div className="flex flex-col items-center justify-center mx-4 mb-2 py-2">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Quiz Password</h1>
          <div className="font-semibold w-full text-center py-2 rounded-3xl bg-slate-600/20 bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-20 outline-none selection:select-all " onClick={()=>
           navigator.clipboard.writeText(quizData?.getQuizByRoundEvent?.__typename=="QueryGetQuizByRoundEventSuccess"? quizData?.getQuizByRoundEvent?.data[0]?.password ?? "":"")
            .then(() => {
              toast.success(
                `Text Copied to Clipboard`,
                {
                  position: "bottom-center",
                  style: {
                    backgroundColor: "#7628D0",
                    color: "white",
                  },
                }
              )
            })
         }>{quizData?.getQuizByRoundEvent?.__typename=="QueryGetQuizByRoundEventSuccess"?quizData?.getQuizByRoundEvent?.data[0]?.password ?? "":""}</div>
        <div></div>
        </div>
           <Button
        size={"small"}
        className="mt-2 self-center"
      >
        Update Quiz
      </Button>
    </div>
  </Modal>
  </>
  )
}

export default QuizControlPanel