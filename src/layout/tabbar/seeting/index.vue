<template>
  <el-button size="small" icon="Refresh" circle></el-button>
  <el-button size="small" icon="FullScreen" circle></el-button>
  <el-button size="small" icon="Setting" circle></el-button>
  <img src="../../../public/logo.png" style="width: 24px;height: 24px;margin:0px 20px" alt="avatar">
  <el-dropdown style="margin-right: 10px">
        <span class="el-dropdown-link">
          admin
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
        </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import {ArrowDown} from "@element-plus/icons-vue";
</script>

<script lang="ts">
export default {
  name: 'Setting'
}
</script>

<style scoped>

</style>