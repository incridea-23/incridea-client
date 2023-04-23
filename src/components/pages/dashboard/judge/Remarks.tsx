import Button from '@/src/components/button';
import createToast from '@/src/components/toast';
import {
  AddCommentDocument,
  GetCommentDocument,
} from '@/src/generated/generated';
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
  const { data, loading, error } = useQuery(GetCommentDocument, {
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

  return (
    <div className="p-3 pt-0 relative">
      <textarea
        rows={4}
        className="mb-3 px-3 py-2 w-full bg-white/10 placeholder:text-white/60 rounded-md resize-none"
        placeholder={loading ? 'Loading...' : 'Additional remarks (optional)'}
        disabled={loading || addRemarkLoading}
        value={remarks}
        onChange={(e) => setRemarks(e.target.value)}
      />
      <Button
        onClick={() => {
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
              addRemarkData?.addComment.__typename ===
              'MutationAddCommentSuccess'
            ) {
              setRemarks('');
            }
          }
        }}
        disabled={loading || addRemarkLoading}
        intent={'success'}
        className="absolute bottom-10 right-5"
      >
        Add
      </Button>
    </div>
  );
};

export default Remarks;
