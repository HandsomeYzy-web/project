import Request from "@/utils/request";
import type { Product, CheckoutRequest, ResponseData } from './type'

// 接口枚举
enum API {
    PRODUCT_URL = "/products/info", // 商品接口
    CHECKOUT_URL = "/checkout", // 结账接口
}
// 获取商品信息
export const reqProductById = (id: number) =>
    Request.get<any, ResponseData<Product>>(API.PRODUCT_URL + `?id=${id}`);
// 结账
export const reqCheckout = (data: CheckoutRequest) =>
    Request.post<any, ResponseData>(API.CHECKOUT_URL, data);