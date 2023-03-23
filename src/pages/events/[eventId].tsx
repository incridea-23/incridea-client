import { useRouter } from 'next/router';
import { NextPage } from 'next';
import Navbar from "@/src/components/navbar";
import { useAuth } from "@/src/hooks/useAuth";
import { bodyFont, titleFont } from "@/src/utils/fonts";
import Event from "@/src/utils/eventTestData";

const EventPage: NextPage = () => {
  const router = useRouter();
  const { eventId } = router.query; //geting event id from url
  const { status, loading, error, user } = useAuth();
  const event = Event.data.eventById;

  if (loading) return <div>Loading...</div>; // Loading page here
  if (error) return <div>Something went wrong</div>; // Error page here

  return (
    <div className="relative bg-gradient-to-b h-[300vh] from-[#5CA3AD]  via-[#2b8da2] to-[#2b8da2] overflow-x-hidden">
      <Navbar status={status} user={user} />
      <div className='flex justify-center w-screen mt-24 '>
        <h1 className={`${titleFont.className} flex justify-center text-5xl absolute w-screen`}>{event.name}</h1>
      </div>
      <div>
        
      </div>
    </div>
  );
}

export default EventPage;