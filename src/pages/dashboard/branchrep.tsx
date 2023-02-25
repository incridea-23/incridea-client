import {
  EventsByBranchRepDocument,
  CreateEventDocument,
  DeleteEventDocument
} from '@/src/generated/generated'
import { useAuth } from '@/src/hooks/useAuth'
import { useMutation, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Modal from '@/src/components/modal'
import { NextPage } from 'next'
import Spinner from '@/src/components/spinner'
import Button from '@/src/components/button'
import SearchBox from '@/src/components/searchbox'
import { BiTrash } from 'react-icons/bi'

const BranchRep: NextPage = () => {
  // Get User Data
  const { user, loading, error } = useAuth()

  // Modal State and Handlers
  const [isOpen, setIsOpen] = useState(false)
  const [innerIsOpen, setInnerIsOpen] = useState(false)
  const [modalContent, setModalContent] = useState<string | null>(null)

  //Controlled Inputs
  const [eventName, setEventName] = useState('')
  const [date, setDate] = useState(new Date())
  const [organizers, setOrganizers] = useState<
    {
      name: string
      id: string
    }[]
  >([])
  const [query, setQuery] = useState('')

  // Get events of Branch Rep
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

  /* Handlers */
  // 1. Add Event Handler
  const handleAddEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // const target = e.target as typeof e.target & {
    //   0: { value: string }
    // }
    // const name = target[0].value

    createEventMutation({
      variables: {
        name: eventName
      }
    }).then(() => {
      eventsRefetch()
      handleClose()
    })
  }

  // 2. Delete Event Handler
  const handleDeleteEvent = (id: number) => {
    deleteEventMutation({
      variables: {
        id: id
      }
    }).then(() => {
      eventsRefetch()
      handleClose()
    })
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

  // 4. Inner Modal Handlers (for adding organizers inside 'Add Events' modal)
  const handleInnerOpen = () => {
    setInnerIsOpen(true)
  }
  const handleInnerClose = () => {
    setInnerIsOpen(false)
  }

  //Dummy Users
  const dummyUsers = [
    {
      name: 'John Doe',
      id: '1001'
    },
    {
      name: 'Jane Doe',
      id: '1002'
    },
    {
      name: 'John Smith',
      id: '1003'
    }
  ]

  // Get branch name
  const branch = events?.eventsByBranchRep.find(event => event.branch.name)
    ?.branch.name

  // Redirect to profile if not branch rep
  const router = useRouter()
  if (loading) return <Spinner />
  if (!user || user.role !== 'BRANCH_REP') router.push('/profile')

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
          <h1>Fees</h1>
          <h1>Status</h1>
          <h1>Add Organizers</h1>
          <h1>Delete</h1>
        </div>

        {/* Status Updates */}
        {eventsLoading && <Spinner />}
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
            <h1 className='text-xl'>{event.fees}</h1>
            <h1
              className={`
              text-lg border rounded-lg px-2    w-fit
              ${event.published ? 'text-green-500' : 'text-red-500'}`}
            >
              {event.published ? 'Published' : 'Pending'}
            </h1>
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
              onClick={() => handleOpen('Add Organizers')}
            >
              Add Organizers
            </button>
            <button
              className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
              onClick={() => handleDeleteEvent(parseInt(event.id))}
            >
              {deleteEventLoading ? 'Deleting...' : 'Delete'}
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

      <Modal title={modalContent || ''} isOpen={isOpen} onClose={handleClose}>
        {/* Add Event */}

        {modalContent === 'Add Event' && (
          <div>
            {createEventLoading && <Spinner />}
            {!createEventLoading && (
              <>
                <form
                  onSubmit={e => {
                    handleAddEvent(e)
                  }}
                  className='flex flex-col gap-5'
                >
                  <div className='flex gap-3 items-center'>
                    <label className='basis-1/5' htmlFor='eventName'>
                      Name
                    </label>
                    <input
                      type='text'
                      value={eventName}
                      onChange={e => setEventName(e.target.value)}
                      id='eventName'
                      placeholder='Event Name'
                      className='basis-4/5 border border-gray-300 bg-white h-10 px-4 pr-16 rounded-lg text-sm focus:outline-none'
                    />
                  </div>
                  <div className='flex gap-3 items-center'>
                    <label className='basis-1/5' htmlFor='eventName'>
                      Date
                    </label>
                    <input
                      onChange={e => {
                        setDate(new Date(e.target.value))
                      }}
                      type='date'
                      id='eventName'
                      placeholder='Event Name'
                      className='basis-4/5 border border-gray-300 bg-white h-10 px-4 rounded-lg text-sm focus:outline-none'
                    />
                  </div>
                  <Button
                    type='button'
                    onClick={() => handleInnerOpen()}
                    fullWidth
                    intent={'secondary'}
                  >
                    Add Organisers
                  </Button>
                  <Button type='submit' intent={'primary'} fullWidth>
                    Add Event
                  </Button>
                </form>
              </>
            )}
          </div>
        )}

        {/* Add Organizers */}
        {modalContent === 'Add Organizers' && (
          <div>
            <SearchBox value={query} onChange={e => setQuery(e.target.value)} />
            <div className='mt-4 bg-gray-200 p-2  rounded-lg min-w-[400px]  flex flex-col gap-2'>
              <div className='flex justify-between py-2 font-semibold'>
                <h1 className='basis-4/12 text-md pl-4'>ID</h1>
                <h1 className='basis-5/12 text-md '>Name</h1>
                <h1 className='basis-3/12 text-md text-center'>Remove</h1>
              </div>
              {dummyUsers.map(user => (
                <div
                  key={user.id}
                  className='bg-white py-2 rounded-lg flex items-center'
                >
                  <h1 className='basis-4/12 pl-4'>{user.id}</h1>
                  <h1 className='basis-5/12 '>{user.name}</h1>
                  <div className='basis-3/12 text-center'>
                    <Button
                      intent={'secondary'}
                      className='text-xl p-2 rounded-full transition-colors text-red-500  hover:bg-red-100'
                    >
                      <BiTrash />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>
      
      {/* Inner modal for adding organizers inside 'Add Event' modal */}
      <Modal
        size='small'
        title={`${eventName} organizers`}
        isOpen={innerIsOpen}
        onClose={handleInnerClose}
      >
        <SearchBox value={query} onChange={e => setQuery(e.target.value)} />
        <div className='mt-4 bg-gray-200 p-2  rounded-lg min-w-[400px]  flex flex-col gap-2'>
          <div className='flex justify-between py-2 font-semibold'>
            <h1 className='basis-4/12 text-md pl-4'>ID</h1>
            <h1 className='basis-5/12 text-md '>Name</h1>
            <h1 className='basis-3/12 text-md text-center'>Remove</h1>
          </div>
          {dummyUsers.map(user => (
            <div
              key={user.id}
              className='bg-white py-2 rounded-lg flex items-center'
            >
              <h1 className='basis-4/12 pl-4'>{user.id}</h1>
              <h1 className='basis-5/12 '>{user.name}</h1>
              <div className='basis-3/12 text-center'>
                <Button
                  intent={'secondary'}
                  className='text-xl p-2 rounded-full transition-colors text-red-500  hover:bg-red-100'
                >
                  <BiTrash />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  )
}

export default BranchRep
