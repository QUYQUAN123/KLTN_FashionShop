import { Box, Typography } from "@mui/material";
import React from "react";

function Term() {
  return (
    <Box
      display={"flex"}
      flexDirection={{ xs: "column", sm: "row" }}
      borderTop={"6px solid #cf2e2e"}
      borderBottom={"6px solid #cf2e2e"}
      sx={{ borderWidth: { xs: 6, sm: 0 } }}
    >
      <Box
        flex={1}
        borderTop={"6px solid #cf2e2e"}
        borderBottom={"6px solid #cf2e2e"}
        alignItems={"center"}
        display={"flex"}
        justifyContent={"center"}
        sx={{ borderWidth: { xs: 0, sm: 6 } }}
      >
        <Box
          display={"flex"}
          alignItems={"flex-start"}
          gap={2}
          padding={{ xs: "20px 0px", sm: "unset" }}
        >
          <Box
            component={"img"}
            src={"/img/term/Ship.png"}
            display={"block"}
            width={{ xs: 60, sm: 80 }}
            sx={{ objectFit: "contain" }}
          />
          <Box>
            <Typography color={"#dd3333"} fontSize={22} fontWeight={600}>
              Free Ship
            </Typography>
            <Typography fontSize={16}>Free ship với hóa đơn 500K</Typography>
          </Box>
        </Box>
      </Box>
      <Box
        width={{ xs: "100%", sm: "1px" }}
        height={{ xs: "1px", sm: "130px" }}
        bgcolor={"#ddd"}
      />
      <Box
        flex={1}
        borderTop={"6px solid #cf2e2e"}
        borderBottom={"6px solid #cf2e2e"}
        sx={{ borderWidth: { xs: 0, sm: 6 } }}
        alignItems={"center"}
        display={"flex"}
        justifyContent={"center"}
      >
        <Box
          display={"flex"}
          alignItems={"flex-start"}
          gap={2}
          padding={{ xs: "20px 0px", sm: "unset" }}
        >
          <Box
            component={"img"}
            src={"/img/term/Guarantee.png"}
            display={"block"}
            width={{ xs: 60, sm: 80 }}
            sx={{ objectFit: "contain" }}
          />
          <Box>
            <Typography color={"#dd3333"} fontSize={22} fontWeight={600}>
              Bảo hành
            </Typography>
            <Typography fontSize={16}>Bảo hành đổi trả nhanh chóng</Typography>
          </Box>
        </Box>
      </Box>
      <Box
        width={{ xs: "100%", sm: "1px" }}
        height={{ xs: "1px", sm: "130px" }}
        bgcolor={"#ddd"}
      />
      <Box
        flex={1}
        borderTop={"6px solid #cf2e2e"}
        borderBottom={"6px solid #cf2e2e"}
        alignItems={"center"}
        display={"flex"}
        justifyContent={"center"}
        sx={{ borderWidth: { xs: 0, sm: 6 } }}
      >
        <Box
          display={"flex"}
          alignItems={"flex-start"}
          gap={2}
          padding={{ xs: "20px 0px", sm: "unset" }}
        >
          <Box
            component={"img"}
            src={"/img/term/Ship.png"}
            display={"block"}
            width={{ xs: 60, sm: 80 }}
            sx={{ objectFit: "contain" }}
          />
          <Box>
            <Typography color={"#dd3333"} fontSize={22} fontWeight={600}>
              Hotline
            </Typography>
            <Typography fontSize={16}>(Phone|Zalo): 0397144780</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Term;
