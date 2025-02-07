// 对外暴露配置的路由

export const constantRoutes = [
    {
        path: "/login",
        component: () => import("@/views/login/index.vue"),
        name: "login"
    },
    {
        path: "/",
        // component: () => import("@/views/home/index.vue"),\
        component: () => import("@/layout/index.vue"),
        name: "layout"
    },
    {
        path: "/404",
        component: () => import("@/views/404/index.vue"),
        name: "404"
    },
    {
        path: "/:pathMatch(.*)*",
        redirect: "/404",
        name: "any"
    }

]