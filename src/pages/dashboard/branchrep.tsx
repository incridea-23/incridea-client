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
import Spinner from '@/src/components/spinner'
import Button from '@/src/components/button'
import SearchBox from '@/src/components/searchbox'
import { BiTrash } from 'react-icons/bi'
import { AiOutlinePlus } from 'react-icons/ai'
import TextInput from '@/src/components/input'
import toast, { Toaster } from 'react-hot-toast'

const BranchRep: NextPage = () => {
  // Get User Data
  const { user, loading, error } = useAuth()

  // Modal State and Handlers
  const [isOpen, setIsOpen] = useState(false)
  const [modalContent, setModalContent] = useState<string | null>(null)

  //Controlled Inputs
  const [eventName, setEventName] = useState('')
  const [eventType, setEventType] = useState<EventType>(EventType.Individual)

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

  // Currently selected event | set when 'Add Organizer' or 'Delete Event' is clicked. Helps in getting event id for mutation.
  const [currentEvent, setCurrentEvent] = useState<{
    id: number
    name?: string
  }>()

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

  /** Custom toast function to notify users while mutation is in progress
   * @param {Promise} promise - Promise returned by mutation
   * @param {string} loadingText - (optional) Text to be displayed while loading. Error text is inferred from this.
   */
  const createToast = (promise: Promise<any>, loadingText?: string) => {
    const errorText = loadingText?.toLowerCase().replace('...', '')
    return toast.promise(
      promise,
      {
        loading: loadingText || 'Loading...',
        success: 'All done!',
        error: `Error ${errorText} 🫤`
      },
      {
        position: 'bottom-center'
      }
    )
  }

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

    let promise = createEventMutation({
      variables: {
        eventType: eventType,
        name: eventName
      }
    }).then(res => {
      if (res.data?.createEvent.__typename === 'MutationCreateEventSuccess') {
        handleClose()
        return eventsRefetch()
      }
    })
    createToast(promise, 'Adding event...')
  }

  // 2. Delete Event Handler
  const handleDeleteEvent = (id: number) => {
    let promise = deleteEventMutation({
      variables: {
        id: id
      }
    }).then(res => {
      if (res.data?.deleteEvent.__typename === 'MutationDeleteEventSuccess') {
        handleClose()
        return eventsRefetch()
      }
    })
    createToast(promise, 'Deleting event...')
  }

  // 3. Modal Handlers
  const handleOpen = (content: string) => {
    setModalContent(content)
    setIsOpen(true)
  }
  const handleClose = () => {
    setModalContent(null)
    setIsOpen(false)
  }

  // 4. Add Organizer Handler
  const handleAddOrganizer = (id: number, organizerId: string) => {
    let promise = addOrganizerMutation({
      variables: {
        eventId: id.toString(),
        userId: organizerId
      }
    }).then(res => {
      if (res.data?.addOrganizer.__typename === 'MutationAddOrganizerSuccess') {
        return eventsRefetch()
      }
    })
    createToast(promise, 'Adding organizer...')
  }

  // 5. Remove Organizer Handler
  const handleRemoveOrganizer = (id: number, organizerId: string) => {
    let promise = removeOrganizerMutation({
      variables: {
        eventId: id.toString(),
        userId: organizerId
      }
    }).then(res => {
      if (
        res.data?.removeOrganizer.__typename ===
        'MutationRemoveOrganizerSuccess'
      ) {
        return eventsRefetch()
      }
    })
    createToast(promise, 'Removing organizer...')
  }

  // Get branch name
  const branch = events?.eventsByBranchRep.find(event => event.branch.name)
    ?.branch.name

  // Redirect to profile if not branch rep
  const router = useRouter()
  if (loading) return <Spinner />
  if (user && user.role !== 'BRANCH_REP') router.push('/profile')

  // Redirect to login if not logged in
  if (!user) router.push('/auth/login')

  return (
    <div className='min-h-screen min-w-screen bg-gradient-to-t from-black  to-blue-900 text-gray-100 md:p-10 p-6'>
      {/* Welcome Header */}
      <Toaster />
      <div className='flex justify-between items-stretch'>
        <div className=''>
          <h1 className='text-4xl mb-3'>
            Hello <span className='font-semibold'>{user?.name}</span>!
          </h1>
          <div className='flex gap-3 items-center'>
            <h1 className='text-2xl '>Registered Events</h1>
            {branch && (
              <a className='text-xs border rounded-full py-1 justify-center px-2'>
                {branch}
              </a>
            )}
          </div>
        </div>
        {/* Add Event */}
        <div className='flex items-center justify-center'>
          <Button
            intent={'info'}
            size='large'
            onClick={() => handleOpen('Add Event')}
          >
            Add Event
          </Button>
        </div>
      </div>

      {/* Events */}
      <div className='mt-5 flex flex-col gap-2'>
        {/* Event Header */}
        <div className='hidden md:flex bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg bg-clip-padding rounded-lg p-2 items-center justify-between gap-5 text-2xl font-bold'>
          <h1 className='basis-1/5 text-start pl-4'>Event Name</h1>
          <h1 className='basis-1/5 text-center'>Type</h1>
          <h1 className='basis-1/5 text-center'>Status</h1>
          <h1 className='basis-1/5 text-center'>Edit Organizers</h1>
          <h1 className='basis-1/5 text-end pr-5'>Delete</h1>
        </div>

        {/* Status Updates */}
        {eventsLoading && <Spinner />}
        {eventsError && (
          <div className='text-center font-semibold my-10 text-xl text-red-400'>
            Couldn&apos;t fetch data. Please try again later.
          </div>
        )}
        {events?.eventsByBranchRep.length === 0 && (
          <div className='text-center'>
            <h1>No Events Registered</h1>
          </div>
        )}

        {/* Events list */}
        {events?.eventsByBranchRep.map(event => (
          <div
            key={event.id}
            className='bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg bg-clip-padding rounded-lg md:p-5 p-3 flex flex-col md:flex-row md:items-center items-start justify-between md:gap-5 gap-3'
          >
            <h1 className='text-xl overflow-x-auto text-start inline-flex flex-wrap gap-2 font-bold md:basis-1/5'>
              {event.name}{' '}
              <span className='block text-lg font-light md:hidden'>
                ({event.eventType})
              </span>
            </h1>
            <h1 className='hidden md:block text-lg text-center md:basis-1/5'>
              {event.eventType}
            </h1>
            <div className='text-center md:basis-1/5'>
              <h1
                className={`
                 border rounded-full px-3 leading-7 text-center mx-auto w-fit
                ${
                  event.published
                    ? 'border-green-500 text-green-500'
                    : 'border-red-500 text-red-500'
                }`}
              >
                {event.published ? 'Published' : 'Pending'}
              </h1>
            </div>
            <div className='md:basis-1/5 text-center'>
              <Button
                className='mx-auto'
                onClick={() => {
                  handleOpen('Edit Organizers')
                  setCurrentEvent({ id: parseInt(event.id) })
                }}
              >
                Edit Organizers
                <span className='font-light'>
                  {event.organizers.length > 0 && (
                    <span>({event.organizers.length})</span>
                  )}
                </span>
              </Button>
            </div>
            <div className='md:basis-1/5 text-end '>
              <Button
                intent={'danger'}
                className='ml-auto '
                onClick={() => {
                  handleOpen('Delete Event')
                  setCurrentEvent({
                    id: parseInt(event.id),
                    name: event.name
                  })
                }}
                disabled={event.published}
              >
                Delete <BiTrash />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal component 
      1. Add Event
      2. Edit Organizers 
      3. Delete Event*/}

      <Modal
        size={modalContent === 'Delete Event' ? 'small' : 'medium'}
        title={modalContent}
        isOpen={isOpen}
        onClose={handleClose}
      >
        {/* Add Event */}
        {modalContent === 'Add Event' && (
          <div>
            <>
              <form
                onSubmit={e => {
                  handleAddEvent(e)
                }}
                className={`flex flex-col gap-5 ${
                  createEventLoading &&
                  'opacity-50 pointer-events-none cursor-not-allowed '
                }}`}
              >
                <div className='flex gap-3 items-center'>
                  <label className='basis-1/5' htmlFor='eventName'>
                    Name
                  </label>
                  <TextInput
                    value={eventName}
                    onChange={e => setEventName(e.target.value)}
                    id='eventName'
                    placeholder='Event Name'
                    additionalclasses='basis-4/5'
                  />
                </div>
                <div className='flex gap-3 items-center'>
                  <label className='basis-1/5' htmlFor='eventType'>
                    Type
                  </label>
                  <select
                    onChange={e => {
                      setEventType(e.target.value as EventType)
                    }}
                    value={eventType}
                    id='eventType'
                    placeholder='Event Type'
                    className='basis-4/5  bg-gray-700 border border-gray-500 h-10 px-4 pr-16 rounded-lg text-sm focus:outline-none focus:ring-2 ring-gray-500'
                  >
                    {Object.values(EventType).map(type => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <Button type='submit' intent={'primary'} fullWidth>
                  Add Event
                </Button>
              </form>
            </>
          </div>
        )}
        {/* Edit Organizers */}
        {modalContent === 'Edit Organizers' && (
          <div className='flex flex-col md:flex-row gap-3'>
            <div className='basis-5/12 bg-gray-700 rounded-lg p-3'>
              {events?.eventsByBranchRep.map(
                event =>
                  parseInt(event.id) === currentEvent?.id && (
                    <div key={event.id}>
                      <h1 className='font-semibold text-xl mb-3'>
                        {event.name}
                      </h1>
                      {event.organizers.length === 0 && (
                        <div className='h-64 flex items-center justify-center text-gray-400'>
                          <h1 className=''>No organizers added</h1>
                        </div>
                      )}
                      <div className='md:max-h-80 max-h-64 overflow-y-auto pt-1'>
                        {event.organizers.map(organizer => (
                          <div
                            key={organizer.user.id}
                            className='flex mb-3 justify-between items-center gap-5'
                          >
                            <h1>{organizer.user.name}</h1>
                            <Button
                              intent={'danger'}
                              size='small'
                              outline
                              className='mr-1 px-1'
                              onClick={() =>
                                handleRemoveOrganizer(
                                  parseInt(event.id),
                                  organizer.user.id
                                )
                              }
                            >
                              <BiTrash />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
              )}
            </div>
            {/* List of queried users */}
            <div className='basis-7/12 bg-gray-700 rounded-lg p-3'>
              <SearchBox
                value={name}
                onChange={e => {
                  setName(e.target.value)
                }}
              />
              <div className='mt-3 md:max-h-72 max-h-64 md:h-72 overflow-y-auto'>
                {searchUsersLoading && <Spinner size={'small'} />}
                {searchUsersData?.users?.edges.map((user, index) => (
                  <div
                    key={index}
                    className='border border-gray-500  rounded-lg mb-2 mr-2 md:p-2 p-1 px-2 flex justify-between items-center'
                    ref={
                      index === searchUsersData.users.edges.length - 1
                        ? lastItemRef
                        : null
                    }
                  >
                    <div>
                      <h1 className='md:text-xl text-lg'>{user?.node.name}</h1>
                      <h1 className='text-sm font-thin'>{user?.node.email}</h1>
                    </div>
                    <Button
                      intent={'secondary'}
                      size='small'
                      className='flex gap-1 items-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200'
                      onClick={() =>
                        handleAddOrganizer(
                          currentEvent?.id as number,
                          user?.node.id as string
                        )
                      }
                    >
                      Add
                      <AiOutlinePlus />
                    </Button>
                  </div>
                ))}
                {isFetching && <Spinner size={'small'} />}
                {!hasNextPage && !searchUsersLoading && (
                  <p className='my-5 text-gray-400 text-center'>
                    no more users to show
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
        {/* Delete Event Confirmation */}
        {modalContent === 'Delete Event' && (
          <div>
            <h1 className='text-center text-xl'>
              Are you sure you want to delete{' '}
              <span className='font-bold'>{currentEvent?.name}</span>?
            </h1>
            <div className='flex justify-center gap-3 mt-5'>
              <Button
                intent={'danger'}
                onClick={() => handleDeleteEvent(currentEvent?.id as number)}
                disabled={deleteEventLoading}
              >
                Delete
              </Button>
              <Button intent={'secondary'} onClick={() => handleClose()}>
                Cancel
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default BranchRep
