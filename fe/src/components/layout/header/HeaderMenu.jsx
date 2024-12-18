import { Box, Container, styled, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { listMenu } from "./data";
import { useNavigate } from "react-router-dom";

const MenuItem = styled(Box)({
  color: "white",
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
  transition: "all .3s ease",
  padding: "10px 20px",
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
    height: 20,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: -8,
  },
});

const SubMenu = styled(Box)({
  display: "none",
  position: "absolute",
  top: "90%",
  left: 0,
  backgroundColor: "#141414",
  border: "2px solid #ddd",
  boxShadow: "1px 1px 15px rgba(0,0,0,.15)",
  color: "#f1f1f1",
  minWidth: 240,
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

const InputSearch = styled("input")({
  backgroundColor: "#fff",
  border: "1px solid #ddd",
  boxShadow: "inset 0 1px 2px rgba(0,0,0,.1)",
  boxSizing: "border-box",
  color: "#333",
  fontSize: "14px",
  padding: "10px 10px",
  width: "100%",
  transition: "color .3s,border .3s,background .3s,opacity .3s",
  outline: "none",
  "&:focus": {
    boxShadow: "0 0 5px #ccc",
    color: "#333",
    opacity: "1!important",
  },
});

const SearchIcon = styled(Box)({
  background: "#d33",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "0px 8px",
});

function HeaderMenu() {
  const isMoblie = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      navigate(`/search?q=${searchText}`);
    }
  };

  return (
    <Box bgcolor={"#0f0f0f"}>
      <Container>
        {isMoblie ? (
          <Box display={"flex"} alignItems={"stretch"} padding={"6px 0"}>
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
        ) : (
          <Box display={"flex"} alignItems={"center"} gap={2}>
            {listMenu?.map((e) => (
              <MenuItem
                key={e.name}
                onClick={() => e?.id && navigate(`/category/${e?.id}`)}
              >
                {e.name}
                {e?.submenu && <MdOutlineKeyboardArrowDown fontSize={24} />}
                {e?.submenu && (
                  <SubMenu>
                    {e?.submenu?.map((i) => (
                      <SubMenuItem key={i.name}>{i.name}</SubMenuItem>
                    ))}
                  </SubMenu>
                )}
              </MenuItem>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default HeaderMenu;
