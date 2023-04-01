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
    <div className="bg-gradient-to-b from-[#46aacf]  via-[#075985] to-[#2d6aa6] min-h-screen relative">
      <Navbar status={status} user={user} />
      <h1
        className={`${titleFont.className} font-bold text-5xl tracking-wide text-center pt-32 text-white`}>
        EVENTS
      </h1>
      <div className="lg:flex justify-center gap-3 mt-10 mx-auto  hidden eventNavigation font-semibold">
        {filters.map((filter) => (
          <span
            key={filter}
            className={`${
              filter === currentFilter ? "bg-gray-300/60" : "hover:bg-gray-300/40"
            } text-white cursor-pointer rounded-full px-3 py-1`}
            onClick={() => setFilter(filter)}>
            {filter}
          </span>
        ))}
      </div>
      <div className="lg:hidden flex justify-center my-2 px-4 py-2 rounded-md">
        <Menu as={"div"} className={"relative inline-block"}>
          <Menu.Button
            className={
              "inline-flex bg-white/90 w-full justify-center rounded-full px-4 py-2 text-sm font-medium text-black"
            }>
            Filters
          </Menu.Button>
          <Menu.Items className="overflow-hidden pb-1.5 bg-white absolute z-[1] text-center translate-x-1/2 right-1/2  top-0 rounded-md shadow-lg">
            {filters.map((filter) => (
              <Menu.Item key={filter}>
                {({ active }) => (
                  <button
                    className={`${
                      currentFilter === filter ? "bg-sky-300" : "bg-white"
                    } text-black rounded-sm m-1.5 mb-0 w-32 px-3 py-2 text-sm`}
                    onClick={() => setFilter(filter)}>
                    {filter}
                  </button>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Menu>
      </div>
      {currentFilter !== "ALL" && data.length > 0 && (
        <div className="md:hidden flex mb-3 justify-center">
          <span className="text-gray-200  text-xs">
            Displaying {data.length} {currentFilter} event(s)
          </span>
        </div>
      )}
      <div className="md:p-10 md:pt-10 pt-1 p-4 flex justify-center ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {data.map((event) => (
            <Event data={event} key={event.id} />
          ))}
        </div>
      </div>
      {data.length === 0 && (
        <div className="flex italic items-center justify-center min-h-[20rem] text-2xl w-screen text-center text-gray-200/70">
          <span>no events found</span>
        </div>
      )}
    </div>
  );
};

export default Events;
