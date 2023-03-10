import { FC } from 'react';
import Button from '@/src/components/button';

const AdminTab: FC<{
    AdminId: string;
  }> = ({ AdminId }) => {
    return (<>
        <div>
        <div className="flex gap-3 flex-col md:flex-row md:justify-between md:items-center">
            <div className='flex gap-3 items-center basis-2/5 mr-2'>
                <h1 className="text-2xl">Branches</h1>
            </div>
            <div className='flex gap-3 items-center basis-3/5 ml-2'>
                <h1 className="text-2xl">Events</h1>
            </div>
      </div>
            <div className="mt-5 flex gap-3 md:gap-0.5 flex-row">
            {/* Admin Header */}
                <div className="hidden basis-2/5 md:flex mr-2 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg bg-clip-padding rounded-t-lg p-1 items-center justify-between gap-2.5 text-lg font-bold">
                    <h1 className="basis-1/2 py-2.5 text-start pl-2">Branch Name</h1>
                    <h1 className="basis-1/2 py-2.5 text-end pr-5">Add Branch Representative</h1>
                </div>
                <div className="hidden basis-3/5 md:flex ml-2 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg bg-clip-padding rounded-t-lg p-1 items-center justify-between gap-2.5 text-lg font-bold">
                    <h1 className="basis-1/2 py-2.5 text-start pl-2">Event Name</h1>
                    <h1 className="basis-1/2 py-2.5 text-end pr-5">Rounds Done</h1>
                    <h1 className="basis-1/2 py-2.5 text-end pr-5">Status</h1>
                    <h1 className="basis-1/2 py-2.5 text-end pr-5">Published</h1>
                </div>
            </div>
        </div>
    </>);
};

export default AdminTab;