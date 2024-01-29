import Link from 'next/link';
import EventsPeek from '.';
import TextAnimation from '../animation/text';
import Button from '../button';

const EventsReel = () => {
  return (
    <section>
      
      <EventsPeek speed={5} />

      <div className="md:mt-12 -mt-7 flex justify-center">
        <TextAnimation
          text="Events"
          className={`titleFont`}
          textStyle="text-2xl font-semibold lg:text-4xl text-white"
        />
      </div>
      <div className="mx-auto px-4 max-w-3xl">
        <p className="text-sm lg:text-lg md:mt-10 mt-5 text-center text-white bodyFont">
          Experience a thrilling adventure that will awaken your senses to the
          core!
          <br /> With a diverse range of offerings in music, art, sports, and
          technology, there&apos;s something for everyone. Come dive into the
          deep ocean of excitement and discover unforgettable experiences.
        </p>
        <Link className="flex justify-center w-fit mx-auto mt-5" href={'/events'}>
          <Button>View Events</Button>
        </Link>
      </div>
    </section>
  );
};

export default EventsReel;
