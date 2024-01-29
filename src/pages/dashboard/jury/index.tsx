import Spinner from "@/src/components/spinner";
import { useAuth } from "@/src/hooks/useAuth";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Dashboard from "@/src/components/layout/dashboard";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@apollo/client";
import {
  PublishedEventsDocument,
  PublishedEventsQuery,
} from "@/src/generated/generated";
import Events from "../../events";
import Link from "next/link";
import { Menu } from "@headlessui/react";
import { AiOutlineSearch } from "react-icons/ai";
import { IoPeopleOutline } from "react-icons/io5";

function Jury() {
  const { user, loading, error } = useAuth();
  const router = useRouter();
  const {
    data: Events,
    loading: EventLoading,
    error: EventError,
  } = useQuery(PublishedEventsDocument);

  // --------------------------------------------------
  const branchFilters = [
    "ALL",
    "CORE",
    "CSE",
    "ISE",
    "AIML",
    "CCE",
    "ECE",
    "EEE",
    "MECH",
    "CIVIL",
    "BTE",
  ];

  const dayFilters = ["ALL", "DAY 1", "DAY 2", "DAY 3", "DAY 4"];
  const categoryFilters = ["ALL", "TECHNICAL", "NON_TECHNICAL", "CORE"];
  const [currentBranchFilter, setCurrentBranchFilter] =
    useState<(typeof branchFilters)[number]>("ALL");
  const [currentDayFilter, setCurrentDayFilter] =
    useState<(typeof dayFilters)[number]>("ALL");
  const [currentCategoryFilter, setCurrentCategoryFilter] =
    useState<(typeof branchFilters)[number]>("ALL");
  const [query, setQuery] = useState("");

  const [filteredEvents, setFilteredEvents] = useState(Events?.publishedEvents);

  useEffect(() => {
    let tempFilteredEvents = Events?.publishedEvents;
    if (currentBranchFilter !== "ALL")
      tempFilteredEvents = tempFilteredEvents?.filter(
        (event) => event.branch.name === currentBranchFilter
      );
    if (currentDayFilter !== "ALL") {
      let filteredDay = new Date(
        currentDayFilter === "DAY 1"
          ? "2023-04-26"
          : currentDayFilter === "DAY 2"
          ? "2023-04-27"
          : currentDayFilter === "DAY 3"
          ? "2023-04-28"
          : "2023-04-29"
      ).getDate();
      tempFilteredEvents = tempFilteredEvents?.filter((event) =>
        event.rounds.some(
          (round) => new Date(round.date).getDate() === filteredDay
        )
      );
    }
    if (currentCategoryFilter !== "ALL") {
      tempFilteredEvents = tempFilteredEvents?.filter(
        (event) => event.category === currentCategoryFilter
      );
    }
    setFilteredEvents(tempFilteredEvents);
    console.log(tempFilteredEvents);
  }, [currentBranchFilter, currentDayFilter, currentCategoryFilter, Events]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setCurrentBranchFilter("ALL");
    setCurrentDayFilter("ALL");
    setCurrentCategoryFilter("ALL");
    if (e.target.value === "") {
      setFilteredEvents(Events?.publishedEvents || []);
    } else {
      setFilteredEvents(
        Events?.publishedEvents.filter((event) =>
          event.name.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    }
  };

  const resetFilters = () => {
    setQuery("");
    setCurrentBranchFilter("ALL");
    setCurrentDayFilter("ALL");
    setCurrentCategoryFilter("ALL");
    setFilteredEvents(Events?.publishedEvents || []);
  };

  // --------------------------------------------------

  if (loading || EventLoading)
    return (
      <div className="h-screen w-screen flex justify-center">
        <Spinner />
      </div>
    );
  if (!user) {
    router.push("/login");
    return <div>Redirecting...</div>;
  }
  if (user.role !== "JURY") {
    router.push("/profile");
    return <div>Redirecting...</div>;
  }

  return (
    <Dashboard>
      <Toaster />
      <div className="relative top-14 md:top-0 flex justify-between items-center mb-3">
        <h1 className="text-3xl -translate-y-12 lg:translate-y-0 px-5">
          Hello <span className="font-semibold">{user?.name}</span>!
        </h1>
      </div>
      {/* --------------------- */}
      <div className="flex flex-wrap items-center gap-2 px-4 lg:justify-between lg:flex-col lg:mx-auto mt-8 mb-7">
        <div className="flex flex-col lg:flex-nowrap lg:w-[800px] w-full items-center gap-2">
          <div className="flex w-full items-center justify-between gap-3">
            <div className="relative lg:basis-[75%] basis-full w-full lg:w-auto ">
              <input
                value={query}
                onChange={handleSearch}
                className="w-full pr-14 bg-black/30 placeholder:text-gray-200/70 focus:outline-none text-white rounded-sm  pl-3 p-2"
                placeholder="Search away!"
                type="text"
              />
              <AiOutlineSearch
                size={"1.4rem"}
                className="absolute right-3 top-2.5 text-gray-300/70"
              />
            </div>
            <div className="lg:flex hidden justify-center basis-[12.5%] py-2">
              <Menu as={"div"} className={"relative w-full inline-block"}>
                <Menu.Button
                  className={
                    "inline-flex bg-black/30 leading-6 w-full justify-center rounded-sm px-4 py-2 h-[40px] text-sm font-medium text-white"
                  }
                >
                  {currentBranchFilter !== "ALL"
                    ? currentBranchFilter
                    : "Branch"}
                </Menu.Button>
                <Menu.Items className=" overflow-hidden pb-1.5 mt-1 bg-[#286D8C] absolute z-10 text-center rounded-sm shadow-black/80 shadow-2xl">
                  {branchFilters.map((filter) => (
                    <Menu.Item key={filter}>
                      {({ active }) => (
                        <button
                          className={`${
                            currentBranchFilter === filter
                              ? "bg-black/50"
                              : "bg-black/20"
                          } text-white rounded-sm m-1.5 mb-0 w-32 px-3 py-2 text-sm`}
                          onClick={() => setCurrentBranchFilter(filter)}
                        >
                          {filter}
                        </button>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Menu>
            </div>
            <div className="lg:flex hidden justify-center basis-[12.5%] py-2">
              <Menu as={"div"} className={"relative w-full inline-block"}>
                <Menu.Button
                  className={
                    "inline-flex shrink-0 whitespace-nowrap bg-black/30 leading-6 w-full justify-center rounded-sm px-4 py-2 h-[40px] text-sm font-medium text-white"
                  }
                >
                  {currentDayFilter !== "ALL" ? currentDayFilter : "Day"}
                </Menu.Button>
                <Menu.Items className="overflow-hidden right-0 pb-1.5 mt-1 bg-[#286D8C]  absolute z-[1] text-center rounded-sm shadow-black/80 shadow-2xl">
                  {dayFilters.map((filter) => (
                    <Menu.Item key={filter}>
                      {({ active }) => (
                        <button
                          className={`${
                            currentDayFilter === filter
                              ? "bg-black/50"
                              : "bg-black/20"
                          } text-white rounded-sm m-1.5 mb-0 w-36 px-3 py-2 text-sm`}
                          onClick={() => setCurrentDayFilter(filter)}
                        >
                          {filter}
                        </button>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Menu>
            </div>
          </div>
          <div className="lg:flex lg:w-[800px] gap-3 mx-auto  hidden  font-semibold">
            {categoryFilters.map((filter) => (
              <span
                key={filter}
                className={`${
                  filter === currentCategoryFilter
                    ? "border-b-4  bg-black/10 "
                    : "hover:bg-black/10"
                } text-white cursor-pointer grow border-black/30 text-center rounded-sm px-3 py-1`}
                onClick={() => setCurrentCategoryFilter(filter)}
              >
                {filter.replace("_", " ")}
              </span>
            ))}
          </div>
        </div>

        {/* Mobile Filters */}
        <div className="flex  justify-between gap-3 basis-full">
          <div className="lg:hidden flex basis-1/3 justify-between  py-2">
            <Menu as={"div"} className={"relative grow inline-block"}>
              <Menu.Button
                className={
                  "inline-flex bg-black/30 leading-6 w-full justify-center rounded-sm px-4 py-2 h-[40px] text-sm font-medium text-white"
                }
              >
                {currentBranchFilter !== "ALL" ? currentBranchFilter : "Branch"}
              </Menu.Button>
              <Menu.Items className="overflow-hidden pb-1.5 mt-1 bg-[#2e768a] absolute z-50 text-center rounded-sm shadow-black/80 shadow-2xl">
                {branchFilters.map((filter) => (
                  <Menu.Item key={filter}>
                    {({ active }) => (
                      <button
                        className={`${
                          currentBranchFilter === filter
                            ? "bg-black/50"
                            : "bg-black/20"
                        } text-white rounded-sm m-1.5 mb-0 w-36 px-3 py-2 text-sm`}
                        onClick={() => setCurrentBranchFilter(filter)}
                      >
                        {filter}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Menu>
          </div>
          <div className="lg:hidden flex justify-center shrink grow-0 basis-1/3 py-2">
            <Menu as={"div"} className={"relative grow inline-block"}>
              <Menu.Button
                className={
                  "inline-flex whitespace-nowrap overflow-hidden  bg-black/30 leading-6 w-full justify-center rounded-sm px-4 py-2 h-[40px] text-sm font-medium text-white"
                }
              >
                {currentCategoryFilter !== "ALL"
                  ? currentCategoryFilter.replace("_", " ")
                  : "Category"}
              </Menu.Button>
              <Menu.Items className="overflow-hidden right-1/2 translate-x-1/2 pb-1.5 mt-1 bg-[#2e768a]  absolute z-50 text-center rounded-sm shadow-black/80 shadow-2xl">
                {categoryFilters.map((filter) => (
                  <Menu.Item key={filter}>
                    {({ active }) => (
                      <button
                        className={`${
                          currentCategoryFilter === filter
                            ? "bg-black/50"
                            : "bg-black/20"
                        } text-white rounded-sm m-1.5 mb-0 w-36 px-3 py-2 text-sm`}
                        onClick={() => setCurrentCategoryFilter(filter)}
                      >
                        {filter.replace("_", " ")}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Menu>
          </div>
          <div className="lg:hidden flex justify-center basis-1/3  py-2">
            <Menu as={"div"} className={"relative grow inline-block"}>
              <Menu.Button
                className={
                  "inline-flex whitespace-nowrap bg-black/30 leading-6 w-full justify-center rounded-sm px-4 py-2 h-[40px] text-sm font-medium text-white"
                }
              >
                {currentDayFilter !== "ALL" ? currentDayFilter : "Day"}
              </Menu.Button>
              <Menu.Items className="overflow-hidden right-0 pb-1.5 mt-1 bg-[#2e768a]  absolute z-50 text-center rounded-sm shadow-black/80 shadow-2xl">
                {dayFilters.map((filter) => (
                  <Menu.Item key={filter}>
                    {({ active }) => (
                      <button
                        className={`${
                          currentDayFilter === filter
                            ? "bg-black/50"
                            : "bg-black/20"
                        } text-white rounded-sm m-1.5 mb-0 w-36 px-3 py-2 text-sm`}
                        onClick={() => setCurrentDayFilter(filter)}
                      >
                        {filter.replace("_", " ")}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Menu>
          </div>
        </div>
      </div>
      {/* -------------------- */}

      {filteredEvents?.length === 0 ? (
        <div className="bodyFont flex italic items-center justify-center min-h-[20rem] text-xl w-full text-center text-gray-200/70">
          <span>No events found</span>
        </div>
      ) : (
        <div className="grid  grid-cols-1 mx-auto gap-10 md:grid-cols-2 max-w-7xl xl:grid-cols-3 px-5">
          {filteredEvents?.map((Event) => (
            <EventCard key={Event.id} event={Event} />
          ))}
        </div>
      )}
    </Dashboard>
  );
}

export default Jury;

const EventCard = ({
  event,
}: {
  event: PublishedEventsQuery["publishedEvents"][0];
}) => {
  const getCompletedRounds = () => {
    let completedRounds = 0;
    event.rounds.forEach((round) => {
      if (round.completed === true) completedRounds++;
    });
    return completedRounds;
  };
  const totalRounds = event.rounds.length;
  const getRoundStatus = () => {
    if (getCompletedRounds() === totalRounds) return "COMPLETED";
    if (
      new Date(event.rounds.find((r) => r.roundNo === 1)?.date).getTime() >
      new Date().getTime()
    )
      return "YET_TO_START";
    return "ONGOING";
  };
  return (
    <Link
      href={`/dashboard/jury/event/${event.name
        .toLowerCase()
        .replaceAll(" ", "-")}-${event.id}`}
      key={event.id + event.name}
      className="bg-black/20 backdrop-blur-sm flex flex-col cursor-pointer rounded-md  max-w-xl w-full p-8 hover:scale-[1.03] transition-transform duration-300"
    >
      <div>
        <div className="flex justify-between px-2 mb-2">
          <div className="flex flex-col">
            <h1>{event.name}</h1>
            <span className="flex text-sm items-center">
              <IoPeopleOutline className="mr-2 text-base" />
              {event.maxTeamSize !== 1
                ? `${event.minTeamSize} - ${event.maxTeamSize} members`
                : `${event.minTeamSize} member`}
            </span>
          </div>
          <h2>Venue:{" " + event.venue}</h2>
        </div>
        <div className="py-2 flex justify-between">
          <div className="p-2 bg-white/20 rounded-md">
            <div className="flex items-center justify-center">
              <span className="text-md pr-2">Rounds</span>
              <span className="text-xl font-semibold">
                {getCompletedRounds()}
              </span>
              <span className="text-xl">/</span>
              <span className="text-xl font-semibold">{totalRounds}</span>
            </div>
          </div>
          <StatusBadge status={getRoundStatus()} />
        </div>
        <div className="grid grid-cols-2 gap-1">
          {event.rounds.map((round, idx) => {
            return (
              <div
                key={idx}
                className="bg-white/20 rounded-sm grid grid-rows-2 p-2 text-sm"
              >
                <span>Round :{" " + round?.roundNo}</span>
                <span>Date: {" " + round?.date?.substring(0, 10)}</span>
              </div>
            );
          })}
        </div>
      </div>
    </Link>
  );
};

export const StatusBadge = ({ status }: { status: string }) => {
  if (status === "COMPLETED")
    return (
      <div className="border-2 h-fit rounded-full text-green-400 border-green-400 px-2 py-1 text-xs">
        Completed
      </div>
    );
  if (status === "ONGOING")
    return (
      <div className="border-2 h-fit rounded-full text-yellow-400 border-yellow-400 px-2 py-1 text-xs">
        OnGoing
      </div>
    );
  if (status === "YET_TO_START")
    return (
      <div className="border-2 h-fit rounded-full text-red-500 border-red-500 px-2 py-1 text-xs">
        yet to start
      </div>
    );
  return null;
};
