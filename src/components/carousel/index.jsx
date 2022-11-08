import React, { cloneElement, useRef, useState } from 'react';
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
  EffectCreative,
} from 'swiper';

// import required modules
import { useTheme } from '@mui/material';

export default function Carroussel({ children, size }) {
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
      // creativeEffect={{
      //   prev: {
      //     shadow: true,
      //     translate: [0, 0, -400],
      //   },
      //   next: {
      //     translate: ['100%', 0, 0],
      //   },
      // }}
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
      modules={[
        EffectCreative,
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
      {children}
    </Swiper>
  );
}
