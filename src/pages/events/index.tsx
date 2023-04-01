import Navbar from "@/src/components/navbar";
import { useAuth } from "@/src/hooks/useAuth";
import { bodyFont, titleFont } from "@/src/utils/fonts";
import { events } from "@/src/utils/events";
import Event from "@/src/components/event";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { Menu } from "@headlessui/react";

const Events: NextPage = () => {
  const filters = [
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
  const { status, user } = useAuth();
  const [currentFilter, setFilter] = useState<typeof filters[number]>("ALL");
  const [data, setData] = useState(events);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (currentFilter === "ALL") {
      setData(events);
    } else {
      setData(events.filter((event) => event.branch === currentFilter));
    }
  }, [currentFilter]);

  return (
    <div className="bg-[#B2E2D7] min-h-screen relative">
      <Navbar status={status} user={user} />
      <h1
        className={`${titleFont.className} font-bold text-5xl tracking-wide text-center pt-[8rem] text-white`}>
        EVENTS
      </h1>
      <div className="md:flex justify-center gap-3 mt-5 mx-auto  hidden eventNavigation font-semibold">
        {filters.map((filter) => (
          <span
            key={filter}
            className={`${
              filter === currentFilter ? "bg-white/60" : "hover:bg-white/40"
            } text-black cursor-pointer rounded-full px-3 py-1`}
            onClick={() => setFilter(filter)}>
            {filter}
          </span>
        ))}
      </div>
      <span className="md:hidden flex justify-end mx-auto px-4 py-2 rounded-md">
        <Menu as={'div'} className={'relative inline-block'}>
          <Menu.Button className={"inline-flex bg-white/80 w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-black"}>Filter</Menu.Button>
          <Menu.Items className="overflow-hidden absolute z-50 right-0 mt-2 w-40 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {filters.map((filter) => (
              <Menu.Item key={filter} >
                {({ active }) => <button
                className={`${active ? 'bg-sky-500' : 'bg-white'} text-black flex w-full justify-end items-center px-3 py-2  text-sm`}
                 onClick={() => setFilter(filter)}>
                  {filter}
                  </button>}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Menu>
      </span>
      <div className="md:p-10 md:pt-10 pt-1 p-4 flex justify-center bg-[#B2E2D7] ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {data.map((event) => (
            <Event data={event} key={event.id} />
          ))}
        </div>
      </div>
      {data.length === 0 && (
        <div className="flex items-center justify-center min-h-[20rem] text-2xl w-screen text-center text-[#6d878a] bg-[#B2E2D7]">
          <span>No Events Found</span>
        </div>
      )}
    </div>
  );
};

export default Events;
