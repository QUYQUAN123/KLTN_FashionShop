import { request } from "./request";

export const listOrder = async () => await request.get("/api/order");

export const create = async (payload) =>
  await request.post("/api/order", payload);

export const getOrderByUserId = async (id) =>
  await request.get("/api/order/get-by-user/" + id);

export const getOrderById = async (id) => await request.get("/api/order/" + id);

export const updateOrder = async (id, payload) =>
  await request.put("/api/order/update/"+ id, payload);
