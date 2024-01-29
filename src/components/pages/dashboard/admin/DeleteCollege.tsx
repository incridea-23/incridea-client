import Button from "@/src/components/button";
import { IoTrash } from "react-icons/io5";
import Modal from "@/src/components/modal";
import { FC, useState } from "react";
import { RemoveCollegeDocument } from "@/src/generated/generated";
import { useMutation } from "@apollo/client";
import createToast from "@/src/components/toast";


const DeleteCollege:FC<
    {
        collegeId: string
    }
>= ( collegeId ) => {

    const [showModal, setShowModal] = useState(false);

    //mutation to remove college
    const [removeCollege] = useMutation(RemoveCollegeDocument, {
        refetchQueries: ['Colleges'],
        awaitRefetchQueries: true
    })

    function handleDeleteCollege() {
        let promise = removeCollege({
            variables: {
                id: collegeId.collegeId,
            }
        }).then((res) => {
            if (res.data?.removeCollege.__typename !== 'MutationRemoveCollegeSuccess') {
                return Promise.reject('Error could not delete college');
            }
        });
        createToast(promise, 'Removing College...');
        setShowModal(false);
    }


    return (
        <>
            <div className="flex items-center justify-center ">
                <div className="flex items-center justify-center text-end">
                    <Button intent="danger"
                        size="medium"
                        className="flex gap-1 items-center justify-center h-12"
                        onClick={ () => setShowModal(true) }
                        >
                        <IoTrash /> 
                    </Button>
                </div>
                <Modal 
                    showModal={showModal}
                    onClose={() => setShowModal(false)}
                    size="medium"
                    title="Delete College"
                >
                    <div className="flex flex-col items-center justify-center m-3">
                        <p className="text-center">Are you sure you want to delete this college?</p>
                        <div className="flex gap-2 mt-4">
                            <Button intent="danger" size="medium" onClick={() => handleDeleteCollege()}>Delete</Button>
                            <Button intent="info" size="medium" onClick={() => setShowModal(false)}>Cancel</Button>
                        </div>
                    </div>
                </Modal>
            </div>
        </>
    )
}

export default DeleteCollege