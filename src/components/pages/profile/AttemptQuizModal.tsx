import { FC, FormEventHandler, useRef, useState } from "react";
import {
  EventByOrganizerQuery,
  GetQuizByRoundEventDocument,
} from "@/src/generated/generated";
import { CreateQuizDocument } from "@/src/generated/generated";
import Button from "@/src/components/button";
import { MdQuiz } from "react-icons/md";
import Modal from "@/src/components/modal";
import useWindowSize from "@/src/hooks/useWindowSize";
import { useMutation, useQuery } from "@apollo/client";
import createToast from "@/src/components/toast";
import Spinner from "../../spinner";

const AttemptQuizModal: FC<{
  roundNo: number;
  eventId: number;
}> = ({ roundNo, eventId }) => {
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");
  const windowSize = useWindowSize();
  
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const {
    data: attemptQuiz,
    loading: quizLoading,
    error: quizError,
  } = useQuery(GetQuizByRoundEventDocument, {
    variables: {
      eventId: eventId,
      roundNo: roundNo,
    },
  });

  const handleQuiz = () => {
    let promise = attemptQuiz({
      variables: {
        eventId: eventId.toString(),
        roundId: roundNo.toString(),
        password: quizPassword,
      },
    }).then((res) => {
      if (res.data?.createQuiz.__typename !== "MutationCreateQuizSuccess") {
        if (res.data?.createQuiz.__typename !== undefined) {
          createToast(
            Promise.reject(res.data?.createQuiz.message),
            res.data?.createQuiz.message
          );
        }
        return Promise.reject("Quiz creation failed");
      }
    });
    createToast(promise, "Creating quiz...");
  };

  if (quizLoading) {
    return (
      <Spinner />
    );
  }
  return (
    <>
      <Button
        onClick={() => setShowModal(true)}
        intent="primary"
        size={"small"}
        className="text-xs"
      >
        <MdQuiz className="text-lg" />
        Attempt Quiz
      </Button>

      <Modal
        title={`Enter the Quiz`}
        showModal={showModal}
        onClose={handleCloseModal}
        size={windowSize?.width && windowSize?.width < 600 ? "medium" : "md"}
      >
        <div className="flex flex-col items-center justify-center my-6 gap-2">
         
          <div className="flex flex-col items-center w-full gap-4 mx-3">
            <p className="w-full text-center text-xl font-semibold">Enter the Quiz Password</p>
            <input
              type="password"
              id="name"
              className=" border text-sm rounded-lg   block w-8/12 p-2.5 bg-gray-600 border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 ring-gray-500"
              placeholder="Enter the password..."
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
          </div>
          <Button
            size={"small"}
            className="mt-2 self-center"
            onClick={() => handleQuiz()}
          >
            Enter Quiz
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default AttemptQuizModal;
