import createToast from '@/src/components/toast';
import {
  AddCommentDocument,
  GetCommentDocument,
} from '@/src/generated/generated';
import { idToTeamId } from '@/src/utils/id';
import { useMutation, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';

const Remarks = ({
  eventId,
  roundNo,
  teamId,
}: {
  eventId: string;
  roundNo: number;
  teamId: string;
}) => {
  const { data, loading } = useQuery(GetCommentDocument, {
    variables: {
      eventId,
      roundNo,
      teamId,
    },
    skip: !eventId || !roundNo || !teamId,
  });

  const [
    addRemark,
    { data: addRemarkData, loading: addRemarkLoading, error: addRemarkError },
  ] = useMutation(AddCommentDocument, {
    refetchQueries: ['GetComment'],
    awaitRefetchQueries: true,
  });

  const [remarks, setRemarks] = useState<string>('');

  useEffect(() => {
    if (data?.getComment?.__typename === 'QueryGetCommentSuccess') {
      setRemarks(data.getComment.data.comment);
    }
  }, [data?.getComment]);

  const handleUpdate = () => {
    if (data?.getComment.__typename === 'QueryGetCommentSuccess') {
      if (data.getComment.data.comment === remarks) {
        return;
      }
    }
    if (remarks) {
      const promise = addRemark({
        variables: {
          eventId: Number(eventId),
          roundNo,
          teamId: Number(teamId),
          comment: remarks,
        },
      });
      createToast(promise, 'Adding remarks...');
      if (
        addRemarkData?.addComment.__typename === 'MutationAddCommentSuccess'
      ) {
        setRemarks('');
      }
    }
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    if (loading) return;

    // Clear previous timeout
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Set a new timeout
    timeoutId = setTimeout(() => {
      handleUpdate();
    }, 500);

    // Cleanup function to clear the timeout
    return () => {
      clearTimeout(timeoutId!);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remarks]);

  return (
    <div className="p-3 pt-0 relative mt-2">
      <h1 className="text-white/90 font-bold my-2 text-start">
        Additional Remarks for {idToTeamId(teamId)}
      </h1>
      <textarea
        rows={4}
        className="mb-3 px-3 py-2 w-full bg-white/10 placeholder:text-white/60 rounded-md resize-none"
        placeholder={loading ? 'Loading...' : 'Additional remarks (optional)'}
        value={remarks}
        onChange={(e) => setRemarks(e.target.value)}
      />
    </div>
  );
};

export default Remarks;
