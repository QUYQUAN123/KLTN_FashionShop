import { request } from "./request";



export const AdminlistProduct = async () => await request.get("/api/admin/productAdmin");

