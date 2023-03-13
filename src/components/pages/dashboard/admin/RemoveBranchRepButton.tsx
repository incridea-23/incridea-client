import Button from '@/src/components/button';
import { FC } from 'react';
import { IoTrash } from 'react-icons/io5';
import {
    RemoveBranchRepDocument,
} from '@/src/generated/generated';
import { useMutation } from '@apollo/client';
import createToast from '@/src/components/toast';


const RemoveBranchRepButton: FC<{
    branchId: string;
    userId: string;
}> = ({ branchId, userId }) => {

    const [removeBranchRep, { loading }] = useMutation(RemoveBranchRepDocument, {
        refetchQueries: ['Branches'],
        awaitRefetchQueries: true,
        variables: {
            branchId: branchId,
            userId: userId,
        },
    });

    function handleRemoveBranchRep() {
        let promise = removeBranchRep().then((res) => {
            if (res.data?.removeBranchRep.__typename !== 'MutationRemoveBranchRepSuccess') {
                return Promise.reject('Error could not remove branch rep');
            }
        });
        createToast(promise, 'Removing BranchRep...');
    }

    return (
        <Button 
            intent="danger"
            size="medium"
            className="flex gap-1 items-center disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleRemoveBranchRep}
        >
            <IoTrash />
        </Button>
    )
};

export default RemoveBranchRepButton;
