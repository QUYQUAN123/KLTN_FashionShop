import { request } from "./request";

export const item = async () => await request.get("/api/statistical/item");
export const fetchTopProduct = async () =>
  await request.get("/api/statistical/top-product");
export const featchTopUser = async () =>
  await request.get("/api/statistical/top-user");
