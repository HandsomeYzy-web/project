// layout组件相关配置仓库
import { defineStore } from "pinia";

let useLayOutSettingStore = defineStore('SettingStore',{
    state:()=>{
        return {
            fold:false,// 用于控制菜单折叠
            refresh:false,// 用于控制菜单刷新
        }
    }
});
export default useLayOutSettingStore;