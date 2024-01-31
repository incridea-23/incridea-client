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
import styles from './styles.module.css'

const Event = ({
  data,
}: {
  data: PublishedEventsQuery['publishedEvents'][0]
}) => {
  const getEventAttributes = () => {
    let teamSizeText = '',
      eventTypeText = ''
    if (data.minTeamSize === data.maxTeamSize) {
      if (data.minTeamSize === 1) 
        teamSizeText += `${data.minTeamSize} member per team`
      else
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

       {
         name: 'Team Size',
         text: teamSizeText,
         Icon: IoPeopleOutline,
       },
    ]
  }

  return (
    <Link data-scroll href={generateEventUrl(data.name, data.id)}>
      <div className={`${styles.card} w-full h-full font-VikingHell`}>
        <div className={`${styles.top_section} flex flex-col`}>
          <div>
            <div className={styles.borderCard}></div>
            <div className={styles.icons}>
              <div className="pl-2">
                <Image
                  src="/assets/png/incridealogo.png"
                  alt={'Incridea Logo'}
                  width={550}
                  height={550}
                  className="object-fill h-full w-full z-0 text-white"
                />
              </div>
              <div
                className={`${styles.social_media} font-VikingHell capitalize font-semibold justify-items-end items-center text-center text-[1.05rem]`}
              >
                {data.category?.replace('_', ' ').toLocaleLowerCase()}
              </div>
            </div>
          </div>
          <div className="my-[8px] md:m-[6px] px-2 md:px-0">
            <div className={`${styles.screen} rounded-xl object-fill md:m-[6px]`}>
              {data.image && (
                <Image
                  src={`https://res.cloudinary.com/dqy4wpxhn/image/upload/v1682653090/Events/VOCAL_TWIST_%28WESTERN%29_1682653088345.jpg`}
                  //src={data.image}
                  alt={'Image'}
                  width={250}
                  height={250}
                  className="object-fill rounded-xl h-full w-full z-0 text-white"
                />
              )}
              <div className={`${styles.screen_overlay}`}></div>
              <div className={`${styles.screen_overlay}`}></div>
            </div>
          </div>
        </div>
        <div
          className={`${styles.bottom_section} flex flex-col justify-center items-center w-full`}
        >
          <span
            className={`${styles.glitch} ${styles.eventTitle} font-VikingHell flex justify-center items-center text-center text-lg w-fit px-4`}
          >
            {data.name}
          </span>
          <div className="flex flex-col gap-1 text-center bodyFont text-base text-blue-200 px-1 py-3 justify-center items-start md:w-full">
            {getEventAttributes().map((attr, i) =>
              attr.name ? (
                <div
                  className="flex flex-row gap-2 justify-center items-start text-left"
                  key={i}
                >
                  <span className="flex flex-row gap-1">
                    <attr.Icon />
                  </span>
                  <span className="">{attr.text}</span>
                </div>
              ) : null
            )}
          </div>
        </div>
        <div className="p-2 pt-0 mt-0">
          <button className="hover:bg-[#69e5f8] shrink-0 w-full mt-0 py-2 flex gap-2 items-center justify-center rounded transition-colors duration-300 bg-[#10adc6] font-VikingHell">
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