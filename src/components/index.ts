import SvgIcon from './SvgIcon/index.vue'
import Category from './Category/index.vue'
// 引入element-plus提供的全局图标组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const allGlobalComponent = {
    SvgIcon,
    Category
}
// 对外暴露插件对象
export default {
    // 插件对象必须提供install方法
    install(app:any) {
        // 注册全局组件
        Object.keys(allGlobalComponent).forEach(key => {
            app.component(key, allGlobalComponent[key]);
        });
        // 将element-plus提供图标注册为全局组件
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            app.component(key, component);
        }
    }
}