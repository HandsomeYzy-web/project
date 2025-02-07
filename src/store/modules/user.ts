import { defineStore } from "pinia";
import { reqLogin } from "@/api/user";
import { UserState } from "@/store/modules/types/type";
import type {loginForm, loginResponse} from "@/api/user/type";
import { SET_TOKEN,GET_TOKEN } from "@/utils/token";

let useUserStore = defineStore("user", {
    state: (): UserState => {
        return {
            token: GET_TOKEN(),
        };
    },
    actions: {
        async userLogin(data: loginForm) {
            let result:loginResponse = await reqLogin(data);
            console.log(result);
            if (result.code === 1) {
                this.token = result.data;
                SET_TOKEN(result.data);
                return 'ok'
            } else {
                return Promise.reject(new Error(result.msg));
            }
        }
    },
    getters: {

    },
})
export default useUserStore