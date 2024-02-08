import Dashboard from "@/src/components/layout/dashboard";
import {
  GetQuizByEventDocument,
  QueryGetQuizByEventSuccess,
  Question,
} from "@/src/generated/generated";
import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { CiCirclePlus, CiImageOn } from "react-icons/ci";
import { HiOutlineDuplicate } from "react-icons/hi";
import { MdDeleteOutline } from "react-icons/md";
import { ImRadioUnchecked } from "react-icons/im";
import Button from '@/src/components/button';
const Quiz = ({ id }: { id: string }) => {
  const {
    data: QuizData,
    loading: LoadingQuizData,
    error: QuizDataError,
  } = useQuery(GetQuizByEventDocument, {
    variables: {
      eventId: 3,
    },
  });
  type questionsType = {
    question: string;
    questionType: string;
    points: number;
    negativePoints: number;
    image: string | null | undefined;
    options:
      | [
          {
            value: string;
            isAnswer: boolean;
          }
        ]
      | undefined;
  };
  const [Questions, setQuestions] = useState<any[]>([]);
  const [Question, setQuestion] = useState<{
    question: string;
    questionType: string;
    points: number;
    negativePoints: number;
    image: string;
  }>();

  const [Option, setOption] = useState<{
    value: string;
    isCorrect: boolean;
    questionId: number;
  }>();

  useEffect(() => {
    QuizData?.getQuizByEvent.__typename === "QueryGetQuizByEventSuccess"
      ? setQuestions(QuizData.getQuizByEvent.data[0].questions)
      : setQuestions([]);
  }, [QuizData]);

  const duplicate = (index: number) => {
    setQuestions((temp) => {
      return [...temp, temp[index]];
    });
  };

  const remove = (index: number) => {
    setQuestions((temp) => [...temp.slice(0, index), ...temp.slice(index + 1)]);
  };

  const add = () => {
    setQuestions((temp) => [
      ...temp,
      {
        question: "",
        questionType: "",
        points: "",
        negativePoints: "",
        image: "",
        options: [
          {
            value: "",
            isAnswer: false,
          },
        ],
      },
    ]);
  };

  return (
    <Dashboard>
      {Questions?.map((question, index) => {
        return (
          <div key={index} className="flex flex-col">
            <input  className='text-xl font-medium mt-4 w-60 rounded-2xl bg-gray-900/80 bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-30 outline-none p-3 px-4' placeholder='Enter quiz title'
              defaultValue={
                QuizData?.getQuizByEvent.__typename ===
                "QueryGetQuizByEventSuccess"
                  ? QuizData.getQuizByEvent.data[0].name
                  : ""
              }
              
            />
            <div className="flex flex-row py-8">
              <div className="flex flex-col items-start rounded-3xl bg-gray-900/60 w-full h-full mx-4 p-2 px-8">
                <h1 className="text-xl font-medium mt-6 font-gilroy">
                  Enter the Question
                </h1>

                <div className="flex flex-row list-disc items-center w-full">
                  <input
                    defaultValue={question.question}
                    className='w-[1000px] h-20 rounded-3xl px-4 mt-4 bg-slate-600 bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-20 outline-none' type='text'
                  ></input>
                  <CiImageOn className="text-3xl mx-8" />
                  <select
                    name="type"
                    className="border-0 text-sm rounded-lg block  px-8 py-2 bg-slate-700 bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-60 border-gray-900 placeholder-gray-800 text-white focus:outline-none focus:ring-2 ring-gray-500"
                    id=""
                  >
                    {Array.from(["MCQ", "MMCQ", "FITB"]).map((type,index) => {
                      return (
                        <option
                          defaultChecked={
                            question.questionType === type ? true : false
                          }
                          value="MCQ"
                          key={index}
                        >
                          {type}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className='flex flex-col items-center justify-center gap-3 mt-4 '>
                  {question.options.map(
                    (
                      option: {
                        questionId: string;
                        value: string;
                        isAnswer: boolean;
                      },
                      index: number
                    ) => {
                      return (
                        <div className='flex flex-row items-center justify-center gap-4' key={index}>
                          <div  className='flex flex-row items-center justify-center gap-4'>
                          <ImRadioUnchecked  className='text-lg' />
                          <input
                            defaultValue={option.value}
                            className="w-[1000px] h-12 rounded-3xl px-4 mt-4 bg-slate-600 bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-20 outline-none"
                          /></div>
                          <CiImageOn className='text-3xl mx-8 cursor-pointer' />
                          <div className="flex items-center gap-4">
    <input checked id="bordered-radio-2" type="radio" value="" name="bordered-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
    <label htmlFor="bordered-radio-2" className="w-full py-4 ms-2 text-lg font-semibold text-gray-900 dark:text-gray-300">Is Answer?</label>
</div>
                        </div>
                      );
                    }
                  )}
                  <Button className='my-4 rounded-md' intent={'secondary'} size={'small'}>Add Option</Button>
                </div>
              </div>
              <div className="flex flex-col justify-around items-center w-20 rounded-2xl bg-gray-900/60">
                <CiCirclePlus
                  onClick={add}
                  className="text-3xl hover:bg-slate-800 hover:rounded-lg"
                />
                <HiOutlineDuplicate
                  onClick={() => duplicate(index)}
                  className="text-3xl hover:bg-slate-800 hover:rounded-lg"
                />
                <MdDeleteOutline
                  onClick={() => remove(index)}
                  className="text-3xl hover:bg-slate-800 hover:rounded-lg"
                />
              </div>
            </div>
          </div>
        );
      })}
    </Dashboard>
  );
};

export default Quiz;
