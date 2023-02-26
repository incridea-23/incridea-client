import {
  EventsByBranchRepDocument,
  CreateEventDocument,
  DeleteEventDocument,
  SearchUsersDocument,
  AddOrganizerDocument,
  RemoveOrganizerDocument,
  EventType
} from '@/src/generated/generated'
import { useAuth } from '@/src/hooks/useAuth'
import { useMutation, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { useState, useRef, useEffect, useCallback } from 'react'
import Modal from '@/src/components/modal'
import { NextPage } from 'next'

const BranchRep: NextPage = () => {
  // Get User Data
  const { user, loading, error } = useAuth()

  // Modal States
  const [isOpen, setIsOpen] = useState(false)
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(null)

  /* Queries */
  // 1. Get events of Branch Rep
  const {
    data: events,
    loading: eventsLoading,
    error: eventsError,
    refetch: eventsRefetch
  } = useQuery(EventsByBranchRepDocument, {
    variables: {
      branchRepId: user?.id as string
    }
  })

  // Currently selected event | set when 'Add Organizer' is clicked. Helps in getting event id for mutation.
  const [currentEvent, setCurrentEvent] = useState<number>()

  // 2. Search Users
  // Currently searched user
  const [name, setName] = useState<string>('')

  const {
    data: searchUsersData,
    loading: searchUsersLoading,
    error: searchUsersError,
    fetchMore: searchUsersFetchMore
  } = useQuery(SearchUsersDocument, {
    variables: {
      first: 10,
      contains: name
    }
  })

  /* Infinite Scroll Logic */
  // Get pageInfo for infinite scroll
  const { endCursor, hasNextPage } = searchUsersData?.users.pageInfo || {}

  // Create a ref for the last item in the list
  const lastItemRef = useRef<HTMLDivElement>(null)

  // State to check if we're fetching more data
  const [isFetching, setIsFetching] = useState(false)

  /* Intersection Observer callback function 
  (memoize the handleObserver to avoid triggering unnecessary re-renders, 
  function will only be recreated if any of its dependencies change, and not on every render) */
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0]
      if (target.isIntersecting && hasNextPage) {
        setIsFetching(true)
        searchUsersFetchMore({
          variables: { after: endCursor },
          updateQuery: (prevResult, { fetchMoreResult }) => {
            fetchMoreResult.users.edges = [
              ...prevResult.users.edges,
              ...fetchMoreResult.users.edges
            ]
            setIsFetching(false)
            return fetchMoreResult
          }
        })
      }
    },
    [endCursor, hasNextPage, searchUsersFetchMore]
  )

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, { threshold: 1 })

    if (lastItemRef.current) {
      observer.observe(lastItemRef.current)
    }

    let currentRef = lastItemRef.current

    // Observe changes to the lastItemRef.current value and update the observer accordingly, because initial value will be null
    const updateObserver = () => {
      if (currentRef !== lastItemRef.current) {
        if (currentRef) {
          observer.unobserve(currentRef)
        }

        if (lastItemRef.current) {
          observer.observe(lastItemRef.current)
          currentRef = lastItemRef.current
        }
      }
    }

    const timeoutId = setInterval(updateObserver, 1000)

    // Return cleanup function that clears the intrval and disconnects observer.
    return () => {
      clearInterval(timeoutId)
      observer.disconnect()
    }
  }, [handleObserver, lastItemRef])

  /* Mutations */
  // 1. Add Event
  const [
    createEventMutation,
    {
      data: createEventData,
      loading: createEventLoading,
      error: createEventError
    }
  ] = useMutation(CreateEventDocument)

  // 2. Delete Event
  const [
    deleteEventMutation,
    {
      data: deleteEventData,
      loading: deleteEventLoading,
      error: deleteEventError
    }
  ] = useMutation(DeleteEventDocument)

  // 3. Add Organizer
  const [
    addOrganizerMutation,
    {
      data: addOrganizerData,
      loading: addOrganizerLoading,
      error: addOrganizerError
    }
  ] = useMutation(AddOrganizerDocument)

  // 4. Remove Organizer
  const [
    removeOrganizerMutation,
    {
      data: removeOrganizerData,
      loading: removeOrganizerLoading,
      error: removeOrganizerError
    }
  ] = useMutation(RemoveOrganizerDocument)

  /* Handlers */
  // 1. Add Event Handler
  const handleAddEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      0: { value: string }
      1: { value: EventType }
    }
    const eventName = target[0].value as string
    const eventType = target[1].value as EventType

    createEventMutation({
      variables: {
        eventType: eventType,
        name: eventName
      }
    }).then(res => {
      if (res.data?.createEvent.__typename === 'MutationCreateEventSuccess') {
        eventsRefetch()
        handleClose()
      }
    })
  }

  // 2. Delete Event Handler
  const handleDeleteEvent = (id: number) => {
    deleteEventMutation({
      variables: {
        id: id
      }
    }).then(res => {
      if (res.data?.deleteEvent.__typename === 'MutationDeleteEventSuccess') {
        eventsRefetch()
      }
    })
  }

  // 3. Modal Handlers
  const handleOpen = (content: React.ReactNode) => {
    setModalContent(content)
    setIsOpen(true)
  }

  const handleClose = () => {
    setModalContent(null)
    setIsOpen(false)
  }

  // 4. Add Organizer Handler
  const handleAddOrganizer = (id: number, organizerId: string) => {
    addOrganizerMutation({
      variables: {
        eventId: id.toString(),
        userId: organizerId
      }
    }).then(res => {
      if (res.data?.addOrganizer.__typename === 'MutationAddOrganizerSuccess') {
        eventsRefetch()
      }
    })
  }

  // 5. Remove Organizer Handler
  const handleRemoveOrganizer = (id: number, organizerId: string) => {
    removeOrganizerMutation({
      variables: {
        eventId: id.toString(),
        userId: organizerId
      }
    }).then(res => {
      if (
        res.data?.removeOrganizer.__typename ===
        'MutationRemoveOrganizerSuccess'
      ) {
        eventsRefetch()
      }
    })
  }

  // Get branch name
  const branch = events?.eventsByBranchRep.find(event => event.branch.name)
    ?.branch.name

  // Redirect to profile if not branch rep
  const router = useRouter()
  if (loading) return <div>Loading...</div>
  if (user && user.role !== 'BRANCH_REP') router.push('/profile')

  // Redirect to login if not logged in
  if (!user) router.push('/auth/login')

  return (
    <div className='h-screen w-screen bg-gradient-to-t from-black  to-blue-900 text-gray-100 p-10'>
      {/* Welcome Header */}
      <div className='text-center '>
        <h1 className='text-4xl '>Hello {user?.name}!</h1>
      </div>
      <div>
        <div className='flex items-center justify-center gap-2'>
          <h1 className='text-2xl underline'>Registered Events</h1>
          {branch && <a className='text-xs border rounded-lg px-2'>{branch}</a>}
        </div>
      </div>

      {/* Events */}
      <div className='mt-5 flex flex-col gap-5'>
        {/* Event Header */}
        <div className='bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg bg-clip-padding rounded-lg p-2 flex items-center justify-between gap-5 text-2xl font-bold'>
          <h1>Event Name</h1>
          <h1>Type</h1>
          <h1>Status</h1>
          <h1>Add Organizers</h1>
          <h1>Delete</h1>
        </div>

        {/* Status Updates */}
        {eventsLoading && <div>Loading...</div>}
        {eventsError && <div>Error</div>}
        {events?.eventsByBranchRep.length === 0 && (
          <div className='text-center'>
            <h1>No Events Registered</h1>
          </div>
        )}

        {/* Events list */}
        {events?.eventsByBranchRep.map(event => (
          <div
            key={event.id}
            className='bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg bg-clip-padding rounded-lg p-5 flex items-center justify-between gap-5'
          >
            <h1 className='text-xl'>{event.name}</h1>
            <h1 className='text-xl'>{event.eventType}</h1>
            <h1
              className={`
              text-lg border rounded-lg px-2    w-fit
              ${event.published ? 'text-green-500' : 'text-red-500'}`}
            >
              {event.published ? 'Published' : 'Pending'}
            </h1>
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
              onClick={() => {
                handleOpen('Add Organizers')
                setCurrentEvent(parseInt(event.id))
              }}
            >
              Add Organizers
              <span className='text-xs'>
                {event.organizers.length > 0 && (
                  <span>({event.organizers.length})</span>
                )}
              </span>
            </button>
            <button
              className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ${
                (deleteEventLoading || event.published) &&
                'bg-red-300 hover:bg-red-300 text-gray-500 cursor-not-allowed'
              }}`}
              onClick={() => {
                handleDeleteEvent(parseInt(event.id))
              }}
              disabled={deleteEventLoading || event.published}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Add Event */}
      <div className='flex items-center justify-center mt-5'>
        <button
          onClick={() => handleOpen('Add Event')}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Add Event
        </button>
      </div>

      {/* Modal component 
      1. Add Event
      2. Add Organizers */}
      <Modal isOpen={isOpen} onClose={handleClose}>
        {/* Add Event */}
        {modalContent === 'Add Event' && (
          <div>
            <h1>Add Event</h1>
            {createEventLoading && <div>Loading...</div>}
            {!createEventLoading && (
              <form
                onSubmit={e => {
                  handleAddEvent(e)
                }}
                className='flex flex-col gap-5'
              >
                <input
                  type='text'
                  placeholder='Event Name'
                  className='border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none'
                />
                <select
                  placeholder='Event Type'
                  className='border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none'
                >
                  {Object.values(EventType).map(type => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>

                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                  Add Event
                </button>
              </form>
            )}
          </div>
        )}

        {/* Add Organizers */}
        {modalContent === 'Add Organizers' && (
          <div>
            <h1>Add Organizers</h1>
            {/* Search for users */}
            <div className='flex gap-5'>
              <input
                type='text'
                placeholder='Search for users'
                className='border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none'
                defaultValue={name}
                onChange={e => {
                  setName(e.target.value)
                }}
              />
            </div>
            {/* List of queried users */}
            <div className='mt-5 max-h-40 overflow-y-scroll'>
              {searchUsersLoading && <div>Loading...</div>}
              {searchUsersData?.users?.edges.map((user, index) => (
                <div
                  key={index}
                  className='border'
                  ref={
                    index === searchUsersData.users.edges.length - 1
                      ? lastItemRef
                      : null
                  }
                >
                  <h1 className='text-xl'>{user?.node.name}</h1>
                  <h1 className='text-sm font-thin'>{user?.node.email}</h1>
                  <button
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                    onClick={() =>
                      handleAddOrganizer(
                        currentEvent as number,
                        user?.node.id as string
                      )
                    }
                  >
                    Add Organizer
                  </button>
                </div>
              ))}
              {isFetching && <div>Loading users...</div>}
              {!hasNextPage && (
                <p className='my-10 text-center'>No more users to show</p>
              )}
            </div>
            <div>
              {events?.eventsByBranchRep.map(
                event =>
                  parseInt(event.id) === currentEvent && (
                    <div key={event.id}>
                      <h1>{event.name}</h1>
                      {event.organizers.length === 0 && (
                        <div className='text-center'>
                          <h1>No Organizers Added</h1>
                        </div>
                      )}
                      {event.organizers.map(organizer => (
                        <div
                          key={organizer.user.id}
                          className='flex items-center gap-5'
                        >
                          <h1>{organizer.user.name}</h1>
                          <button
                            onClick={() =>
                              handleRemoveOrganizer(
                                parseInt(event.id),
                                organizer.user.id
                              )
                            }
                            className={`bg-red-500 hover:bg-red-700 text-white font-bold py-q px-2 rounded ${
                              removeOrganizerLoading &&
                              `bg-red-300 hover:bg-red-300 text-gray-500 cursor-not-allowed`
                            }}`}
                            disabled={removeOrganizerLoading}
                          >
                            X
                          </button>
                        </div>
                      ))}
                    </div>
                  )
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default BranchRep
