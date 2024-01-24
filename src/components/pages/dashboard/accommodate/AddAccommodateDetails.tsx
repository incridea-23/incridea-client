import React from 'react'

import { FC,useState } from 'react';
import Button from '@/src/components/button';
import { MdModeEditOutline } from "react-icons/md";
import Modal from '@/src/components/modal';
import { GetAllHotelsDocument,EditAccommodationDetailsDocument } from '@/src/generated/generated';
import { useQuery } from '@apollo/client';
import Spinner from '@/src/components/spinner';

const AddAccommodateDetails: FC<{
  accId:String
}> = ({accId}) => {

    const [showModal, setShowModal] = useState(false);
    const [hotelDetails, setHotelDetails] = useState("");
    const [roomNo, setRoomNo] = useState("");
    const [status, setStatus] = useState("");

    const {
        data:allHotels,
        loading:hotelLoading,
        refetch:hotelRefetch
    } = useQuery(GetAllHotelsDocument);

    const {
      data:editHotel,
      loading:editLoading,
      refetch:editRefetch
  } = useQuery(EditAccommodationDetailsDocument,{
    variables:{
      id:accId as string,
      hotel:hotelDetails,
      room:roomNo,
      status
    }
  });

    return (<>
        <Button
            intent={'info'}
            className='flex gap-2 items-center justify-center'
            size={'medium'}
            onClick={() => setShowModal(true)}
        >
            <MdModeEditOutline/>Edit
        </Button>
        <Modal
            showModal={showModal}
            onClose={() => setShowModal(false)}
            title={'Edit Accommodation Details'}
            size='medium'
        >
            <div className="flex flex-col m-4 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg bg-clip-padding rounded-t-lg p-4 items-center justify-evenly gap-2.5 text-base font-bold h-50">
            <div className="flex flex-col items-start w-full mt-2">
              <label className="m-2" htmlFor="hotelName">
                Choose the Hotels
              </label>
              <select
                onChange={(e) => {
                    setHotelDetails(e.target.value);
                }}
                value={hotelDetails}
                id="hotelName"
                placeholder="Hotel Name"
                className="border text-sm rounded-lg block w-11/12 p-2.5 bg-gray-600 border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 ring-gray-500"
              >
                {allHotels?.getAllHotels.map((hot) => (
                  <option key={hot.id} value={hot.id}>
                    {hot.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col items-start w-full ">
                            <p className="m-2">Room No.</p>
                            <input
                                type="text" 
                                id="name" 
                                className=" border text-sm rounded-lg   block w-11/12 p-2.5 bg-gray-600 border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 ring-gray-500" 
                                placeholder="Room No..." 
                                onChange={ (e) => {setRoomNo(e.target.value)}}
                                value={roomNo}
                                required
                            />
                        </div>

                        <div className="flex flex-col items-start w-full mt-2">
              <label className="m-2" htmlFor="status">
                Change the Status
              </label>
              <select
                onChange={(e) => {
                    setStatus(e.target.value);
                }}
                value={status}
                id="status"
                placeholder="Status"
                className="border text-sm rounded-lg block w-11/12 p-2.5 bg-gray-600 border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 ring-gray-500"
              >
                {hotel?.getAllHotels.map((hot) => (
                  <option key={hot.id} value={hot.name}>
                    {hot.name}
                  </option>
                ))}
              </select>
            </div>
                
            </div> 
        </Modal>
    </>
    );
};

export default AddAccommodateDetails;