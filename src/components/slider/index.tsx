// Carousel.tsx
import React, { useState } from "react";
import SwiperCore, { Navigation, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import styles from "./styles.module.css";
import { client } from "@/src/lib/apollo";
import { useQuery } from "@apollo/client";
import {
  PublishedEventsDocument,
  PublishedEventsQuery,
} from "@/src/generated/generated";
import Link from "next/link";
import { generateEventUrl } from "@/src/utils/url";

// Import Swiper styles
import "swiper/swiper-bundle.min.css";

// Install Swiper modules
SwiperCore.use([Navigation, Scrollbar, A11y]);

const Carousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const {
    data: eventsData,
    loading: eventLoading,
    error: eventError,
  } = useQuery<PublishedEventsQuery>(PublishedEventsDocument);

  let tempFilteredEvents = eventsData?.publishedEvents;

  tempFilteredEvents = tempFilteredEvents?.filter(
    (event) => event.category === "CORE"
  );

  const events: Array<{ id: string; name: string; image: string }> =
    tempFilteredEvents?.map((event) => ({
      id: event.id,
      name: event.name || "",
      image: event.image || "",
    })) || [];

  const handleSlideChange = (swiper: any) => {
    setActiveIndex(swiper.realIndex);
  };

  return (
    <div className="w-[300%] flex justify-center items-center relative z-10">
      <div className={styles.carousel_container}>
        <Swiper
          loop={true}
          navigation={{
            nextEl: `.${styles.swiper_button_next}`,
            prevEl: `.${styles.swiper_button_prev}`,
          }}
          draggable={true}
          onSlideChange={handleSlideChange}
          spaceBetween={40}
          slidesPerView={3}
          centeredSlides={true}
        >
          {events.map((data, index) => (
            <SwiperSlide
              key={index}
              className={`${styles.swiper_slide} ${
                index === activeIndex ? `${styles.active}` : ""
              }`}
            >
              {data.image ? (
                <Link href={generateEventUrl(data.name, data.id)}>
                  {data.image && (
                    <Image
                       src={`https://res.cloudinary.com/dqy4wpxhn/image/upload/v1682653090/Events/VOCAL_TWIST_%28WESTERN%29_1682653088345.jpg`}
                      // src={data.image}
                      alt={"Image"}
                      width={100}
                      height={100}
                      className="object-scale-down rounded-xl h-full w-full z-0"
                    />
                  )}
                </Link>
              ) : (
                <div className="h-full w-full bg-gray-300 flex items-center justify-center">
                  No Image
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="flex justify-center items-center">
        <div className={styles.swiper_button_next}>{`>`}</div>
        <div className={styles.swiper_button_prev}>{`<`}</div>
      </div>
    </div>
  );
};

export default Carousel;