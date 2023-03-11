import { FC } from 'react';
import { useQuery } from '@apollo/client';
import { EventsDocument } from '@/src/generated/generated';
import { BranchesDocument } from '@/src/generated/generated';
import Spinner from '@/src/components/spinner';
import Button from '@/src/components/button';
import AddBranchRep from './AddBranchRepButton';

const AdminTab: FC<{
    AdminId: string;
  }> = ({ AdminId }) => {
     // Get Events Query
    const first:number = 10;
  const {
    data: branches,
    loading: branhesLoading,
    refetch: branhesRefetch,
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

    const eventNames = events?.events?.edges?.map((event) => event?.node?.name);
    const branchNames = branches?.getBranches?.map((branch) => branch?.name);

    return (<>
        <div>
        <div className="flex gap-1 flex-row md:flex-row md:justify-between ">
            {/* Admin Header */}
            <div className="mt-5 flex gap-1 md:gap-0.5 flex-col basis-3/5">
                    <div className='flex gap-3 items-center  ml-2'>
                        <h1 className="text-2xl">Events</h1>
                    </div>
                    <div className="hidden md:flex ml-2 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg bg-clip-padding rounded-t-lg p-1 items-center justify-between gap-2.5 text-lg font-bold h-20">
                        <h1 className="basis-1/2 py-2.5 text-start pl-2">Event Name</h1>
                        <h1 className="basis-1/2 py-2.5 text-center pr-5">Rounds Done</h1>
                        <h1 className="basis-1/2 py-2.5 text-center pr-5">Status</h1>
                        <h1 className="basis-1/2 py-2.5 text-center pr-5">Publish</h1>
                    </div>
                    {eventsLoading && (
                    <div className="flex mt-10 justify-center items-center">
                        <Spinner className='text-gray-300' />
                    </div>
                    )}

                    {events?.events?.edges?.map((event,i) => (
                        <div key={event?.node.id}
                        className={`bg-white/10 md:rounded-none rounded-lg md:p-4 ml-2 p-3 flex flex-col md:flex-row md:items-center items-start justify-between md:gap-5 gap-3`}>
                            <h1 className="basis-1/2 py-0.5 text-start pl-2 text-lg">{event?.node?.name}</h1>
                            <h1 className="basis-1/2 py-0.5 text-center pr-5 text-lg">1/3</h1>
                            <h1 className={`basis-1/2 py-0.5 text-center pr-5 text-lg ${
                                                            event?.node?.published
                                                                ? 'border-green-500 text-green-500'
                                                                : 'border-red-500 text-red-500'
                                                            }`}>{event?.node.published ? 'Published' : 'Pending'}
                            </h1>
                            <h1 className="basis-1/2 py-0.5 text-center pr-5 text-lg">
                            <Button
                                intent={event?.node.published ? 'success' : 'danger'}
                                className="ml-auto"
                                disabled={false}
                            >
                            {event?.node.published ? 'Published' : 'Publish'}
                            </Button>
                            </h1>
                        </div>
                    ))}
                </div>  
                <div className="mt-5 flex gap-1 md:gap-0.5 flex-col basis-2/5">
                    <div className='flex gap-3 items-center mr-2'>
                        <h1 className="text-2xl">Branches</h1>
                    </div>
                    <div className="hidden md:flex mr-2 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg bg-clip-padding rounded-t-lg p-1 items-center justify-between gap-2.5 font-bold h-20">
                        <h1 className="basis-1/2 py-2.5 text-start pl-2 text-lg">Branch Name</h1>
                        <h1 className="basis-1/2 py-2.5 text-end  text-base pr-5">Add Branch Representative</h1>
                    </div>
                    {branhesLoading && (
                    <div className="flex mt-10 justify-center items-center">
                        <Spinner className='text-gray-300' />
                    </div>
                    )}

                    {branches?.getBranches?.map((branch,i) => (
                        <div key={branch?.id}
                        className={`bg-white/10 md:rounded-none rounded-lg md:p-4 mr-2 p-3 flex flex-col md:flex-row md:items-center items-start justify-between md:gap-5 gap-3`}>
                            <h1 className="basis-1/2 py-0.5 text-start pl-2 text-lg">{branch?.name}</h1>
                            <h1 className="basis-1/2 py-0.5 text-center pr-5 text-lg">
                            <AddBranchRep 
                                branchId={branch?.id}
                                branchName={branch?.name}
                            />
                            </h1>
                        </div>
                        ))}
                </div>
            </div>
        </div>
    </>);
};

export default AdminTab;