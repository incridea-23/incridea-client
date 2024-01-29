import { FC } from 'react';
import { useQuery } from '@apollo/client';
import { EventsDocument } from '@/src/generated/generated';
import { BranchesDocument } from '@/src/generated/generated';
import Spinner from '@/src/components/spinner';
import AddBranchRep from './AddBranchRep';
import PublishEventModal from './PublishEventModal';
import AddBranchModal from './AddBranchModal';
import SearchUsersModal from './SearchUsersModal';
import CollegesModal from './CollegesModal';
import RoundsDone from './RoundsDone';
import Badge from '@/src/components/badge';
import ViewEvent from './ViewEventModal';

const AdminTab: FC<{
    AdminId: string;
  }> = ({ AdminId }) => {
    const first: number = 200;
  const {
    data: branches,
    loading: branchesLoading,
    refetch: branchesRefetch,
  } = useQuery(BranchesDocument, {});

  const {
    data: events,
    loading: eventsLoading,
    refetch: eventsRefetch,
  } = useQuery(EventsDocument, {
    variables: {
      first: first as number,
    },
  });

    return (<>
        <div> 
            {/* Admin Header */}
            <div className='flex flex-row md:justify-end justify-start items-center text-center md:m-3 mt-6'>
                <div className='flex justify-center items-center mx-3'>
                    <SearchUsersModal />
                </div>
                <div className='flex justify-center items-center'>
                    <CollegesModal />
                </div>
            </div>
            <div className="flex gap-1 flex-col md:flex-row md:justify-between ">
                <div className="mt-5 flex gap-1 md:gap-0.5 flex-col justify-center basis-2/3">
                        <div className='flex gap-3 items-center  ml-2'>
                            <h1 className="text-2xl">Events</h1>
                        </div>
                        <div className="hidden md:flex ml-2 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg bg-clip-padding rounded-t-lg p-1 items-center justify-between gap-2.5 text-lg font-bold h-20">
                            <h1 className="basis-1/5 py-2.5 text-start pl-2">Event Name</h1>
                            <h1 className="basis-1/5 py-2.5 text-center pr-2">Branch Name</h1>
                            <h1 className="basis-1/5 py-2.5 text-center">Rounds Done</h1>
                            <h1 className="basis-1/5 py-2.5 text-center pr-4">Status</h1>
                            <h1 className="basis-1/5 py-2.5 text-center pr-5">Publish</h1>
                            <h1 className="basis-1/5 py-2.5 text-center pr-5">View</h1>
                        </div>
                        {eventsLoading && (
                        <div className="flex mt-10 justify-center items-center">
                            <Spinner className='text-gray-300' />
                        </div>
                        )}
                        <div className='md:max-h-80 max-h-80 md:h-[300px] overflow-y-auto text-center w-full'>
                            {events?.events?.edges?.map((event,i) => (
                                <div key={event?.node.id}
                                className={`bg-white/10 md:rounded-none rounded-lg md:p-4 ml-2 p-3 flex flex-col md:flex-row md:items-center items-start md:justify-center  mb-3 md:my-0`}>
                                    <h1 className="basis-1/6 flex justify-start py-0.5 text-start text-lg">{event?.node?.name}</h1>
                                    <h1 className="basis-1/6 flex justify-center py-0.5 text-start text-lg pr-2">
                                        {event?.node.branch.name.toLowerCase() === "core" ? 
                                        <Badge color="success">{event?.node.branch.name}</Badge>
                                        :
                                        event?.node.branch.name
                                    }
                                    </h1>
                                    <h1 className="basis-1/6 flex justify-center py-0.5 text-center text-lg">
                                        <RoundsDone 
                                            eventId={event?.node?.id as string}
                                        />
                                    </h1>
                                    <h1 className={`basis-1/6 py-0.5 text-center flex justify-center text-lg ${
                                                                    event?.node?.published
                                                                        ? 'border-green-500 text-green-500'
                                                                        : 'border-red-500 text-red-500'
                                                                    }`}>{event?.node.published ? 'Published' : 'Pending'}
                                    </h1>
                                    <h1 className="basis-1/6 py-0.5 flex text-center justify-center text-lg">
                                    <PublishEventModal 
                                        eventId={event?.node?.id as string}
                                        eventName={event?.node?.name as string}
                                        published={event?.node?.published as boolean}
                                    />
                                    </h1>
                                    <h1 className="basis-1/6 py-0.5 text-lg flex md:text-center md:justify-center md:pl-5 mt-2 md:mt-0">
                                        <ViewEvent 
                                            Event = {event}
                                        />
                                    </h1>
                                </div>
                            ))}
                        </div>
                    </div>  
                    <div className="mt-5 flex gap-1 md:gap-0.5 flex-col basis-1/3 ml-2">
                        <div className='flex gap-3 items-center mr-2'>
                            <h1 className="text-2xl">Branches</h1>
                        </div>
                        <div className="hidden md:flex bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg bg-clip-padding rounded-t-lg p-1 items-center justify-between gap-2.5 font-bold h-20">
                            <h1 className="basis-1/2 py-2.5 text-start pl-2 text-lg">Branch Name</h1>
                            <h1 className="basis-1/2 py-2.5 text-end  text-base pr-5">Add Branch Representative</h1>
                        </div>
                        {branchesLoading && (
                        <div className="flex mt-10 justify-center items-center">
                            <Spinner className='text-gray-300' />
                        </div>
                        )}
                        <div className='md:max-h-64 max-h-60 md:h-64 overflow-y-auto'>
                            {branches?.getBranches?.map((branch,i) => (
                                <div key={branch?.id}
                                className={`bg-white/10 md:rounded-none rounded-lg md:ml-0 md:p-4  p-3 flex flex-col md:flex-row md:items-center items-start justify-between md:gap-5 gap-3 mb-3 md:my-0`}>
                                    <h1 className="basis-1/2 py-0.5 text-start pl-2 text-lg">{branch?.name}</h1>
                                    <h1 className="basis-1/2 py-0.5 flex justify-end text-end pr-1 text-lg">
                                    <AddBranchRep 
                                        branchId={branch?.id}
                                        branchName={branch?.name}
                                        branchReps={branch?.branchReps}
                                    />
                                    </h1>
                                </div>
                            ))}
                        </div>
                    <AddBranchModal />
                </div>
            </div>
        </div>
    </>);
};

export default AdminTab;