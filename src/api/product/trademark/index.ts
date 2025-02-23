import Request from "@/utils/request";
import type { trademarkResponseData, trademark } from './type'
enum API {
  TRADEMARK_URL = "/users/infos",
  ADD_TRADEMARK_URL = "/users",
  UPDATE_TRADEMARK_URL = "/users",
  DELETE_TRADEMARK_URL = "/users",
}
export const reqHasTrademark = (page: number, limit: number) => Request.get<any, trademarkResponseData>(API.TRADEMARK_URL+`?page=${page}&limit=${limit}&role=supplier`);
export const reqAddTrademark = (data: trademark) => Request.post<any, any>(API.ADD_TRADEMARK_URL, data);
export const reqUpdateTrademark = (data: trademark) => Request.put<any, any>(API.UPDATE_TRADEMARK_URL, data);
export const reqDeleteTrademark = (userid: string) => Request.delete<any, any>(API.DELETE_TRADEMARK_URL+`/${userid}`);