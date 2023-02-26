import React from 'react'

type Props = {}

const index = (props: Props) => {
	return (
			<div>
				{/* <SearchBox value={query} onChange={e => setQuery(e.target.value)} />
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
					))} */}
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
	)
}

export default index