import Navbar from "@/src/components/navbar";
import { useAuth } from "@/src/hooks/useAuth";
import { bodyFont, titleFont } from "@/src/utils/fonts";
import { events } from "@/src/utils/events";
import Event from "@/src/components/event";
import { NextPage } from "next";

const Events: NextPage = () => {
  const { status, user } = useAuth();
  return (
    <div className="bg-[#B2E2D7] h-[100vh] w-[100vw]">
      <Navbar status={status} user={user} />
      <h1
        className={`${titleFont.className} font-bold text-5xl underline tracking-wide text-center my-5 mt-[8rem] absolute w-screen text-white`}
      >
        EVENTS
      </h1>
      <div className="absolute mt-[15rem] flex justify-center w-screen bg-[#B2E2D7] ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-10">
          {events.map((event) => (
            <Event data={event} key={event.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
