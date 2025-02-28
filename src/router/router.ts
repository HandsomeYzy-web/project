// 对外暴露配置的路由

export const constantRoutes = [
    {
        path: "/login",
        component: () => import("@/views/login/index.vue"),
        name: "login",
        meta: {
            title: "登录",
            hidden: true,
        }
    },
    {
        path: "/",
        component: () => import("@/layout/index.vue"),
        name: "layout",
        meta: {
            title: "layout",
            hidden: false,
            icon: "Avatar",
        },
        redirect: "/home",
        children: [
            {
                path: "/home",
                component: () => import("@/views/home/index.vue"),
                name: "home",
                meta: {
                    title: "首页",
                    hidden: false,
                    icon: "HomeFilled",
                }
            },
        ]
    },
    {
        path: "/404",
        component: () => import("@/views/404/index.vue"),
        name: "404",
        meta: {
            title: "404",
            hidden: true,
        }
    },
    {
        path: "/:pathMatch(.*)*",
        redirect: "/404",
        name: "any",
        meta: {
            title: "any",
            hidden: true,
        }
    },
    {
        path: "/screen",
        component: () => import("@/views/screen/index.vue"),
        name: "screen",
        meta: {
            title: "数据大屏",
            hidden: true,
            icon: "DataAnalysis",
        }
    },
    {
        path: "/acl",
        component: () => import("@/layout/index.vue"),
        name: "acl",
        meta: {
            title: "权限管理",
            hidden: false,
            icon: "Lock",
        },
        children: [
            {
                path: "/acl/user",
                component: () => import("@/views/acl/user/index.vue"),
                name: "acl/user",
                meta: {
                    title: "用户管理",
                    hidden: false,
                    icon: "User",
                }
            },
            {
                path: "/acl/role",
                component: () => import("@/views/acl/role/index.vue"),
                name: "acl/role",
                meta: {
                    title: "角色管理",
                    hidden: true,
                    icon: "UserFilled",
                }
            },
            {
                path: "/acl/permission",
                component: () => import("@/views/acl/permission/index.vue"),
                name: "acl/permission",
                meta: {
                    title: "菜单管理",
                    hidden: true,
                    icon: "Monitor",
                }
            }
        ]
    },
    {
        path: "/product",
        component: () => import("@/layout/index.vue"),
        name: "product",
        meta: {
            title: "商品管理",
            hidden: false,
            icon: "Goods",
        },
        children: [
            {
                path: "/product/trademark",
                component: () => import("@/views/product/trademark/index.vue"),
                name: "product/trademark",
                meta: {
                    title: "品牌管理",
                    hidden: false,
                    icon: "ShoppingCartFull",
                }
            },
            {
                path: "/product/attr",
                component: () => import("@/views/product/attr/index.vue"),
                name: "product/attr",
                meta: {
                    title: "属性管理",
                    hidden: false,
                    icon: "TakeawayBox",
                }
            },
            {
                path: "/product/spu",
                component: () => import("@/views/product/spu/index.vue"),
                name: "product/spu",
                meta: {
                    title: "SPU管理",
                    hidden: true,
                    icon: "Box",
                }
            },
            {
                path: "/product/sku",
                component: () => import("@/views/product/sku/index.vue"),
                name: "product/sku",
                meta: {
                    title: "SKU管理",
                    hidden: true,
                    icon: "Handbag",
                }
            },
            {
                path: "/product/list",
                component: () => import("@/views/product/list/index.vue"),
                name: "product/user",
                meta: {
                    title: "商品列表管理",
                    hidden: false,
                    icon: "Grid",
                }
            },
            {
                path: "/product/replenishmentapprove",
                component: () => import("@/views/product/replenishmentapprove/index.vue"),
                name: "product/replenishmentapprove",
                meta: {
                    title: "补货确认",
                    hidden: false,
                    icon: "Check",
                }
            },
            {
                path: "/product/replenishmentsupplier",
                component: () => import("@/views/product/replenishmentsupplier/index.vue"),
                name: "product/replenishmentsupplier",
                meta: {
                    title: "提供补货",
                    hidden: false,
                    icon: "Clock",
                }
            },
            {
                path: "/product/replenishmentarrived",
                component: () => import("@/views/product/replenishmentarrived/index.vue"),
                name: "product/replenishmentarrived",
                meta: {
                    title: "补货到店",
                    hidden: false,
                    icon: "Van",
                }
            }
        ]
    },
    {
        path: "/checkout",
        component: () => import("@/layout/index.vue"),
        name: "checkout",
        meta: {
            title: "layout",
            hidden: false,
            icon: "Avatar",
        },
        children: [
            {
                path: "/checkout/check",
                component: () => import("@/views/checkout/index.vue"),
                name: "checkout/check",
                meta: {
                    title: "收银台",
                    hidden: false,
                    icon: "Sell",
                }
            },
        ]
    },
    {
        path: "/member",
        component: () => import("@/layout/index.vue"),
        name: "member",
        meta: {
            title: "layout",
            hidden: false,
            icon: "Avatar",
        },
        children: [
            {
                path: "/member/look",
                component: () => import("@/views/member/index.vue"),
                name: "/member/look",
                meta: {
                    title: "会员界面",
                    hidden: false,
                    icon: "Sell",
                }
            },
        ]
    },

]