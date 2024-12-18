import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AuthLayout";
import { Box, Typography, Button } from "@mui/material";
import ConfirmDelete from "../../components/common/ConfirmDelete";
import { notify } from "../../utils/helpers/notify";
import { deleteProduct, listProduct } from "../../utils/api/product";
import { AdminlistProduct } from "../../utils/api/admin";
import { DataGrid } from "@mui/x-data-grid";
import ModalAddProduct from "../../components/screens/admin/product/ModalAddProduct";
import ModalAddProductToCategory from "../../components/screens/admin/product/ModalAddProductToCategory";
import ModalDetailProduct from "../../components/screens/admin/product/ModalDetailProduct";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

function ProductManagement() {
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [isOpenAddToCategory, setIsOpenAddToCategory] = useState(false);
  const [idDelete, setIdDelete] = useState("");
  const [data, setData] = useState([]);
  const [listId, setListId] = useState([]);
  const [infoUpdate, setInfoUpdate] = useState({});
  const [filterType, setFilterType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const columns = [
    {
      field: "image",
      headerName: "Hình ảnh",
      width: 150,
      renderCell: (params) => (
        <Box
          component={"img"}
          src={params?.row?.img1 || "/img/noImage.jpg"}
          width={120}
          height={120}
          sx={{ objectFit: "cover", borderRadius: 2, border: "1px solid #ddd" }}
        />
      ),
    },
    { field: "name", headerName: "Tên ", width: 200 },
    { field: "description", headerName: "Mô tả", width: 250 },
    { field: "price", headerName: "Giá gốc", width: 100 },
    { field: "discountPrice", headerName: "Giá khuyên mại", width: 150 },
    {
      field: "",
      headerName: "Hành động",
      width: 160,
      renderCell: (params) => (
        <Box display={"flex"} gap={1}>
          <Button
            variant="contained"
            size="small"
            onClick={() => handleOpenConfirmUpdate(params.row)}
          >
            Chi tiết
          </Button>
          <Button
            color="error"
            variant="contained"
            size="small"
            onClick={() => handleOpenConfirmDelete(params.row.id)}
          >
            Xóa
          </Button>
        </Box>
      ),
    },
    {
      field: "status",
      headerName: "Trạng thái",
      width: 90,
      renderCell: (params) => (
        <Typography
          sx={{
            color: params.row.status === "inactive" ? "red" : "green",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {params.row.status === "inactive" ? "Ngưng" : "Bán"}
        </Typography>
      ),
    },
  ];

  const getlistProduct = async () => {
    try {
      const res = await AdminlistProduct();
      setData(
        res.data?.map((e) => ({
          id: e._id,
          ...e,
          status: e.status || "acctive",
        }))
      );
      console.log("E", res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenConfirmDelete = (id) => {
    setIsOpenDelete(true);
    setIdDelete(id);
  };

  const handleOpenConfirmUpdate = (data) => {
    setInfoUpdate(data);
    setIsOpenUpdate(true);
  };

  const handleDeleteProduct = async () => {
    try {
      await deleteProduct(idDelete);
      getlistProduct();
      notify("success", "Xóa sản phẩm thành công");
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 400) {
          notify("error", data.message || "Không thể xóa sản phẩm.");
        } else if (status === 500) {
          notify("error", "Lỗi server, vui lòng thử lại sau.");
        }
      } else {
        notify("error", "Không thể kết nối tới server.");
      }
    }
    setIsOpenDelete(false);
  };
  const filteredData = data.filter((product) => {
    const matchCategory =
      filterType === "free"
        ? !product.categoryId || product.categoryId === null
        : true;

    const matchSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchCategory && matchSearch;
  });

  useEffect(() => {
    getlistProduct();
  }, []);

  return (
    <AdminLayout>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography fontWeight={"bold"} fontSize={20}>
          Quản lý sản phẩm
        </Typography>

        <Box display={"flex"} alignItems={"center"} gap={1}>
          {listId?.length > 0 && (
            <Button
              variant="contained"
              onClick={() => setIsOpenAddToCategory(true)}
              size="small"
              color="success"
            >
              Thêm sản phẩm vào danh mục
            </Button>
          )}

          <Button
            variant="contained"
            onClick={() => setIsOpenAdd(true)}
            size="small"
          >
            Thêm sản phẩm
          </Button>
        </Box>
      </Box>
      <Box>
        <Box
          mt={2}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"flex-end"}
          gap={2}
        >
          <TextField
            label="Tìm kiếm theo tên"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel>Lọc sản phẩm</InputLabel>
            <Select
              value={filterType}
              label="Lọc sản phẩm"
              onChange={(e) => setFilterType(e.target.value)}
            >
              <MenuItem value="all">Tất cả sản phẩm</MenuItem>
              <MenuItem value="free">Sản phẩm tự do</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box mt={4} height={"70vh"}>
        <DataGrid
          disableRowSelectionOnClick
          checkboxSelection
          rows={filteredData}
          columns={columns}
          rowHeight={150}
          isRowSelectable={(params) => {
            return !params.row.categoryId || params.row.categoryId === null;
          }}
          onRowSelectionModelChange={(newRowSelectionModel) => {
            const validSelection = newRowSelectionModel.filter((id) => {
              const product = data.find((item) => item.id === id);
              return product?.categoryId === null;
            });
            setListId(validSelection);
          }}
          rowSelectionModel={listId}
        />
      </Box>

      <ModalAddProduct
        open={isOpenAdd}
        handleClose={() => setIsOpenAdd(false)}
        reloadData={getlistProduct}
      />

      <ModalDetailProduct
        open={isOpenUpdate}
        handleClose={() => setIsOpenUpdate(false)}
        reloadData={getlistProduct}
        info={infoUpdate}
      />

      <ModalAddProductToCategory
        open={isOpenAddToCategory}
        handleClose={() => {
          setListId([]);
          setIsOpenAddToCategory(false);
        }}
        listId={listId}
      />

      {/* Modal delete */}
      <ConfirmDelete
        open={isOpenDelete}
        handleClose={() => setIsOpenDelete(false)}
        handleOk={handleDeleteProduct}
      />
    </AdminLayout>
  );
}

export default ProductManagement;
