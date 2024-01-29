import Button from "@/src/components/button";
import createToast from "@/src/components/toast";
import { AddOrganizerDocument } from "@/src/generated/generated";
import { useMutation } from "@apollo/client";
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";

type Props = {
  userId: string;
  eventId: string;
};

const AddOrganizerButton = ({userId, eventId}: Props) => {

  // Add Organizer Mutation
  const [addOrganizerMutation, { loading: addOrganizerLoading }] =
    useMutation(AddOrganizerDocument, {
			refetchQueries: ["EventsByBranchRep"],
      awaitRefetchQueries: true,
		});

  const handleAddOrganizer = (userId: string) => {
    let promise = addOrganizerMutation({
      variables: {
        eventId: eventId,
        userId: userId,
      },
    }).then((res) => {
      if (res.data?.addOrganizer.__typename !== 'MutationAddOrganizerSuccess') {
        return Promise.reject('Error adding organizer');
      }
    });
    createToast(promise, 'Adding organizer...');
  };

  return (
    <Button
      intent={"secondary"}
      size="small"
      className="flex gap-1 items-center disabled:opacity-50 disabled:cursor-not-allowed"
      onClick={() => handleAddOrganizer(userId)}
      disabled={addOrganizerLoading}>
      Add
      <AiOutlinePlus />
    </Button>
  );
};

export default AddOrganizerButton;
