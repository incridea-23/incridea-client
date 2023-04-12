import { NextPage } from 'next';
import Image from 'next/image';

const Terms: NextPage = () => {
  return (
    <div className="w-full overflow-x-hidden overflow-y-auto bg-gradient-to-bl  from-[#41acc9]  via-[#075985] to-[#2d6aa6] text-gray-100 p-5 sm:p-10">
      <Image
        src="/assets/png/waterflare.png"
        height={1000}
        width={1000}
        alt="flare"
        className="absolute opacity-40 z-10 top-0 right-0"
      />
      <h1 className={`titleFont pt-24 text-5xl mb-3 text-center`}>
        Terms and Conditions
      </h1>
      <ul className="list-disc ml-6 mt-8">
        <li>
          Incridea is a National level techno-cultural festival for the students
          of technical institutes across the country. However, some events like
          Battle of the Bands, Couture, Vibe and Stomp That! (Termed as semi-pro
          events here onwards) are open to all the colleges in the country.
        </li>
        <li>Teams can only be formed by participants of the same college. </li>
        <li>
          The registrations for semi-pro events are done via invites. Please
          refer the event details provided under special/core events for more
          details.
        </li>
        <li>
          The points gained by the colleges attending the semi-pro events will
          not be considered for the overall championship.
        </li>
        <li>
          Participants must follow all the rules and regulations of the college.
          Display of any unruly behaviour shall lead to disqualification of the
          team and expulsion of the participant from the fest.
        </li>
        <li>
          Consumption of any alcoholic drinks, use of any hallucinogenic drugs
          or other illegal substances anywhere in the campus premises is
          strictly prohibited. Any person who has consumed such substances and
          are attempting to enter the campus, shall be debarred from doing so.
        </li>
        <li>
          Organisers hold the right to change the rules of the event before the
          event begins without prior notice.
        </li>
        <li>
          NMAMIT/NITTE University is not responsible for any loss or damage of
          participant&apos;s personal belongings.
        </li>
        <li>
          The entry for the events and pro-nites will be through the digital PID
          present on the Incridea App. The participant must also present their
          college ID card (compulsory) and Valid government issued ID Proof (Any
          one) (Aadhaar, Driving license, Voter ID, etc.).
        </li>
        <li>
          By participating in Incridea, you agree to abide by the above terms &
          conditions. Any participant found violating the above rules may be
          immediately expelled from the campus. His/her/their registration from
          all the events may be cancelled and he/she/they will be penalised
          appropriately. NMAMIT & NITTE University reserve the right to take any
          appropriate legal actions in any case that requires it.
        </li>
      </ul>
      <h2 className="text-2xl mt-4">Refund Policy</h2>
      <p className="mt-2">
        Refunds in any particular case can only be initiated upon request.
        Please reach out to the Technical Heads of Incridea for refunds.
      </p>
      <ul className="list-disc ml-10">
        <li>name +91 phone no</li>
        <li>name +91 phone no</li>
        <li>name +91 phone no</li>
      </ul>
      <div className={`flex w-full -translate-x-10 translate-y-8 opacity-75`}>
        <Image
          src={'/assets/png/atlantis.png'}
          width={750}
          height={50}
          className="object-center"
          alt="atlantis"
        />
        <Image
          src={'/assets/png/atlantis.png'}
          width={750}
          height={50}
          className="object-center"
          alt="atlantis"
        />
      </div>
    </div>
  );
};

export default Terms;
