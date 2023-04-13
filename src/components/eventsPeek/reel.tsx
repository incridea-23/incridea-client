import Link from 'next/link';
import EventsPeek from '.';
import TextAnimation from '../animation/text';
import Button from '../button';

const EventsReel = () => {
  return (
    <section>
      <div className="mb-5 flex justify-center">
        <TextAnimation
          text="Events"
          className={`titleFont`}
          textStyle="text-2xl font-semibold lg:text-4xl text-white"
        />
      </div>

      {/* <div className="relative"> */}
      {/* <div className="absolute blur-md top-6">
          <EventsPeek speed={-5} />
        </div> */}
      <div>
        <EventsPeek speed={5} />
      </div>
      {/* </div> */}

      <div className="mx-auto px-4 max-w-2xl">
        <p className="text-sm lg:text-lg mt-12 text-center text-white bodyFont">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          voluptates, quod, quia, voluptate quae voluptatem quibusdam quos
          accusantium quas natus quidem. Quisquam, quae. Quisquam, quae.
          Quisquam,
        </p>
        <Link className="flex justify-center mt-5" href={'/events'}>
          <Button>View Events</Button>
        </Link>
      </div>
    </section>
  );
};

export default EventsReel;
