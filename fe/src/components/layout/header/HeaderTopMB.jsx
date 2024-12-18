import { Box, Badge } from "@mui/material";
import React, { useState } from "react";
import { FaShoppingBag } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import DrawerMB from "./DrawerMB";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function HeaderTopMB() {
  const cart = useSelector((state) => state.cart.cart);

  const navigate = useNavigate();
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <HiMenu
        color="white"
        fontSize={28}
        onClick={() => setIsOpenDrawer(true)}
      />
      <Box
        component={"img"}
        src={"/img/common/Logo.jpg"}
        display={"block"}
        height={45}
        sx={{ objectFit: "contain" }}
        onClick={() => navigate("/")}
      />
      <Box
        border={"1px solid #fff"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        padding={0.75}
        borderRadius={1.5}
        onClick={() => navigate("/cart")}
      >
        <Badge badgeContent={cart?.length} color="primary">
          <FaShoppingBag color="white" fontSize={22} />
        </Badge>
      </Box>
      <DrawerMB open={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} />
    </Box>
  );
}

export default HeaderTopMB;
