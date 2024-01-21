import React from 'react'
import { PublishedEventsQuery } from '@/src/generated/generated'
import Link from 'next/link'
import {
  IoCalendarOutline,
  IoCashOutline,
  IoLocationOutline,
  IoPeopleOutline,
  IoPersonOutline,
} from 'react-icons/io5'
import { generateEventUrl } from '@/src/utils/url'
import Image from 'next/image'
import Button from '../button'
import GlitchAnimation from './glitchAnimation'

const Event = ({
  data,
}: {
  data: PublishedEventsQuery['publishedEvents'][0]
}) => {

  const getEventAttributes = () => {
    let teamSizeText = '',
      eventTypeText = ''
    if (data.minTeamSize === data.maxTeamSize) {
      if (data.minTeamSize !== 1)
        teamSizeText += `${data.minTeamSize} members per team`
      if (data.minTeamSize === 0) teamSizeText = ''
    } else {
      teamSizeText = `${data.minTeamSize} - ${data.maxTeamSize} members per team`
    }

    if (data.eventType.includes('MULTIPLE')) {
      eventTypeText =
        data.eventType.split('_')[0][0] +
        data.eventType.split('_')[0].slice(1).toLowerCase() +
        ' Event (Multiple Entry)'
    } else
      eventTypeText =
        data.eventType[0] + data.eventType.slice(1).toLowerCase() 

    eventTypeText = eventTypeText.replaceAll('Individual', 'Solo')
    eventTypeText = eventTypeText.replaceAll('Team', 'Multiplayer')

     return [
       {
         name: 'Date',
         text: data.rounds[0]?.date
           ? new Date(data.rounds[0]?.date).toLocaleString('en-IN', {
               day: 'numeric',
               month: 'short',
               hour: 'numeric',
               minute: 'numeric',
               hour12: true,
             })
           : 'TBD',
         Icon: IoCalendarOutline,
       },
       {
         name: 'Type',
         text: eventTypeText,
         Icon: IoPersonOutline,
       },
       {
         name: 'Venue',
         text: data.venue,
         Icon: IoLocationOutline,
       },
       {
         name: 'Fees',
         text: data.fees || 'Free',
         Icon: IoCashOutline,
       },

      //  {
      //    name: 'Team Size',
      //    text: teamSizeText,
      //    Icon: IoPeopleOutline,
      //  },
     ]
  }
  

  return (
    <Link href={generateEventUrl(data.name, data.id)}>
      <div className="bg-black mt-4 h-full hover:shadow-xl hover:scale-105 transition z-1 duration-300 ease-in-out cursor-pointer border-4 border-gray-600 rounded-xl">
        <div className="absolute z-10">
          <div className="w-9 h-9 rounded-full relative bottom-4 right-3 bg-slate-400 hover:scale-105 border-4 border-black"></div>
        </div>
        <div className="grow">
          <div className="text-center flex  w-full justify-center text-slate-400 text-xl font-bold my-1 uppercase">
            <h1 className="glitch">
              {data.name}
            </h1>
          </div>
          <div className="h-[0.625rem] custom-grad blur-[1.5px] min-h-4 my-2"></div>
          {data.image && (
            <Image
              src={data.image}
              alt={data.name}
              width={500}
              height={300}
              className="object-cover w-full h-full px-2 z-0 rounded-sm"
            />
          )}
          <div className="bg-slate-800 mx-2 py-2 mt-2 h-full hover:shadow-xl transition duration-300 ease-in-out cursor-pointer rounded-lg">
            <div className="flex flex-col gap-1.5 bodyFont text-white text-sm">
              {getEventAttributes().map((attr) =>
                attr.name ? (
                  <>
                    <div key={attr.name} className="flex p-1">
                      {<attr.Icon className="w-5" />}
                      <p className="leading-4">
                        {attr.name} : {attr.text}
                      </p>
                    </div>
                  </>
                ) : null
              )}
            </div>
            <div className="flex justify-center">
              <Button variant="secondary" className="bg-blue-200">
                Press to play
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}              

export default Event

{
  /* <div className="flex justify-center items-center">
        <div className="text-center text-white text-2xl font-bold">
          {data.name}
        </div>
      </div>

      <div className="bg-slate-800 h-full rounded-lg hover:shadow-xl transition duration-300 ease-in-out cursor-pointer ">
        <div className="relative grow">
          {data.image && (
            <Image
              src={data.image}
              alt={data.name}
              width={500}
              height={300}
              className="object-cover w-full h-full z-0 py-4 border-b border-orange-800"
            />
          )}
          <div className="flex flex-wrap mt-2 gap-1.5 bodyFont text-white">
            {getEventAttributes().map((attr) =>
              attr.text ? (
                <div key={attr.name} className="flex px-3 py-2 event-attribute">
                  {<attr.Icon className="w-5" />}
                  <p className="leading-4">{attr.text}</p>
                </div>
              ) : null
            )}
          </div>
<Button noScaleOnHover className="hover:scale-0 shrink-0 mt-2">
            <Link href={generateEventUrl(data.name, data.id)}>
              play the game
            </Link>
          </Button>
        </div>
      </div> */
}

// {getEventAttributes().map((attr, index) => (
//   <div key={index}>
//     <p>{attr.Date.text}</p>
//     {/* You can access other attributes similarly */}
//   </div>
// ))}
