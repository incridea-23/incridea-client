import { NextPage } from 'next';
import Image from 'next/image';

const Guidelines: NextPage = () => {
  return (
    <div className="overflow-x-hidden overflow-y-auto bg-gradient-to-bl  from-[#41acc9]  via-[#075985] to-[#2d6aa6] text-gray-100 p-5 sm:p-10">
      <div className="w-full max-w-7xl mx-auto">
        <Image
          src="/assets/png/waterflare.png"
          height={1000}
          width={1000}
          alt="flare"
          className="absolute opacity-40 z-10 top-0 right-0"
          priority
        />
        <h1 className={`titleFont pt-24 text-5xl mb-3 text-center`}>
          Guidelines
        </h1>
        <div className='bodyFont'>
          <h2 className="text-2xl my-6">OVERVIEW</h2>
          <p className="mt-2">
            Incridea is a national-level techno-cultural festival that offers a
            variety of events for technical institutes across the country. This
            festival is open to all students; however, some events are exclusive
            to select colleges in the country. This article outlines the
            guidelines and regulations that participants need to follow while
            participating in the festival.
          </p>

          <h2 className="text-2xl my-6">Event Registration:</h2>
          <ul className="mt-2 list-disc pl-4">
            <li>
              Some events such as Battle of the Bands, Couture, Vibe, Stomp
              That, and Navarasa are open to all colleges in the country.
            </li>
            <li>
              To register for these events, participants must receive an invite
              from their college.
            </li>
            <li>
              Further information regarding registration can be found under
              special/core events.
            </li>
          </ul>

          <h2 className="text-2xl my-6">Participant Identification:</h2>
          <ul className="mt-2 list-disc pl-4">
            <li>
              All participants must present a valid PID (Participant
              Identification) during registration.
            </li>
            <li>
              The PID provided must belong to the participant registering for
              the event, and the organizers reserve the right to verify its
              authenticity.
            </li>
            <li>
              Any participant found to have provided false or misleading
              information will be disqualified.
            </li>
            <li>
              Participants are responsible for ensuring the accuracy and
              validity of their PID and other personal information. Failure to
              provide a valid PID will result in the participant being
              ineligible to participate in the event.
            </li>
          </ul>
         {/* <h2 className="text-2xl my-6">Event Scoring:</h2>
          <p className="mt-2">
            Every event included in Incridea counts towards the overall
            championship, with the following weightage:
          </p>
          <ul className="mt-2 list-disc pl-4">
            <li>First prize: 5 points</li>
            <li>Second prize: 3 points</li>
            <li>Third prize: 1 point</li>
          </ul>
          <p className="mt-2">
            The championship will be awarded based on the sum of all points
            scored by a college.
          </p> */}
          <h2 className="text-2xl my-6">Rules and Regulations:</h2>
          <ul className="mt-2 list-disc pl-4">
            <li>
              Participants must follow all the rules and regulations set forth
              by the college.
            </li>
            <li>
              Any unruly behaviour may lead to disqualification of the team and
              expulsion of the participant from the festival.
            </li>
          </ul>
          <h2 className="text-2xl my-6">Prohibited Conduct:</h2>
          <ul className="mt-2 list-disc pl-4">
            <li>
              The consumption of alcoholic drinks, use of hallucinogenic drugs
              or other illegal substances on the campus premises is strictly
              prohibited.
            </li>
            <li>
              Any person attempting to enter the campus after consuming such
              substances shall be debarred from doing so.
            </li>
          </ul>
          <h2 className="text-2xl my-6">Event Rules:</h2>
          <ul className="mt-2 list-disc pl-4">
            <li>
              The organizers of any event hold the right to change the rules of
              their event prior to its commencement as they see fit, without any
              obligation of notice.
            </li>
            <li>
              NMAMIT/NITTE University is not responsible for any loss or damage
              to participant&apos;s personal belongings.
            </li>
          </ul>
          <h2 className="text-2xl my-6">Entry and Access:</h2>
          <ul className="mt-2 list-disc pl-4">
            <li>
              Entry for events and pronites will be via the Incridea app or
              website.
            </li>
            <li>
              Attendees must present their college IDs along with a valid
              government-issued ID proof (Aadhaar, driving license, Voter ID,
              etc.) to access the event and pronites.
            </li>
          </ul>
          <h2 className="text-2xl my-6">Participant Categories:</h2>
          <p className="mt-2">
            Four different categories of participants are permitted to
            participate:
          </p>
          <ol className="mt-2 list-decimal pl-4">
            <li>
              {' '}
              NMAM Institute of Technology students who pay ₹200 will have
              access to all events and pronites
            </li>
            <li>
              {' '}
              Engineering college students, other than NMAMIT, who pay ₹300 will
              have access to all events and pronites.
            </li>
            <li>
              Non-engineering college and Nitte sister college students who pay
              ₹300 will have access only to Core Events and pronites.
            </li>
            <li>
              {' '}
              Invite-only participants who pay ₹150 will have access to the one
              core event they were invited to. If the invite-only participant is
              a college student and wants to attend pronite, they will have to
              register as given in point 3.
            </li>
          </ol>
          <p className="mt-2">
            By participating in Incridea, participants agree to abide by the
            guidelines and regulations outlined above. Any participant found
            violating the rules may be immediately expelled from the campus.
            Their registration for all events may be cancelled, and they will be
            penalized appropriately. NMAMIT & NITTE University reserve the right
            to take any appropriate legal actions in any case that requires it.
          </p>
        </div>
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
    </div>
  );
};

export default Guidelines;
