import React, { useState } from "react";
import AdminLayout from "../../components/layout/AuthLayout";
import { Box, Button, TextField, Typography } from "@mui/material";
import ModalUpdate from "../../components/common/ModalUpdate";
import { create,deleteCategory,listCategory, updateCategory } from "../../utils/api/category";
import { notify } from "../../utils/helpers/notify";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { Modal } from "@mui/material";


function CategoryManagement() {
  const [name, setName] = useState("");
  const [data, setData] = useState([]);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [idUpdate, setIdUpdate] = useState("");
  const [product, setProduct] = useState([]);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const handleDeleteCategory = (id) => {
    setCategoryToDelete(id);
    setIsOpenDeleteModal(true); 
  };
  const handleCloseDeleteModal = () => {
    setIsOpenDeleteModal(false);
    setCategoryToDelete(null);
  };
  const columns = [
    { field: "index", headerName: "Số thứ tự", width: 200 },
    { field: "name", headerName: "Tên ", width: 250 },
    {
      field: "proudct",
      headerName: "Số lượng sản phẩm",
      width: 250,
      renderCell: (params) => params?.row?.product?.length,
    },
    {
      field: "",
      headerName: "Hành động",
      width: 250,
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
            onClick={() => handleDeleteCategory(params.row._id)}  
          >
            Xóa
          </Button>
        </Box>
      ),
    },
  ];

  const productColumns = [
    {
      field: "image",
      headerName: "Hình ảnh",
      width: 250,
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
    { field: "name", headerName: "Tên ", width: 300 },

    {
      field: "",
      headerName: "Hành động",
      width: 300,
      renderCell: (params) => (
        <Box display={"flex"} gap={1}>
          <Button
            color="error"
            variant="contained"
            size="small"
            onClick={() => {
              const newProducts = product?.filter((i) => i.id != params.row.id);
              setProduct(newProducts);
            }}
          >
            Gỡ sản phẩm
          </Button>
        </Box>
      ),
    },
  ];
  const handleCloseAddModal = () => {
    setIsOpenAdd(false);
    setName(""); 
  };

  const handleAddCategory = async () => {
    try {
      if (name) {
        await create({ name });
        notify("success", "Thêm danh mục thành công");
        getListCategory(); 
      }
    } catch (error) {
      console.log(error);
    }
    handleCloseAddModal();
  };

  const handleOpenConfirmUpdate = (data) => {
    setName(data?.name);
    setIdUpdate(data?.id);
    setProduct(data?.product?.map((e) => ({ ...e, id: e?._id })));
    setIsOpenUpdate(true);
  };

  const handleResetUpdate = () => {
    setIsOpenUpdate(false);
    setIdUpdate("");
    setProduct([]);
    setName("");
  };

  const hanleUpdateCategory = async () => {
    try {
      if (name) {
        await updateCategory(idUpdate, {
          name,
          product: product?.map((e) => e?._id),
        });
        notify("success", "Cập nhật danh mục thành công");
      }
      getListCategory();
    } catch (error) {}
    handleResetUpdate();
  };

  const getListCategory = async () => {
    try {
      const res = await listCategory();
      setData(
        res.data?.map((e, index) => ({ id: e._id, ...e, index: index + 1 }))
      );
    } catch (error) {
      console.log(error);
    }
  };

const handleConfirmDelete = async () => {
  try {
    // Gọi API xóa danh mục
    await deleteCategory(categoryToDelete);
    notify("success", "Xóa danh mục thành công");
    getListCategory(); // Làm mới danh sách danh mục
  } catch (error) {
    // Kiểm tra lỗi trả về từ API
    if (error.response) {
      const { status, data } = error.response; // Lấy mã lỗi và thông báo từ response
      if (status === 400 || status === 404) {
        notify("error", data.message );
      } else if (status === 500) {
        notify("error", "Lỗi server, vui lòng thử lại sau");
      } else {
        notify("error", "Có lỗi xảy ra khságasgasgasgsagi xóa danh mục");
      }
    } else {
      console.error("Lỗi không xác định:", error);
      notify("error", "Có lỗi xảy ra khi xóa danh mục");
    }
  }
  handleCloseDeleteModal(); 
};

  useEffect(() => {
    getListCategory();
  }, []);

  return (
    <AdminLayout>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography fontWeight={"bold"} fontSize={20}>
          Quản lý danh mục
        </Typography>
        <Box display={"flex"} gap={1}>
          <Button
            variant="contained"
            color="success"
            onClick={() => setIsOpenAdd(true)} // Open the add modal
            size="small"
          >
            Thêm danh mục
          </Button>
        </Box>
      </Box>
      <Box mt={4}>
        <DataGrid rows={data} columns={columns} hideFooter={true} />
      </Box>

      <ModalUpdate
        open={isOpenUpdate}
        title={"Chi tiết danh mục"}
        handleClose={handleResetUpdate}
        maxWidth={"md"}
        handleOk={hanleUpdateCategory}
      >
        <Typography mt={1}>Tên danh mục:</Typography>
        <TextField
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          size="small"
        />

        <Typography mt={4}>Danh sách sản phẩm:</Typography>

        <Box height={400}>
          <DataGrid rows={product} columns={productColumns} rowHeight={150} />
        </Box>
      </ModalUpdate>



      <Modal open={isOpenAdd} onClose={handleCloseAddModal}>
        <Box
          sx={{
            position: "fixed", 
            top: "50%", 
            left: "50%", 
            transform: "translate(-50%, -50%)", 
            width: 400,
            backgroundColor: "white",
            padding: 2,
            borderRadius: 2,
            boxShadow: 24,
          }}
        >
          <Typography variant="h6" mb={2}>
            Thêm danh mục mới
          </Typography>
          <TextField
            label="Tên danh mục"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            size="small"
          />
          <Box mt={2} display="flex" justifyContent="space-between">
            <Button
              onClick={handleCloseAddModal}
              variant="outlined"
              size="small"
            >
              Hủy
            </Button>
            <Button
              onClick={handleAddCategory}
              variant="contained"
              color="success"
              size="small"
            >
              Thêm
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal open={isOpenDeleteModal} onClose={handleCloseDeleteModal}>
        <Box
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            backgroundColor: "white",
            padding: 2,
            borderRadius: 2,
            boxShadow: 24,
          }}
        >
          <Typography variant="h6" mb={2}>
            Xác nhận xóa danh mục
          </Typography>
          <Typography mb={2}>
            Bạn có chắc chắn muốn xóa danh mục này không? Hành động này không thể
            hoàn tác.
          </Typography>
          <Box display="flex" justifyContent="space-between">
            <Button onClick={handleCloseDeleteModal} variant="outlined" size="small">
              Hủy
            </Button>
            <Button
              onClick={handleConfirmDelete}
              variant="contained"
              color="error"
              size="small"
            >
              Xóa
            </Button>
          </Box>
        </Box>
      </Modal>
    </AdminLayout>
  );
}

export default CategoryManagement;
