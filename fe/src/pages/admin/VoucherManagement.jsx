import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AuthLayout";
import { Box, Typography, Button } from "@mui/material";
import ConfirmDelete from "../../components/common/ConfirmDelete";
import { notify } from "../../utils/helpers/notify";
import { deleteVoucher, listVouchers } from "../../utils/api/voucher";
import { DataGrid } from "@mui/x-data-grid";
import ModalAddVoucher from "../../components/screens/admin/voucher/ModalAddVoucher";
import ModalDetailVoucher from "../../components/screens/admin/voucher/ModalDetailVoucher";

function VoucherManagement() {
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [idDelete, setIdDelete] = useState("");
  const [data, setData] = useState([]);
  const [infoUpdate, setInfoUpdate] = useState({});

  const columns = [
    { field: "description", headerName: "Mô tả", width: 250 },
    { field: "discountValue", headerName: "Giảm giá (%)", width: 150 },
    { field: "maxDiscount", headerName: "Giảm tối đa", width: 150 },
    { field: "minPurchase", headerName: "Đơn hàng tối thiểu", width: 180 },
    { field: "startDate", headerName: "Ngày bắt đầu", width: 150 },
    { field: "endDate", headerName: "Ngày kết thúc", width: 150 },
    { field: "quantity", headerName: "Số lượng", width: 120 },
    {
      field: "status",
      headerName: "Trạng thái",
      width: 150,
      renderCell: (params) => (
        <Typography>
          {params.value === "active" ? "Hoạt động" : "Không hoạt động"}
        </Typography>
      ),
    },
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
  ];

  const getListVouchers = async () => {
    try {
      const res = await listVouchers();
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

  const handleDeleteVoucher = async () => {
    try {
      await deleteVoucher(idDelete);
      getListVouchers();
      notify("success", "Xoá voucher thành công");
    } catch (error) {}
    setIsOpenDelete(false);
  };

  useEffect(() => {
    getListVouchers();
  }, []);

  return (
    <AdminLayout>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography fontWeight={"bold"} fontSize={20}>
          Quản lý voucher
        </Typography>
        <Box display={"flex"} alignItems={"center"} gap={1}>
          <Button
            variant="contained"
            onClick={() => setIsOpenAdd(true)}
            size="small"
          >
            Thêm voucher
          </Button>
        </Box>
      </Box>
      <Box mt={4} height={"70vh"}>
        <DataGrid disableRowSelectionOnClick rows={data} columns={columns} />
      </Box>

      <ModalAddVoucher
        open={isOpenAdd}
        handleClose={() => setIsOpenAdd(false)}
        reloadData={getListVouchers}
      />

      <ModalDetailVoucher
        open={isOpenUpdate}
        handleClose={() => setIsOpenUpdate(false)}
        reloadData={getListVouchers}
        info={infoUpdate}
      />

      {/* Modal delete */}
      <ConfirmDelete
        open={isOpenDelete}
        handleClose={() => setIsOpenDelete(false)}
        handleOk={handleDeleteVoucher}
      />
    </AdminLayout>
  );
}

export default VoucherManagement;
