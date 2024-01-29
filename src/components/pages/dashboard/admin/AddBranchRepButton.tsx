import Button from '@/src/components/button';
import { FC } from 'react';
import { IoAdd } from 'react-icons/io5';
import { AddBranchRepDocument } from '@/src/generated/generated';
import { useMutation } from '@apollo/client';
import createToast from '@/src/components/toast';


const AddBranchRepButton: FC<{
    branchId: string;
    userId: string;
}> = ({ branchId, userId }) => {

    //addBranchRep Mutation
    const [addBranchRepMutation, { loading: addBranchRepLoading }] 
                = useMutation(AddBranchRepDocument, {
                    refetchQueries: ['Branches'],
                    awaitRefetchQueries: true,
                });

    const handleAddBranchRep = (userId: string) => {
        let promise = addBranchRepMutation({
            variables: {
            branchId: branchId,
            userId: userId,
            },
        }).then((res) => {
            if (res.data?.addBranchRep.__typename !== 'MutationAddBranchRepSuccess') {
                if(res.data?.addBranchRep.message !== undefined){
                    createToast(Promise.reject(res.data?.addBranchRep.message), res.data?.addBranchRep.message);
                }
                return Promise.reject('Error could not add branch rep');
            }
        });
        createToast(promise, 'Adding BranchRep...');
        };


    return (
        <Button 
            intent="success"
            size="medium"
            className="flex gap-1 items-center disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={ () => handleAddBranchRep(userId) }
            disabled={addBranchRepLoading} 
        >
            <IoAdd />
        </Button>
    )
};

export default AddBranchRepButton;
