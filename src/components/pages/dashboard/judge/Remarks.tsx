import Button from '@/src/components/button';
import { GetCommentDocument } from '@/src/generated/generated';
import { useQuery } from '@apollo/client';
import { useState } from 'react';

const Remarks = ({
  eventId,
  roundNo,
  teamId,
}: {
  eventId: string;
  roundNo: number;
  teamId: string
}) => {
  const { data, loading, error } = useQuery(GetCommentDocument, {
    variables: {
      eventId,
      roundNo,
      teamId,
    },
    skip: !eventId || !roundNo || !teamId,
  });
  
  const [remarks, setRemarks] = useState<string | null>(
    data?.getComment.__typename === 'QueryGetCommentSuccess'
      ? data.getComment.data.comment
      : ''
  );

  return (
    <div className="p-3 pt-0 relative">
      <textarea
        rows={4}
        className="mb-3 px-3 py-2 w-full bg-white/10 placeholder:text-white/60 rounded-md resize-none"
        placeholder={loading ? 'Loading...' : 'Additional remarks (optional)'}
        disabled={loading}
        value={remarks?.toString() ?? ''}
        onChange={(e) => setRemarks(e.target.value)}
      />
      <Button
        disabled={loading}
        intent={'success'}
        className="absolute bottom-10 right-5"
      >
        Add
      </Button>
    </div>
  );
};

export default Remarks;
