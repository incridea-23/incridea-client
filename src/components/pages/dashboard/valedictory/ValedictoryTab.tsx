import { FC } from "react";
import Spinner from "@/src/components/spinner";
import { useQuery } from "@apollo/client";
import { CompletedEventsDocument } from "@/src/generated/generated";
import RoundsDone from "./RoundsDone";
import EventDetails from "../../event/EventDetails";

const ValedictoryTab: FC = () => {
    const {
        data: eventsData,
        loading: eventsLoading,
        fetchMore: eventsFetchMore,
      } = useQuery(CompletedEventsDocument);

      if (eventsData?.completedEvents.__typename === "QueryCompletedEventsSuccess") {
        // Get the current date and time
        const now = new Date();
        const threePM = new Date();
        threePM.setHours(15, 0, 0, 0); // Set the time to 3:00 PM

        // Check if the current time is before 3:00 PM
        if (now < threePM) {
        now.setHours(15, 0, 0, 0); // Set the time to 3:00 PM
        } else {
        now.setDate(now.getDate() + 1); // Add one day to the current date
        now.setHours(15, 0, 0, 0); // Set the time to 3:00 PM
        }
        
        // Get the data array from completedEvents
        const eventData = eventsData.completedEvents.data;
        
        // Filter events based on the condition
        const filteredEvents = eventData.filter(event => {
          // Check if the event has rounds
          if (event.rounds && event.rounds.length > 0) {
            // Get the round with the maximum roundNo
            const maxRound = event.rounds.reduce((prev, curr) => 
              prev.roundNo > curr.roundNo ? prev : curr
            );
            // Convert the round date to a JavaScript Date object
            const roundDate = new Date(maxRound.date);
            
            // Get yesterday's date and time
            const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
            yesterday.setHours(15, 0, 0, 0); // Set time to 3 PM
            console.log(roundDate);
            console.log(yesterday);
            console.log(now);
            // Check if the round date is on or before today 3 PM and after yesterday 3 PM
            if (roundDate <= now && roundDate >= yesterday) {
              return true; // Include the event in filteredEvents
            }
          }
          return false; // Exclude the event from filteredEvents
        });

        console.log(filteredEvents)
        
        // Store event details and eventsData in an array
        const eventDetailsArray = filteredEvents.map(event => {
          // Get the maximum round object
          const maxRound = event.rounds.reduce((prev, curr) => 
            prev.roundNo > curr.roundNo ? prev : curr
          );
          
          // Create event details object
          const eventDetails = {
            eventId: event.id,
            eventName: event.name,
            winner: event.winner,
            type: event.__typename,
            roundNo: maxRound.roundNo,
            roundDate: maxRound.date,
            completed: maxRound.completed,
            selectStatus: maxRound.selectStatus,
          };
          return eventDetails;
        });
        
        console.log("Filtered Events:", eventDetailsArray);

    return <>
        <div className="mt-5 flex gap-1 md:gap-0.5 flex-col justify-center basis-2/3">
            <div className='flex gap-3 items-center  ml-2'>
                <h1 className="text-2xl">Events</h1>
            </div>
            <div className="hidden md:flex ml-2 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg bg-clip-padding rounded-t-lg p-1 items-center justify-between gap-2.5 text-lg font-bold h-20">
                <h1 className="basis-1/4 py-2.5 text-start pl-2">Event Name</h1>
                <h1 className="basis-1/4 py-2.5 text-center pr-5">Winner</h1>
                <h1 className="basis-1/4 py-2.5 text-center pr-5">Runner Up</h1>
                <h1 className="basis-1/4 py-2.5 text-center pr-5">Second Runner Up</h1>
            </div>
            {eventsLoading && (
            <div className="flex mt-10 justify-center items-center">
                <Spinner className='text-gray-300' />
            </div>
            )}
            <div className='md:max-h-80 max-h-80 md:h-[300px] overflow-y-auto text-center w-full'>
                {
                eventsData?.completedEvents.__typename === "QueryCompletedEventsSuccess" ?
                eventDetailsArray?.map((event,i) => (
                    <div key={event?.eventId}
                    className={`bg-white/10 md:rounded-none rounded-lg md:p-4 ml-2 p-3 flex flex-col md:flex-row md:items-center items-start mb-3 md:my-0`}>
                        <h1 className="basis-1/4 flex justify-start py-0.5 text-start text-lg">{event?.eventName}</h1>
                        <h1 className="basis-1/4 py-0.5 text-lg flex md:text-center md:justify-center md:pl-5 mt-2 md:mt-0">
                            {event.winner?.map((eventData,i)=>(
                                eventData.type === "WINNER" ? eventData.team.name : ""
                            ))}
                        </h1>
                        <h1 className="basis-1/4 py-0.5 text-lg flex md:text-center md:justify-center md:pl-5 mt-2 md:mt-0">
                            {event.winner?.map((eventData,i)=>(
                                eventData.type === "RUNNER_UP" ? eventData.team.name : ""
                            ))}
                        </h1>
                        <h1 className="basis-1/4 py-0.5 text-lg flex md:text-center md:justify-center md:pl-5 mt-2 md:mt-0">
                            {event.winner?.map((eventData,i)=>(
                                eventData.type === "SECOND_RUNNER_UP" ? eventData.team.name : ""
                            ))}
                        </h1>
                    </div>
                ))
                :
                ""
                }
            </div>
        </div>  
    </>;
    }
    else{
        return <>
        </>
    }
}

export default ValedictoryTab;