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
import Image from "next/image";
  import { use, useEffect, useRef, useState } from "react";
import Button from "../../button";
import Spinner from "../../spinner";
  
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
    if(loadingQuestion || loadingIds || loadingMCQSub || loadingFITBSub || loadingMCQSubmission || loadingFitbSubmission)
    return <Spinner />
    else
    return (
      <>
        <h1 className="text-3xl md:text-4xl md:py-4 font-semibold">Quiz Title</h1>
        <div className="flex flex-row justify-center">
        {question?.getQuestionById.__typename ===
          "QueryGetQuestionByIdSuccess" && (
          <div className="flex flex-col  text-white mt-4">
            <div className="border border-primary-200/70 text-gray-300 md:w-[85%] w-full font-gilroy font-semibold p-4 px-4 rounded-3xl bg-primary-700">{question?.getQuestionById?.data?.question} Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae porro, debitis aperiam molestias nesciunt nobis rem molestiae repellat maxime iste sint atque, praesentium necessitatibus minus. Expedita est autem soluta eius libero adipisci voluptatem, accusantium quaerat animi dignissimos unde cupiditate magni eos labore deserunt voluptates perferendis?
            </div> 
            {question?.getQuestionById?.data?.image && <Image src={question?.getQuestionById?.data?.image} alt="question" height="100" width="100" className="border border-primary-200/70"/>}
            <div className="mx-4">
                {question.getQuestionById.__typename ===
                  "QueryGetQuestionByIdSuccess" &&
                 question.getQuestionById.data.questionType === "FITB" ? (
                  <input
                    type="text"
                    placeholder="Enter your answer here..."
                    className="text-base font-medium w-60 rounded-2xl border font-gilroy border-primary-200/70 bg-primary-800 bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-30 outline-none p-2 px-4 my-12"
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
                     <div className="p-4 my-4 md:my-6 border font-semibold font-gilroy border-primary-200/40 rounded-full bg-primary-600 hover:bg-primary-700 md:w-[60%] w-full space-x-4 cursor-pointer" key={option.id}
                     >
                      <input
                        className="cursor-pointer"
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
            <Button onClick={() => handleNext(questionNo + 1)} size={"small"} intent={"primary"} className="w-fit">
                {QuestionIds?.getQuizByEvent.__typename ===
                  "QueryGetQuizByEventSuccess" &&
                QuestionIds.getQuizByEvent.data[0].questions &&
                QuestionIds.getQuizByEvent.data[0]?.questions?.length >
                  questionNo
                  ? "Next"
                  : "Submit"}
              </Button>
              
          </div>
          
        )}
         <div className=" p-3 border rounded-2xl h-fit border-primary-200/70 text-gray-300 bg-gradient-to-b from-primary-600 to-primary-700 hidden md:flex w-[40%]">
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
                        className={`p-2 border border-primary-200/70 bg-gradient-to-b from-primary-800 to-primary-700 rounded m-2 hover:bg-purple-200 hover:scale-105 ${
                          question.id === questionId && " hover:bg-primary-700"
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
      </>
    );
  }
  