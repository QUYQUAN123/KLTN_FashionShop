import { request } from "./request";

export const create = async (payload) =>
  await request.post("/api/category", payload);

export const listCategory = async () => await request.get("/api/category");

export const home = async () => await request.get("/api/category/home");

export const listMenu = async () => await request.get("/api/category/menu");

export const getCategoryById = async (id) =>
  await request.get("/api/category/" + id);

export const addProduct = async (id, listId) =>
  await request.put("/api/category/add-product/" + id, { listId });

export const deleteCategory = async (id) =>
  await request.delete("/api/category/" + id);

export const updateCategory = async (id, payload) =>
  await request.patch("/api/category/" + id, payload);
