import { request } from "./request";

export const create = async (payload) =>
  await request.post("/api/review", payload);

export const findOne = async (user, product, order) =>
  await request.get(
    `/api/review/find-one?user=${user}&product=${product}&order=${order}`
  );

export const home = async () => await request.get("/api/review/home");

export const listMenu = async () => await request.get("/api/review/menu");

export const getReviewById = async (id) =>
  await request.get("/api/review/" + id);

export const addProduct = async (id, listId) =>
  await request.put("/api/review/add-product/" + id, { listId });

export const deleteReview = async (id) =>
  await request.delete("/api/review/" + id);

export const updateReview = async (id, payload) =>
  await request.patch("/api/review/" + id, payload);

export const findByProductId = async (id) =>
  await request.get(`/api/review/find-by-product/${id}`);
