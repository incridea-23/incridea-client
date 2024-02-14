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
    
      const checkOutTimeRef = useRef<HTMLInputElement>(null);

      const handleCloseModal = () => {
        setShowModal(false);
      };

    const [quiz, setQuiz] = useState({
        hotelId: 1,
        gender: "",
        checkInTime: new Date(2024, 2, 22, 9, 30).toString(),
        checkOutTime: new Date(2024, 2, 24, 22, 30).toString(),
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
                               
                            />
                        </div>  
                        <div className="flex flex-col items-center w-full mx-3">
                            <p className="m-2 w-full">Create Password</p>
                            <input
                                type="password" 
                                id="name" 
                                className=" border text-sm rounded-lg   block w-11/12 p-2.5 bg-gray-600 border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 ring-gray-500" 
                                placeholder="Enter the password..." 
                                value=""
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
                                value=""
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
                id="checkInTime"
                className=" border text-sm rounded-lg   block w-11/12 p-2.5 bg-gray-600 border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 ring-gray-500"
                value={toISOStringWithTimezone(
                  new Date(quiz.checkInTime)
                ).slice(0, 16)}
                onChange={(e) => {
                  if (checkOutTimeRef.current)
                    checkOutTimeRef.current.min = e.target.value;
                  setQuiz((prevValue) => {
                    return {
                      ...prevValue,
                      checkInTime: e.target.value.toString(),
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
                ref={checkOutTimeRef}
                required
                type="datetime-local"
                id="checkOutTime"
                className=" border text-sm rounded-lg   block w-11/12 p-2.5 bg-gray-600 border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 ring-gray-500"
                value={toISOStringWithTimezone(
                  new Date(quiz.checkOutTime)
                ).slice(0, 16)}
                onChange={(e) =>
                  setQuiz((prevValue) => {
                    return {
                      ...prevValue,
                      checkOutTime: e.target.value.toString(),
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
