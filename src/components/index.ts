import SvgIcon from './SvgIcon/index.vue'

const allGlobalComponent = {
    SvgIcon,
}
// 对外暴露插件对象
export default {
    //插件对象必须提供install方法
    install(app) {
        //注册全局组件
        Object.keys(allGlobalComponent).forEach(key => {
            app.component(key, allGlobalComponent[key])
        })
    }
}