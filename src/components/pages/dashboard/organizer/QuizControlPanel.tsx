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
      <div className="flex flex-col items-center justify-center gap-4 py-4">
        <h1 className="text-2xl font-bold">Quiz Password</h1>
          <div className="font-bold w-full text-center py-1 rounded-lg bg-slate-600/20 bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-20 outline-none select-all shadow-2xl drop-shadow-lg shadow-black" onClick={()=>
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
        
        </div>
        <hr className="w-full my-4 text-slate-600"/>
        <div className="flex flex-col gap-4 justify-center items-center">
        <h1 className="text-2xl font-bold text-center">Add Duration</h1>
        <div className="flex flex-row gap-4 font-semibold">
          <button className="border-2 border-slate-400 rounded-lg p-2 hover:bg-slate-800">+2</button>
          <button className="border-2 border-slate-400 rounded-lg p-2 hover:bg-slate-800">+5</button>
          <button className="border-2 border-slate-400 rounded-lg p-2 hover:bg-slate-800">+10</button>
          <button className="border-2 border-slate-400 rounded-lg p-2 hover:bg-slate-800">+20</button>
          <button className="border-2 border-slate-400 rounded-lg p-2 hover:bg-slate-800">+30</button>
        </div>
        <div className="flex flex-col justify-center items-center gap-4">
        <h1 className="text-2xl font-bold text-center">Duration Left</h1>
        <div className="font-bold w-20 text-center py-2 rounded-lg bg-slate-600/20 bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-20 outline-none select-all shadow-2xl drop-shadow-lg shadow-black">{quizData?.getQuizByRoundEvent?.__typename=="QueryGetQuizByRoundEventSuccess"?quizData?.getQuizByRoundEvent?.data[0]?.duration ?? "":""}</div>
        </div>
        <hr className="w-full my-4 text-slate-600"/>
        </div>
        <div className="flex flex-col gap-4 py-4">
        <h1 className="text-2xl font-bold text-center py-2">Edit Quiz</h1>
         <div className="flex row gap-8">
          <Button size={"small"}>Edit Quiz</Button> 
          <Button size={"small"}>Delete Quiz</Button> 
         </div>
        </div>
         <hr className="w-full my-2 text-slate-600"/>
         <div className="flex flex-col justify-center items-center gap-4">
         <h1 className="text-2xl font-bold text-center py-2">Start/Resume Quiz</h1>
         <div className="flex row gap-8">
          <Button size={"small"}>Start Quiz</Button> 
         </div>
         </div>
    </div>
  </Modal>
  </>
  )
}

export default QuizControlPanel