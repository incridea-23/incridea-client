import React from "react";
import Modal from "@/src/components/modal";
import { AccommodationRequestsByUserDocument } from "@/src/generated/generated";
import { useQuery } from "@apollo/client";
import Spinner from "@/src/components/spinner";

type Props = {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
};

const ViewUserAccommodation: React.FunctionComponent<Props> = ({
  showModal,
  setShowModal,
}) => {
  const {
    data: userdetails,
    loading: userLoading,
    refetch: userRefetch,
  } = useQuery(AccommodationRequestsByUserDocument);

  return (
    <Modal
      showModal={showModal}
      onClose={() => setShowModal(false)}
      title={"View User Details"}
      size="medium">
      <div className="flex m-4 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg bg-clip-padding rounded-lg p-1 items-center justify-center gap-2.5 h-80">
        <div className="flex flex-row gap-3 items-start justify-center m-4 text-lg">
          {/* FIXME : fix ui of modal */}
          {userLoading ? (
            <Spinner className="text-[#dd5c6e]" />
          ) : (
            <div className="flex flex-col">
              <div className="flex flex-row gap-4">
                <div className="flex flex-col text-lg font-bold">
                  <div>Hotel Name</div>
                  <div>Price</div>
                  <div>Room</div>
                  <div>Check In</div>
                  <div>Check Out</div>
                  <div>Status</div>
                </div>
                <div className="flex flex-col text-lg font-semibold">
                  <div>
                    {userdetails?.accommodationRequestsByUser[0]?.hotel?.name}
                  </div>
                  <div>
                    {userdetails?.accommodationRequestsByUser[0]?.hotel?.price}
                  </div>
                  <div>
                    {userdetails?.accommodationRequestsByUser[0]?.room ||
                      "Unavailable"}
                  </div>
                  <div>
                    {new Date(
                      userdetails?.accommodationRequestsByUser[0]?.checkIn
                    ).toLocaleString("en-GB", {
                      day: "numeric",
                      month: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
                  </div>
                  <div>
                    {new Date(
                      userdetails?.accommodationRequestsByUser[0]?.checkOut
                    ).toLocaleString("en-GB", {
                      day: "numeric",
                      month: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
                  </div>
                  <div>
                    {userdetails?.accommodationRequestsByUser[0]?.status}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ViewUserAccommodation;
