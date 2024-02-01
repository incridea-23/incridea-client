"use client"
import Event from "@/src/components/event";
import { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import { PublishedEventsDocument, PublishedEventsQuery } from "@/src/generated/generated";
import { client } from "@/src/lib/apollo";
import GlitchAnimation from "@/src/components/event/glitchAnimation";
import { Menu } from "@headlessui/react";
import { AiOutlineSearch } from "react-icons/ai";
import Lenis from '@studio-freight/lenis'
import "locomotive-scroll/dist/locomotive-scroll.css";
import Footer from "@/src/components/footer";
import Image from "next/image";
import styles from './styles.module.css'

const Events: NextPage<{ data: PublishedEventsQuery['publishedEvents'] }> = ({
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
          ? "2024-02-22"
          : currentDayFilter === "DAY 2"
          ? "2024-02-23"
          : "2024-02-24"
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

  const backgroundImages = ["crash.png","mario.png","pac-man.png","lara-croft.png","pikachu.png","sonic.png","kratos.png"]

 useEffect(() => {
  const lenis = new Lenis()

  function raf(time: any) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)
  }, [])

  return (
    <div
      className="overflow-x-hidden black-ops"
      style={{ willChange: 'transform' }}
    >
      <div className=" bg-gradient-to-bl from-black to-slate-900 min-h-screen relative">
        <div className={styles.area}>
          <ul className={styles.circles}>
            {backgroundImages.map((image, i) => (
              <li key={i}>
                <Image
                  src={`/assets/png/eventsPageBg/${image}`}
                  alt={`${image}`}
                  width={image === 'sonic.png' ? 50 : 100}
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
          className="relative px-2 md:px-10 flex flex-col items-center justify-center"
        >
          <div
            data-scroll-section
            className="flex flex-col pb-6 md:pb-12 justify-center min-h-screen"
          >
            <div
              data-scroll
              className={` md:pb-0 pb-6 text-7xl md:text-8xl tracking-wide text-center text-white  ${styles.glitch}`}
            >
              <GlitchAnimation
                title={'Events'}
                fontSize={7}
                mainHeading={false}
              />
            </div>
            <h3
              data-scroll
              className={`${styles.glitch} black-ops text-xl md:text-2xl tracking-wide text-center py-8 pt-12 px-2 text-white`}
            >
              Ctrl+Play: Navigate Your Digital Playground with Our Ultimate
              Event Collection!
            </h3>
            <div
              data-scroll
              className="relative lg:basis-[75%] basis-full w-full lg:w-auto"
            >
              <input
                className="text-white md:text-xl pl-8 bg-transparent border-2 p-2 rounded-2xl border-white w-full focus:outline-none placeholder-white placeholder-opacity-50"
                type="text"
                placeholder="Search for epic quests here..."
                value={query}
                onChange={handleSearch}
              />
              <AiOutlineSearch
                size={'1.4rem'}
                className="absolute right-3 top-3.5 text-gray-300/70"
              />
            </div>
            <div data-scroll>
              <div className="flex flex-row justify-between md:justify-evenly items-center py-4 w-full text-lg md:text-xl">
                <div className="flex flex-col md:flex-row justify-center items-center gap-4">
                  <Menu
                    as={'div'}
                    className={'relative w-full flex justify-center'}
                  >
                    <Menu.Button
                      className={
                        'inline-flex shrink-0 whitespace-nowrap bg-slate-900 hover:bg-slate-800 hover:scale-105 leading-6 w-full justify-center rounded-lg px-4 py-2 h-[40px] text-white'
                      }
                    >
                      {currentDayFilter !== 'ALL' ? currentDayFilter : 'Day'}
                    </Menu.Button>
                    <Menu.Items className="overflow-hidden top-9 pb-1.5 mt-1 bg-slate-900  absolute z-[100] text-center rounded-lg shadow-black/80 shadow-2xl">
                      {dayFilters.map((filter) => (
                        <Menu.Item key={filter}>
                          {({ active }) => (
                            <button
                              className={`${
                                currentDayFilter === filter
                                  ? 'bg-white/50'
                                  : 'bg-white/20'
                              } text-white rounded-sm m-1.5 mb-0 w-36 px-3 py-2 text-sm hover:bg-white/50`}
                              onClick={() => setCurrentDayFilter(filter)}
                            >
                              {filter.split(" ")[0]}<span className="bodyFont font-bold ml-1">{filter.split(" ")[1]}</span>
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Menu>
                </div>
                <div className="flex flex-col md:flex-row justify-center items-center gap-4">
                  <Menu
                    as={'div'}
                    className={'relative w-full flex justify-center'}
                  >
                    <Menu.Button
                      className={
                        'inline-flex shrink-0 whitespace-nowrap bg-slate-900 hover:bg-slate-800 hover:scale-105 leading-6 w-full justify-center rounded-lg px-4 py-2 h-[40px] text-white'
                      }
                    >
                      {currentCategoryFilter !== 'ALL'
                        ? currentCategoryFilter
                        : 'Category'}
                    </Menu.Button>
                    <Menu.Items className="overflow-hidden top-9 pb-1.5 mt-1 bg-slate-900  absolute z-[100] text-center rounded-lg shadow-black/80 shadow-2xl">
                      {categoryFilters.map((filter) => (
                        <Menu.Item key={filter}>
                          {({ active }) => (
                            <button
                              className={`${
                                currentCategoryFilter ===
                                filter.replace('_', ' ')
                                  ? 'bg-white/50'
                                  : 'bg-white/20'
                              } text-white rounded-sm m-1.5 mb-0 w-36 px-3 py-2 text-sm hover:bg-white/50`}
                              onClick={() => setCurrentCategoryFilter(filter)}
                            >
                              {filter.replace('_', ' ')}
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Menu>
                </div>
                <div className="flex flex-col md:flex-row justify-center items-center gap-4">
                  <Menu
                    as={'div'}
                    className={'relative w-full flex justify-center'}
                  >
                    <Menu.Button
                      className={
                        'inline-flex shrink-0 whitespace-nowrap bg-slate-900 hover:bg-slate-800 hover:scale-105 leading-6 w-full justify-center rounded-lg px-4 py-2 h-[40px] text-white'
                      }
                    >
                      {currentBranchFilter !== 'ALL'
                        ? currentBranchFilter
                        : 'Branch'}
                    </Menu.Button>
                    <Menu.Items className="overflow-x-hidden overflow-y-auto max-h-40 top-9 pb-1.5 mt-1 bg-slate-900 rounded-md  absolute z-[100] text-center shadow-black/80 shadow-2xl">
                      {branchFilters.map((filter) => (
                        <Menu.Item key={filter}>
                          {({ active }) => (
                            <button
                              className={`${
                                currentBranchFilter === filter
                                  ? 'bg-white/50'
                                  : 'bg-white/20'
                              } text-white rounded-sm m-1.5 mb-0 w-36 px-3 py-2 text-sm hover:bg-white/50`}
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
          </div>
          <div
            data-scroll-section
            data-scroll-speed="0.7"
            className={filteredEvents.length > 0 ? `max-w-7xl w-full h-full mx-auto grid justify-between grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mb-20`
                              :
                              "flex justify-center items-center w-full h-full"
          }
          >
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <Event key={event.id} data={event} />
              ))
            ) : (
              <div
                data-scroll
              className={`${styles.glitch} flex justify-center items-center text-center text-white text-3xl py-10`}
              >
                No events found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
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
