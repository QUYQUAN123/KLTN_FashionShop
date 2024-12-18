import React, { useEffect, useState } from "react";
import Header from "./header/Header";
import Footer from "./footer";
import { Box, Container, Stack, styled } from "@mui/material";
import Term from "../common/Term";
import QandA from "../common/QandA";
import ListContact from "../common/ListContact";
import ScrollToTop from "../common/ScrollToTop";

const Wrapper = styled(Box)({
  width: "100%",
  overflowX: "hidden",
  background: "#f8f8fc",

  "& #header": {
    top: 0,
    position: "fixed",
    width: "100%",
    zIndex: 999,
  },

  "& .visible": {
    top: "0 !important",
    transition: "top 0.3s ease-out !important",
  },

  "& .hidden": {
    top: "-200px !important",
    transition: "top 0.3s ease-out !important",
  },
});

function MainLayout({ children, isDisplayTermAndQA = false }) {
  const [position, setPosition] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      let moving = window.pageYOffset;
      const difference = Math.abs(position - moving);
      if (difference > 150) {
        setVisible(position > moving);
        setPosition(moving);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [position]);

  const cls = visible ? "visible" : "hidden";

  return (
    <Wrapper>
      <Box className={cls} id="header">
        <Header />
      </Box>
      <Box mt={{ xs: "111px", sm: "100px" }} pb={10}>
        {children}
        <Box mt={"80px"}>
          <Container>
            <Stack gap={10}>
              {isDisplayTermAndQA && <Term />}
              {isDisplayTermAndQA && <QandA />}
            </Stack>
          </Container>
        </Box>
      </Box>
      <ListContact />
      <ScrollToTop />
      <Footer />
    </Wrapper>
  );
}

export default MainLayout;
