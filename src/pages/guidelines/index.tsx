import { NextPage } from "next";
import Image from "next/image";
import { VikingHell } from "../_app";

const Guidelines: NextPage = () => {
  return (
    <div className="overflow-x-hidden overflow-y-auto text-gray-100 p-5 sm:p-10">
      <div className="w-full max-w-7xl mx-auto">
        <h1
          className={`${VikingHell.className} pt-24 text-5xl mb-3 text-center`}
        >
          Guidelines and Regulations for Participating in Incridea 2024
        </h1>
        <div className="bodyFont">
          <p className="mt-2 text-center">
            The fest is open to all students from engineering as well as Nitte
            sister institutions. This article outlines the guidelines and
            regulations that participants need to follow.
          </p>

          <h2 className="text-2xl my-6 font-bold">
            Participant Registration, Entry, Identification and Access
          </h2>
          <ul className="mt-2 list-disc pl-4">
            <li>
              Registration for the fest can only be done through the official
              website of Incridea (https://incridea.in).
            </li>
            <li>
              The are two different categories of participants, who will have
              access to all the events and pronites.
            </li>
            <li>Students of NMAM Institute of Technology, Nitte - ₹ 250</li>
            <li>
              Students of external engineering colleges and Nitte sister
              institutions - ₹ 350
            </li>
            <li>
              Event registrations can be done either through website or on-spot,
              which may vary according to the event, please check the Incridea
              website for further information regarding the same.
            </li>
            <li>
              All participants must present a valid PID (Participant
              Identification) during registration for events and pronites entry.
            </li>
            <li>
              The PID provided must belong to the participant registering for
              the events, and the organisers reserve the right to verify its
              authenticity.
            </li>
            <li>
              Attendees must present their physical college IDs along with a
              valid government-issued ID proof (Aadhaar, driver&apos;s license,
              Voter ID, etc.) to access the events and pronites.
            </li>
            <li>
              Any participant found to have provided false or misleading
              information will be disqualified.
            </li>
            <li>
              Participants are responsible for ensuring the accuracy and
              validity of their PID and other personal information. Failure to
              provide a valid PID will result in the participant being
              ineligible to participate in the events and pronites.
            </li>
          </ul>

          <h2 className="text-2xl my-6 font-bold">Event Rules</h2>
          <ul className="mt-2 list-disc pl-4">
            <li>
              The organisers of any event hold the right to change the rules of
              their event prior to its commencement as they see fit, without any
              obligation of notice.
            </li>
            <li>
              NMAM Institute of Technology &amp; Nitte University is not
              responsible for any loss or damage to participants&apos; personal
              belongings.
            </li>
            <li>
              Other rules pertaining to the respective events are given in their
              respective web-pages.
            </li>
          </ul>

          <h2 className="text-2xl my-6 font-bold">Championship Rules</h2>
          <ul className="mt-2 list-disc pl-4">
            <li>
              <p className="font-semibold">
                Events will be classified into 3 categories:
              </p>
              <div className="md:ml-4 flex flex-row text-center border-2 w-max my-3">
                <div className="flex flex-col font-semibold border-r-2">
                  <div className="p-2 border-b-2">Event Category</div>
                  <div className="p-2 border-b-2">Winner</div>
                  <div className="p-2 border-b-2">Runner-Up</div>
                  <div className="p-2 "> Second Runner-Up</div>
                </div>
                <div className="flex flex-col border-r-2">
                  <div className="p-2 border-b-2 font-semibold">Gold</div>
                  <div className="p-2 border-b-2">500</div>
                  <div className="p-2 border-b-2">450</div>
                  <div className="p-2 ">400</div>
                </div>
                <div className="flex flex-col border-r-2">
                  <div className="p-2 border-b-2 font-semibold">Silver</div>
                  <div className="p-2 border-b-2">350</div>
                  <div className="p-2 border-b-2">300</div>
                  <div className="p-2 ">250</div>
                </div>
                <div className="flex flex-col">
                  <div className="p-2 border-b-2 font-semibold">Bronze</div>
                  <div className="p-2 border-b-2">200</div>
                  <div className="p-2 border-b-2">150</div>
                  <div className="p-2 ">100</div>
                </div>
              </div>
            </li>
            <li>
              College must enter the final round of at least 3 technical events
              and 2 non-technical events to be eligible for championship.
            </li>
            <li>
              The college which has accumulated the highest points will be
              announced as winners and the college which is next to it as
              runner-up. Second runner-up will not be recognized with a prize,
              it is only assigned for the calculation of the championship.
            </li>
            <li>The point system does not apply to special events.</li>
          </ul>

          <h2 className="text-2xl my-6 font-bold">Prohibited Conduct</h2>
          <ul className="mt-2 list-disc pl-4">
            <li>
              The consumption of alcoholic drinks, use of tobacco products,
              hallucinogenic drugs or other illegal substances on the campus
              premises is strictly prohibited.
            </li>
            <li>
              Anyone trying to enter the campus under the influence of
              &quot;such substances&quot; will be denied access.
            </li>
          </ul>

          <h2 className="text-2xl my-6 font-bold">
            Accommodation for external engineering students
          </h2>
          <ul className="mt-2 list-disc pl-4">
            <li>
              The accommodation will be provided for the participants if they
              have opted for the same in the Incridea website or filled out the
              Google form provided.
            </li>
            <li>
              The accommodation service will be of two types, on-campus and
              external; the locations of the accommodation will be provided
              later up on booking of the service.
            </li>
            <li>
              Details regarding payment and other relevant information will be
              provided by the point of contact.
            </li>
            <li>
              Allotment will be on a first-come-first-serve basis, of which
              on-campus will be allotted first.
            </li>
            <li>
              <p className="font-semibold">
                The rules and regulations for the on-campus accommodation:
              </p>
              <ul className="mt-2 list-disc pl-4">
                <li>
                  {" "}
                  Separate accommodation for male and female participants.
                </li>
                <li>
                  The gate of the building in which accommodation is provided
                  will be closed within half an hour from the end of the program
                  every night.
                </li>
                <li>
                  The gate of the building will only be opened at 6 AM, so it is
                  advised to carry necessary things well in advance.
                </li>
              </ul>
            </li>
            <li>
              If the accommodation provided is external, then participants will
              be given details of the place of stay and they may book the same
              directly; transportation will be provided for the participants
              from college to place of stay and vice versa.
            </li>
          </ul>

          <h2 className="text-2xl my-6 font-bold">
            Campus Rules and Regulations
          </h2>
          <ul className="mt-2 list-disc pl-4">
            <li>
              All the participants when inside the campus, must follow the rules
              and regulations of the campus.
            </li>
            <li>
              Contact concerned organisers, core team, security officials or any
              other concerned authorities for any help or grievances.
            </li>
          </ul>

          <p className="mt-3">
            By participating in Incridea, participants agree to abide by the
            guidelines and regulations outlined above. Any participant found
            violating the rules may be immediately expelled from the campus,
            registration for all events may be cancelled, and they will be
            penalized appropriately. NMAM Institute of Technology & Nitte
            University reserve the right to take any appropriate legal actions
            in any case that requires it.
          </p>

          <p className="mt-3 mb-4">
            For further information regarding the fest and live updates, check
            out our website and Instagram handle.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Guidelines;
