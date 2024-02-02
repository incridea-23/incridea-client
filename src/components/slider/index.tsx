// Carousel.tsx
import React, { useState } from "react";
import SwiperCore, { Navigation, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import styles from "./styles.module.css";
import { client } from "@/src/lib/apollo";
import { useQuery } from "@apollo/client";
import { GoChevronRight, GoChevronLeft } from "react-icons/go";
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

interface CarouselProps {
  events?: Array<{ id: string; name: string; image: string }>;
}

const Carousel: React.FC<CarouselProps> = ({ events = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = (swiper: any) => {
    setActiveIndex(swiper.realIndex);
  };

  return (
    <div className="w-[300%] flex justify-center items-center relative z-10">
      <div className={styles.carousel_container}>
        <Swiper
          navigation={{
            nextEl: `.${styles.swiper_button_next}`,
            prevEl: `.${styles.swiper_button_prev}`,
          }}
          draggable={true}
          onSlideChange={handleSlideChange}
          spaceBetween={40}
          slidesPerView={3}
          centeredSlides={true}
          loop={true}
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
                      src={data.image}
                      alt={"Image"}
                      width={300}
                      height={300}
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
        <div className="flex flex-between items-center">
          <div
            className={`${styles.swiper_button_next} lg:right-0 md:right-[10%] sm:right-[20%]  right-[30%]  z-[1001] rounded-full opacity-90`}
          >
            <GoChevronRight size={30} />
          </div>
          <div
            className={`${styles.swiper_button_prev} lg:left-0 md:left-[10%] sm:left-[20%] left-[30%] z-[1001] rounded-full opacity-90`}
          >
            <GoChevronLeft size={30} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
