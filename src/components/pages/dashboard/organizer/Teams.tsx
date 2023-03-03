import Badge from '@/src/components/badge';
import Button from '@/src/components/button';
import Modal from '@/src/components/modal';
import Spinner from '@/src/components/spinner';
import createToast from '@/src/components/toast';
import {
  OrganizerDeleteTeamDocument,
  OrganizerMarkAttendanceDocument,
  TeamsByRoundDocument,
} from '@/src/generated/generated';
import { useMutation, useQuery } from '@apollo/client/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import ViewTeamModal from './ViewTeamModal';

function Teams({
  eventType,
  roundNo,
  eventId,
  contains,
}: {
  eventType: string;
  roundNo: number;
  eventId: string;
  contains?: string;
}) {
  const { data, loading, error, fetchMore } = useQuery(TeamsByRoundDocument, {
    variables: {
      roundNo,
      eventId,
      first: 10,
      contains,
    },
  });

  const [markAttendance, { loading: AttendanceLoading }] = useMutation(
    OrganizerMarkAttendanceDocument,
    {
      refetchQueries: ['TeamsByRound'],
      awaitRefetchQueries: true,
    }
  );

  const [deleteTeam, { loading: deleteTeamLoading }] = useMutation(
    OrganizerDeleteTeamDocument,
    {
      refetchQueries: ['TeamsByRound'],
      awaitRefetchQueries: true,
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const [showModal, setShowModal] = useState(false);

  function handleCloseModal() {
    setShowModal(false);
  }

  const handleDelete = (teamId: string) => {
    console.log(teamId);
    let promise = deleteTeam({
      variables: {
        teamId: teamId,
      },
    }).then((res) => {
      if (res?.data?.organizerDeleteTeam.__typename === 'Error') {
        toast.success('Team deleted successfully');
        setShowModal(false);
      }

      if (res?.data?.organizerDeleteTeam.__typename === 'Error') {
        toast.error('Error deleting team');
        setShowModal(false);
      }
    });
    createToast(promise, 'Deleting');
  };

  const { endCursor, hasNextPage } = data?.teamsByRound.pageInfo || {};
  const lastItemRef = useRef<HTMLDivElement>(null);
  const [isFetching, setIsFetching] = useState(false);
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasNextPage) {
        setIsFetching(true);
        fetchMore({
          variables: { after: endCursor },
          updateQuery: (prevResult, { fetchMoreResult }) => {
            fetchMoreResult.teamsByRound.edges = [
              ...prevResult.teamsByRound.edges,
              ...fetchMoreResult.teamsByRound.edges,
            ];
            setIsFetching(false);
            return fetchMoreResult;
          },
        });
      }
    },
    [endCursor, hasNextPage, fetchMore]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, { threshold: 1 });
    if (lastItemRef.current) {
      observer.observe(lastItemRef.current);
    }
    let currentRef = lastItemRef.current;
    const updateObserver = () => {
      if (currentRef !== lastItemRef.current) {
        if (currentRef) {
          observer.unobserve(currentRef);
        }

        if (lastItemRef.current) {
          observer.observe(lastItemRef.current);
          currentRef = lastItemRef.current;
        }
      }
    };
    const timeoutId = setInterval(updateObserver, 1000);
    return () => {
      clearInterval(timeoutId);
      observer.disconnect();
    };
  }, [handleObserver, lastItemRef]);

  const teamOrParticipant =
    eventType === 'INDIVIDUAL' || eventType === 'INDIVIDUAL_MULTIPLE_ENTRY'
      ? 'Participant'
      : 'Team';

  if (loading) return <Spinner />;
  if (!data || data.teamsByRound.edges.length === 0)
    return (
      <p className="my-3 text-gray-400/70 italic text-center">no teams here</p>
    );

  return (
    <div>
      {data.teamsByRound.edges.map((team, index) => (
        <div
          className="bg-gray-600/40 p-3 mb-2 items-center rounded-lg flex justify-between flex-wrap gap-2"
          key={team?.node.id}
          ref={
            index === data.teamsByRound.edges.length - 1 ? lastItemRef : null
          }
        >
          <h2 className="text-xl font-semibold flex gap-2">
            <Badge color={'info'}>{team?.node.id}</Badge>
            {team?.node.name}
          </h2>
          <div className="flex flex-col md:flex-row gap-2">
            {/* Mark Attendance */}
            <Button
              onClick={() => {
                let promise = markAttendance({
                  variables: {
                    teamId: team?.node.id as string,
                    attended: !team?.node.attended,
                  },
                });
                createToast(promise, 'Updating Attendance');
              }}
              disabled={AttendanceLoading}
              intent={team?.node.attended ? 'danger' : 'primary'}
            >
              {team?.node.attended ? 'Unmark Attendance' : 'Mark Present'}
            </Button>

            {/* View Team */}
            <ViewTeamModal
              teamName={team?.node.name || ''}
              teamMembers={team?.node.members}
            />

            {/* Delete Team or Participant */}
            <Button
              intent={'danger'}
              onClick={() => {
                setShowModal(true);
              }}
              disabled={team?.node.attended || deleteTeamLoading}
            >
              Delete
            </Button>
            <Modal
              title={`Are you sure you want to delete ${teamOrParticipant} ${team?.node.id}?`}
              showModal={showModal}
              onClose={handleCloseModal}
              size={'small'}
            >
              <div className="flex justify-center gap-3 my-5">
                <Button
                  intent={'danger'}
                  onClick={() => {
                    handleDelete(team?.node.id as string);
                    console.log(team?.node.id);
                  }}
                  disabled={team?.node.attended || deleteTeamLoading}
                >
                  {deleteTeamLoading ? (
                    <Spinner intent={'white'} size={'small'} />
                  ) : (
                    'Delete'
                  )}
                </Button>
                <Button intent={'secondary'} onClick={() => handleCloseModal()}>
                  Cancel
                </Button>
              </div>
            </Modal>
          </div>
        </div>
      ))}
      {isFetching && <Spinner />}
      {!hasNextPage && !loading && (
        <p className="my-3 mt-5 text-gray-400/70 italic text-center">
          no more teams/users to show
        </p>
      )}
    </div>
  );
}

export default Teams;
