import Navbar from "@/src/components/navbar";
import { useAuth } from "@/src/hooks/useAuth";
import Event from "@/src/components/event";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { Menu } from "@headlessui/react";
import { PublishedEventsDocument, PublishedEventsQuery } from "@/src/generated/generated";
import Image from "next/image";
import { client } from "@/src/lib/apollo";
import SearchBox from "@/src/components/searchbox";
import { AiOutlineSearch } from "react-icons/ai";
import { BiCaretDown } from "react-icons/bi";
import { FaAngleDown } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

const Events: NextPage<{ data: PublishedEventsQuery['publishedEvents'] }> = ({
  data,
}) => {
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
    useState<typeof branchFilters[number]>("ALL");
  const [currentDayFilter, setCurrentDayFilter] =
    useState<typeof dayFilters[number]>("ALL");
  const [currentCategoryFilter, setCurrentCategoryFilter] =
    useState<typeof branchFilters[number]>("ALL");
  const [query, setQuery] = useState("");

  const [filteredEvents, setFilteredEvents] = useState(data || []);

  const [showTopButton, setShowTopButton] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowTopButton(true);
      } else {
        setShowTopButton(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let tempFilteredEvents = data;
    if (currentBranchFilter !== "ALL")
      tempFilteredEvents = tempFilteredEvents.filter(
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
      tempFilteredEvents = tempFilteredEvents.filter((event) =>
        event.rounds.some((round) => new Date(round.date).getDate() === filteredDay)
      );
    }
    if (currentCategoryFilter !== "ALL") {
      tempFilteredEvents = tempFilteredEvents.filter(
        (event) => event.category === currentCategoryFilter
      );
    }
    setFilteredEvents(tempFilteredEvents);
  }, [currentBranchFilter, currentDayFilter, currentCategoryFilter, data]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setCurrentBranchFilter("ALL");
    setCurrentDayFilter("ALL");
    setCurrentCategoryFilter("ALL");
    if (e.target.value === "") {
      setFilteredEvents(data || []);
    } else {
      setFilteredEvents(
        data.filter((event) =>
          event.name.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    }
  };

  //TODO: Add reset filter button on mobile
  const resetFilters = () => {
    setQuery("");
    setCurrentBranchFilter("ALL");
    setCurrentDayFilter("ALL");
    setCurrentCategoryFilter("ALL");
    setFilteredEvents(data || []);
  };

  return (
    <div className="bg-gradient-to-b  from-[#41acc9]  via-[#075985] to-[#2d6aa6] min-h-screen relative">    
      <Image
        src="/assets/png/waterflare.png"
        height={1000}
        width={1000}
        alt="flare"
        className="absolute max-h-screen pointer-events-none opacity-50  top-0 right-0"
        priority
      />
      <h1
        className={`titleFont font-bold text-5xl tracking-wide text-center pt-32 text-white`}
      >
        EVENTS
      </h1>
      <h3 className={`titleFont font-semibold text-xl tracking-wide text-center py-5 px-2 text-white`}>60+ Events: Dive into Limitless Fun and Adventure!</h3>
      <div className="flex flex-wrap items-center gap-2 px-4 lg:justify-between lg:flex-col lg:mx-auto mt-8">
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
                  }>
                  {currentBranchFilter !== "ALL" ? currentBranchFilter : "Branch"}
                </Menu.Button>
                <Menu.Items className=" overflow-hidden pb-1.5 mt-1 bg-[#286D8C] absolute z-10 text-center rounded-sm shadow-black/80 shadow-2xl">
                  {branchFilters.map((filter) => (
                    <Menu.Item key={filter}>
                      {({ active }) => (
                        <button
                          className={`${
                            currentBranchFilter === filter ? "bg-black/50" : "bg-black/20"
                          } text-white rounded-sm m-1.5 mb-0 w-32 px-3 py-2 text-sm`}
                          onClick={() => setCurrentBranchFilter(filter)}>
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
                  }>
                  {currentDayFilter !== "ALL" ? currentDayFilter : "Day"}
                </Menu.Button>
                <Menu.Items className="overflow-hidden right-0 pb-1.5 mt-1 bg-[#286D8C]  absolute z-[1] text-center rounded-sm shadow-black/80 shadow-2xl">
                  {dayFilters.map((filter) => (
                    <Menu.Item key={filter}>
                      {({ active }) => (
                        <button
                          className={`${
                            currentDayFilter === filter ? "bg-black/50" : "bg-black/20"
                          } text-white rounded-sm m-1.5 mb-0 w-36 px-3 py-2 text-sm`}
                          onClick={() => setCurrentDayFilter(filter)}>
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
                onClick={() => setCurrentCategoryFilter(filter)}>
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
                }>
                {currentBranchFilter !== "ALL" ? currentBranchFilter : "Branch"}
              </Menu.Button>
              <Menu.Items className="overflow-hidden pb-1.5 mt-1 bg-[#2e768a] absolute z-50 text-center rounded-sm shadow-black/80 shadow-2xl">
                {branchFilters.map((filter) => (
                  <Menu.Item key={filter}>
                    {({ active }) => (
                      <button
                        className={`${
                          currentBranchFilter === filter ? "bg-black/50" : "bg-black/20"
                        } text-white rounded-sm m-1.5 mb-0 w-36 px-3 py-2 text-sm`}
                        onClick={() => setCurrentBranchFilter(filter)}>
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
                }>
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
                          currentCategoryFilter === filter ? "bg-black/50" : "bg-black/20"
                        } text-white rounded-sm m-1.5 mb-0 w-36 px-3 py-2 text-sm`}
                        onClick={() => setCurrentCategoryFilter(filter)}>
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
                }>
                {currentDayFilter !== "ALL" ? currentDayFilter : "Day"}
              </Menu.Button>
              <Menu.Items className="overflow-hidden right-0 pb-1.5 mt-1 bg-[#2e768a]  absolute z-50 text-center rounded-sm shadow-black/80 shadow-2xl">
                {dayFilters.map((filter) => (
                  <Menu.Item key={filter}>
                    {({ active }) => (
                      <button
                        className={`${
                          currentDayFilter === filter ? "bg-black/50" : "bg-black/20"
                        } text-white rounded-sm m-1.5 mb-0 w-36 px-3 py-2 text-sm`}
                        onClick={() => setCurrentDayFilter(filter)}>
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
      {filteredEvents.length < data.length && filteredEvents.length > 0 && (
        <div className="md:hidden flex mb-3 justify-center">
          <span className="text-gray-200  text-xs">
            Displaying {filteredEvents.length} event(s)
          </span>
        </div>
      )}
      <div className="md:p-10 md:pt-7 pt-1 p-4 flex justify-center ">
        {filteredEvents.length === 0 ? (
          <div className="bodyFont flex italic items-center justify-center min-h-[20rem] text-xl min-w-screen text-center text-gray-200/70">
            <span>No events found</span>
          </div>
        ) : (
          <div className="max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredEvents.map((event) => (
              <Event data={event} key={event.id} />
            ))}
          </div>
        )}
      </div>
      {/* Back to top button */}
      <AnimatePresence>
      {showTopButton && 
        <motion.div
        initial={{ translateY: "100%" }}
        animate={{ translateY: 0 }}
        exit={{ translateY: "100%" }}
        transition={{ duration: 0.5 }}

      className="sticky flex px-3 md:hidden justify-center bottom-0 z-50">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="bg-white shadow-lg rounded-full p-2 mb-5 text-[#41acc9]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      </motion.div>
      }
      </AnimatePresence>
    </div>
  );
};

export async function getStaticProps() {
  try {
    const { data: events } = await client.query({
      query: PublishedEventsDocument,
      fetchPolicy: 'no-cache',
    });

    return {
      props: {
        data: events.publishedEvents,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        data: [],
      },
      revalidate: 60,
    };
  }
}
export default Events;
