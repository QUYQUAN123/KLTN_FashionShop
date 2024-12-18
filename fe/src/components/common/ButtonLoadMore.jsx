import { Box, styled } from "@mui/material";
import React from "react";

const ButtonWrap = styled(Box)({
  cursor: "pointer",
  background: "#dd3333",
  padding: "8px 18px",
  color: "#fff",
  textTransform: "uppercase",
  fontWeight: 700,
  "&:hover": {
    boxShadow: "inset 0 0 0 100px rgba(0,0,0,.2)",
  },
  fontSize: 16,
});

function ButtonLoadMore() {
  return <ButtonWrap>Tải thêm (6 / 8)</ButtonWrap>;
}

export default ButtonLoadMore;
