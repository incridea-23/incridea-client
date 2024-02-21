import Dashboard from "@/src/components/layout/dashboard";
import {
  CreateOptionDocument,
  CreateQuestionDocument,
  DeleteOptionDocument,
  DeleteQuestionDocument,
  GetQuizDataByEventRoundDocument,
  UpdateOptionDocument,
  UpdateQuestionDocument,
} from "@/src/generated/generated";
import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { CiCirclePlus, CiImageOn } from "react-icons/ci";
import { HiOutlineMinusCircle, HiOutlineDuplicate } from "react-icons/hi";
import { MdDeleteOutline } from "react-icons/md";
import { ImRadioUnchecked } from "react-icons/im";
import Button from "@/src/components/button";
import createToast from "@/src/components/toast";
import { useRouter } from "next/router";
import Page404 from "../../404";
import Image from "next/image";
import Spinner from "@/src/components/spinner";
import { MdOutlineDelete } from "react-icons/md";

const Quiz = () => {
  const router = useRouter();
  const { eventId, roundId } = router.query;

  const {
    data: QuizData,
    loading: LoadingQuizData,
    error: QuizDataError,
  } = useQuery(GetQuizDataByEventRoundDocument, {
    variables: {
      eventId: Number(eventId),
      roundId: Number(roundId),
      type: "organizer",
      password: "",
    },
  });

  const [uploading, setUploading] = useState(false);

  const handleUpload = (
    file: File,
    type: "option" | "question",
    id: string
  ) => {
    const formData = new FormData();
    formData.append("image", file);
    // const url = `https://incridea-pai3.onrender.com/${type}/image/upload`;
    const url = `http://localhost:4000/${type}/image/upload`;
    setUploading(true);
    const promise = fetch(url, {
      method: "POST",
      body: formData,
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        type === "option"
          ? setOption((prev) => {
              if (prev)
                return {
                  ...prev,
                  questionId: id,
                  value: res.url,
                };
              setOption({
                questionId: id,
                value: res.url,
                isAnswer: false,
              });
            })
          : setQuestion((prev) => {
              if (prev)
                return {
                  ...prev,
                  image: res.url,
                };
              return prev;
            });
        type === "question" ? createQuestion(id) : saveOption(id);
        setUploading(false);
      })
      .catch((err) => {
        setUploading(false);
      });
    createToast(promise, "Uploading image...");
  };

  type questionsType = {
    __typename?: "Question" | undefined;
    id: string;
    image?: string | null | undefined;
    negativePoint: number;
    point: number;
    question: string;
    questionType: string;
    options: {
      __typename?: "Options" | undefined;
      id: string;
      isAnswer: boolean;
      value: string;
    }[];
  }[];

  const [Questions, setQuestions] = useState<questionsType>([
    {
      id:
        (QuizData?.getQuizDataByEventRound.__typename ===
          "QueryGetQuizDataByEventRoundSuccess" &&
          QuizData.getQuizDataByEventRound.data.id) ||
        "",
      image: "",
      negativePoint: 0,
      point: 0,
      question: "",
      questionType: "",
      options: [],
    },
  ]);
  const [Loading, setLoading] = useState(false);

  const [Question, setQuestion] = useState<{
    question: string;
    questionType: string;
    points: number;
    negativePoint: number;
    image: string;
    quizId: string;
  }>();

  const [Option, setOption] = useState<{
    value: string;
    isAnswer: boolean;
    questionId: string;
  }>();

  const [
    createQuestionMutation,
    { loading: creatingQuestion, error: createQueError },
  ] = useMutation(CreateQuestionDocument, {
    variables: Question,
    refetchQueries: [
      {
        query: GetQuizDataByEventRoundDocument,
        variables: {
          eventId: Number(eventId),
          roundId: Number(roundId),
          type: "organizer",
        },
      },
    ],
  });

  const [updateQuestion, { loading: updatingQuestion, error: updateQueError }] =
    useMutation(UpdateQuestionDocument);

  const [
    deleteQuestionMutation,
    { loading: deletingQuestion, error: deleteQuestionError },
  ] = useMutation(DeleteQuestionDocument);

  const [
    deleteOptionMutation,
    { loading: deletingOption, error: deleteOptionError },
  ] = useMutation(DeleteOptionDocument);

  const [updateOption, { loading: updatingOption, error: updateOptError }] =
    useMutation(UpdateOptionDocument);
  const [createOption, { loading: creatingOption, error: createOptError }] =
    useMutation(CreateOptionDocument, {
      variables: Option,
    });

  useEffect(() => {
    if (
      !LoadingQuizData &&
      QuizData?.getQuizDataByEventRound.__typename ===
        "QueryGetQuizDataByEventRoundSuccess" &&
      QuizData.getQuizDataByEventRound.data.questions
    ) {
      setQuestions(
        (QuizData.getQuizDataByEventRound.data.questions?.length > 0 &&
          QuizData.getQuizDataByEventRound.data.questions) || [
          {
            id: "",
            image: "",
            negativePoint: 0,
            point: 0,
            question: "",
            questionType: "MCQ",
            options: [],
          },
        ]
      );
      if (QuizData.getQuizDataByEventRound.data.questions?.length == 0) {
        setQuestion({
          quizId: QuizData.getQuizDataByEventRound.data.id,
          image: "",
          negativePoint: 0,
          points: 0,
          question: "",
          questionType: "MCQ",
        });
      }
    }
  }, [QuizData]);

  useEffect(() => {
    console.log(Questions);
  }, [Questions]);

  const remove = (questionId: string | null) => {
    if (!questionId)
      return setQuestions((temp) => {
        temp.pop();
        return temp;
      });

    deleteQuestionMutation({
      variables: { id: questionId },
    })
      .then((res) => {
        if (
          res.data?.deleteQuestion.__typename ===
          "MutationDeleteQuestionSuccess"
        ) {
          setLoading(true);
          setQuestions((temp) =>
            temp.filter((question) => question.id !== questionId)
          );
          setLoading(false);
        }
        // show success toast
      })
      .catch((error) => {
        // handle error
      });
  };

  const createQuestion = (questionId: string | null) => {
    if (Question?.question === "") return;

    if (questionId) {
      return updateQuestion({
        variables: {
          id: questionId,
          question: Question?.question,
          questionType: Question?.questionType,
          points: Question?.points,
          negativePoint: Question?.negativePoint,
          image: Question?.image,
        },
      })
        .then((res) => {
          if (
            res.data?.updateQuestion.__typename ===
            "MutationUpdateQuestionSuccess"
          ) {
            return setQuestion(undefined);
            // show success toast
          }
        })
        .catch((error) => {
          // handle error
        });
    }

    createQuestionMutation()
      .then((res) => {
        if (
          res.data?.createQuestion.__typename ===
          "MutationCreateQuestionSuccess"
        ) {
          const newQuestion = res.data.createQuestion.data;
          setQuestions((temp) => [
            ...temp,
            {
              ...temp.pop(),
              id: newQuestion.id,
              image: newQuestion.image,
              negativePoint: newQuestion.negativePoint,
              point: newQuestion.point,
              question: newQuestion.question,
              questionType: newQuestion.questionType,
              options: [],
            },
          ]);
        }
        setQuestion(undefined);
        // show success toast
      })
      .catch((error) => {
        // handle error
      });
  };

  const addQuestion = () => {
    console.log(Question);
    if (!Question) {
      setQuestions((prev) => [
        ...prev,
        {
          id: "",
          image: "",
          negativePoint: 0,
          point: 0,
          question: "",
          questionType: "MCQ",
          options: [],
        },
      ]);

      return setQuestion({
        quizId:
          QuizData?.getQuizDataByEventRound?.__typename ===
          "QueryGetQuizDataByEventRoundSuccess"
            ? QuizData.getQuizDataByEventRound.data.id
            : "",
        image: "",
        negativePoint: 0,
        points: 0,
        question: "",
        questionType: "MCQ",
      });
    }
  };

  const addOption = (questionId: string) => {
    if (!Option) {
      setQuestions((prev) => {
        return prev.map((question) => {
          if (question.id === questionId) {
            return {
              ...question,
              options: [
                ...question.options,
                {
                  id: "",
                  isAnswer: false,
                  value: "",
                },
              ],
            };
          }
          return question;
        });
      });

      return setOption({
        value: "",
        isAnswer: false,
        questionId,
      });
    }
  };

  const saveOption = (optionId: string | null) => {
    if (Option?.value === "") return;
    if (optionId) {
      return updateOption({
        variables: {
          id: optionId,
          value: Option?.value,
          isAnswer: Option?.isAnswer ? true : false,
        },
      })
        .then((res) => {
          if (
            res.data?.updateOption.__typename === "MutationUpdateOptionSuccess"
          ) {
            setOption(undefined);
            // show success toast
          }
        })
        .catch((error) => {
          // handle error
        });
    }
    createOption()
      .then((res) => {
        if (
          res.data?.createOption.__typename === "MutationCreateOptionSuccess"
        ) {
          const data = res.data.createOption.data;
          setQuestions((prev) => {
            return prev.map((question) => {
              if (question.id === Option?.questionId) {
                return {
                  ...question,
                  options: [
                    ...question.options,
                    {
                      ...question.options.pop(),
                      id: data.id,
                      isAnswer: data.isAnswer,
                      value: data.value,
                    },
                  ],
                };
              }
              return question;
              // [op1, ]
            });
          });
          setOption(undefined);
          // show success toast
        }
      })
      .catch((error) => {
        // handle error
      });
  };
  const deleteOption = (id: string) => {
    deleteOptionMutation({
      variables: { id },
    })
      .then((res) => {
        if (
          res.data?.deleteOption.__typename === "MutationDeleteOptionSuccess" &&
          res.data.deleteOption.data
        ) {
          const prev = Questions;
          setQuestions(
            prev.map((question) => {
              if (
                res.data?.deleteOption.__typename ===
                  "MutationDeleteOptionSuccess" &&
                res.data.deleteOption.data &&
                question.id === res.data.deleteOption.data?.questionId
              ) {
                return {
                  ...question,
                  options: question.options.filter(
                    (option) => option.id !== id
                  ),
                };
              }
              return question;
            })
          );
        }
      })
      .catch((error) => {
        // handle error
      });
  };
  if (!eventId || !roundId) return <Page404 />;
  return (
    <>
      <div className="min-h-screen overflow-x-hidden overflow-y-auto bg-gradient-to-b from-primary-600 to-primary-500 text-gray-100  pt-24 sm:p-10 sm:pt-20 bodyFont px-4">
        {(LoadingQuizData ||
          uploading ||
          Loading ||
          creatingQuestion ||
          updatingQuestion ||
          deletingQuestion ||
          deletingOption ||
          updatingOption ||
          creatingOption) && (
          <div
            style={{ pointerEvents: "all" }}
            className="fixed w-full h-full top-0 left-0 z-[9999]"
          >
            <div className="relative w-full h-full">
              <div className="absolute w-40 h-40 rounded-xl bg-slate-500/50 top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
                <Spinner intent="secondary" />
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-row gap-8">
          <input
            className="text-xl font-medium mt-4 w-60 max-w-[60vw] rounded-2xl bg-gray-900/70 bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-30 outline-none p-3 px-4"
            placeholder="Enter quiz title"
            defaultValue={
              QuizData?.getQuizDataByEventRound?.__typename ===
              "QueryGetQuizDataByEventRoundSuccess"
                ? QuizData.getQuizDataByEventRound.data.name?.toString()
                : ""
            }
          />
          <Button
            intent={"success"}
            size={"large"}
            style={{ pointerEvents: "all" }}
            className={`${
              Question !== undefined || Option !== undefined
                ? "cursor-pointer"
                : "cursor-default"
            }`}
            disabled={Question === undefined && Option === undefined}
          >
            SAVE
          </Button>
        </div>
        {!Loading &&
          Questions?.map((question, index) => {
            return (
              <>
                {question.options.findIndex((option) => option.isAnswer) ===
                  -1 && (
                  <div className="text-red-500 p-5">
                    Please choose an answer for the question
                  </div>
                )}
                <div key={index} className="flex flex-col px-4">
                  <div className="flex flex-col md:flex-row py-4 gap-4">
                    <div
                      onBlur={() => {
                        createQuestion(question.id ? question.id : null);
                        document.body.style.pointerEvents = "all";
                      }}
                      onFocus={(e) => {
                        document.body.style.pointerEvents = "none";
                        e.target.style.pointerEvents = "all";
                      }}
                      className="flex flex-col items-start border border-primary-200/70 rounded-3xl bg-primary-700  w-full h-full md:p-4 px-8"
                    >
                      <h1 className="text-xl font-medium mt-6 font-gilroy ">
                        Enter the Question
                      </h1>

                      <div className="flex flex-col md:flex-row list-disc justify-between items-center mt-4 w-full gap-8">
                        <div className="flex flex-col md:flex-row w-full">
                          <input
                            placeholder="Enter the question..."
                            defaultValue={question.question}
                            className="w-full h-20 rounded-3xl px-4 bg-slate-600/20 bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-20 outline-none"
                            type="text"
                            onFocus={(e) => {
                              document.body.style.pointerEvents = "none";
                              e.target.style.pointerEvents = "all";
                            }}
                            onChange={(e) =>
                              setQuestion((prev) => {
                                if (prev)
                                  return { ...prev, question: e.target.value };
                                return {
                                  quizId: "",
                                  image: question.image || "",
                                  negativePoint: question.negativePoint || 0,
                                  points: question.point || 0,
                                  question: e.target.value || "",
                                  questionType: question.questionType,
                                };
                              })
                            }
                          />
                        </div>
                        <div className="flex flex-col md:flex-row items-center gap-8">
                          <div className="flex flex-row md:flex-col gap-8 justify-center items-center">
                            <input
                              key={question.id}
                              defaultValue={question.point}
                              className=" h-12 w-12 text-center rounded-3xl bg-slate-600/20 bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-20 outline-none"
                              type="text"
                              onFocus={(e) => {
                                document.body.style.pointerEvents = "none";
                                e.target.style.pointerEvents = "all";
                              }}
                              onChange={(e) =>
                                setQuestion((prev) => {
                                  if (prev)
                                    return {
                                      ...prev,
                                      points: Number(e.target.value),
                                    };
                                  return {
                                    quizId: "",
                                    image: question.image || "",
                                    negativePoint: question.negativePoint || 0,
                                    points: Number(e.target.value) || 0,
                                    question: question.question || "",
                                    questionType: question.questionType,
                                  };
                                })
                              }
                              name="points"
                            />
                            <label
                              htmlFor="points"
                              className="ms-2 text-sm font-semibold text-white text-center dark:text-gray-300"
                            >
                              Points
                            </label>
                          </div>
                          <div className="flex flex-row md:flex-col gap-8 justify-center items-center">
                            <input
                              defaultValue={question.negativePoint}
                              key={question.id + "negative"}
                              className="h-12 text-center w-12 rounded-3xl px-2 bg-slate-600/20 bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-20 outline-none"
                              type="text"
                              onFocus={(e) => {
                                document.body.style.pointerEvents = "none";
                                e.target.style.pointerEvents = "all";
                              }}
                              onChange={(e) =>
                                setQuestion((prev) => {
                                  if (prev)
                                    return {
                                      ...prev,
                                      negativePoint: Number(e.target.value),
                                    };
                                  return {
                                    quizId: "",
                                    image: question.image || "",
                                    points: question.point || 0,
                                    negativePoint: Number(e.target.value) || 0,
                                    question: question.question || "",
                                    questionType: question.questionType,
                                  };
                                })
                              }
                              name="negativePoints"
                            />
                            <label
                              htmlFor="negativePoints"
                              className="ms-2 text-sm font-semibold text-white text-center dark:text-gray-300"
                            >
                              Negative Points
                            </label>
                          </div>
                          <div>
                            <label className="block mb-2 text-sm text-white">
                              <CiImageOn className="text-3xl mx-8 cursor-pointer" />
                            </label>
                            {question.image &&
                            question.image.startsWith(
                              "https://res.cloudinary.com"
                            ) ? (
                              <>
                                <Image
                                  src={question.image}
                                  alt="questionImage"
                                  height={100}
                                  width={100}
                                />
                                <Button
                                  intent={"danger"}
                                  size={"small"}
                                  onClick={() => {
                                    setQuestion((prev) => {
                                      if (prev)
                                        return {
                                          ...prev,
                                          image: "",
                                        };
                                    });
                                  }}
                                >
                                  <MdOutlineDelete />
                                </Button>
                              </>
                            ) : (
                              <input
                                onFocus={(e) => {
                                  document.body.style.pointerEvents = "none";
                                  e.target.style.pointerEvents = "all";
                                }}
                                required
                                type="file"
                                id="image"
                                className="file:mr-4 file:py-2.5 file:rounded-r-none file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:transition-colors file:cursor-pointer file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 border w-full text-sm rounded-lg block  bg-gray-600 border-gray-600 placeholder-slate-400 text-white focus:outline-none focus:ring-2 ring-gray-500"
                                onChange={(e) => {
                                  setQuestion((prev) => {
                                    if (prev)
                                      return {
                                        ...prev,
                                        image: e.target.value,
                                      };
                                    return {
                                      quizId: "",
                                      image: "",
                                      negativePoint:
                                        question.negativePoint || 0,
                                      points: question.point || 0,
                                      question: question.question || "",
                                      questionType: question.questionType,
                                    };
                                  });
                                  handleUpload(
                                    e.target.files![0],
                                    "question",
                                    question.id
                                  );
                                }}
                              />
                            )}
                          </div>
                          <select
                            name="type"
                            className="border-0 text-sm rounded-lg block  px-8 py-2 bg-slate-700 bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-60 border-gray-900 placeholder-gray-800 text-white focus:outline-none focus:ring-2 ring-gray-500"
                            id=""
                            onFocus={(e) => {
                              document.body.style.pointerEvents = "none";
                              e.target.style.pointerEvents = "all";
                            }}
                            defaultValue={question.questionType}
                            onChange={(e) =>
                              setQuestion((prev) => {
                                if (prev)
                                  return {
                                    ...prev,
                                    questionType: e.target.value,
                                  };
                                return {
                                  quizId: "",
                                  image: question.image || "",
                                  negativePoint: question.negativePoint || 0,
                                  points: question.point || 0,
                                  question: question.question || "",
                                  questionType: e.target.value,
                                };
                              })
                            }
                          >
                            {Array.from(["MCQ", "MMCQ"]).map((type, index) => {
                              return (
                                <option
                                  value={type}
                                  key={index}
                                  defaultChecked={
                                    question.questionType === type
                                  }
                                >
                                  {type}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>

                      <div className="flex flex-col gap-3 mt-4 w-full">
                        {question.options.map((option, index) => {
                          return (
                            <div
                              className="flex flex-col md:flex-row items-center gap-4 border border-white p-5 rounded-md"
                              key={index}
                              onBlur={() =>
                                saveOption(option.id ? option.id : null)
                              }
                            >
                              <div className="flex flex-row items-center justify-center gap-8 w-full">
                                <HiOutlineMinusCircle
                                  onClick={() => deleteOption(option.id)}
                                  className="text-3xl hover:bg-slate-800 hover:rounded-lg text-red-600"
                                />
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
                                  <input
                                    onFocus={(e) => {
                                      document.body.style.pointerEvents =
                                        "none";
                                      e.target.style.pointerEvents = "all";
                                    }}
                                    defaultValue={option.value}
                                    key={option.id}
                                    className="w-full h-12 rounded-3xl px-4 bg-slate-600 bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-20 outline-none"
                                    onChange={(e) =>
                                      setOption((prev) => {
                                        if (prev)
                                          return {
                                            ...prev,
                                            questionId: question.id,
                                            value: e.target.value,
                                          };
                                        setOption({
                                          questionId: question.id,
                                          value: e.target.value,
                                          isAnswer: false,
                                        });
                                      })
                                    }
                                  />
                                )}
                              </div>

                              <div>
                                <label className="block mb-2 text-sm text-white">
                                  <CiImageOn className="text-3xl mx-8 cursor-pointer" />
                                </label>
                                {
                                  <input
                                    required
                                    onFocus={(e) => {
                                      document.body.style.pointerEvents =
                                        "none";
                                      e.target.style.pointerEvents = "all";
                                    }}
                                    type="file"
                                    id="image"
                                    className="file:mr-4 file:py-2.5 file:rounded-r-none file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:transition-colors file:cursor-pointer file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 border w-full text-sm rounded-lg block  bg-gray-600 border-gray-600 placeholder-slate-400 text-white focus:outline-none focus:ring-2 ring-gray-500"
                                    onChange={(e) =>
                                      handleUpload(
                                        e.target.files![0],
                                        "option",
                                        question.id
                                      )
                                    }
                                  />
                                }
                              </div>
                              <div className="flex items-center gap-4">
                                <input
                                  onFocus={(e) => {
                                    document.body.style.pointerEvents = "none";
                                    e.target.style.pointerEvents = "all";
                                  }}
                                  key={option.id}
                                  defaultChecked={option.isAnswer}
                                  type={
                                    question.questionType === "MCQ"
                                      ? "radio"
                                      : "checkbox"
                                  }
                                  value=""
                                  name={
                                    question.questionType === "MCQ"
                                      ? "isAnswer" + question.id
                                      : ""
                                  }
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                  onChange={(e) => {
                                    console.log(e.target.checked);
                                    e.target.checked
                                      ? setOption({
                                          isAnswer: true,
                                          questionId: question.id,
                                          value: option.value,
                                        })
                                      : setOption({
                                          isAnswer: false,
                                          questionId: question.id,
                                          value: option.value,
                                        });
                                  }}
                                />
                                <label
                                  htmlFor="bordered-radio-2"
                                  className="w-full py-4 ms-2 text-lg font-semibold text-gray-900 dark:text-gray-300"
                                >
                                  Is Answer?
                                </label>
                              </div>
                            </div>
                          );
                        })}
                        <Button
                          className="my-4 rounded-md w-fit"
                          intent={"secondary"}
                          size={"small"}
                          onClick={() => addOption(question.id)}
                        >
                          Add Option
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-row  md:flex-col justify-around items-center p-4 border border-primary-200/70 rounded-3xl bg-primary-700">
                      <CiCirclePlus
                        onClick={addQuestion}
                        className="text-3xl hover:bg-slate-800 hover:rounded-lg"
                      />
                      <MdDeleteOutline
                        onClick={() => remove(question.id ? question.id : null)}
                        className="text-2xl hover:bg-slate-800 hover:rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              </>
            );
          })}
      </div>
    </>
  );
};

export default Quiz;
