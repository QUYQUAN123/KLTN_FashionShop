import React, { useEffect, useState } from "react";
import {
  Typography,
  TextField,
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import ModalUpdate from "../../../common/ModalUpdate";
import { updateUser } from "../../../../utils/api/user";
import { notify } from "../../../../utils/helpers/notify";

function ModalDetailUser({ open, handleClose, reloadData, info }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("0");
  const [status, setStatus] = useState("1");

  const handleReset = () => {
    handleClose();
    setName("");
    setPassword("");
    setEmail("");
    setUserName("");
    setPhone("");
    setAddress("");
    setRole("0");
    setStatus("1"); 
  };

  const handleAddUser = async () => {
    try {
      await updateUser(info?._id, {
        name,
        password,
        email,
        username,
        phone,
        address,
        role: Number(role),
        status: Number(status),
      });
      notify("success", "Cập nhật thành công");
      handleReset();
      reloadData();
    } catch (error) {
      notify("error", error?.response?.data?.message);
    }
  };

  useEffect(() => {
    setUserName(info?.username);
    setName(info?.name);
    setEmail(info?.email);
    setPassword(info?.password);
    setPhone(info?.phone);
    setAddress(info?.address);
    setRole(info?.role);
    setStatus(info?.status?.toString() || "1");
  }, [info]);

  return (
    <ModalUpdate
      open={open}
      title={"Cập nhật tài khoản"}
      handleClose={handleReset}
      handleOk={handleAddUser}
    >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography>Họ tên:</Typography>
          <TextField
            fullWidth
            size="small"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography>Username:</Typography>
          <TextField
            disabled
            fullWidth
            size="small"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography>Email:</Typography>
          <TextField
            disabled
            fullWidth
            size="small"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography>Password:</Typography>
          <TextField
            fullWidth
            size="small"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography>Số điện thoại:</Typography>
          <TextField
            fullWidth
            size="small"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography>Địa chỉ:</Typography>
          <TextField
            fullWidth
            size="small"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography>Vai trò:</Typography>
          <RadioGroup
            name="role"
            row
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <FormControlLabel
              value={"0"}
              control={<Radio size="small" />}
              label="User"
            />
            <FormControlLabel
              value={"1"}
              control={<Radio size="small" />}
              label="Admin"
            />
          </RadioGroup>
        </Grid>


        <Grid item xs={6}>
          <Typography>Trạng thái:</Typography>
          <RadioGroup
            name="status"
            row
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <FormControlLabel
              value={"1"}
              control={<Radio size="small" />}
              label="Active"
            />
            <FormControlLabel
              value={"0"}
              control={<Radio size="small" />}
              label="Inactive"
            />
          </RadioGroup>
        </Grid>
      </Grid>
    </ModalUpdate>
  );
}

export default ModalDetailUser;
