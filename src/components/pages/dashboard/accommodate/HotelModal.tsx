import { FC,useState } from 'react';
import Button from '@/src/components/button';
import { IoSchoolSharp } from 'react-icons/io5';
import Modal from '@/src/components/modal';
import { GetAllHotelsDocument } from '@/src/generated/generated';
import { useQuery } from '@apollo/client';
import Spinner from '@/src/components/spinner';
import DeleteCollege from './DeleteHotel';
import AddHotelModal from './AddHotelModal';

const HotelModal: FC = () => {

    const [showModal, setShowModal] = useState(false);

    const { data: hotelData, loading: hotelLoading } = useQuery(GetAllHotelsDocument);

    return (<>
        <Button
            intent={'info'}
            className='flex gap-2 items-center justify-center'
            size={'medium'}
            onClick={() => setShowModal(true)}
        >
            <IoSchoolSharp/>Hotels
        </Button>
        <Modal
            showModal={showModal}
            onClose={() => setShowModal(false)}
            title={'Hotels'}
            size='medium'
        >
            <div className="flex mt-2 mr-4 ml-2 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg bg-clip-padding rounded-t-lg p-1 items-center justify-between gap-2.5 text-base font-bold h-10">
                <h1 className="basis-1/4 py-2.5 text-center pl-2">ID</h1>
                <h1 className="basis-2/4 py-2.5 text-center">Hotel <span className='hidden md:block'>Name</span></h1>
                <h1 className="basis-1/4 py-2.5 text-center pr-5">Delete <span className='hidden md:block'>Hotel</span></h1>
            </div>
            <div className="mt-3 md:max-h-72 max-h-64 md:h-72 overflow-y-auto mx-2">
                {hotelLoading && <Spinner size={'small'} />}
                {hotelData?.getAllHotels.map((hotel, index) => (
                    <div
                    key={index}
                    className="border border-gray-500  rounded-lg mb-2 mr-2 md:p-2 p-1 px-2 flex justify-between items-center"
                    >
                        <div className="flex items-center flex-row w-full">
                            <h1 className="md:text-xl text-lg text-start md:text-center basis-1/4 pl-5 md:pl-2">{hotel?.id}</h1>
                            <h1 className="md:text-xl text-lg text-center basis-2/4 pr-2 md:pr-0">{hotel?.name}</h1>
                            <h1 className="md:text-xl text-lg text-center basis-1/4 md:pr-5">
                            <DeleteCollege 
                                hotelID={hotel?.id}    
                            />
                            </h1>
                        </div>
                    </div>
                ))}
            </div>
            <AddHotelModal />
        </Modal>
    </>
    );
};

export default HotelModal;