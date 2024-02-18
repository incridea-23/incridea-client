import {
  CreateFtibSubmissionDocument,
  CreateMcqSubmissionDocument,
  GetFitbSubmissionByTeamIdDocument,
  GetMcqSubmissionByTeamIdDocument,
  GetQuestionByIdDocument,
  GetQuestionIdsDocument,
  GetQuizByEventDocument,
  GetTimerDocument,
} from "@/src/generated/generated";
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { m } from "framer-motion";
import { use, useEffect, useRef, useState } from "react";

export default function AttemptQuiz({
  eventId,
  teamId,
}: {
  eventId: number;
  teamId: string;
}) {
  const {
    data: QuestionIds,
    loading: loadingIds,
    error: getIdsError,
  } = useQuery(GetQuestionIdsDocument, { variables: { eventId } });

  const [questionId, setQuestionId] = useState<string>("");
  const [fitbValue, setSetFitbValue] = useState<string>("");
  const [questionNo, setQuestionNo] = useState<number>(1);
  const [optionId, setOptionId] = useState<string[]>([]);

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

  const { data: QuizTimeData, loading: LoadingQuizTimer } = useSubscription(
    GetTimerDocument,
    {
      variables: {
        eventId,
      },
    }
  );

  useEffect(() => {
    setOptionId(
      (McqSub?.getMCQSubmissionByTeamId.__typename ===
        "QueryGetMCQSubmissionByTeamIdSuccess" &&
        McqSub.getMCQSubmissionByTeamId.data.map((o) => o.OptionId)) ||
        []
    );
  }, [McqSub]);
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
    refetchQueries: [
      {
        query: GetMcqSubmissionByTeamIdDocument,
        variables: { questionId: questionId, teamId: teamId },
      },
    ],
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
    refetchQueries: [GetFitbSubmissionByTeamIdDocument],
  });

  const handleNext = () => {
    if (
      question?.getQuestionById.__typename === "QueryGetQuestionByIdSuccess" &&
      (question.getQuestionById.data.questionType === "MCQ" ||
        question.getQuestionById.data.questionType === "MMCQ")
    )
      createOrUpdateMcqSubmission()
        .then((res) => {
          if (
            QuestionIds?.getQuizByEvent.__typename ===
              "QueryGetQuizByEventSuccess" &&
            QuestionIds.getQuizByEvent.data[0].questions
          )
            if (
              questionNo < QuestionIds.getQuizByEvent.data[0]?.questions?.length
            ) {
              document.getElementById("q" + (questionNo + 1))?.click();
            }
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
          if (
            QuestionIds?.getQuizByEvent.__typename ===
              "QueryGetQuizByEventSuccess" &&
            QuestionIds.getQuizByEvent.data[0].questions
          )
            if (
              questionNo < QuestionIds.getQuizByEvent.data[0]?.questions?.length
            ) {
              document.getElementById("q" + (questionNo + 1))?.click();
            }
          //click next question
        })
        .catch((err) => {
          console.log(err);
          //error toast
        });
  };

  return (
    <>
      {loadingIds || loadingQuestion || loadingMCQSub || loadingFITBSub ? (
        <div>Loading...</div>
      ) : (
        question?.getQuestionById.__typename ===
          "QueryGetQuestionByIdSuccess" && (
          <div className="min-h-[50vh] max-h-[50vh] overflow-y-scroll self-center justify-between px-9 w-screen flex">
            <h1>
              {QuizTimeData?.getTimer?.__typename ===
                "SubscriptionGetTimerSuccess" &&
                QuizTimeData.getTimer.data.remainingTime}
              mins
            </h1>
            {/* question side */}
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
                  ) : question.getQuestionById.data.questionType === "MMCQ" ? (
                    question.getQuestionById.data.options.map((option) => {
                      return (
                        <div className="p-3 m-3 border rounded" key={option.id}>
                          <input
                            type={"checkbox"}
                            onChange={(e) => {
                              if (e.target.checked)
                                return setOptionId((prev) => {
                                  return prev.includes(option.id)
                                    ? prev
                                    : [...prev, option.id];
                                });
                              setOptionId((prev) =>
                                prev.filter((o) => o !== option.id)
                              );
                              console.log(e.target.checked, optionId);
                            }}
                            id={option.id}
                            name={option.id}
                            defaultChecked={
                              McqSub?.getMCQSubmissionByTeamId.__typename ===
                                "QueryGetMCQSubmissionByTeamIdSuccess" &&
                              McqSub.getMCQSubmissionByTeamId.data.find(
                                (o) => o.OptionId === option.id
                              )
                                ? true
                                : false
                            }
                          />
                          <label htmlFor={option.id}>{option.value}</label>
                        </div>
                      );
                    })
                  ) : (
                    question.getQuestionById.data.options.map((option) => {
                      return (
                        <div className="p-3 m-3 border rounded" key={option.id}>
                          <input
                            onChange={(e) => setOptionId([e.target.value])}
                            type={"radio"}
                            value={option.id}
                            name={eventId + "MCQ"}
                            defaultChecked={
                              McqSub?.getMCQSubmissionByTeamId.__typename ===
                                "QueryGetMCQSubmissionByTeamIdSuccess" &&
                              McqSub.getMCQSubmissionByTeamId.data.findIndex(
                                (o) => o.OptionId === option.id
                              ) !== -1
                                ? true
                                : false
                            }
                          />
                          <label htmlFor={option.id}>{option.value}</label>
                        </div>
                      );
                    })
                  )}
                </div>
                <button onClick={handleNext}>
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
                      <button
                        id={"q" + (index + 1).toString()}
                        key={question.id}
                        onClick={() => {
                          setQuestionId(question.id);
                          setQuestionNo(index + 1);
                        }}
                        className={`p-2 bg-white rounded m-2 hover:bg-gray-200 hover:scale-105 ${
                          question.id === questionId && "bg-red-900"
                        } `}
                      >
                        {index + 1}
                      </button>
                    )
                  )
              }
            </div>
          </div>
        )
      )}
    </>
  );
}
