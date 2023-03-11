import Button from '@/src/components/button';
import { FC } from 'react';
import { IoTrash } from 'react-icons/io5';


const RemoveBranchRepButton: FC<{
    branchId: string;
    userId: string;
}> = ({ branchId, userId }) => {
    return (
        <Button 
            intent="danger"
            size="medium"
            className="flex gap-1 items-center disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={ () => console.log('Add Branch Rep') }
        >
            <IoTrash />
        </Button>
    )
};

export default RemoveBranchRepButton;
