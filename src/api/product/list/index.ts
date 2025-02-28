import Request from "@/utils/request";
import type { Product, ProductResponseData } from './type';

enum API {
    PRODUCT_URL = "/products",
    PRODUCT_CHANGE_STATUS_URL = "/products/status",
    PRODUCT_BY_ID_URL = "/products/info",
}

// 获取商品列表
export const reqHasProduct = (page: number, limit: number, category: string) =>
    Request.get<any, ProductResponseData>(API.PRODUCT_URL + `?page=${page}&limit=${limit}&category=${category}`);

// 添加商品
export const reqAddProduct = (data: Product) =>
    Request.post<any, any>(API.PRODUCT_URL, data);

// 修改商品
export const reqUpdateProduct = (data: Product) =>
    Request.put<any, any>(API.PRODUCT_URL, data);

// 删除商品
export const reqDeleteProduct = (id: number) =>
    Request.delete<any, any>(API.PRODUCT_URL + `/${id}`);

// 更新商品状态
export const reqUpdateProductStatus = (id: number, status: number) =>
    Request.put<any, any>(API.PRODUCT_CHANGE_STATUS_URL + `?id=${id}&status=${status}`);
export const reqProductById = (id: number) =>
    Request.get<any, Product>(API.PRODUCT_BY_ID_URL + `?id=${id}`);