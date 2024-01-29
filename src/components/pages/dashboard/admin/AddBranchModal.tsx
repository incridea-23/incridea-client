import Button from "@/src/components/button";
import Modal from "@/src/components/modal";
import { IoAdd } from "react-icons/io5";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { AddBranchDocument } from "@/src/generated/generated";
import createToast from "@/src/components/toast";

const AddBranchModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [branchName, setBranchName] = useState<String>("");

  //mutation to add branch
  const [addBranchMutation, { loading: addBranchLoading }] = useMutation(
    AddBranchDocument,
    {
      variables: {
        name: branchName as string,
      },
      refetchQueries: ["Branches"],
      awaitRefetchQueries: true,
    }
  );

  const handleBranchAdded = () => {
    if (branchName === "") {
      return setShowModal(false);
    }
    let promise = addBranchMutation().then((res) => {
      if (res.data?.addBranch.__typename !== "MutationAddBranchSuccess") {
        return Promise.reject("Error could not add branch");
      }
    });
    createToast(promise, "Adding Branch...");
    setShowModal(false);
  };

  return (
    <div>
      <Button
        fullWidth
        intent={"info"}
        size={"large"}
        className="md:mr-2 md:max-h-12"
        onClick={() => setShowModal(true)}>
        <IoAdd /> Add Branch
      </Button>

      <Modal
        title="Add Branch"
        size="medium"
        showModal={showModal}
        onClose={() => setShowModal(false)}>
        <div className="flex flex-col justify-center text-center items-center p-5 mt-2 mb-3">
          <input
            type="text"
            id="name"
            onChange={(e) => setBranchName(e.target.value)}
            className=" border  text-sm rounded-lg   block  w-full p-2.5 bg-gray-600 border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 ring-gray-500"
            placeholder="Branch Name..."
            required
          />
          <div className="flex mt-4">
            <Button
              intent="danger"
              className="justify-center ml-auto"
              disabled={false}
              onClick={() => handleBranchAdded()}>
              <IoAdd /> Add Branch
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddBranchModal;
