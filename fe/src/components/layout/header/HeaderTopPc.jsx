import React, { useState } from "react";
import { Badge, Box, styled } from "@mui/material";
import { IoSearch } from "react-icons/io5";
import { FaShoppingBag, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../utils/redux/userSlice";
import { notify } from "../../../utils/helpers/notify";

const InputSearch = styled("input")({
  backgroundColor: "#fff",
  border: "1px solid #ddd",
  boxShadow: "inset 0 1px 2px rgba(0,0,0,.1)",
  boxSizing: "border-box",
  color: "#333",
  fontSize: "13px",
  padding: "8px 10px",
  minWidth: 460,
  transition: "color .3s,border .3s,background .3s,opacity .3s",
  outline: "none",
  "&:focus": {
    boxShadow: "0 0 5px #ccc",
    color: "#333",
    opacity: "1!important",
  },
});

const SearchIcon = styled(Box)({
  background: "#000",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "0px 8px",
});

const ButtonLogin = styled("button")({
  border: "1px solid #fff",
  backgroundColor: "transparent",
  borderRadius: 6,
  padding: "6px 12px",
  fontSize: 16,
  color: "#fff",
  transition: "all 0.3s ease",
  fontWeight: 500,
  "&:hover": {
    background: "#fff",
    color: "#dd3333",
  },
  textTransform: "uppercase",
});

const ButtonCart = styled(ButtonLogin)({
  display: "flex",
  alignItems: "center",
  gap: 6,
  "& svg": {
    color: "#fff",
  },
  "&:hover svg": {
    color: "#dd3333",
  },
});

const MenuItem = styled(Box)({
  border: "1px solid #fff",
  borderRadius: 6,
  padding: "6px 12px",
  color: "white",
  fontSize: 16,
  fontWeight: 600,
  cursor: "pointer",
  transition: "all .3s ease",
  "&:hover": {
    color: "#eeee22",
  },
  display: "flex",
  alignItems: "center",
  gap: 4,
  position: "relative",
  "&:hover div": {
    display: "block",
  },
  "&::after": {
    content: `""`,
    backgroundColor: "transparent",
    height: 40,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: -40,
  },
});

const SubMenu = styled(Box)({
  display: "none",
  position: "absolute",
  top: "calc(100% + 6px)",
  left: 0,
  backgroundColor: "#141414",
  border: "2px solid #ddd",
  boxShadow: "1px 1px 15px rgba(0,0,0,.15)",
  color: "#f1f1f1",
  minWidth: 260,
  zIndex: 999,
  padding: "20px 0px",
  borderRadius: "10px",
});

const SubMenuItem = styled(Box)({
  padding: "10px 10px",
  margin: "0 10px",
  borderRadius: "10px",
  color: "hsla(0,0%,100%,.8)",
  "&:hover": {
    backgroundColor: "#dd3333",
    color: "#fff",
  },
});

function HeaderTopPc() {
  const cart = useSelector((state) => state.cart.cart);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");

  const handleLogout = () => {
    dispatch(logout());
    notify("success", "Tài khoản đã được đăng xuất");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      navigate(`/search?q=${searchText}`);
    }
  };

  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Box display={"flex"} alignItems={"center"} gap={3.75}>
        <Box
          component={"img"}
          src={"/img/common/Logo.jpg"}
          display={"block"}
          height={45}
          sx={{ objectFit: "contain", cursor: "pointer" }}
          onClick={() => navigate("/")}
        />
        <Box display={"flex"} alignItems={"stretch"}>
          <InputSearch
            placeholder="Tìm kiếm sản phẩm ..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <SearchIcon onClick={() => navigate(`/search?q=${searchText}`)}>
            <IoSearch fontSize={20} color="white" />
          </SearchIcon>
        </Box>
      </Box>
      <Box display={"flex"} alignItems={"center"} gap={2}>
        {!user?.username ? (
          <ButtonLogin onClick={() => navigate("/auth")}>Đăng nhập</ButtonLogin>
        ) : (
          <MenuItem>
            <span>{user?.username}</span>
            <FaUser fontSize={16} />

            <SubMenu>
              {user?.role == "1" && (
                <SubMenuItem onClick={() => navigate("/admin/statistical")}>
                  Quản trị viên
                </SubMenuItem>
              )}
              <SubMenuItem onClick={() => navigate("/account")}>
                Thông tin tài khoản
              </SubMenuItem>
              <SubMenuItem onClick={() => navigate("/my-order")}>
                Đơn hàng đã đặt
              </SubMenuItem>
              <SubMenuItem onClick={handleLogout}>Đăng xuất</SubMenuItem>
            </SubMenu>
          </MenuItem>
        )}

        <Box height={30} width={"1px"} bgcolor={"#fff"} />
        <ButtonCart onClick={() => navigate("/cart")}>
          <span>Giỏ hàng</span>
          <span>/</span>
          <Badge badgeContent={cart?.length} color="primary">
            <FaShoppingBag fontSize={18} />
          </Badge>
        </ButtonCart>
      </Box>
    </Box>
  );
}

export default HeaderTopPc;
