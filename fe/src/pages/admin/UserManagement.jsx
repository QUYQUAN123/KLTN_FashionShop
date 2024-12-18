import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AuthLayout";
import { Box, Typography, Button } from "@mui/material";
import ConfirmDelete from "../../components/common/ConfirmDelete";
import { notify } from "../../utils/helpers/notify";
import { deleteProduct } from "../../utils/api/product";
import { DataGrid } from "@mui/x-data-grid";
import ModalAddProductToCategory from "../../components/screens/admin/product/ModalAddProductToCategory";
import { deleteUser, listUser } from "../../utils/api/user";
import ModalAddUser from "../../components/screens/admin/user/ModalAddUser";
import ModalDetailUser from "../../components/screens/admin/user/ModalDetailUser";

function UserManagement() {
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [isOpenAddToCategory, setIsOpenAddToCategory] = useState(false);
  const [idDelete, setIdDelete] = useState("");
  const [data, setData] = useState([]);
  const [listId, setListId] = useState([]);
  const [infoUpdate, setInfoUpdate] = useState({});

  const columns = [
    { field: "name", headerName: "Tên ", width: 150 },
    { field: "username", headerName: "Username", width: 150 },
    { field: "password", headerName: "Password", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "address", headerName: "Địa chỉ", width: 150 },
    { field: "phone", headerName: "Số điện thoại", width: 150 },
    {
      field: "",
      headerName: "Hành động",
      width: 200,
      renderCell: (params) => (
        <Box display={"flex"} gap={1}>
          <Button
            variant="contained"
            size="small"
            onClick={() => handleOpenConfirmUpdate(params.row)}
          >
            Chi tiết
          </Button>
          {params.row.role == "0" && (
            <Button
              color="error"
              variant="contained"
              size="small"
              onClick={() => handleOpenConfirmDelete(params.row.id)}
            >
              Xóa
            </Button>
          )}
        </Box>
      ),
    },
  ];

  const getListUser = async () => {
    try {
      const res = await listUser();
      console.log(res, "res");
      setData(res.data?.map((e) => ({ id: e._id, ...e })));
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
      await deleteUser(idDelete);
      getListUser();
      notify("success", "Xoá thành công");
    } catch (error) {}
    setIsOpenDelete(false);
  };

  useEffect(() => {
    getListUser();
  }, []);

  return (
    <AdminLayout>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography fontWeight={"bold"} fontSize={20}>
          Quản lý người dùng
        </Typography>
        <Box display={"flex"} alignItems={"center"} gap={1}>
          <Button
            variant="contained"
            onClick={() => setIsOpenAdd(true)}
            size="small"
          >
            Thêm Admin
          </Button>
        </Box>
      </Box>
      <Box mt={4} height={"70vh"}>
        <DataGrid disableRowSelectionOnClick rows={data} columns={columns} />
      </Box>

      <ModalAddUser
        open={isOpenAdd}
        handleClose={() => setIsOpenAdd(false)}
        reloadData={getListUser}
      />

      <ModalDetailUser
        open={isOpenUpdate}
        handleClose={() => setIsOpenUpdate(false)}
        reloadData={getListUser}
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

export default UserManagement;
