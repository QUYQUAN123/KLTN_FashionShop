import React, { useEffect, useState } from "react";
import { Typography, Select, MenuItem } from "@mui/material";
import ModalUpdate from "../../../common/ModalUpdate";
import { addProduct, listCategory } from "../../../../utils/api/category";
import { notify } from "../../../../utils/helpers/notify";

function ModalAddProductToCategory({ open, listId, handleClose }) {
  const [arrCategory, setArrCategory] = useState([]);
  const [idCategory, setIdCategory] = useState("");

  useEffect(() => {
    const getListCategory = async () => {
      try {
        const res = await listCategory();
        setArrCategory(res?.data);
        setIdCategory(res?.data?.[0]?._id);
      } catch (error) {
        console.log(error);
      }
    };
    getListCategory();
  }, []);

  const handleResetAddToCategory = () => {
    handleClose();
    setIdCategory(arrCategory?.[0]?._id);
  };

  const handleAddProductToCategory = async () => {
    try {
      if (idCategory) {
        await addProduct(idCategory, listId);
        notify("success", "Thêm sản phẩm vào danh mục thành công thành công");
      }
    } catch (error) {}
    handleResetAddToCategory();
  };

  return (
    <ModalUpdate
      open={open}
      title={"Thêm sản phẩm vào danh mục"}
      handleClose={handleResetAddToCategory}
      handleOk={handleAddProductToCategory}
    >
      <Typography mb={1} fontWeight={600}>
        Chon danh mục:
      </Typography>
      <Select
        fullWidth
        value={idCategory}
        size="small"
        onChange={(e) => setIdCategory(e.target.value)}
      >
        {arrCategory?.map((e) => (
          <MenuItem value={e?._id} key={e?._id}>
            {e?.name}
          </MenuItem>
        ))}
      </Select>
    </ModalUpdate>
  );
}

export default ModalAddProductToCategory;
