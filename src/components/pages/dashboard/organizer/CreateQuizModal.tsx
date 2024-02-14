import { FC, useRef, useState } from "react";
import { EventByOrganizerQuery } from "@/src/generated/generated";
import { CreateQuizDocument } from "@/src/generated/generated";
import Button from "@/src/components/button";
import { MdQuiz } from "react-icons/md";
import Modal from "@/src/components/modal";

const CreateQuizModal: FC<{
        rounds: EventByOrganizerQuery["eventByOrganizer"][0]["rounds"],
        eventId: string,
        eventType: string,
}> = () => {
    const [showModal, setShowModal] = useState(false);
    const [quizName, setQuizName] = useState("");
    const [quizDescription, setQuizDescription] = useState("");
    const [quizPassword, setQuizPassword] = useState("");
    const [quizDuration, setQuizDuration] = useState("");

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
    
      const endTimeRef = useRef<HTMLInputElement>(null);

      const handleCloseModal = () => {
        setShowModal(false);
      };

    const [quiz, setQuiz] = useState({
        name: "",
        description: "",
        password: "",
        duration: "",
        startTime: new Date(2024, 2, 22, 9, 30).toString(),
        endTime: new Date(2024, 2, 24, 22, 30).toString(),
        id: "",
      });
    
  return (
    <>
      <Button onClick={()=>setShowModal(true)} intent="secondary" size={"small"} className="text-xs">
        <MdQuiz className="text-lg" />
        Create Quiz
      </Button>

      <Modal title={`Create Quiz`} showModal={showModal}
        onClose={handleCloseModal}
        size={'md'}>
                  <div className="flex flex-col items-center justify-center w-full mx-4 mb-4">
                  <div className="flex flex-col items-center w-full mx-3">
                            <p className="m-2 w-full">Quiz Name</p>
                            <input
                                type="text" 
                                id="name" 
                                className=" border text-sm rounded-lg  block w-11/12 p-2.5 bg-gray-600 border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 ring-gray-500" 
                                placeholder="Quiz name..." 
                               
                                onChange={(e) => {
                                  setQuizName(e.target.value);
                                }}
                                value={quizName}
                                required
                            />
                        </div>  
                        <div className="flex flex-col items-center w-full mx-3">
                            <p className="m-2 w-full">Quiz Description</p>
                            <input
                                type="text" 
                                id="name" 
                                className=" border text-sm rounded-lg   block w-11/12 p-2.5 bg-gray-600 border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 ring-gray-500" 
                                placeholder="Quiz description..." 
                                onChange={(e) => {
                                  setQuizDescription(e.target.value);
                                }}
                                value={quizDescription}
                                
                            />
                        </div>  
                        <div className="flex flex-col items-center w-full mx-3">
                            <p className="m-2 w-full">Create Password</p>
                            <input
                                type="password" 
                                id="name" 
                                className=" border text-sm rounded-lg   block w-11/12 p-2.5 bg-gray-600 border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 ring-gray-500" 
                                placeholder="Enter the password..." 
                                value={quizPassword}
                                onChange={(e) => {
                                  setQuizPassword(e.target.value);
                                }}
                                required
                            />
                        </div> 
                        <div className="flex flex-col items-center w-full mx-3">
                            <p className="m-2 w-full">Quiz Duration</p>
                            <input
                                type="text" 
                                id="name" 
                                className=" border text-sm rounded-lg   block w-11/12 p-2.5 bg-gray-600 border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 ring-gray-500" 
                                placeholder="Quiz duration..." 
                                value={quizDuration}
                                onChange={(e) => {
                                  setQuizDuration(e.target.value);
                                }}
                                required
                            />
                        </div> 
                        <div className="flex flex-col items-center w-full mx-3">
              <p  className="m-2 w-full">
                Start Date-Time
              </p>
              <input
                required
                type="datetime-local"
                id="startTime"
                className=" border text-sm rounded-lg   block w-11/12 p-2.5 bg-gray-600 border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 ring-gray-500"
                value={toISOStringWithTimezone(
                  new Date(quiz.startTime)
                ).slice(0, 16)}
                onChange={(e) => {
                  if (endTimeRef.current)
                  endTimeRef.current.min = e.target.value;
                  setQuiz((prevValue) => {
                    return {
                      ...prevValue,
                      startTime: e.target.value.toString(),
                    };
                  });
                }}
              />
            </div>
            <div className="flex flex-col items-center w-full mx-3">
              <p  className="m-2 w-full">
              End Date-Time
              </p>
              <input
                ref={endTimeRef}
                required
                type="datetime-local"
                id="endTime"
                className=" border text-sm rounded-lg   block w-11/12 p-2.5 bg-gray-600 border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 ring-gray-500"
                value={toISOStringWithTimezone(
                  new Date(quiz.endTime)
                ).slice(0, 16)}
                onChange={(e) =>
                  setQuiz((prevValue) => {
                    return {
                      ...prevValue,
                      endTime: e.target.value.toString(),
                    };
                  })
                }
              />
            </div>
            <Button size={"small"} className="mt-2 self-center" >Create Quiz</Button>
                  </div>
                  </Modal>
    </>
  );
};

export default CreateQuizModal;
