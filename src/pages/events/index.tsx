import Navbar from "@/src/components/navbar";
import { useAuth } from "@/src/hooks/useAuth";
import { bodyFont, titleFont } from "@/src/utils/fonts";
import { events } from "@/src/utils/events";
import Event from "@/src/components/event";
import { NextPage } from "next";
import { useState } from "react";

const Events: NextPage = () => {
  const { status, user } = useAuth();
  const [filter, setFilter] = useState("All");
  return (
    <div className="bg-[#B2E2D7] h-[100vh] w-[100vw]">
      <Navbar status={status} user={user} />
      <h1
        className={`${titleFont.className} font-bold text-5xl underline tracking-wide text-center my-5 mt-[8rem] absolute w-screen text-white`}
      >
        EVENTS
      </h1>
      <div className="flex justify-center space-x-5 translate-y-[13.5rem] w-screen eventNavigation">
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
      <div className="absolute mt-[16rem] flex justify-center w-screen bg-[#B2E2D7] ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-10">
          {filter === "All"
            ? events.map((event) => <Event data={event} key={event.id} />)
            : events
                .filter((event) => event.branch === filter)
                .map((event) => <Event data={event} key={event.id} />)}
        </div>
      </div>
    </div>
  );
};

export default Events;
