import Button from "@/src/components/button";
import Dashboard from "@/src/components/layout/dashboard";
import CreateCardModal from "@/src/components/pages/dashboard/easter-egg/CreateCardModal";
import Cards from "@/src/components/pages/dashboard/easter-egg/cards";
import SearchBox from "@/src/components/searchbox";
import Spinner from "@/src/components/spinner";
import {
  DayType,
  DeleteCardDocument,
  GetAllSubmissionsDocument,
  GetCardsDocument,
} from "@/src/generated/generated";
import { useAuth } from "@/src/hooks/useAuth";
import { idToPid } from "@/src/utils/id";
import { useMutation, useQuery } from "@apollo/client";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { MdDelete } from "react-icons/md";

type Props = {};

const EasterEggDashboard = (props: Props) => {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [query, setQuery] = useState("");
  const [showSubmissions, setShowSubmissions] = useState(true);
  const [selected, setSelected] = useState("Day1");

  const {
    data,
    loading: submissionsLoading,
    error,
		refetch: submissionsRefetch
  } = useQuery(GetAllSubmissionsDocument, {
    variables: {
      day: selected as DayType,
    },
  });

  const {
    data: cards,
    loading: cardsLoading,
    error: cardsError,
    refetch: cardsRefetch,
  } = useQuery(GetCardsDocument, {
    variables: {
      day: selected as DayType,
    },
  });

	useEffect(() => {
		if(showSubmissions) submissionsRefetch()
		else cardsRefetch()
	}, [selected, showSubmissions, cardsRefetch, submissionsRefetch])
  

  const [deleteCardMutation, { loading: deleteCardLoading }] =
    useMutation(DeleteCardDocument);

  if (loading)
    return (
      <div className="h-screen w-screen flex justify-center">
        <Spinner />
      </div>
    );

  // 1. Redirect to login if user is not logged in
  if (!user) {
    router.push("/login");
    return <div>Redirecting...</div>;
  }

  // 2. Redirect to profile if user is not a branch rep
  if (data?.getAllSubmissions.__typename === "Error") router.push("/profile");

  return (
    <Dashboard>
      <Toaster />
      <div className="max-w-6xl mx-auto px-3 flex flex-col items-center justify-center">
        <div className="w-full flex flex-col md:flex-row gap-3 mx-auto mb-3">
          <SearchBox
            className="grow"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <CreateCardModal cardsRefetch={cardsRefetch} />
        </div>
        <div className="flex gap-4 w-full mb-3 justify-between">
          <Button
            noScaleOnHover
            onClick={() => setSelected("Day1")}
            intent={selected === "Day1" ? "primary" : "ghost"}
            fullWidth>
            Day 1
          </Button>
          <Button
            noScaleOnHover
            onClick={() => setSelected("Day2")}
            intent={selected === "Day2" ? "primary" : "ghost"}
            fullWidth>
            Day 2
          </Button>
          <Button
            noScaleOnHover
            onClick={() => setSelected("Day3")}
            intent={selected === "Day3" ? "primary" : "ghost"}
            fullWidth>
            Day 3
          </Button>
          <Button
            noScaleOnHover
            onClick={() => setSelected("Day4")}
            intent={selected === "Day4" ? "primary" : "ghost"}
            fullWidth>
            Day 4
          </Button>
        </div>
        <div className="flex gap-4 w-full justify-between">
          <Button
            onClick={() => setShowSubmissions(true)}
            noScaleOnHover
            intent={showSubmissions ? "info" : "secondary"}
            fullWidth>
            Submissions
          </Button>
          <Button
            onClick={() => setShowSubmissions(false)}
            noScaleOnHover
            intent={!showSubmissions ? "info" : "secondary"}
            fullWidth>
            Cards
          </Button>
        </div>
        <div className="pt-5">
          {showSubmissions ? (
            submissionsLoading ? (
              <Spinner intent={"secondary"} className="mt-10" />
            ) : (
              <div className="flex gap-3 justify-between flex-wrap">
                {data?.getAllSubmissions.__typename ===
                "QueryGetAllSubmissionsSuccess" ? (
                  data.getAllSubmissions.data.length === 0 ? (
                    <span className="text-white/70">No submissions found</span>
                  ) : (
                    data.getAllSubmissions.data.map((submission, index) => (
                      <div className="flex md:flex-row flex-col rounded-sm overflow-hidden justify-between grow shrink-0 bg-white/20" key={index}>
                        <div className="flex flex-col gap-1.5 p-3 max-w-sm">
                          <span><span className="font-semibold">User:</span> {submission.user.name}</span>
                          <span><span className="font-semibold">PID:</span> {idToPid(submission.user.id)}</span>
                          <span><span className="font-semibold">Clue ID:</span> {submission.card.id}</span>
                          <span><span className="font-semibold">Clue:</span> {submission.card.clue}</span>
                        </div>
                        <Image
                          className="max-w-[250px] ml-auto object-right max-h-[200px] object-contain"
                          alt="submission"
                          src={submission.image}
                          width={500}
                          height={500}
                        />
                      </div>
                    ))
                  )
                ) : (
                  <span className="text-white/70 mt-10">
                    Error: Could not fetch submissions
                  </span>
                )}
              </div>
            )
          ) : (
            <>
              {cardsLoading ? (
                <Spinner intent={"secondary"} className="mt-10" />
              ) : cards?.getCards.__typename === "QueryGetCardsSuccess" ? (
                <>
                  <div className="max-w-6xl flex flex-wrap gap-8 justify-center text-white/90 ">
                    {cards.getCards.data.length > 0 ? (
                      cards.getCards.data.map((card, index) => (
                        <div
                          key={index}
                          className={`${(deleteCardLoading || cardsLoading) && 'opacity-80 pointer-events-none'} md:basis-[45%] min-w-[300px] basis-full bg-white/20  flex flex-col shadow-sm rounded-md`}>
                          <div className="mb-2 gap-2 items-center text-xl titleFont md:px-4 md:pt-4 px-4 pt-4 flex">
                            <h2>Clue ID: {card.id}</h2>
                            <MdDelete
                              onClick={() =>
                                deleteCardMutation({
                                  variables: {
                                    id: card.id,
                                  },
                                }).then((res) => {
                                  if (
                                    res.data?.deleteCard.__typename ===
                                    "MutationDeleteCardSuccess"
                                  )
                                    cardsRefetch();
                                })
                              }
                              className="justify-self-end ml-auto hover:text-red-700 cursor-pointer text-red-500"
                            />
                          </div>
                          <h2 className="mb-4 bodyFont md:px-4  px-4 ">{card.clue}</h2>
                        </div>
                      ))
                    ) : (
                      <span className="text-white/70">No cards found</span>
                    )}
                  </div>
                </>
              ) : (
                <span className="text-white/70">
                  Error: Could not fetch cards, please try again later
                </span>
              )}
            </>
          )}
        </div>
      </div>
    </Dashboard>
  );
};

export default EasterEggDashboard;
