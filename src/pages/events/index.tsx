"use client";
import Event from "@/src/components/event";
import { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import {
  PublishedEventsDocument,
  PublishedEventsQuery,
} from "@/src/generated/generated";
import { client } from "@/src/lib/apollo";
import { Menu } from "@headlessui/react";
import { AiOutlineSearch } from "react-icons/ai";
import Lenis from "@studio-freight/lenis";
import "locomotive-scroll/dist/locomotive-scroll.css";
import Image from "next/image";
import styles from "./styles.module.css";
import { IoTodayOutline } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";
import { FaUniversity } from "react-icons/fa";
import { CiWarning } from "react-icons/ci";

const Events: NextPage<{ data: PublishedEventsQuery["publishedEvents"] }> = ({
  data,
}) => {
  const containerRef = useRef(null);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  // TODO: add new branchs
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

  const dayFilters = ["ALL", "DAY 1", "DAY 2", "DAY 3"];
  const categoryFilters = ["ALL", "TECHNICAL", "NON_TECHNICAL", "CORE"];
  const [currentBranchFilter, setCurrentBranchFilter] =
    useState<(typeof branchFilters)[number]>("ALL");
  const [currentDayFilter, setCurrentDayFilter] =
    useState<(typeof dayFilters)[number]>("ALL");
  const [currentCategoryFilter, setCurrentCategoryFilter] =
    useState<(typeof branchFilters)[number]>("ALL");
  const [query, setQuery] = useState("");

  const [filteredEvents, setFilteredEvents] = useState(data || []);

  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: any) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

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
          ? "2024-02-22"
          : currentDayFilter === "DAY 2"
          ? "2024-02-23"
          : "2024-02-24"
      ).getDate();
      tempFilteredEvents = tempFilteredEvents.filter((event) =>
        event.rounds.some(
          (round) => new Date(round.date).getDate() === filteredDay
        )
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

  const backgroundImages = [
    "crash.png",
    "mario.png",
    "pac-man.png",
    "lara-croft.png",
    "pikachu.png",
    "sonic.png",
    "kratos.png",
  ];

  return (
    <div
      className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-primary-300 to-primary-500 relative overflow-x-hidden mx-auto px-5 sm:px-7 lg:px-10"
      style={{ willChange: "transform" }}
    >
      <div className={styles.area}>
        <ul className={styles.circles}>
          {backgroundImages.map((image, i) => (
            <li key={i}>
              <Image
                src={`/assets/png/eventsPageBg/${image}`}
                alt={`${image}`}
                width={image === "sonic.png" ? 50 : 100}
                height={100}
                className="text-white bodyFont"
              />
            </li>
          ))}
        </ul>
      </div>

      <div
        data-scroll-container
        ref={containerRef}
        className={`relative px-2 md:px-10 ${
          filteredEvents.length > 0 ? "pt-28" : "pt-10 md:pt-20"
        } flex flex-col items-center justify-center`}
      >
        <div data-scroll-section className="flex flex-col mb-2 justify-center">
          <h1
            data-scroll
            className={`text-7xl md:text-8xl tracking-wide text-center text-white font-VikingHell`}
          >
            Events
          </h1>

          <h2
            data-scroll
            className={`text-md md:text-xl tracking-wide text-center mt-2 md:mt-4 mb-6 mx-2 text-white`}
          >
            Navigate Your Digital Playground with Our Ultimate Event Collection!
          </h2>

          <div className="relative lg:basis-[75%] basis-full w-full lg:w-auto">
            <input
              value={query}
              onChange={handleSearch}
              className="w-full pr-14 border border-gray-200/30 bg-black/30 placeholder:text-gray-200 focus:outline-none text-white rounded-full pl-6 p-3"
              placeholder="Search for epic quests here..."
              type="text"
            />
            <AiOutlineSearch
              size={"1.4rem"}
              className="absolute right-6 top-3 text-gray-200"
            />
          </div>

          <div
            data-scroll
            className="flex flex-row justify-between md:justify-evenly items-center py-4 w-full text-lg md:text-xl"
          >
            <div className="flex flex-col md:flex-row justify-center items-center gap-4">
              <Menu
                as={"div"}
                className={"relative w-full flex justify-center"}
              >
                <Menu.Button
                  className={
                    "inline-flex shrink-0 gap-2 text-sm md:text-lg whitespace-nowrap bg-black/30 border border-gray-200/30 items-center w-full justify-center rounded-full px-4 py-2 h-[40px] text-white"
                  }
                >
                  <IoTodayOutline size={isMobile ? 10 : 16} />
                  {currentDayFilter !== "ALL" ? currentDayFilter : "Day"}
                </Menu.Button>
                <Menu.Items className="overflow-hidden bg-primary-300 border border-gray-200/30 top-11 p-2 flex flex-col gap-2 mt-1 absolute z-[100] text-center rounded-3xl shadow-black/80 shadow-2xl">
                  {dayFilters.map((filter) => (
                    <Menu.Item key={filter}>
                      {({ active }) => (
                        <button
                          className={`${
                            currentDayFilter === filter
                              ? "bg-white/20"
                              : "bg-black/10"
                          } text-white rounded-full w-36 px-3 py-1.5 text-sm hover:bg-white/10 border border-gray-200/20 transition-all duration-300`}
                          onClick={() => setCurrentDayFilter(filter)}
                        >
                          {filter.split(" ")[0]} {filter.split(" ")[1]}
                        </button>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Menu>
            </div>
            <div className="flex flex-col md:flex-row justify-center items-center gap-4">
              <Menu
                as={"div"}
                className={"relative w-full flex justify-center"}
              >
                <Menu.Button
                  className={
                    "inline-flex shrink-0 gap-2 text-sm md:text-lg whitespace-nowrap bg-black/30 border border-gray-200/30 items-center w-full justify-center rounded-full px-4 py-2 h-[40px] text-white"
                  }
                >
                  <BiCategory size={isMobile ? 10 : 16} />
                  {currentCategoryFilter !== "ALL"
                    ? currentCategoryFilter
                    : "Category"}
                </Menu.Button>
                <Menu.Items className="overflow-hidden bg-primary-300 border border-gray-200/30 top-11 p-2 flex flex-col gap-2 mt-1 absolute z-[100] text-center rounded-3xl shadow-black/80 shadow-2xl">
                  {categoryFilters.map((filter) => (
                    <Menu.Item key={filter}>
                      {({ active }) => (
                        <button
                          className={`${
                            currentCategoryFilter === filter.replace("_", " ")
                              ? "bg-white/20"
                              : "bg-black/10"
                          } text-white rounded-full w-36 px-3 py-1.5 text-sm hover:bg-white/10 border border-gray-200/20 transition-all duration-300`}
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
            <div className="flex flex-col md:flex-row justify-center items-center gap-4">
              <Menu
                as={"div"}
                className={"relative w-full flex justify-center"}
              >
                <Menu.Button
                  className={
                    "inline-flex shrink-0 gap-2 text-sm md:text-lg whitespace-nowrap bg-black/30 border border-gray-200/30 items-center w-full justify-center rounded-full px-4 py-2 h-[40px] text-white"
                  }
                >
                  <FaUniversity size={isMobile ? 10 : 16} />
                  {currentBranchFilter !== "ALL"
                    ? currentBranchFilter
                    : "Branch"}
                </Menu.Button>
                <Menu.Items className="bg-primary-300 border border-gray-200/30 top-11 p-2 flex flex-col gap-2 overflow-x-hidden overflow-y-auto max-h-40 mt-1 rounded-3xl absolute z-[100] text-center shadow-black/80 shadow-2xl">
                  {branchFilters.map((filter) => (
                    <Menu.Item key={filter}>
                      {({ active }) => (
                        <button
                          className={`${
                            currentBranchFilter === filter
                              ? "bg-white/20"
                              : "bg-black/10"
                          } text-white rounded-full w-36 px-3 py-1.5 text-sm hover:bg-white/10 border border-gray-200/20 transition-all duration-300`}
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
          </div>
        </div>

        <div
          data-scroll-section
          data-scroll-speed="0.7"
          className={
            filteredEvents.length > 0
              ? `max-w-7xl w-full h-full mx-auto grid justify-between grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mb-20`
              : "flex justify-center items-center w-full h-full"
          }
        >
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => <Event key={event.id} data={event} />)
          ) : (
            <div
              data-scroll
              className={`w-full flex flex-col bg-black/30 p-10 rounded-xl gap-5 justify-center items-center text-center text-white text-xl border border-gray-200/30`}
            >
              <CiWarning size={50} />
              No events found
            </div>
          )}
        </div>
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
