<template>
  <el-icon style="margin-right: 10px" @click="changeIcon">
      <component :is="layoutSettingStore.fold?'Expand':'Fold'" />
  </el-icon>
  <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item>111</el-breadcrumb-item>
    <el-breadcrumb-item>222</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import useLayOutSettingStore from "@/store/modules/setting";
let layoutSettingStore = useLayOutSettingStore();
const changeIcon = () => {
  layoutSettingStore.fold = !layoutSettingStore.fold;
}
</script>

<script lang="ts">
export default {
  name: 'Breadcrumb'
}
</script>

<style scoped>

</style>