import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { Box, styled } from "@mui/material";

const SwipperCustom = styled(Swiper)({
  "& .swiper-slide ": {
    textAlign: "center !important",
  },
  "& .swiper-button-prev": {
    display: "none !important",
  },

  "& .swiper-button-next": {
    display: "none !important",
  },

  "& .swiper-pagination": {
    bottom: 0,
  },

  "& .swiper-pagination-bullet": {
    height: "6px",
    width: "30px",
    borderRadius: "4px",
    background: "#fff",
  },
});

export default function SwipperIntroduce() {
  const listItem = [
    "/img/home/HomeIntroduce1.webp",
    "/img/home/HomeIntroduce2.webp",
    "/img/home/HomeIntroduce3.webp",
  ];

  return (
    <>
      <SwipperCustom
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {listItem?.map((e) => (
          <SwiperSlide key={e}>
            <Box
              component={"img"}
              src={e}
              width={"100%"}
              sx={{ objectFit: "contain" }}
            />
          </SwiperSlide>
        ))}
      </SwipperCustom>
    </>
  );
}
