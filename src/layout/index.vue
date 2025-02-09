<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div class="layout_slider" :class="{ fold:layoutSettingStore.fold }">
      <Logo />
      <!-- 滚动组件 -->
      <el-scrollbar class="scrollbar">
        <el-menu :collapse="layoutSettingStore.fold" background-color="#001529" text-color="white" active-text-color="#ffd04b" :default-active="$router.path">
          <Menu :menuList="userStore.menuRoutes"/>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航栏 -->
    <div class="layout_tabbar" :class="{ fold:layoutSettingStore.fold }">
      <!-- layout组件顶部导航 -->
      <Tabbar></Tabbar>
    </div>
    <!-- 主体内容 -->
    <div class="layout_main" :class="{ fold:layoutSettingStore.fold }">
      <Main />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
import Main from './main/index.vue'
import Tabbar from './tabbar/index.vue'
// 获取用户相关的小仓库
import useUserStore from "@/store/modules/user";
// 获取layout设置相关的小仓库
import useLayOutSettingStore from "@/store/modules/setting";
let userStore = useUserStore();
let layoutSettingStore = useLayOutSettingStore();
// 获取路由信息
let $router = useRoute();
</script>

<script lang="ts">
export default {
  name: 'Layout'
}
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;
  .layout_slider {
    color: white;
    width: $base-menu-width;
    height: 100vh;
    background-color: $base-menu-background;
    transition: all 0.3s;
    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-menu-logo-height);
      .el-menu {
        border-right: none;
      }
    }
    &.fold {
      width: $base-menu-min-width;
    }
  }
  .layout_tabbar {
    position: fixed;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    top: 0px;
    left: $base-menu-width;
    transition: all 0.3s;
    &.fold {
      width: calc(100% - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
  .layout_main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    background-color: tan;
    top: $base-tabbar-height;
    left: $base-menu-width;
    padding: 20px;
    overflow: auto;
    transition: all 0.3s;
    &.fold {
      width: calc(100% - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
}
</style>