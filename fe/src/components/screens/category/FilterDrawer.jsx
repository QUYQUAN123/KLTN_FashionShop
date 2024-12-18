import React, { useEffect, useState } from "react";
import {
  Box,
  Drawer,
  styled,
  Typography,
  Checkbox,
  Stack,
} from "@mui/material";
import { MdArrowBackIosNew } from "react-icons/md";
import { listMenu, listSidebar } from "../../layout/header/data";
import { useNavigate } from "react-router-dom";

const DrawerWrapper = styled(Drawer)({
  "& .MuiDrawer-paper": {
    paddingTop: "20px",
    width: "70vw",
    backgroundImage: "url('../img/category/Filter.webp')",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
  },
});

function FilterDrawer({ open, onClose, id }) {
  const navigate = useNavigate();
  const [checkedItems, setCheckedItems] = useState([]);

  const handleCheckboxChange = (event, item) => {
    if (event.target.checked) {
      setCheckedItems([...checkedItems, item]);
    } else {
      setCheckedItems(
        checkedItems.filter((checkedItem) => checkedItem !== item)
      );
    }
  };

  useEffect(() => {
    if (checkedItems?.length > 0) {
      onClose();
      navigate(`/category/${checkedItems?.join("-")}`);
    }
  }, [checkedItems]);

  useEffect(() => {
    id?.split("-")?.length > 0 && setCheckedItems(id?.split("-"));
  }, [id]);

  return (
    <DrawerWrapper anchor={"left"} open={open} onClose={onClose}>
      <Box textAlign={"left"} paddingLeft={"20px"}>
        <MdArrowBackIosNew
          color={"hsla(0,0%,100%,.8)"}
          fontSize={20}
          onClick={onClose}
        />
      </Box>
      <Box padding={"20px"} sx={{}} color={"white"}>
        <Typography color={"#e01f0a"} fontWeight={600} fontSize={18}>
          Danh mục sản phẩm
        </Typography>
        <Stack gap={1} mt={2}>
          {listSidebar?.map((e) => (
            <Box key={e?.name}>
              <Box display={"flex"} alignItems={"center"} gap={0.5}>
                {checkedItems?.length == 1 && checkedItems.includes(e?.id) ? (
                  <Checkbox
                    sx={{ color: "white" }}
                    size="small"
                    checked={true}
                  />
                ) : (
                  <Checkbox
                    sx={{ color: "white" }}
                    size="small"
                    onChange={(event) => handleCheckboxChange(event, e?.id)}
                    checked={checkedItems.includes(e?.id)}
                  />
                )}
                <Typography fontSize={14} fontWeight={600}>
                  {e?.name}
                </Typography>
              </Box>
              {e?.submenu?.length > 0 && (
                <Box paddingLeft={"10px"}>
                  {e?.submenu?.map((i) => (
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      gap={0.5}
                      key={i?.name}
                    >
                      <Checkbox sx={{ color: "white" }} size="small" />
                      <Typography fontSize={14} fontWeight={600}>
                        {i?.name}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          ))}
        </Stack>
      </Box>
    </DrawerWrapper>
  );
}

export default FilterDrawer;
