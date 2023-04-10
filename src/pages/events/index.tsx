import Navbar from "@/src/components/navbar";
import { useAuth } from "@/src/hooks/useAuth";
import { bodyFont, titleFont } from "@/src/utils/fonts";
import Event from "@/src/components/event";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { Menu } from "@headlessui/react";
import { PublishedEventsDocument, PublishedEventsQuery } from "@/src/generated/generated";
import Image from "next/image";
import { client } from "@/src/lib/apollo";
import SearchBox from "@/src/components/searchbox";
import { AiOutlineSearch } from "react-icons/ai";

const Events: NextPage<{ data: PublishedEventsQuery["publishedEvents"] }> = ({
  data,
}) => {
  const branchFilters = [
    "ALL",
    "CORE",
    "CSE",
    "ISE",
    "AI/ML",
    "CC",
    "ECE",
    "EEE",
    "MECH",
    "CIVIL",
    "ROBOTICS",
  ];

  const dayFilters = ["ALL", "DAY 1", "DAY 2", "DAY 3", "DAY 4"];
  const typeFilters = ["ALL", "TECHNICAL", "NON_TECHNICAL", "CORE"];
  const [currentBranchFilter, setCurrentBranchFilter] =
    useState<typeof branchFilters[number]>("ALL");
  const [currentDayFilter, setCurrentDayFilter] =
    useState<typeof dayFilters[number]>("ALL");
  const [currentTypeFilter, setCurrentTypeFilter] =
    useState<typeof branchFilters[number]>("ALL");
  const [query, setQuery] = useState("");

  const [filteredEvents, setFilteredEvents] = useState(data || []);

  const handleBranchFilter = (filter: typeof branchFilters[number]) => {
    setQuery("");
    setCurrentBranchFilter(filter);
    if (filter === "ALL") {
      if (currentDayFilter === "ALL" && currentTypeFilter === "ALL")
        setFilteredEvents(data || []);
      else {
        handleDayFilter(currentDayFilter);
        handleTypeFilter(currentTypeFilter);
      }
      // setFilteredEvents(data || []);
    } else {
      setFilteredEvents(data.filter((event) => event.branch.name === filter));
    }
  };

  const handleDayFilter = (filter: typeof dayFilters[number]) => {
    setQuery("");
    setCurrentDayFilter(filter);
    if (filter === "ALL") {
      if (currentBranchFilter === "ALL" && currentTypeFilter === "ALL")
        setFilteredEvents(data || []);
      else {
        handleBranchFilter(currentBranchFilter);
        handleTypeFilter(currentTypeFilter);
      }
      // setFilteredEvents(data || []);
    } else {
      let filteredDay = new Date(
        filter === "DAY 1"
          ? "2023-04-26"
          : filter === "DAY 2"
          ? "2023-04-27"
          : filter === "DAY 3"
          ? "2023-04-28"
          : "2023-04-29"
      ).getDate();
      setFilteredEvents(
        data.filter((event) =>
          event.rounds.some((round) => new Date(round.date).getDate() === filteredDay)
        )
      );
    }
  };

  const handleTypeFilter = (filter: typeof typeFilters[number]) => {
    setQuery("");
    setCurrentTypeFilter(filter);
    if (filter === "ALL") {
      if (currentBranchFilter === "ALL" && currentDayFilter === "ALL")
        setFilteredEvents(data || []);
      else {
        handleBranchFilter(currentBranchFilter);
        handleTypeFilter(currentDayFilter);
      }
    } else {
      setFilteredEvents(data.filter((event) => event.eventCategory === filter));
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setCurrentBranchFilter("ALL");
    setCurrentDayFilter("ALL");
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
    setCurrentTypeFilter("ALL");
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
      />
      <h1
        className={`${titleFont.className} font-bold text-5xl tracking-wide text-center pt-32 text-white`}>
        EVENTS
      </h1>
      <div className="flex flex-wrap items-center gap-2 md:mx-10 mx-4 lg:justify-between lg:flex-col lg:mx-auto mt-4">
        <div className="relative lg:w-[800px] w-full">
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
        <div className="lg:flex lg:w-[800px] justify-between gap-3 mt-4 mx-auto  hidden eventNavigation font-semibold">
          {branchFilters.map((filter) => (
            <span
              key={filter}
              className={`${
                filter === currentBranchFilter ? "bg-black/20" : "hover:bg-black/10"
              } text-white cursor-pointer rounded-sm px-3 py-1`}
              onClick={() => handleBranchFilter(filter)}>
              {filter}
            </span>
          ))}
        </div>
        <div className="lg:flex lg:w-[800px] justify-between gap-3 mt-4 mx-auto  hidden eventNavigation font-semibold">
          {dayFilters.map((filter) => (
            <span
              key={filter}
              className={`${
                filter === currentDayFilter ? "bg-black/20" : "hover:bg-black/10"
              } text-white cursor-pointer rounded-sm px-3 py-1`}
              onClick={() => handleDayFilter(filter)}>
              {filter}
            </span>
          ))}
        </div>
        <div className="lg:flex lg:w-[800px] justify-between gap-3 mt-4 mx-auto  hidden eventNavigation font-semibold">
          {typeFilters.map((filter) => (
            <span
              key={filter}
              className={`${
                filter === currentTypeFilter ? "bg-black/20" : "hover:bg-black/10"
              } text-white cursor-pointer rounded-sm px-3 py-1`}
              onClick={() => handleTypeFilter(filter)}>
              {filter.replace("_", " ")}
            </span>
          ))}
        </div>
        <div className="lg:hidden flex justify-center  py-2">
          <Menu as={"div"} className={"relative inline-block"}>
            <Menu.Button
              className={
                "inline-flex bg-black/30 leading-6 w-full justify-center rounded-sm px-4 py-2 h-[40px] text-sm font-medium text-white"
              }>
              {currentBranchFilter !== "ALL" ? currentBranchFilter : "Branch"}
            </Menu.Button>
            <Menu.Items className=" overflow-hidden pb-1.5 mt-1 bg-[#075985] absolute z-[1] text-center rounded-sm shadow-lg">
              {branchFilters.map((filter) => (
                <Menu.Item key={filter}>
                  {({ active }) => (
                    <button
                      className={`${
                        currentBranchFilter === filter ? "bg-black/70" : "bg-black/40"
                      } text-white rounded-sm m-1.5 mb-0 w-32 px-3 py-2 text-sm`}
                      onClick={() => handleBranchFilter(filter)}>
                      {filter}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Menu>
        </div>
        <div className="lg:hidden flex justify-center  py-2">
          <Menu as={"div"} className={"relative inline-block"}>
            <Menu.Button
              className={
                "inline-flex bg-black/30 leading-6 w-full justify-center rounded-sm px-4 py-2 h-[40px] text-sm font-medium text-white"
              }>
              {currentDayFilter !== "ALL" ? currentDayFilter : "Day"}
            </Menu.Button>
            <Menu.Items className="overflow-hidden pb-1.5 mt-1 bg-[#075985]  absolute z-[1] text-center rounded-sm shadow-lg">
              {dayFilters.map((filter) => (
                <Menu.Item key={filter}>
                  {({ active }) => (
                    <button
                      className={`${
                        currentDayFilter === filter ? "bg-black/70" : "bg-black/40"
                      } text-white rounded-sm m-1.5 mb-0 w-32 px-3 py-2 text-sm`}
                      onClick={() => handleDayFilter(filter)}>
                      {filter}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Menu>
        </div>
      </div>
      {filteredEvents.length < data.length && filteredEvents.length > 0 && (
        <div className="md:hidden flex mb-3 justify-center">
          <span className="text-gray-200  text-xs">
            Displaying {filteredEvents.length} event(s)
          </span>
        </div>
      )}
      <div className="md:p-10 md:pt-10 pt-1 p-4 flex justify-center ">
        {filteredEvents.length === 0 ? (
          <div className="flex italic items-center justify-center min-h-[20rem] text-xl w-screen text-center text-gray-200/70">
            <span>no events found</span>
          </div>
        ) : (
          <div className="max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredEvents.map((event) => (
              <Event data={event} key={event.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export async function getStaticProps() {
  try {
    const { data: events } = await client.query({
      query: PublishedEventsDocument,
      fetchPolicy: "no-cache",
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
