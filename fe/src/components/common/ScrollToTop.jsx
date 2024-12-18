import React from "react";
import { Box, keyframes, styled } from "@mui/material";
import KeyboardDoubleArrowUpOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowUpOutlined";
import { useEffect, useState } from "react";

const bounce = keyframes`
 to {
    transform: translateY(-10px);
  }
`;

const Wrap = styled(Box)({
  animation: `${bounce} 1s ease infinite alternate`,
});

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Cuộn mượt khi lên đầu trang
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <Wrap position={"fixed"} bottom={40} right={20} zIndex={999}>
      {isVisible && (
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          border={"1px solid black"}
          width={50}
          height={50}
          borderRadius={"50%"}
          sx={{
            cursor: "pointer",
            "&:hover": {
              background: "#dd3333",
              borderColor: "#dd3333",
              "& svg": {
                color: "white",
              },
            },
          }}
          onClick={scrollToTop}
        >
          <KeyboardDoubleArrowUpOutlinedIcon />
        </Box>
      )}
    </Wrap>
  );
}

export default ScrollToTop;
