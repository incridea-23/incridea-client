import Button from "@/src/components/button";
import Modal from "@/src/components/modal";
import { FC, useState } from "react";
import { CreateHotelDocument, GetAllHotelsDocument } from "@/src/generated/generated";
import { useMutation } from "@apollo/client";
import createToast from "@/src/components/toast";
import { IoAdd } from "react-icons/io5";


const AddHotelModal:FC = () => {

    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState('');
    const [hotelDescription, setHotelDescription] = useState('');
    const [price, setPrice] = useState(0);

    const [addHotel] = useMutation(CreateHotelDocument, {
        refetchQueries: [GetAllHotelsDocument],
        awaitRefetchQueries: true
    })

    function handleHotelModel() {
        let promise = addHotel({
                        variables: {
                            name : name,
                            details : hotelDescription,
                            price : price,
                        }
                    }).then((res) => {
                        if(res?.data?.createHotel.__typename !== 'MutationCreateHotelSuccess')
                            return Promise.reject('Error could not add hotel');
                    });
        createToast(promise,'Adding Hotel...');
        setName('');
        setHotelDescription('');
        setPrice(0);
        setShowModal(false);
    }


    return (
        <>
            <div className="flex items-end justify-end ">
            <div className='flex mt-4 w-full'>
                <Button intent="success" className="justify-center w-full m-3 mb-5" fullWidth={true} disabled={false} onClick={() => setShowModal(true)}>
                    <IoAdd /> Add Hotel
                </Button>
            </div>
                <Modal 
                    showModal={showModal}
                    onClose={() => setShowModal(false)}
                    size="medium"
                    title="Add Hotel"
                >
                    <div className="flex flex-col items-start w-full  m-3">
                        <div className="flex flex-col items-start w-full m-3">
                            <p className="m-2">Name</p>
                            <input
                                type="text" 
                                id="name" 
                                className=" border text-sm rounded-lg   block w-11/12 p-2.5 bg-gray-600 border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 ring-gray-500" 
                                placeholder="Hotel Name..." 
                                onChange={ (e) => {setName(e.target.value)}}
                                value={name}
                                required
                            />
                        </div>   
                        <div className="flex flex-col items-start w-full m-3">
                            <p className="m-2">Hotel Description</p>
                            <textarea 
                                id="collegeDescription" 
                                className=" border  text-sm rounded-lg w-11/12   block p-2.5 py-10 bg-gray-600 border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 ring-gray-500" 
                                placeholder="Hotel Description..." 
                                onChange={ (e) => {setHotelDescription(e.target.value)}}
                                value={hotelDescription}
                            />
                        </div>
                        <div className="flex flex-col items-start w-full m-3">
                            <p className="m-2">Price</p>
                            <input
                                type="number" 
                                id="price" 
                                className=" border text-sm rounded-lg   block w-11/12 p-2.5 bg-gray-600 border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 ring-gray-500" 
                                placeholder="Hotel Name..." 
                                onChange={ (e) => {setPrice(Number(e.target.value))}}
                                value={price}
                                required
                            />
                        </div> 
                    </div>
                    <div className="flex justify-center items-center m-3">
                        <Button 
                            intent="success"
                            size="large"
                            className="flex gap-1 items-center disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={ () => handleHotelModel() }
                        >
                            Create
                        </Button>
                    </div>
                </Modal>
            </div>
        </>
    )
}

export default AddHotelModal;