import React, { useState } from "react";
import { Box, Collapse, Drawer, styled } from "@mui/material";
import { MdArrowBackIosNew } from "react-icons/md";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { listMenu } from "./data";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { notify } from "../../../utils/helpers/notify";
import { logout } from "../../../utils/redux/userSlice";

const DrawerWrapper = styled(Drawer)({
  "& .MuiDrawer-paper": {
    paddingTop: "20px",
    backgroundColor: "rgba(0,0,0,.95)",
    width: "100vw",
  },
});

const MenuItem = styled(Box)({
  color: "hsla(0,0%,100%,.8)",
  padding: "16px 0px",
  paddingLeft: "20px",
  paddingRight: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  textTransform: "uppercase",
  fontSize: 13,
  fontWeight: 500,
  borderBottom: "1px solid hsla(0,0%,100%,.2)",
});

function DrawerMB({ open, onClose }) {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const [listActive, setListActive] = useState([]);
  const naviagte = useNavigate();

  const handleToggleActive = (id) => {
    if (listActive.includes(id)) {
      const newActive = listActive?.filter((i) => i !== id);
      setListActive(newActive);
    } else {
      setListActive((prev) => [...prev, id]);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    notify("success", "Tài khoản đã được đăng xuất");
    onClose();
  };

  return (
    <DrawerWrapper anchor={"left"} open={open} onClose={onClose}>
      <Box textAlign={"left"} paddingLeft={"20px"}>
        <MdArrowBackIosNew
          color={"hsla(0,0%,100%,.8)"}
          fontSize={20}
          onClick={onClose}
        />
      </Box>
      <Box mt={"20px"}>
        {listMenu?.map((e) => (
          <Box
            key={e.name}
            onClick={() => {
              onClose();
              naviagte(`/category/${e.id}`);
            }}
          >
            <MenuItem onClick={() => handleToggleActive(e.name)}>
              {e.name}
              {e?.submenu &&
                (listActive?.includes(e.name) ? (
                  <IoIosArrowUp fontSize={24} />
                ) : (
                  <IoIosArrowDown fontSize={24} />
                ))}
            </MenuItem>
            <Collapse in={listActive?.includes(e.name)}>
              {e?.submenu?.map((i) => (
                <MenuItem key={i?.name}>{i?.name}</MenuItem>
              ))}
            </Collapse>
          </Box>
        ))}
        {user?.username ? (
          <>
            <MenuItem onClick={() => handleToggleActive("account")}>
              Tài khoản
              {listActive?.includes("account") ? (
                <IoIosArrowUp fontSize={24} />
              ) : (
                <IoIosArrowDown fontSize={24} />
              )}
            </MenuItem>
            <Collapse in={listActive?.includes("account")}>
              <MenuItem
                onClick={() => {
                  onClose();
                  naviagte(`/account`);
                }}
              >
                Thông tin tài khoản
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onClose();
                  naviagte(`/my-order`);
                }}
              >
                Đơn hàng đã đặt
              </MenuItem>
              <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
            </Collapse>
          </>
        ) : (
          <MenuItem
            onClick={() => {
              onClose();
              naviagte(`/auth`);
            }}
          >
            Đăng nhập
          </MenuItem>
        )}
      </Box>
    </DrawerWrapper>
  );
}

export default DrawerMB;
