import { Grid } from "@mui/material";
import React from "react";
import HomeCart from "./HomeCart";

export default function HomeCategory() {
  const listCategory = [
    "/img/home/HomeCard1.png",
    "/img/home/HomeCard2.webp",
    "/img/home/HomeCard3.webp",
    "/img/home/HomeCard4.webp",
    "/img/home/HomeCard5.webp",
    "/img/home/HomeCard6.webp",
    "/img/home/HomeCard7.webp",
    "/img/home/HomeCard8.webp",
  ];
  return (
    <Grid container spacing={0.5}>
      {listCategory?.map((e) => (
        <Grid item xs={3} md={1.5} key={e}>
          <HomeCart img={e} />
        </Grid>
      ))}
    </Grid>
  );
}
