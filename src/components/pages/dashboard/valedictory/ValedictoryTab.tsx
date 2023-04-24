import { FC } from "react";
import Spinner from "@/src/components/spinner";
import { useQuery } from "@apollo/client";
import { EventsDocument } from "@/src/generated/generated";

const ValedictoryTab: FC = () => {
    const {
        data: eventsData,
        loading: eventsLoading,
        fetchMore: eventsFetchMore,
      } = useQuery(EventsDocument, {
        variables: {
          first: 100,
        },
      });
    
    const events = eventsData; 

    return <>
        <div className="mt-5 flex gap-1 md:gap-0.5 flex-col justify-center basis-2/3">
            <div className='flex gap-3 items-center  ml-2'>
                <h1 className="text-2xl">Events</h1>
            </div>
            <div className="hidden md:flex ml-2 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg bg-clip-padding rounded-t-lg p-1 items-center justify-between gap-2.5 text-lg font-bold h-20">
                <h1 className="basis-1/5 py-2.5 text-start pl-2">Event Name</h1>
                <h1 className="basis-1/5 py-2.5 text-center pr-4">Status</h1>
                <h1 className="basis-1/5 py-2.5 text-center pr-5">Winner</h1>
                <h1 className="basis-1/5 py-2.5 text-center pr-5">Runner Up</h1>
                <h1 className="basis-1/5 py-2.5 text-center pr-5">Second Runner Up</h1>
            </div>
            {eventsLoading && (
            <div className="flex mt-10 justify-center items-center">
                <Spinner className='text-gray-300' />
            </div>
            )}
            <div className='md:max-h-80 max-h-80 md:h-[300px] overflow-y-auto text-center w-full'>
                {events?.events?.edges?.map((event,i) => (
                    <div key={event?.node.id}
                    className={`bg-white/10 md:rounded-none rounded-lg md:p-4 ml-2 p-3 flex flex-col md:flex-row md:items-center items-start mb-3 md:my-0`}>
                        <h1 className="basis-1/5 flex justify-start py-0.5 text-start text-lg">{event?.node?.name}</h1>
                        <h1 className="basis-1/5 flex justify-center py-0.5 text-center text-lg pr-6">
                            
                        </h1>
                        <h1 className="basis-1/5 py-0.5 text-lg flex md:text-center md:justify-center md:pl-5 mt-2 md:mt-0">
                            
                        </h1>
                    </div>
                ))}
            </div>
        </div>  
    </>;
}

export default ValedictoryTab;