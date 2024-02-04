import { usePresence } from "framer-motion";
import Image from "next/image";
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Autoplay, Mousewheel, Navigation, Swiper as SwiperType } from "swiper";
import "swiper/css";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

import { baseImageUrl } from "@/src/utils/url";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { IoAtCircle } from "react-icons/io5";
import BlurImage from "../blurImage";
import Console from "./devices/conosole-component";
import FinalComponent from "./devices/final-component";
import GbaComponent from "./devices/gba-component";
import RetroPC from "./devices/retropc-component";
import RetroTV from "./devices/retrotv-component";

type GalleryProps = {
  title: string;
  imgArr: string[];
  emulator: "gba" | "retroPC" | "console" | "retroTV" | "final";
};

const GallerySlide: FC<GalleryProps> = ({ title, imgArr, emulator }) => {
  switch (emulator) {
    case "gba":
      return <GbaComponent imgArr={imgArr} />;

    case "retroPC":
      return <RetroPC imgArr={imgArr} />;

    case "console":
      return <Console imgArr={imgArr} />;

    case "retroTV":
      return <RetroTV imgArr={imgArr} />;
      
    case "final":
      return <FinalComponent />;
  }
};

export default GallerySlide;
