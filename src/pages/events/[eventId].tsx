import { useRouter } from "next/router";
import { NextPage } from "next";
import Navbar from "@/src/components/navbar";
import { useAuth } from "@/src/hooks/useAuth";
import { bodyFont, titleFont } from "@/src/utils/fonts";
import EventCard from "@/src/components/pages/eachEvent/Event";

const EventPage: NextPage = () => {
  const router = useRouter();
  const { eventId } = router.query; //geting event id from url
  const { status, loading, error, user } = useAuth();

  if (loading) return <div>Loading...</div>; // Loading page here
  if (error) return <div>Something went wrong</div>; // Error page here

  return (
    <div className="relative bg-[#B2E2D7] h-[300vh] overflow-x-hidden">
      <Navbar status={status} user={user} />
      <EventCard eventId={eventId as string} />
    </div>
  );
};

export default EventPage;
