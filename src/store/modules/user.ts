import { defineStore } from "pinia";
import { reqLogin, reqUserInfo } from "@/api/user";
import { UserState } from "@/store/modules/types/type";
import type {loginForm, loginResponse} from "@/api/user/type";
import { SET_TOKEN,GET_TOKEN,REMOVE_TOKEN } from "@/utils/token";
// 引入常量路由
import { constantRoutes } from "@/router/router";
import {useRoute} from "vue-router";

let useUserStore = defineStore("user", {
    state: (): UserState => {
        return {
            token: GET_TOKEN(),
            menuRoutes: constantRoutes,// 仓库存储生成的菜单（路由）数据
            username: "",
            avatar: "",
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
        },
        async userInfo(){
            let result = await reqUserInfo();
            if (result.code === 1) {
                this.username = result.data.username;
                this.avatar = result.data.avatar;
                return 'ok';
            } else {
                return Promise.reject(new Error(result.msg));
            }
        },
        userLogout() {
            this.token = null;
            this.username = "";
            this.avatar = "";
            REMOVE_TOKEN();
        },
    },
    getters: {

    },
})
export default useUserStore