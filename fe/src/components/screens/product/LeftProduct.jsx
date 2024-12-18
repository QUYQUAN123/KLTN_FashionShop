import { Box, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import ImageZoom from "react-image-zooom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

const ImageWrapper = styled(ImageZoom)({
  display: "block",
  width: "100%",
  objectFit: "contain",
  border: "3px solid #DD3333",
  borderRadius: 20,
});

const SwipperCustom = styled(Swiper)({
  "& .swiper-slide ": {
    textAlign: "center !important",
  },

  "&:hover": {
    "& .swiper-button-prev": {
      opacity: 1,
    },

    "& .swiper-button-next": {
      opacity: 1,
    },
  },

  "& .swiper-button-prev": {
    opacity: 0,
    "&::after": {
      fontSize: 20,
      color: "#111",
      fontWeight: 800,
    },
  },

  "& .swiper-button-next": {
    opacity: 0,
    "&::after": {
      fontSize: 20,
      color: "#111",
      fontWeight: 800,
    },
  },

  "& .swiper-pagination-bullet": {
    display: "none",
  },
});

const ImageSwipper = styled("div")({
  width: "100%",
  height: "100%",
  overflow: "hidden",

  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
    display: "block",
  },

  "&:hover": {
    border: "1px solid rgba(0,0,0,.2) !important",
    "& img": {
      transform: "scale(1.15)",
      transition: "all 0.5s ease-in-out",
    },
  },
});

function LeftProduct({ data }) {
  const [listImg, setListImge] = useState([]);
  const [active, setActive] = useState("");

  useEffect(() => {
    const newData = data?.filter(Boolean);
    setListImge(newData);
  }, [data]);

  useEffect(() => {
    setActive(listImg?.[0]);
  }, [listImg]);

  return (
    <Box>
      {active && <ImageWrapper src={active} alt="detail-product" zoom="200" />}
      <Box mt={"20px"}>
        <SwipperCustom
          slidesPerView={4}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {listImg?.map((img) => (
            <SwiperSlide key={img} onClick={() => setActive(img)}>
              <ImageSwipper>
                <img src={img} alt="img-more" />
              </ImageSwipper>
            </SwiperSlide>
          ))}
        </SwipperCustom>
      </Box>
    </Box>
  );
}

export default LeftProduct;
