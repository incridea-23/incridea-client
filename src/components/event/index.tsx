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
        ' (Multiple Entry)'
    } else
      eventTypeText = data.eventType[0] + data.eventType.slice(1).toLowerCase()

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
      //  {
      //    name: 'Fees',
      //    text: data.fees || 'Free',
      //    Icon: IoCashOutline,
      //  },

      //  {
      //    name: 'Team Size',
      //    text: teamSizeText,
      //    Icon: IoPeopleOutline,
      //  },
    ]
  }

  return (
    <Link data-scroll href={generateEventUrl(data.name, data.id)}>
      <div className="card w-full h-full font-VikingHell">
        <div className="top-section flex flex-col">
          <div>
            <div className="borderCard"></div>
            <div className="icons">
              <div className="logo">
                {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 94 94" className="svg">
                  <path fill="white" d="M38.0481 4.82927C38.0481 2.16214 40.018 0 42.4481 0H51.2391C53.6692 0 55.6391 2.16214 55.6391 4.82927V40.1401C55.6391 48.8912 53.2343 55.6657 48.4248 60.4636C43.6153 65.2277 36.7304 67.6098 27.7701 67.6098C18.8099 67.6098 11.925 65.2953 7.11548 60.6663C2.37183 56.0036 3.8147e-06 49.2967 3.8147e-06 40.5456V4.82927C3.8147e-06 2.16213 1.96995 0 4.4 0H13.2405C15.6705 0 17.6405 2.16214 17.6405 4.82927V39.1265C17.6405 43.7892 18.4805 47.2018 20.1605 49.3642C21.8735 51.5267 24.4759 52.6079 27.9678 52.6079C31.4596 52.6079 34.0127 51.5436 35.6268 49.4149C37.241 47.2863 38.0481 43.8399 38.0481 39.0758V4.82927Z"></path>
                  <path fill="white" d="M86.9 61.8682C86.9 64.5353 84.9301 66.6975 82.5 66.6975H73.6595C71.2295 66.6975 69.2595 64.5353 69.2595 61.8682V4.82927C69.2595 2.16214 71.2295 0 73.6595 0H82.5C84.9301 0 86.9 2.16214 86.9 4.82927V61.8682Z"></path>
                  <path fill="white" d="M2.86102e-06 83.2195C2.86102e-06 80.5524 1.96995 78.3902 4.4 78.3902H83.6C86.0301 78.3902 88 80.5524 88 83.2195V89.1707C88 91.8379 86.0301 94 83.6 94H4.4C1.96995 94 0 91.8379 0 89.1707L2.86102e-06 83.2195Z"></path>
                </svg> */}
              </div>
              <div className="social-media capitalize font-semibold justify-items-end items-center text-center text-[1.05rem]">
                {data.category?.replace("_"," ").toLocaleLowerCase()}
              </div>
            </div>
          </div>
          <div className="m-[6px]">
            {data.image && (
              <Image
                src={`https://res.cloudinary.com/dqy4wpxhn/image/upload/v1682653090/Events/VOCAL_TWIST_%28WESTERN%29_1682653088345.jpg`}
                alt={"Image"}
                width={250}
                height={250}
                className="object-scale-down rounded-xl h-full w-full z-0 text-white"
              />
            )}
          </div>
        </div>
        <div className="bottom-section flex flex-col justify-center items-center w-full">
          <span className="glitch eventTitle flex justify-center items-center text-center text-lg w-fit px-4">{data.name}</span>
          <div className="flex flex-col gap-1 text-center bodyFont text-base text-blue-200 px-1 py-3 justify-center items-start md:w-full">
            {getEventAttributes().map((attr,i) =>
              attr.name ? (
                <div className="flex flex-row gap-2 justify-center items-start text-left" key={i}>
                  <span className="flex flex-row gap-1"><attr.Icon/></span>
                  <span className="">{attr.text}</span>
                </div>
              ) : null
            )}
          </div>
        </div>
        <div className="p-2 pt-0 mt-0">
          <button className="hover:bg-[#69e5f8] shrink-0 w-full mt-0 py-2 flex gap-2 items-center justify-center rounded transition-colors duration-300 bg-[#10adc6]">
            <Link href={generateEventUrl(data.name, data.id)}>
              play the game
            </Link>
          </button>
        </div>
      </div>
    </Link>
  )
}

export default Event