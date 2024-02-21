import {
  CreateFtibSubmissionDocument,
  CreateMcqSubmissionDocument,
  GetFitbSubmissionByTeamIdDocument,
  GetMcqSubmissionByTeamIdDocument,
  GetQuestionByIdDocument,
  GetQuestionIdsDocument,
  GetQuizDataByEventRoundDocument,
  GetTimerDocument,
} from "@/src/generated/generated";
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Button from "../../button";
import Spinner from "../../spinner";

export default function AttemptQuiz({
  eventId,
  roundId,
  teamId,
}: {
  eventId: number;
  roundId: number;
  teamId: string;
}) {
  const {
    data: QuestionIds,
    loading: loadingIds,
    error: getIdsError,
  } = useQuery(GetQuestionIdsDocument, {
    variables: {
      eventId,
      roundId,
      password: sessionStorage.getItem("quizPassword") as string,
      teamId: Number(teamId),
    },
  });

  const [questionId, setQuestionId] = useState<string>("");
  const [fitbValue, setSetFitbValue] = useState<string>("");
  const [questionNo, setQuestionNo] = useState<number>(1);
  const [optionId, setOptionId] = useState<string[]>([]);

  useEffect(() => {
    setQuestionId(
      (QuestionIds?.getQuizDataByEventRound.__typename ===
        "QueryGetQuizDataByEventRoundSuccess" &&
        QuestionIds?.getQuizDataByEventRound?.data?.questions &&
        QuestionIds.getQuizDataByEventRound.data?.questions[0]?.id) ||
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
    {
      data: mcqSubmitData,
      loading: loadingMCQSubmission,
      error: MCQSubmissionError,
    },
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
    {
      data: fitbSubmitData,
      loading: loadingFitbSubmission,
      error: FitbSubmissionErrorj,
    },
  ] = useMutation(CreateFtibSubmissionDocument, {
    variables: {
      questionId: questionId,
      value: fitbValue,
      teamId,
    },
    refetchQueries: [GetFitbSubmissionByTeamIdDocument],
  });

  useEffect(() => {
    if (
      QuestionIds?.getQuizDataByEventRound.__typename ===
        "QueryGetQuizDataByEventRoundSuccess" &&
      QuestionIds.getQuizDataByEventRound.data?.questions &&
      questionNo < QuestionIds.getQuizDataByEventRound.data?.questions?.length
    )
      document.getElementById("q" + (questionNo + 1))?.click();
    else {
      //submit
    }
  }, [mcqSubmitData, fitbSubmitData]);

  const handleNext = () => {
    if (
      question?.getQuestionById.__typename === "QueryGetQuestionByIdSuccess" &&
      (question.getQuestionById.data.questionType === "MCQ" ||
        question.getQuestionById.data.questionType === "MMCQ")
    )
      createOrUpdateMcqSubmission().catch((err) => {
        console.log(err);
        //error toast
      });
    else if (
      question?.getQuestionById.__typename === "QueryGetQuestionByIdSuccess" &&
      question.getQuestionById.data.questionType === "FITB"
    )
      createOrUpdateFitbSubmission().catch((err) => {
        console.log(err);
        //error toast
      });
  };

  if (
    loadingQuestion ||
    loadingIds ||
    loadingMCQSub ||
    loadingFITBSub ||
    loadingMCQSubmission ||
    loadingFitbSubmission
  )
    return (
      <div
        style={{ pointerEvents: "all" }}
        className="fixed w-full h-full top-0 left-0 z-[9999]"
      >
        <div className="relative w-full h-full">
          <div className="absolute w-40 h-40 rounded-xl bg-slate-500/50 top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
            <Spinner className="text-pink-600" />
          </div>
        </div>
      </div>
    );
  else
    return (
      <>
        {/* Quiz Title */}
        <div className="flex gap-4 items-center">
          <h1 className="text-3xl md:text-4xl md:py-2 font-semibold">
            Quiz Title
          </h1>
          <h1 className="text-sm font-semibold w-fit rounded-2xl border font-gilroy border-primary-200/70 bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-30 outline-none p-1 px-4">
            {QuizTimeData?.getTimer?.__typename ===
              "SubscriptionGetTimerSuccess" &&
              QuizTimeData.getTimer.data.remainingTime}
            mins
          </h1>
        </div>
        <div className="flex flex-row justify-center container">
          {question?.getQuestionById.__typename ===
            "QueryGetQuestionByIdSuccess" && (
            <div className="flex flex-col  text-white mt-4 min-w-[85%]">
              {/* Quiz Question */}
              <div className="border border-primary-200/70 text-gray-300 md:w-[85%]  font-gilroy font-semibold p-4 px-4 rounded-3xl bg-primary-700">
                {question?.getQuestionById?.data?.question}
                {/* Quiz Image */}
                {question?.getQuestionById?.data?.image && (
                  <Image
                    src={question?.getQuestionById?.data?.image}
                    alt="question"
                    height="100"
                    width="175"
                    className="border border-primary-200/70 mt-4"
                  />
                )}
              </div>
              {/* FITB or MMCQ or MCQ */}
              <div className="mx-4">
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
                    className="text-base font-medium w-60 rounded-2xl border font-gilroy border-primary-200/70 bg-primary-800 bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-30 outline-none p-2 px-4 my-12"
                  />
                ) : question.getQuestionById.data.questionType === "MMCQ" ? (
                  question.getQuestionById.data.options.map((option) => {
                    return (
                      <div
                        className="p-4 my-4 md:my-6 border font-semibold font-gilroy border-primary-200/40 rounded-full bg-primary-600 hover:bg-primary-700 md:w-[60%] w-full space-x-4 cursor-pointer"
                        key={option.id}
                      >
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
                        <label htmlFor={option.id}>
                          {option.value.startsWith(
                            "https://res.cloudinary.com"
                          ) ? (
                            <Image
                              src={option.value}
                              alt="optionImage"
                              height={100}
                              width={100}
                            />
                          ) : (
                            option.value
                          )}
                        </label>
                      </div>
                    );
                  })
                ) : (
                  question.getQuestionById.data.options.map((option) => {
                    return (
                      <div
                        className="p-4 my-4 md:my-6 border font-semibold font-gilroy border-primary-200/40 rounded-full bg-primary-600 hover:bg-primary-700 md:w-[60%] w-full space-x-4 cursor-pointer"
                        key={option.id}
                      >
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
                        <label htmlFor={option.id}>
                          {option.value.startsWith(
                            "https://res.cloudinary.com"
                          ) ? (
                            <Image
                              src={option.value}
                              alt="optionImage"
                              height={100}
                              width={100}
                            />
                          ) : (
                            option.value
                          )}
                        </label>
                      </div>
                    );
                  })
                )}
              </div>
              {/* Next or Submit */}
              <Button
                onClick={() => handleNext()}
                size={"small"}
                intent={"primary"}
                className="w-fit"
              >
                {QuestionIds?.getQuizDataByEventRound.__typename ===
                  "QueryGetQuizDataByEventRoundSuccess" &&
                QuestionIds.getQuizDataByEventRound.data.questions &&
                QuestionIds.getQuizDataByEventRound.data?.questions?.length >
                  questionNo
                  ? "Next"
                  : "Submit"}
              </Button>
            </div>
          )}

          <div className=" p-3 border rounded-2xl h-fit border-primary-200/70 text-gray-300 bg-gradient-to-b from-primary-600 to-primary-700 hidden md:flex w-[40%]">
            {
              // question pallet
              QuestionIds?.getQuizDataByEventRound.__typename ===
                "QueryGetQuizDataByEventRoundSuccess" &&
                QuestionIds.getQuizDataByEventRound.data.questions?.map(
                  (question, index) => (
                    <button
                      onClick={() => {
                        setQuestionId(question.id);
                        setQuestionNo(index + 1);
                      }}
                      id={"q" + (index + 1).toString()}
                      data-questionId={question.id}
                      key={question.id}
                      className={`p-2 border border-primary-200/70 bg-gradient-to-b from-primary-800 to-primary-700 rounded m-2 hover:bg-purple-200 hover:scale-105 ${
                        question.id === questionId && " hover:bg-primary-700"
                      } `}
                    >
                      {index + 1}
                    </button>
                  )
                )
            }
          </div>
        </div>
      </>
    );
}
