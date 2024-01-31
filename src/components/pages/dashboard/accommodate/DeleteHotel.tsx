import Button from "@/src/components/button";
import { IoTrash } from "react-icons/io5";
import Modal from "@/src/components/modal";
import { FC, useState } from "react";
import { DeleteHotelDocument } from "@/src/generated/generated";
import { useMutation } from "@apollo/client";
import createToast from "@/src/components/toast";

const DeleteHotel: FC<{
  hotelID: string;
}> = (hotelID) => {
  const [showModal, setShowModal] = useState(false);

  //mutation to remove hotel
  const [deleteHotel] = useMutation(DeleteHotelDocument, {
    refetchQueries: ["Hotel"],
    awaitRefetchQueries: true,
  });

  function handleDeleteHotel() {
    let promise = deleteHotel({
      variables: {
        id: hotelID.hotelID,
      },
    }).then((res) => {
      if (res.data?.deleteHotel.__typename !== "MutationDeleteHotelSuccess") {
        return Promise.reject("Error could not delete hotel");
      }
    });
    createToast(promise, "Removing Hotel...");
    setShowModal(false);
  }

  return (
    <>
      <div className="flex items-center justify-center ">
        <div className="flex items-center justify-center text-end">
          <Button
            intent="danger"
            size="medium"
            className="flex gap-1 items-center justify-center h-12"
            onClick={() => setShowModal(true)}
          >
            <IoTrash />
          </Button>
        </div>
        <Modal
          showModal={showModal}
          onClose={() => setShowModal(false)}
          size="medium"
          title="Delete Hotel"
        >
          <div className="flex flex-col items-center justify-center m-3">
            <p className="text-center">
              Are you sure you want to delete this hotel?
            </p>
            <div className="flex gap-2 mt-4">
              <Button
                intent="danger"
                size="medium"
                onClick={() => handleDeleteHotel()}
              >
                Delete
              </Button>
              <Button
                intent="info"
                size="medium"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default DeleteHotel;
