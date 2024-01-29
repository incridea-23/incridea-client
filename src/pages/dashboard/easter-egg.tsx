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
  GetAllSubmissionsQuery,
  GetCardsDocument,
  Submission,
} from "@/src/generated/generated";
import { useAuth } from "@/src/hooks/useAuth";
import { idToPid } from "@/src/utils/id";
import { useMutation, useQuery } from "@apollo/client";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState, useEffect, Fragment } from "react";
import { Toaster } from "react-hot-toast";
import { MdDelete } from "react-icons/md";

type Props = {};

const EasterEggDashboard = (props: Props) => {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [query, setQuery] = useState("");
  const [showSubmissions, setShowSubmissions] = useState(true);
  const [selected, setSelected] = useState("Day1");
  const [highlightedImage, setHighlightedImage] = useState<string | null>(null);

  const {
    data,
    loading: submissionsLoading,
    error,
    refetch: submissionsRefetch,
  } = useQuery(GetAllSubmissionsDocument, {
    variables: {
      day: selected as DayType,
    },
  });

  const [sortedSubmissions, setSortedSubmissions] = useState<any>([]);

  useEffect(() => {
    if (data?.getAllSubmissions.__typename === "QueryGetAllSubmissionsSuccess") {
      const sorted = [...data.getAllSubmissions.data].sort((a, b) => {
        if (a.user.name < b.user.name) return -1;
        if (a.user.name > b.user.name) return 1;
        return 0;
      });
      setSortedSubmissions(sorted);
    }
  }, [data]);

  useEffect(() => {
    if (query === "") {
      if (data?.getAllSubmissions.__typename === "QueryGetAllSubmissionsSuccess") {
        const sorted = [...data.getAllSubmissions.data].sort((a, b) => {
          if (a.user.name < b.user.name) return -1;
          if (a.user.name > b.user.name) return 1;
          return 0;
        });
        setSortedSubmissions(sorted);
        return;
      }
    }
    // filter submissions by query
    const filtered = sortedSubmissions.filter((submission: Submission) => {
      const name = submission.user.name.toLowerCase();
      const pid = idToPid(submission.user.id);
      const clue = submission.card.clue.toLowerCase();
      const queryLower = query.toLowerCase();
      return (
        name.includes(queryLower) || pid.includes(queryLower) || clue.includes(queryLower)
      );
    });
    setSortedSubmissions(filtered);
  }, [query, data, sortedSubmissions]);

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
    if (showSubmissions) submissionsRefetch();
    else cardsRefetch();
  }, [selected, showSubmissions, cardsRefetch, submissionsRefetch]);

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
    // <>{highlightedImage && (
    //   <div className="relative z-[900]">
    //     <div
    //       className="fixed min-w-screen min-h-screen inset-0 z-50 bg-black/50 flex items-center justify-center"
    //       onClick={() => setHighlightedImage(null)}>
    //       <div className="relative w-[80vw] pt-28 h-[80vh]">
    //         <Image
    //           src={highlightedImage}
    //           layout="fill"
    //           objectFit="contain"
    //           className="rounded-md"
    //           alt="submission"
    //         />
    //       </div>
    //     </div>
    //   </div>
    // )}
    <Dashboard>
      <Transition appear show={Boolean(highlightedImage)} as={Fragment}>
        <Dialog
          onClick={() => setHighlightedImage(null)}
          as="div"
          className="relative z-[900] "
          onClose={() => setHighlightedImage(null)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
          </Transition.Child>

          <div className={`fixed inset-0 z-10  p-4 md:p-8 overflow-y-auto`}>
            <div className="flex min-h-[full] items-center justify-center text-center py-5 md:py-7">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95">
                <Image
                  src={highlightedImage || ""}
                  width={1000}
                  height={1000}
                  className="object-contain rounded-md h-[85vh] w-[85vw]"
                  alt="submission"
                />
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <Toaster />
      <div className="max-w-6xl mx-auto px-3 mb-5 flex flex-col items-center justify-center">
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
                  sortedSubmissions.length === 0 ? (
                    <span className="text-white/70">No submissions found</span>
                  ) : (
                    sortedSubmissions.map((submission: Submission, index: number) => (
                      <div
                        className="flex md:flex-row flex-col rounded-sm overflow-hidden justify-between md:grow md:shrink-0 bg-white/20"
                        key={index}>
                        <div className="flex flex-col gap-1.5 p-3 max-w-sm">
                          <span>
                            <span className="font-semibold">Name:</span>{" "}
                            {submission.user.name}
                          </span>
                          <span>
                            <span className="font-semibold">PID:</span>{" "}
                            {idToPid(submission.user.id)}
                          </span>
                          <span>
                            <span className="font-semibold">Clue ID:</span>{" "}
                            {submission.card.id}
                          </span>
                          <span>
                            <span className="font-semibold">Clue:</span>{" "}
                            {submission.card.clue}
                          </span>
                        </div>
                        <Image
                          onClick={() => setHighlightedImage(submission.image)}
                          className="cursor-pointer md:max-w-[250px] max-w-full md:ml-auto md:object-right object-center max-h-[200px] object-contain"
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
                          className={`${
                            (deleteCardLoading || cardsLoading) &&
                            "opacity-80 pointer-events-none"
                          } md:basis-[45%] min-w-[300px] basis-full bg-white/20  flex flex-col shadow-sm rounded-md`}>
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
