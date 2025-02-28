import Request from "@/utils/request";
import type {loginForm, loginResponse, userInfo, UserListResponse, user} from "@/api/user/type";

enum API {
    LOGIN_URL = '/users/login',
    USERINFO_URL = '/users/info',
    USER_INFOS_URL = '/users/infos',
    ADD_USER_URL = "/users",
    UPDATE_USER_URL = "/users",
    DELETE_USER_URL = "/users",
    USERINFO_BY_ID_URL = "/users",
}
export const reqLogin = (data: loginForm) => Request.post<any, loginResponse>(API.LOGIN_URL, data);
export const reqUserInfo = () => Request.get<any, userInfo>(API.USERINFO_URL);
export const reqHasUser = (page: number, limit: number, role: string) => Request.get<any, UserListResponse>(API.USER_INFOS_URL+`?page=${page}&limit=${limit}&role=${role}`);
export const reqAddUser = (data: user) => Request.post<any, any>(API.ADD_USER_URL, data);
export const reqUpdateUser = (data: user) => Request.put<any, any>(API.UPDATE_USER_URL, data);
export const reqDeleteUser = (userid: string) => Request.delete<any, any>(API.DELETE_USER_URL+`/${userid}`);
export const reqUserInfoById = (userid: string) => Request.get<any, userInfo>(API.USERINFO_BY_ID_URL+`?userId=${userid}`);