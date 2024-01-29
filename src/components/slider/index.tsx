// Carousel.tsx
import React, { useState } from "react";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import styles from "./styles.module.css";
import { client } from "@/src/lib/apollo";
import { useQuery } from "@apollo/client";
import {
  PublishedEventsDocument,
  PublishedEventsQuery,
} from "@/src/generated/generated";

// Import Swiper styles
import "swiper/swiper-bundle.min.css";

// Install Swiper modules
SwiperCore.use([Navigation, Scrollbar, A11y]);

// Sample array of image URLs


const Carousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const imageSlides = [
    "https://incridemo.web.app/events/CORE/robowars.png",
    "https://incridemo.web.app/events/CORE/robowars.png",
    "https://incridemo.web.app/events/CORE/StompThat.png",
    "https://incridemo.web.app/events/CORE/navarasa.png",
    "https://incridemo.web.app/events/CORE/Hogathon.png",
    "https://incridemo.web.app/events/CORE/navarasa.png",
    "https://incridemo.web.app/events/CORE/Hogathon.png",
    "https://incridemo.web.app/events/CORE/navarasa.png",
    "https://incridemo.web.app/events/CORE/Hogathon.png",
    "https://incridemo.web.app/events/CORE/navarasa.png",
    "https://incridemo.web.app/events/CORE/Hogathon.png",
  ];

  const {
    data: Events,
    loading: EventLoading,
    error: EventError,
  } = useQuery<PublishedEventsQuery>(PublishedEventsDocument);

  let tempFilteredEvents = Events?.publishedEvents;

  tempFilteredEvents = tempFilteredEvents?.filter(
    (event) => event.category === "CORE"
  );

  let core_events: string[] | undefined = tempFilteredEvents?.map((event) => {
    return event.image || ""; 
  });
  console.log(core_events);

  const handleSlideChange = (swiper: any) => {
    setActiveIndex(swiper.realIndex);
  };

  return (
    <div className=" w-[300%] top-10 flex justify-center items-center relative z-10">
      <div className={styles.carousel_container}>
        <Swiper
          loop={true} // Make it an infinite loop
          navigation={{
            nextEl: `.${styles.swiper_button_next}`,
            prevEl: `.${styles.swiper_button_prev}`,
          }}
          draggable={true}
          onSlideChange={handleSlideChange}
          spaceBetween={40} // Adjust spacing between slides
          slidesPerView={3} // Show 3 slides at a time
          centeredSlides={true} // Center the active slide
        >
          {/* {core_events?.map((imageUrl, index) => ( */}
            {imageSlides.map((imageUrl, index) => (
            <SwiperSlide
              key={index}
              className={`${styles.swiper_slide} ${
                index === activeIndex ? `${styles.active}` : ""
              }`}
            >
              <Image
                height={400}
                width={240}
                src={imageUrl}
                alt={`Card ${index + 1}`}
                className="object-contain"
              />
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
