// 路由鉴权
import router from '@/router'
import setting from "./setting";
// 引入token,判断token是否存在，如果存在，则放行，如果不存在，则跳转到登录页
import pinia from './store'
import useUserStore from './store/modules/user'
let userStore = useUserStore(pinia)
// 全局前置守卫
router.beforeEach(async (to, from, next) => {
    document.title = `${setting.title} - ${to.meta.title}`;
    // to: 跳转到哪个路由
    // from: 从哪个路由跳转
    // next: 放行函数
    let token = userStore.token
    let username = userStore.username
    if (token) {
        if (to.path === '/login') {
            next({path:'/'});
        } else {
            if (username) {
                next();
            } else {
                try {
                    // 如果token存在，则获取用户信息
                    await userStore.userInfo();
                    next();
                } catch (error) {
                    userStore.userLogout();
                    next({path:'/login', query:{redirect:to.path}});
                }

            }
        }
    } else {
        if (to.path === '/login') {
            next();
        } else {
            next({path:'/login', query:{redirect:to.path}});
        }
    }
    next();
});
// 全局后置守卫
router.afterEach((to, from) => {

});