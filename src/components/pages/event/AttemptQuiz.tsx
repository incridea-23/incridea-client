import {
  CreateFtibSubmissionDocument,
  CreateMcqSubmissionDocument,
  GetFitbSubmissionByTeamIdDocument,
  GetMcqSubmissionByTeamIdDocument,
  GetQuestionByIdDocument,
  GetQuestionIdsDocument,
  GetQuizByEventDocument,
} from "@/src/generated/generated";
import { useMutation, useQuery } from "@apollo/client";
import { use, useEffect, useRef, useState } from "react";

export default function AttemptQuiz({
  id,
  teamId,
}: {
  id: number;
  teamId: string;
}) {
  id = 3;
  teamId = "30";
  const {
    data: QuestionIds,
    loading: loadingIds,
    error: getIdsError,
  } = useQuery(GetQuestionIdsDocument, { variables: { eventId: id } });

  const [questionId, setQuestionId] = useState<string>("");
  const [fitbValue, setSetFitbValue] = useState<string>("");
  const [questionNo, setQuestionNo] = useState<number>(1);
  const [optionId, setOptionId] = useState<string>("");

  useEffect(() => {
    setQuestionId(
      (QuestionIds?.getQuizByEvent.__typename ===
        "QueryGetQuizByEventSuccess" &&
        QuestionIds?.getQuizByEvent?.data[0]?.questions &&
        QuestionIds.getQuizByEvent.data[0]?.questions[0]?.id) ||
        ""
    );
  }, [QuestionIds]);

  const {
    data: question,
    loading: loadingQuestion,
    error: getQuestionError,
  } = useQuery(GetQuestionByIdDocument, {
    variables: {
      questionId: questionId,
    },
  });

  const {
    data: McqSub,
    loading: loadingMCQSub,
    error: getMcqSubError,
  } = useQuery(GetMcqSubmissionByTeamIdDocument, {
    variables: {
      questionId: questionId,
      teamId: teamId,
    },
  });

  const {
    data: FITBSub,
    loading: loadingFITBSub,
    error: getFITBSubError,
  } = useQuery(GetFitbSubmissionByTeamIdDocument, {
    variables: {
      questionId: questionId,
      teamId: teamId,
    },
  });

  const [
    createOrUpdateMcqSubmission,
    { loading: loadingMCQSubmission, error: MCQSubmissionErrorj },
  ] = useMutation(CreateMcqSubmissionDocument, {
    variables: {
      questionId: questionId,
      optionId: optionId,
      teamId,
    },
  });

  const [
    createOrUpdateFitbSubmission,
    { loading: loadingFitbSubmission, error: FitbSubmissionErrorj },
  ] = useMutation(CreateFtibSubmissionDocument, {
    variables: {
      questionId: questionId,
      value: fitbValue,
      teamId,
    },
  });

  const handleNext = (nextQue: number) => {
    // handle next question
    if (
      question?.getQuestionById.__typename === "QueryGetQuestionByIdSuccess" &&
      question.getQuestionById.data.questionType === "MCQ"
    )
      createOrUpdateMcqSubmission()
        .then((res) => {
          if (nextQue === -1) document.getElementById("q" + nextQue)?.click();
          //click next question
        })
        .catch((err) => {
          console.log(err);
          //error toast
        });
    else if (
      question?.getQuestionById.__typename === "QueryGetQuestionByIdSuccess" &&
      question.getQuestionById.data.questionType === "FITB"
    )
      createOrUpdateFitbSubmission()
        .then((res) => {
          if (nextQue === -1) document.getElementById("q" + nextQue)?.click();
          //click next question
        })
        .catch((err) => {
          console.log(err);
          //error toast
        });
  };

  return (
    <>
      {question?.getQuestionById.__typename ===
        "QueryGetQuestionByIdSuccess" && (
        <div className="min-h-[50vh] max-h-[50vh] overflow-y-scroll self-center justify-between px-9 w-screen flex">
          {/* question side */}
          {loadingIds || (loadingQuestion && <p>Loading...</p>)}
          <div className="border rounded min-w-[75%]">
            <div>
              <p>Question:</p>
              <p>{question?.getQuestionById?.data?.question}</p>
              <div>
                {question.getQuestionById.__typename ===
                  "QueryGetQuestionByIdSuccess" &&
                question.getQuestionById.data.questionType === "FITB" ? (
                  <input
                    type="text"
                    onChange={(e) => setSetFitbValue(e.target.value)}
                    defaultValue={
                      FITBSub?.getFITBSubmissionByTeamId.__typename ===
                      "QueryGetFITBSubmissionByTeamIdSuccess"
                        ? FITBSub.getFITBSubmissionByTeamId.data.value
                        : ""
                    }
                  />
                ) : (
                  question.getQuestionById.data.options.map((option) => (
                    <div className="p-3 m-3 border rounded" key={option.id}>
                      <input
                        type={
                          question.getQuestionById.__typename ===
                            "QueryGetQuestionByIdSuccess" &&
                          question.getQuestionById.data.questionType === "MCQ"
                            ? "radio"
                            : "checkbox"
                        }
                        onChange={(e) => {
                          setOptionId(option.id);
                        }}
                        id={option.id}
                        name={option.id}
                        defaultChecked={
                          McqSub?.getMCQSubmissionByTeamId.__typename ===
                            "QueryGetMCQSubmissionByTeamIdSuccess" &&
                          McqSub.getMCQSubmissionByTeamId.data.OptionId ===
                            option.id
                            ? true
                            : false
                        }
                      />
                      <label htmlFor={option.id}>{option.value}</label>
                    </div>
                  ))
                )}
              </div>
              <button onClick={() => handleNext(questionNo + 1)}>
                {QuestionIds?.getQuizByEvent.__typename ===
                  "QueryGetQuizByEventSuccess" &&
                QuestionIds.getQuizByEvent.data[0].questions &&
                QuestionIds.getQuizByEvent.data[0]?.questions?.length >
                  questionNo
                  ? "Next"
                  : "Submit"}
              </button>
            </div>
          </div>

          {/* question pallet */}
          <div className="flex p-3 bg-blue-400 rounded max-w-[50%]">
            {
              // question pallet
              QuestionIds?.getQuizByEvent.__typename ===
                "QueryGetQuizByEventSuccess" &&
                QuestionIds.getQuizByEvent.data[0].questions?.map(
                  (question, index) => (
                    <div
                      id={"q" + (index + 1).toString()}
                      key={question.id}
                      onClick={() => {
                        setQuestionId(question.id);
                        setQuestionNo(index + 1);
                      }}
                    >
                      <button
                        className={`p-2 bg-white rounded m-2 hover:bg-gray-200 hover:scale-105 ${
                          question.id === questionId && "bg-red-900"
                        } `}
                      >
                        {index + 1}
                      </button>
                    </div>
                  )
                )
            }
          </div>
        </div>
      )}
    </>
  );
}
