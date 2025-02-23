<template>
  <el-button size="small" icon="Refresh" circle @click="updateRefresh"></el-button>
  <el-button size="small" icon="FullScreen" circle @click="fullScreen"></el-button>
  <el-button size="small" icon="Setting" circle></el-button>
  <img :src="userStore.avatar" style="width: 24px;height: 24px;margin:0px 20px;border-radius: 50%" alt="avatar">
  <el-dropdown style="margin-right: 10px">
        <span class="el-dropdown-link">
          你好，{{ userStore.username }}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
        </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { useRouter,useRoute } from "vue-router";
import {ArrowDown} from "@element-plus/icons-vue";
import useLayOutSettingStore from "@/store/modules/setting";
import useUserStore from "@/store/modules/user";
let $router = useRouter();
let $route = useRoute();
let userStore = useUserStore();
let layoutSettingStore = useLayOutSettingStore();
const updateRefresh = () => {
  layoutSettingStore.refresh = !layoutSettingStore.refresh;
}
const fullScreen = () => {
  let full = document.fullscreenElement;
  if (!full) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}
const logout = () => {
  userStore.userLogout();
  $router.push({ path: '/login',query: { redirect: $route.path }  });
}
</script>

<script lang="ts">
export default {
  name: 'Setting'
}
</script>

<style scoped>

</style>