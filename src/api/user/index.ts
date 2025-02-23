import Request from "@/utils/request";
import type {loginForm, loginResponse, userInfo} from "@/api/user/type";

enum API {
    LOGIN_URL = '/users/login',
    USERINFO_URL = '/users/info',
}
export const reqLogin = (data: loginForm) => Request.post<any, loginResponse>(API.LOGIN_URL, data);
export const reqUserInfo = () => Request.get<any, userInfo>(API.USERINFO_URL);