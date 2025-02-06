import Request from "@/utils/request";
import type { loginForm,loginResponse } from "@/api/user/type";

enum API {
    LOGIN_URL = '/users/login',
}
export const reqLogin = (data: loginForm) => Request.post<any, loginResponse>(API.LOGIN_URL, data);