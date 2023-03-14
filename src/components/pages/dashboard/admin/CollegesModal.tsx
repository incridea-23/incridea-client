import { FC,useState } from 'react';
import Button from '@/src/components/button';
import { IoSchoolSharp, IoTrash } from 'react-icons/io5';
import Modal from '@/src/components/modal';
import { CollegesDocument } from '@/src/generated/generated';
import { useQuery } from '@apollo/client';
import Spinner from '@/src/components/spinner';
import DeleteCollege from './DeleteCollege';
import { IoAdd } from 'react-icons/io5';
import AddCollegeModal from './AddCollegeModal';

const CollegesModal: FC = () => {

    const [showModal, setShowModal] = useState(false);

    const { data: collegesData, loading: collegesLoading } = useQuery(CollegesDocument);

    return (<>
        <Button
            intent={'info'}
            className='flex gap-2 items-center justify-center'
            size={'medium'}
            onClick={() => setShowModal(true)}
        >
            <IoSchoolSharp/>Colleges
        </Button>
        <Modal
            showModal={showModal}
            onClose={() => setShowModal(false)}
            title={'Colleges'}
            size='medium'
        >
            <div className="hidden md:flex mt-2 mr-4 ml-2 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg bg-clip-padding rounded-t-lg p-1 items-center justify-between gap-2.5 text-base font-bold h-10">
                <h1 className="basis-1/3 py-2.5 text-start pl-2">ID</h1>
                <h1 className="basis-1/3 py-2.5 text-center">College Name</h1>
                <h1 className="basis-1/3 py-2.5 text-end pr-5">Delete College</h1>
            </div>
            <div className="mt-3 md:max-h-72 max-h-64 md:h-72 overflow-y-auto mx-2">
                {collegesLoading && <Spinner size={'small'} />}
                {collegesData?.colleges.map((college, index) => (
                    <div
                    key={index}
                    className="border border-gray-500  rounded-lg mb-2 mr-2 md:p-2 p-1 px-2 flex justify-between items-center"
                    >
                        <div className="flex flex-row w-full">
                            <h1 className="md:text-xl text-lg text-start basis-1/3 pl-2">{college?.id}</h1>
                            <h1 className="md:text-xl text-lg text-center basis-1/3">{college?.name}</h1>
                            <h1 className="md:text-xl text-lg text-end basis-1/3 pr-5">
                            <DeleteCollege 
                                collegeId={college?.id}    
                            />
                            </h1>
                        </div>
                    </div>
                ))}
            </div>
            <AddCollegeModal />
        </Modal>
    </>
    );
};

export default CollegesModal;