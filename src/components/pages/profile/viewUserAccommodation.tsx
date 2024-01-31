import React from "react";

import { FC, useState } from "react";
import Button from "@/src/components/button";
import { MdModeEditOutline } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import Modal from "@/src/components/modal";
import { AccommodationRequestsByUserDocument } from "@/src/generated/generated";
import { useQuery } from "@apollo/client";
import Spinner from "@/src/components/spinner";

const ViewUserAccommodation = () => {
  const [showModal, setShowModal] = useState(false);


  const {
    data: userdetails,
    loading: userLoading,
    refetch: userRefetch,
  } = useQuery(AccommodationRequestsByUserDocument);



  if(!userdetails){
    <Button intent={"primary"}  className="flex gap-2 items-center justify-center">Accommodate Me</Button>
  }
  else
  return (
    <>
      <Button
        intent={"primary"}
        className="flex gap-2 items-center justify-center"
        size={"medium"}
        onClick={() => setShowModal(true)}>
        <IoEye />
        View
      </Button>

      <Modal
        showModal={showModal}
        onClose={() => setShowModal(false)}
        title={"View User Details"}
        size="medium">
        <div className="flex m-4 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg bg-clip-padding rounded-t-lg p-1 items-center justify-center gap-2.5 h-80">
          <div className="flex flex-row gap-3 items-start justify-center m-4 text-lg">
            <div className="flex flex-col text-lg font-bold">
              <div>Hotel Name</div>
              <div>Price</div>
              <div>Room</div>
              <div>Check In</div>
              <div>Check Out</div>
              <div>Status</div>
            </div>
            <div className="flex flex-col text-lg font-semibold">
              <div>{userdetails?.accommodationRequestsByUser[0]?.hotel?.name}</div>
              <div>{userdetails?.accommodationRequestsByUser[0]?.hotel?.price}</div>
              <div>{userdetails?.accommodationRequestsByUser[0]?.room}</div>
              <div>{userdetails?.accommodationRequestsByUser[0]?.checkIn}</div>
              <div>{userdetails?.accommodationRequestsByUser[0]?.checkOut}</div>
              <div>{userdetails?.accommodationRequestsByUser[0]?.status}</div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ViewUserAccommodation;
