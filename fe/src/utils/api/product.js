import { request } from "./request";

export const create = async (payload) =>
  await request.post("/api/product", payload);

export const listProduct = async () => await request.get("/api/product");

export const listProductByName = async (name) =>
  await request.get("/api/product?name=" + name);

export const deleteProduct = async (id) =>
  await request.delete("/api/product/" + id);

export const updateProduct = async (id, payload) =>
  await request.patch("/api/product/" + id, payload);

export const addViews = async (id) =>
  await request.patch("/api/product/add-view/" + id);

export const getProductById = async (id) =>
  await request.get("/api/product/" + id);

export const listTopView = async () =>
  await request.get("/api/product/top-view");

export const listRelatedVideo = async (id) =>
  await request.get("/api/product/related/" + id);
