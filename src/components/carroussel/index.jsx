import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './styles.css';

// import required modules

import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper';
import WorkerCard from '../worker-card';
export default function Carroussel() {
  return (
    <>
      <Swiper
        navigation={true}
        keyboard={true}
        mousewheel={true}
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
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
            slidesPerView: 1,
            spaceBetween: 30,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1200: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
      >
        <SwiperSlide>
          <WorkerCard></WorkerCard>
        </SwiperSlide>
        <SwiperSlide></SwiperSlide>
        <SwiperSlide>
          <WorkerCard></WorkerCard>
        </SwiperSlide>
        <SwiperSlide>
          <WorkerCard></WorkerCard>
        </SwiperSlide>
        <SwiperSlide>
          <WorkerCard></WorkerCard>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
