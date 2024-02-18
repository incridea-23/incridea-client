import Dashboard from "@/src/components/layout/dashboard";
import {
  CreateOptionDocument,
  CreateQuestionDocument,
  DeleteOptionDocument,
  DeleteQuestionDocument,
  GetQuizByEventDocument,
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
const Quiz = ({ id }: { id: string }) => {
  const {
    data: QuizData,
    loading: LoadingQuizData,
    error: QuizDataError,
  } = useQuery(GetQuizByEventDocument, {
    variables: {
      eventId: 1,
    },
  });

  const [uploading, setUploading] = useState(false);

  const handleUpload = (file: File, type: "option" | "question") => {
    const formData = new FormData();
    formData.append("image", file);
    const url = `https://incridea-pai3.onrender.com/${type}/image/upload`;
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
        setOption((prevValue) => {
          if (prevValue) return { ...prevValue, value: res.url };
        });
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
      id: "",
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
        query: GetQuizByEventDocument,
        variables: {
          eventId: 3,
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
      QuizData?.getQuizByEvent.__typename === "QueryGetQuizByEventSuccess" &&
      QuizData.getQuizByEvent.data[0].questions
    ){
      setQuestions(
        (QuizData.getQuizByEvent.data[0].questions?.length > 0 &&
          QuizData.getQuizByEvent.data[0].questions) || [
          {
            id: "",
            image: "",
            negativePoint: 0,
            point: 0,
            question: "",
            questionType: "",
            options: [],
          },
        ]
      );
      if(QuizData.getQuizByEvent.data[0].questions?.length == 0){
        setQuestion({
          quizId: "3",
          image: "",
          negativePoint: 0,
          points: 0,
          question: "",
          questionType: "",
        })
      }
    }

  }, [QuizData]);

  useEffect(() => {
    console.log(Questions);
  }, [Questions]);

  const duplicate = (index: number) => {
    setQuestions((temp) => {
      return [...temp, temp[index]];
    });
  };

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
          setQuestions((temp) => [...temp.filter((question) => question.id)]);
          setLoading(false);
        }
        // show success toast
      })
      .catch((error) => {
        // handle error
      });
  };

  const createQuestion = (questionId: string | null) => {
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
          questionType: "",
          options: [],
        },
      ]);

      return setQuestion({
        quizId: "3",
        image: "",
        negativePoint: 0,
        points: 0,
        question: "",
        questionType: "",
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
    if (optionId) {
      return updateOption({
        variables: {
          id: optionId,
          value: Option?.value,
          isAnswer: Option?.isAnswer,
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
      refetchQueries: [GetQuizByEventDocument],
    });
  };

  return (
    <div className="min-h-screen overflow-x-hidden overflow-y-auto bg-gradient-to-b from-primary-600 to-primary-500 text-gray-100  pt-24 sm:p-10 sm:pt-20 bodyFont px-4">
      <input
        className="text-xl font-medium mt-4 w-60 rounded-2xl bg-gray-900/70 bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-30 outline-none p-3 px-4"
        placeholder="Enter quiz title"
        defaultValue={
          QuizData?.getQuizByEvent?.__typename === "QueryGetQuizByEventSuccess"
            ? QuizData.getQuizByEvent.data[0].name?.toString()
            : ""
        }
      />
      {!Loading &&
        Questions?.map((question, index) => {
          return (
            <div key={index} className="flex flex-col px-4">
              <div className="flex flex-col md:flex-row py-4 gap-4">
                <div className="flex flex-col items-start border border-primary-200/70 rounded-3xl bg-primary-700  w-full h-full md:p-4 px-8">
                  <h1 className="text-xl font-medium mt-6 font-gilroy ">
                    Enter the Question
                  </h1>

                  <div className="flex flex-col md:flex-row list-disc justify-between items-center mt-4 w-full gap-8">
                    <div className="flex flex-row w-full">
                      <input
                        placeholder="enter the question..."
                        defaultValue={question.question}
                        className="w-full h-20 rounded-3xl px-4 bg-slate-600/20 bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-20 outline-none"
                        type="text"
                        onChange={(e) =>
                          setQuestion((prev) => {
                            if (prev)
                              return { ...prev, question: e.target.value };
                            return prev;
                          })
                        }
                        onBlur={() => {
                          createQuestion(question.id ? question.id : null);
                        }}
                      />
                    </div>
                    <div className="flex flex-row items-center gap-8">
                      <input
                        defaultValue={0}
                        className=" h-12 w-12 text-center rounded-3xl bg-slate-600/20 bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-20 outline-none"
                        type="text"
                        onChange={(e) =>
                          setQuestion((prev) => {
                            if (prev)
                              return {
                                ...prev,
                                points: Number(e.target.value),
                              };
                            return prev;
                          })
                        }
                        name="points"
                      />
                      <label
                        htmlFor="points"
                        className="ms-2 text-sm font-semibold text-gray-900 dark:text-gray-300"
                      >
                        Points
                      </label>
                      <input
                        defaultValue={0}
                        className="h-12 text-center w-12 rounded-3xl px-2 bg-slate-600/20 bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-20 outline-none"
                        type="text"
                        onChange={(e) =>
                          setQuestion((prev) => {
                            if (prev)
                              return {
                                ...prev,
                                negativePoint: Number(e.target.value),
                              };
                            return prev;
                          })
                        }
                        name="negativePoints"
                      />
                      <label
                        htmlFor="negativePoints"
                        className="ms-2 text-sm font-semibold text-gray-900 dark:text-gray-300"
                      >
                        Negative Points
                      </label>
                      <CiImageOn className="text-5xl" />
                      <select
                        name="type"
                        className="border-0 text-sm rounded-lg block  px-8 py-2 bg-slate-700 bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-60 border-gray-900 placeholder-gray-800 text-white focus:outline-none focus:ring-2 ring-gray-500"
                        id=""
                        defaultValue={question.questionType}
                        onChange={(e) =>
                          setQuestion((prev) => {
                            if (prev)
                              return { ...prev, questionType: e.target.value };
                            return prev;
                          })
                        }
                      >
                        {Array.from(["MCQ", "MMCQ", "FITB"]).map(
                          (type, index) => {
                            return (
                              <option value={type} key={index}>
                                {type}
                              </option>
                            );
                          }
                        )}
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 mt-4 w-full">
                    {question.options.map((option, index) => {
                      return (
                        <div
                          className="flex flex-row items-center  gap-4"
                          key={index}
                        >
                          <div className="flex flex-row items-center justify-center gap-8 w-full">
                            <ImRadioUnchecked className="text-lg" />
                            <input
                              defaultValue={option.value}
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
                              onBlur={() =>
                                saveOption(option.id ? option.id : null)
                              }
                            />
                          </div>
                          <HiOutlineMinusCircle
                            onClick={() => deleteOption(option.id)}
                            className="text-3xl hover:bg-slate-800 hover:rounded-lg"
                          />
                          <CiImageOn className="text-3xl mx-8 cursor-pointer" />
                          <div className="flex items-center gap-4">
                            <input
                              checked
                              id="bordered-radio-2"
                              type="radio"
                              value=""
                              name="bordered-radio"
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              onSelect={() =>
                                setOption((prev) => {
                                  if (prev) return { ...prev, isAnswer: true };
                                  return prev;
                                })
                              }
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
                  <HiOutlineDuplicate
                    onClick={() => duplicate(index)}
                    className="text-2xl hover:bg-slate-800 hover:rounded-lg"
                  />
                  <MdDeleteOutline
                    onClick={() => remove(question.id ? question.id : null)}
                    className="text-2xl hover:bg-slate-800 hover:rounded-lg"
                  />
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Quiz;
