import { useMutation } from '@apollo/client';
import { CreateTeamDocument } from '@/src/generated/generated';
import { FC, useState } from 'react';
import Button from '../../button';
import createToast from '../../toast';

const CreateTeamButton: FC <
    {
        eventId: string;
        teamName: string;
    }
> = ( { eventId , teamName } ) => {

    const [createTeamMutaion, { loading, error }] = useMutation(CreateTeamDocument, {
        variables: {
        eventId: eventId,
        name: teamName as string,
        },
    });

    const createTeam = () => {
        if(teamName === '') {
            alert('Please enter a team name');
            return;
        }
        let promise = createTeamMutaion().then((res) => {
            if (res.data?.createTeam.__typename !== 'MutationCreateTeamSuccess') {
                return Promise.reject('Error creating team');
            }
        });
        createToast(promise, 'Adding Team...');
    }
    
    return (
        <div>
        <Button 
            intent={"success"} 
            onClick={() => createTeam()}
        >
            Create Team
        </Button>
        </div>
    );
};

export default CreateTeamButton;