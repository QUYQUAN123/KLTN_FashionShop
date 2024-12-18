import { request } from "./request";

export const createVoucher = async (payload) =>
  await request.post("/api/voucher", payload);

export const getVoucherById = async (id) =>
  await request.get("/api/voucher/" + id);

export const listVouchers = async () =>
  await request.get("/api/voucher");

export const updateVoucher = async (id, payload) =>
  await request.put("/api/voucher/" + id, payload);

export const deleteVoucher = async (id) =>
  await request.delete("/api/voucher/" + id);

export const checkVoucher = async (id, payload) =>
  await request.get("/api/voucher/check/" + id, payload);