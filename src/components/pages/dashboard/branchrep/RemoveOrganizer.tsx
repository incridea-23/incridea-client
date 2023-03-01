import Button from '@/src/components/button';
import createToast from '@/src/components/toast';
import { RemoveOrganizerDocument } from '@/src/generated/generated';
import { useMutation } from '@apollo/client';
import { FC } from 'react';
import { BiTrash } from 'react-icons/bi';

const RemoveOrganizer: FC<{
  organizerId: string;
  eventId: string;
  eventsRefetch: () => Promise<any>;
}> = ({ organizerId, eventId, eventsRefetch }) => {
  // 4. Remove Organizer
  const [removeOrganizerMutation] = useMutation(RemoveOrganizerDocument);

  // 5. Remove Organizer Handler
  const handleRemoveOrganizer = () => {
    let promise = removeOrganizerMutation({
      variables: {
        eventId: eventId,
        userId: organizerId,
      },
    }).then((res) => {
      if (
        res.data?.removeOrganizer.__typename ===
        'MutationRemoveOrganizerSuccess'
      ) {
        return eventsRefetch();
      }
    });
    createToast(promise, 'Removing organizer...');
  };

  return (
    <Button
      intent={'danger'}
      size="small"
      outline
      className="mr-1 px-1"
      onClick={() => handleRemoveOrganizer()}
    >
      <BiTrash />
    </Button>
  );
};

export default RemoveOrganizer;
