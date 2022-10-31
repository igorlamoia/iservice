import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import './styles.css';

// import required modules

import {
  EffectCoverflow,
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
} from 'swiper';
import WorkerCard from '../worker-card';
export default function Carroussel() {
  return (
    <>
      <Swiper
        //
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        //
        loop={true}
        virtual={false}
        navigation={true}
        keyboard={true}
        mousewheel={true}
        spaceBetween={10}
        // pagination={{
        //   dynamicBullets: true,
        // }}
        pagination={true}
        modules={[
          EffectCoverflow,
          Navigation,
          Pagination,
          Mousewheel,
          Keyboard,
        ]}
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
        <SwiperSlide>
          <WorkerCard></WorkerCard>
        </SwiperSlide>
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
