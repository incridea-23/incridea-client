import { Dialog, Transition } from "@headlessui/react";
import { FC, Fragment, useRef, useState } from "react";
import { EventByOrganizerQuery } from "@/src/generated/generated";
import { IoClose } from "react-icons/io5";
import RoundsSidebar from "./RoundsSidebar";
import Button from "@/src/components/button";
import { AiFillSetting } from "react-icons/ai";
import { MdQuiz } from "react-icons/md";

const CreateQuizModal: FC<{
        rounds: EventByOrganizerQuery["eventByOrganizer"][0]["rounds"],
        eventId: string,
        eventType: string,
}> = () => {
    const [isOpen, setIsOpen] = useState(false);

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

    const closeModal = () => {
        setIsOpen(false);
    };

    const openModal = () => {
        setIsOpen(true);
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
      <Button onClick={openModal} intent="secondary" size={"small"} className="text-xs">
        <MdQuiz className="text-lg" />
        Create Quiz
      </Button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-gray-700/70 text-gray-100 backdrop-blur-xl text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="div"
                    className="flex justify-between items-center md:p-6 p-5">
                    <h3 className="text-lg font-medium leading-6 text-white">
                       Create Quiz
                    </h3>
                    <button
                      className="hover:text-white text-gray-400 transition-colors"
                      onClick={closeModal}>
                      <IoClose size="1.4rem" />
                    </button>
                  </Dialog.Title>
                  <div className="flex flex-col items-start w-full mx-4 mb-12">
                  <div className="flex flex-col items-start w-full mx-3">
                            <p className="m-2">Quiz Name</p>
                            <input
                                type="text" 
                                id="name" 
                                className=" border text-sm rounded-lg  block w-11/12 p-2.5 bg-gray-600 border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 ring-gray-500" 
                                placeholder="Quiz name..." 
                               
                                value=""
                                required
                            />
                        </div>  
                        <div className="flex flex-col items-start w-full mx-3">
                            <p className="m-2">Quiz Description</p>
                            <input
                                type="text" 
                                id="name" 
                                className=" border text-sm rounded-lg   block w-11/12 p-2.5 bg-gray-600 border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 ring-gray-500" 
                                placeholder="Quiz description..." 
                                value=""
                                required
                            />
                        </div>  
                        <div className="flex flex-col items-start w-full mx-3">
                            <p className="m-2">Create Password</p>
                            <input
                                type="password" 
                                id="name" 
                                className=" border text-sm rounded-lg   block w-11/12 p-2.5 bg-gray-600 border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 ring-gray-500" 
                                placeholder="enter the password..." 
                                value=""
                                required
                            />
                        </div> 
                        <div className="flex flex-col items-start w-full mx-3">
                            <p className="m-2">Quiz Duration</p>
                            <input
                                type="text" 
                                id="name" 
                                className=" border text-sm rounded-lg   block w-11/12 p-2.5 bg-gray-600 border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 ring-gray-500" 
                                placeholder="Quiz duration..." 
                                value=""
                                required
                            />
                        </div> 
                        <div className="flex flex-col items-start w-full mx-3">
              <p  className="m-2">
                From Date
              </p>
              <input
                required
                type="datetime-local"
                id="checkInTime"
                className="w-full mt-1 p-1 bg-inherit border-b border-gray-400 dark:[color-scheme:dark]"
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
            <div className="flex flex-col items-start w-full mx-3">
              <p  className="m-2">
                To Date
              </p>
              <input
                ref={checkOutTimeRef}
                required
                type="datetime-local"
                id="checkOutTime"
                className="w-full mt-1 p-1 bg-inherit border-b border-gray-400 dark:[color-scheme:dark]"
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
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default CreateQuizModal;
