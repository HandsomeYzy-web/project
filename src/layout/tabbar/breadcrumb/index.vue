<template>
  <el-icon style="margin-right: 10px" @click="changeIcon">
      <component :is="fold?'Expand':'Fold'" />
  </el-icon>
  <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item>111</el-breadcrumb-item>
    <el-breadcrumb-item>222</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { Expand } from "@element-plus/icons-vue";
import { ref } from 'vue'
let fold = ref(false);
const changeIcon = () => {
  console.log("changeIcon");
}
</script>

<script lang="ts">
export default {
  name: 'Breadcrumb'
}
</script>

<style scoped>

</style>