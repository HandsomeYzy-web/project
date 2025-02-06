import { createApp } from 'vue'
import App from './App.vue'
// element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// element-plus语言包
import zhCn from 'element-plus/es/locale/lang/zh-cn'
// svg-icon
import 'virtual:svg-icons-register'
// 自定义插件对象
import GlobalComponent from '@/components'
// 引入全局样式
import '@/style/index.scss'

const app = createApp(App)
// 安装自定义插件
app.use(GlobalComponent)
app.use(ElementPlus, {
    locale: zhCn,
})
app.mount('#app')