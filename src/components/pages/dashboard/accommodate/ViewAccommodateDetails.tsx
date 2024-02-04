import React from "react";

import { FC, useState } from "react";
import Button from "@/src/components/button";
import { MdModeEditOutline } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import Modal from "@/src/components/modal";
import { AccommodationRequestsByUserIdDocument } from "@/src/generated/generated";
import { useQuery } from "@apollo/client";
import Spinner from "@/src/components/spinner";
import Image from "next/image";

const ViewAccommodateDetails: FC<{
  accId: String;
}> = ({ accId }) => {
  const [showModal, setShowModal] = useState(false);
  const [hotelDetails, setHotelDetails] = useState("");
  const [userId, setUserDetails] = useState(""); //subject to change

  const {
    data: user,
    loading: userLoading,
    refetch: userRefetch,
  } = useQuery(AccommodationRequestsByUserIdDocument, {
    variables: {
      userId: accId as string,
    },
  });

  return (
    <>
      <Button
        intent={"info"}
        className="flex gap-2 items-center justify-center"
        size={"medium"}
        onClick={() => setShowModal(true)}
      >
        <IoEye />
        View
      </Button>

      <Modal
        showModal={showModal}
        onClose={() => setShowModal(false)}
        title={"View User Details"}
        size="medium"
      >
        <div className="flex m-4 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg bg-clip-padding rounded-t-lg p-1 items-center justify-center gap-2.5 h-80">
          <div className="flex flex-row gap-3 items-start justify-center m-4 text-lg">
            <div className="flex flex-col text-lg font-bold">
              <div>Name</div>
              <div>Email</div>
              <div>Phone</div>
              <div>Gender</div>
              <div>Hotel</div>
              <div>Room</div>
              <div>CheckIn</div>
              <div>CheckOut</div>
            </div>
            <div className="flex flex-col text-lg font-semibold">
              <div>{user?.accommodationRequestsByUserId[0]?.user?.name}</div>
              <div>{user?.accommodationRequestsByUserId[0]?.user?.email}</div>
              <div>
                {user?.accommodationRequestsByUserId[0]?.user?.phoneNumber}
              </div>
              <div>{user?.accommodationRequestsByUserId[0]?.gender}</div>
              <div>{user?.accommodationRequestsByUserId[0]?.hotel?.name}</div>
              <div>
                {user?.accommodationRequestsByUserId[0]?.room || "Pending"}
              </div>
              <div>
                {user?.accommodationRequestsByUserId[0].checkIn
                  ? new Date(
                      Date.parse(user?.accommodationRequestsByUserId[0].checkIn)
                    ).toLocaleString("en-IN", {
                      timeZone: "Asia/Kolkata",
                    })
                  : "Not Available"}
              </div>
              <div>
                {user?.accommodationRequestsByUserId[0].checkOut
                  ? new Date(
                      Date.parse(
                        user?.accommodationRequestsByUserId[0].checkOut
                      )
                    ).toLocaleString("en-IN", {
                      timeZone: "Asia/Kolkata",
                    })
                  : "Not Available"}
              </div>
            </div>
            <div className="text-center">
              <Image
                src={user?.accommodationRequestsByUserId[0]?.IdCard || ""}
                alt="ID card"
                width={200}
                height={200}
              ></Image>
              ID
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ViewAccommodateDetails;
