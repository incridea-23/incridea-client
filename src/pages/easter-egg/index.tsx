import Button from "@/src/components/button";
import ImageUpload from "@/src/components/easter-egg/imageUpload";
import Spinner from "@/src/components/spinner";
import {
  CreateSubmissionDocument,
  DayType,
  GetCardsDocument,
  MySubmissionsDocument,
} from "@/src/generated/generated";
import { useAuth } from "@/src/hooks/useAuth";
import { useMutation, useQuery } from "@apollo/client";
import { NextPage } from "next";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { FaCheck } from "react-icons/fa";

type Props = {};

const EasterEgg: NextPage = (props: Props) => {
  const [imageFiles, setImageFiles] = useState<(File | null)[] | []>([]);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const { status, loading: authLoading } = useAuth();

  const getDay = () => {
    const date = new Date();
    const day = date.getDate();
    if (day === 26) return "Day1";
    if (day === 27) return "Day2";
    if (day === 28) return "Day3";
    if (day === 29) return "Day4";
  };

  const {
    data: cards,
    loading: cardsLoading,
    error: cardsError,
  } = useQuery(GetCardsDocument, {
    variables: {
      day: getDay() as DayType,
    },
  });

  
  const {
    data: submissions,
    loading: submissionsLoading,
    error: submissionsError,
  } = useQuery(MySubmissionsDocument, {
    variables: {
      day: getDay() as DayType,
    },
  });
  console.log(submissions);

  const [submissionMutation, { data, loading, error }] = useMutation(
    CreateSubmissionDocument
  );

  useEffect(() => {
    if (cards?.getCards.__typename === "QueryGetCardsSuccess") {
      setImageFiles(new Array(cards.getCards.data.length).fill(null));
    }
  }, [cards]);

  if (authLoading)
    return (
      <div className="bg-gradient-to-b pt-28 from-[#41acc9]  via-[#075985] to-[#2d6aa6] min-h-screen relative">
        <div className="text-center text-xl mt-10 text-white/90">
          <Spinner intent={"white"} size={"large"} />
        </div>
      </div>
    );
  if (status !== "authenticated")
    return (
      <div className="bg-gradient-to-b pt-28 from-[#41acc9]  via-[#075985] to-[#2d6aa6] min-h-screen relative">
        <div className="text-center flex flex-col justify-center items-center gap-3 text-xl mt-10 text-white/90">
          <span className="text-3xl font-semibold">Uh-oh! </span>
          <span>
            You need to{" "}
            <Link className="underline" href={"/login"}>
              login
            </Link>{" "}
            to view easter eggs
          </span>
        </div>
      </div>
    );

  return (
    <div className="bg-gradient-to-b  from-[#41acc9]  via-[#075985] to-[#2d6aa6] min-h-screen relative">
      <Toaster />
      <div className="pt-28 pb-12 md:px-12 px-6 flex justify-center items-center flex-col">
        <h2 className="titleFont text-center text-white text-4xl mb-8">
          Upload your images!
        </h2>
        <h2 className="bodyFont text-center text-white text-xl mb-3">
          Find clues across the campus and upload them here
        </h2>
        <h2 className="bodyFont font-semibold text-center text-white text-xl mb-8">
          Note: Your submissions are autosaved after uploading 
        </h2>
        {cardsLoading ? (
          <Spinner />
        ) : cards?.getCards.__typename === "QueryGetCardsSuccess" ? (
          <>
            <div className="max-w-6xl flex flex-wrap gap-8 justify-center text-white/90 ">
              {cards.getCards.data.map((card, index) => (
                <div
                  key={index}
                  className="md:basis-[45%] min-w-[300px] basis-full bg-black/20  flex flex-col shadow-sm rounded-md">
                  <h2 className="mb-2 text-xl titleFont md:px-6 md:pt-6 px-4 pt-4">
                    Clue {index + 1}
                  </h2>
                  <h2 className="mb-3 bodyFont md:px-6  px-4 ">{card.clue}</h2>
                  <div className="md:px-6 md:pb-4 flex flex-col grow">
                    <ImageUpload
                    cardId={card.id}
                      loading={submissionsLoading}
                      existingImage={
                        submissions?.submissionsByUser.__typename ===
                        "QuerySubmissionsByUserSuccess"
                          ? submissions?.submissionsByUser.data.filter(
                              (submission) => submission.cardId === card.id
                            )[0]?.image
                          : null
                      }
                      setImage={(file) => {
                        setSaved(false);
                        setImageFiles((prev) => {
                          const newFiles = [...prev];
                          newFiles[index] = file;
                          return newFiles;
                        });
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            {/* <Button disabled={saving} className="mt-10" onClick={onSave}>
              {saving ? (
                <>
                  Saving <Spinner intent={"white"} size={"small"} />
                </>
              ) : saved ? (
                <>
                  Saved <FaCheck color="white" />
                </>
              ) : (
                "Save"
              )}
            </Button> */}
          </>
        ) : (
          <span className="text-white/60">
            Could not fetch clues, please try again later
          </span>
        )}
      </div>
    </div>
  );
};

export default EasterEgg;
