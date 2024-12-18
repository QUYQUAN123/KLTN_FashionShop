import React, { useState } from "react";
import {
  Typography,
  TextField,
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import ModalUpdate from "../../../common/ModalUpdate";
import { create } from "../../../../utils/api/user";
import { notify } from "../../../../utils/helpers/notify";

function ModalAddUser({ open, handleClose, reloadData }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("1");

  const handleReset = () => {
    handleClose();
    setName("");
    setPassword("");
    setEmail("");
    setUserName("");
    setPhone("");
    setAddress("");
    setRole("1");
  };

  const handleAddUser = async () => {
    try {
      await create({
        name,
        password,
        email,
        username,
        phone,
        address,
        role: Number(role),
      });
      notify("success", "Thêm thành công");
      handleReset();
      reloadData();
    } catch (error) {
      notify("error", error?.response?.data?.message);
    }
  };

  return (
    <ModalUpdate
      open={open}
      title={"Thêm tài khoản"}
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
            fullWidth
            size="small"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography>Email:</Typography>
          <TextField
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
  <Typography>Vai trò:</Typography>
  <RadioGroup
    name="role"
    row
    value={role}
    onChange={(e) => setRole(e.target.value)}
  >
    <FormControlLabel
      value={"1"}
      control={<Radio size="small" />}
      label="Admin"
    />
  </RadioGroup>
</Grid>

      </Grid>
    </ModalUpdate>
  );
}

export default ModalAddUser;
