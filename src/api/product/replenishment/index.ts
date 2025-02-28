import Request from "@/utils/request";
import type { replenishmentResponseData, replenishment } from "./type";
enum API {
    REPLENISHMENT_URL = "/replenishments",
    ADD_REPLENISHMENT_URL = "/replenishments",
    UPDATE_REPLENISHMENT_URL = "/replenishments",
    APPROVE_REPLENISHMENT_URL = "/replenishments/approve",
}
export const reqReplenishment = (page: number, limit: number, status: string, supplierId: string) =>
    Request.get<any, replenishmentResponseData>(
        API.REPLENISHMENT_URL + `?page=${page}&limit=${limit}&status=${status}&supplierId=${supplierId}`
    );
export const reqAddReplenishment = (data: replenishment) =>
    Request.post<any, any>(API.ADD_REPLENISHMENT_URL, data);
export const reqUpdateReplenishment = (id: number, status: string, approverId: string) =>
    Request.put<any, any>(API.UPDATE_REPLENISHMENT_URL + `?id=${id}&status=${status}&approverId=${approverId}`);
export const reqApproveReplenishment = (id: number, productId: number, quantity: number) =>
    Request.put<any, any>(API.APPROVE_REPLENISHMENT_URL + `?id=${id}&productId=${productId}&quantity=${quantity}`);