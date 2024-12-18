import React from "react";
import { Box, CircularProgress } from "@mui/material";

function Loading() {
  return (
    <Box
      height={"100%"}
      width={"100%"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <CircularProgress color="error" />
    </Box>
  );
}

export default Loading;
