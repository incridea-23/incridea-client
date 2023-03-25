import Navbar from "@/src/components/navbar";
import { useAuth } from "@/src/hooks/useAuth";
import { bodyFont, titleFont } from "@/src/utils/fonts";
import { events } from "@/src/utils/events";
import Event from "@/src/components/event";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { Menu } from "@headlessui/react";

const Events: NextPage = () => {
  const { status, user } = useAuth();
  const [filter, setFilter] = useState("All");
  const [data, setData] = useState(events);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (filter === "All") {
      setData(events);
    } else {
      setData(events.filter((event) => event.branch === filter));
    }
  }, [filter]);

  return (
    <div className="bg-[#B2E2D7] h-[100vh] w-[100vw] relative">
      <Navbar status={status} user={user} />
      <h1
        className={`${titleFont.className} font-bold text-5xl underline tracking-wide text-center my-5 mt-[8rem] absolute w-screen text-white`}
      >
        EVENTS
      </h1>
      <div className="md:flex justify-center lg:space-x-3 md:space-x-2 space-x-1 xl:space-x-5 translate-y-[13.5rem] xl:w-screen mx-auto md:w-[30vw] hidden eventNavigation font-semibold">
        <span onClick={() => setFilter("All")}>All</span>
        <span onClick={() => setFilter("CORE")}>CORE</span>
        <span onClick={() => setFilter("CSE")}>CSE</span>
        <span onClick={() => setFilter("ISE")}>ISE</span>
        <span onClick={() => setFilter("AI/ML")}>AI/ML</span>
        <span onClick={() => setFilter("CC")}>CC</span>
        <span onClick={() => setFilter("ECE")}>ECE</span>
        <span onClick={() => setFilter("EEE")}>EEE</span>
        <span onClick={() => setFilter("MECH")}>MECH</span>
        <span onClick={() => setFilter("CIVIL")}>CIVIL</span>
        <span onClick={() => setFilter("ROBOTICS")}>ROBOTICS</span>
      </div>
      <span className="absolute top-[12rem] right-[3rem] md:hidden bg-white px-4 py-2 rounded-md z-[100] w-[8rem]">
        <Menu>
          <Menu.Button>Filters</Menu.Button>
          <Menu.Items className="flex flex-col divide-y-2 text-md mt-4">
            <Menu.Item>
              {({ active }) => (
                <span onClick={() => setFilter("All")}>All</span>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <span onClick={() => setFilter("CORE")}>CORE</span>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <span onClick={() => setFilter("CSE")}>CSE</span>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <span onClick={() => setFilter("ISE")}>ISE</span>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <span onClick={() => setFilter("AI/ML")}>AI/ML</span>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => <span onClick={() => setFilter("CC")}>CC</span>}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <span onClick={() => setFilter("ECE")}>ECE</span>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <span onClick={() => setFilter("EEE")}>EEE</span>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <span onClick={() => setFilter("MECH")}>MECH</span>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <span onClick={() => setFilter("CIVIL")}>CIVIL</span>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <span onClick={() => setFilter("ROBOTICS")}>ROBOTICS</span>
              )}
            </Menu.Item>
          </Menu.Items>
        </Menu>
      </span>
      <div className="absolute mt-[16rem] flex justify-center w-screen bg-[#B2E2D7] ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-10">
          {data.map((event) => (
            <Event data={event} key={event.id} />
          ))}
        </div>
      </div>
      {data.length === 0 && (
        <div className="translate-y-[25rem] text-2xl w-screen text-center text-[#6d878a] bg-[#B2E2D7]">
          No Event Found !!
        </div>
      )}
    </div>
  );
};

export default Events;
