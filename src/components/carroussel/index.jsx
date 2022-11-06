import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

import './styles.scss';
import {
  EffectCoverflow,
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
} from 'swiper';

// import required modules
import { useTheme } from '@mui/material';
import WorkerCard from '../worker-card';

export default function Carroussel() {
  const { palette } = useTheme();
  return (
    <Swiper
      //
      mode={palette.mode}
      effect="coverflow"
      grabCursor
      centeredSlides
      slidesPerView="auto"
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: false,
      }}
      //
      loop
      virtual={false}
      navigation
      keyboard
      // mousewheel={true}
      spaceBetween={10}
      // pagination={{
      //   dynamicBullets: true,
      // }}
      pagination={{
        dynamicBullets: true,
      }}
      modules={[EffectCoverflow, Navigation, Pagination, Mousewheel, Keyboard]}
      className="mySwiper"
      breakpoints={{
        0: {
          slidesPerView: 1,
          spaceBetween: 10,
        },

        480: {
          slidesPerView: 1,
          spaceBetween: 10,
        },

        700: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      }}
    >
      <SwiperSlide>
        <WorkerCard />
      </SwiperSlide>
      <SwiperSlide>
        <WorkerCard />
      </SwiperSlide>
      <SwiperSlide>
        <WorkerCard />
      </SwiperSlide>
      <SwiperSlide>
        <WorkerCard />
      </SwiperSlide>
      <SwiperSlide>
        <WorkerCard />
      </SwiperSlide>
    </Swiper>
  );
}
